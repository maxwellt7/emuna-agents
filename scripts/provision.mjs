#!/usr/bin/env node

/**
 * Emuna Organization Provisioner
 *
 * Creates all companies and agents in Paperclip from the org chart data.
 * Reads company.json and agent.json files from the companies/ directory
 * and provisions them via the Paperclip REST API.
 *
 * Usage:
 *   node scripts/provision.mjs                    # Provision everything
 *   node scripts/provision.mjs --company emuna    # Provision one company
 *   node scripts/provision.mjs --dry-run          # Preview without creating
 *
 * Prerequisites:
 *   - Paperclip server running at PAPERCLIP_URL (default: http://127.0.0.1:3100)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const COMPANIES_DIR = path.join(ROOT, "companies");

const PAPERCLIP_URL = process.env.PAPERCLIP_URL || "http://127.0.0.1:3100";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function api(method, endpoint, body = null) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${PAPERCLIP_URL}/api${endpoint}`, opts);
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`API ${method} ${endpoint} → ${res.status}: ${text}`);
  }

  return text ? JSON.parse(text) : null;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function listDirs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

// ---------------------------------------------------------------------------
// Core provisioning
// ---------------------------------------------------------------------------

async function provisionCompany(companyDir, dryRun) {
  const companyConfig = readJson(path.join(companyDir, "company.json"));
  const companyName = companyConfig.name;

  console.log(`\n━━━ Company: ${companyName} ━━━`);

  // Check if company already exists
  const existing = await api("GET", "/companies");
  const found = existing.find(
    (c) => c.name === companyName && c.status !== "archived"
  );

  let companyId;

  if (found) {
    console.log(`  ✓ Already exists (${found.id})`);
    companyId = found.id;
  } else if (dryRun) {
    console.log(`  [DRY RUN] Would create company: ${companyName}`);
    companyId = "dry-run-id";
  } else {
    const created = await api("POST", "/companies", {
      name: companyConfig.name,
      description: companyConfig.description || "",
      budgetMonthlyCents: companyConfig.budgetMonthlyCents || 0,
    });
    companyId = created.id;
    console.log(`  ✓ Created (${companyId})`);

    // Update issue prefix if specified
    if (companyConfig.issuePrefix) {
      try {
        await api("PATCH", `/companies/${companyId}`, {
          issuePrefix: companyConfig.issuePrefix,
        });
        console.log(`  ✓ Set issue prefix: ${companyConfig.issuePrefix}`);
      } catch (e) {
        console.log(
          `  ⚠ Could not set issue prefix (may need manual update): ${e.message}`
        );
      }
    }

    // Disable board approval for faster provisioning
    if (companyConfig.requireBoardApprovalForNewAgents === false) {
      try {
        await api("PATCH", `/companies/${companyId}`, {
          requireBoardApprovalForNewAgents: false,
        });
      } catch (e) {
        // Non-critical
      }
    }
  }

  // Provision agents
  const agentsDir = path.join(companyDir, "agents");
  if (!fs.existsSync(agentsDir)) {
    console.log("  No agents directory found, skipping agents.");
    return { companyId, companyName, agents: [] };
  }

  // First pass: create all agents (need IDs before setting reportsTo)
  const agentDirs = listDirs(agentsDir);
  const agentMap = {}; // slug -> { config, paperclipId }

  // Get existing agents
  let existingAgents = [];
  if (!dryRun && companyId !== "dry-run-id") {
    try {
      existingAgents = await api(
        "GET",
        `/companies/${companyId}/agents`
      );
    } catch (e) {
      existingAgents = [];
    }
  }

  for (const agentSlug of agentDirs) {
    const agentDir = path.join(agentsDir, agentSlug);
    const agentConfigPath = path.join(agentDir, "agent.json");

    if (!fs.existsSync(agentConfigPath)) {
      console.log(`  ⚠ No agent.json in ${agentSlug}, skipping`);
      continue;
    }

    const agentConfig = readJson(agentConfigPath);
    const existingAgent = existingAgents.find(
      (a) => a.name === agentConfig.name
    );

    if (existingAgent) {
      console.log(
        `  ✓ Agent "${agentConfig.name}" already exists (${existingAgent.id})`
      );
      agentMap[agentSlug] = {
        config: agentConfig,
        paperclipId: existingAgent.id,
      };
      continue;
    }

    if (dryRun) {
      console.log(
        `  [DRY RUN] Would create agent: ${agentConfig.name} (${agentConfig.role})`
      );
      agentMap[agentSlug] = { config: agentConfig, paperclipId: null };
      continue;
    }

    // Create agent via hire endpoint
    const hirePayload = {
      name: agentConfig.name,
      role: agentConfig.role || "general",
      title: agentConfig.title || agentConfig.name,
      icon: agentConfig.icon || "bot",
      adapterType: agentConfig.adapterType || "claude_local",
      capabilities: agentConfig.capabilities || "",
      budgetMonthlyCents: agentConfig.budgetMonthlyCents || 0,
      permissions: agentConfig.permissions || {},
      metadata: {
        functions: agentConfig.functions || [],
        serves: agentConfig.serves || [],
        provisionedFrom: "emuna-agents",
      },
    };

    try {
      const result = await api(
        "POST",
        `/companies/${companyId}/agent-hires`,
        hirePayload
      );
      const agentId = result.agent?.id || result.id;
      console.log(`  ✓ Created agent: ${agentConfig.name} (${agentId})`);
      agentMap[agentSlug] = { config: agentConfig, paperclipId: agentId };

      // Copy instruction files if agent has a directory in Paperclip
      await copyInstructions(companyId, agentId, agentDir);
    } catch (e) {
      console.error(`  ✗ Failed to create agent ${agentConfig.name}: ${e.message}`);
      agentMap[agentSlug] = { config: agentConfig, paperclipId: null };
    }
  }

  // Second pass: set reporting lines
  for (const [slug, entry] of Object.entries(agentMap)) {
    const { config, paperclipId } = entry;
    if (!config.reportsTo || !paperclipId || dryRun) continue;

    const managerEntry = agentMap[config.reportsTo];
    if (!managerEntry?.paperclipId) {
      console.log(
        `  ⚠ Cannot set reportsTo for ${config.name}: manager "${config.reportsTo}" not found`
      );
      continue;
    }

    try {
      await api("PATCH", `/companies/${companyId}/agents/${paperclipId}`, {
        reportsTo: managerEntry.paperclipId,
      });
      console.log(
        `  ✓ ${config.name} → reports to ${managerEntry.config.name}`
      );
    } catch (e) {
      console.log(
        `  ⚠ Could not set reporting line for ${config.name}: ${e.message}`
      );
    }
  }

  return {
    companyId,
    companyName,
    agents: Object.entries(agentMap).map(([slug, entry]) => ({
      slug,
      name: entry.config.name,
      id: entry.paperclipId,
    })),
  };
}

async function copyInstructions(companyId, agentId, agentDir) {
  const instructionFiles = ["SOUL.md", "HEARTBEAT.md", "TOOLS.md", "AGENTS.md"];

  for (const file of instructionFiles) {
    const filePath = path.join(agentDir, file);
    if (!fs.existsSync(filePath)) continue;

    // Copy to Paperclip's agent instruction directory
    const destDir = path.join(
      process.env.HOME,
      ".paperclip",
      "instances",
      "default",
      "companies",
      companyId,
      "agents",
      agentId,
      "instructions"
    );

    try {
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(filePath, path.join(destDir, file));
      console.log(`    ✓ Copied ${file}`);
    } catch (e) {
      console.log(`    ⚠ Could not copy ${file}: ${e.message}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const targetCompany = args.find((a, i) => args[i - 1] === "--company");

  console.log("╔══════════════════════════════════════════╗");
  console.log("║   Emuna Organization Provisioner         ║");
  console.log("╚══════════════════════════════════════════╝");
  console.log(`\nPaperclip API: ${PAPERCLIP_URL}`);
  if (dryRun) console.log("MODE: DRY RUN (no changes will be made)\n");

  // Verify API connectivity
  try {
    await api("GET", "/health");
    console.log("✓ Paperclip API is reachable");
  } catch (e) {
    console.error(
      `✗ Cannot reach Paperclip API at ${PAPERCLIP_URL}. Is the server running?`
    );
    console.error(`  Start it with: cd ~/paperclip && pnpm dev`);
    process.exit(1);
  }

  // Determine which companies to provision
  // Order matters: Emuna first (shared services), then subsidiaries
  const provisionOrder = ["emuna", "asl", "attora", "vh-labs"];
  const companyDirs = provisionOrder.filter((name) => {
    if (targetCompany && name !== targetCompany) return false;
    const dir = path.join(COMPANIES_DIR, name);
    return fs.existsSync(dir);
  });

  if (companyDirs.length === 0) {
    console.error("No companies found to provision.");
    process.exit(1);
  }

  const results = [];

  for (const companySlug of companyDirs) {
    const companyDir = path.join(COMPANIES_DIR, companySlug);
    const result = await provisionCompany(companyDir, dryRun);
    results.push(result);
  }

  // Summary
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║   Provisioning Summary                   ║");
  console.log("╚══════════════════════════════════════════╝\n");

  for (const r of results) {
    console.log(`${r.companyName} (${r.companyId || "dry-run"}):`);
    for (const a of r.agents) {
      console.log(`  - ${a.name} ${a.id ? `(${a.id})` : "[not created]"}`);
    }
    console.log();
  }

  if (dryRun) {
    console.log("This was a dry run. Run without --dry-run to create resources.");
  } else {
    console.log("Provisioning complete. Open Paperclip at http://127.0.0.1:3100");
  }
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
