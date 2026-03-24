# Emuna Agents

Organizational structure and AI agent configurations for the Emuna holding company, powering [Paperclip](https://github.com/paperclipai/paperclip) agent orchestration.

## Structure

**Emuna** is a holding company with three subsidiaries:

| Company | Focus | AI Agents |
|---------|-------|-----------|
| **Emuna** (Holding) | Shared finance & investor relations | Financial Director, IR Support (x2) |
| **Acquisition Systems (ASL)** | Performance marketing & affiliates | Creative Director, Tracking Specialist |
| **Attora** | E-commerce revenue activation | Operations Director, Creative Director, Copywriter, Quality Control |
| **VH Labs** | Agency & fulfillment | Marketing Manager, Creative Director, Copywriter, Developer, Customer Service, Backend Marketer |

## Directory Layout

```
emuna-agents/
├── org.json                          # Complete org chart (humans + AI)
├── companies/
│   ├── emuna/
│   │   ├── company.json              # Paperclip company config
│   │   └── agents/
│   │       ├── financial-director/
│   │       │   ├── agent.json        # Paperclip agent config
│   │       │   ├── SOUL.md           # Agent persona & voice
│   │       │   └── HEARTBEAT.md      # Agent work checklist
│   │       ├── ir-support-alpha/
│   │       └── ir-support-beta/
│   ├── asl/
│   │   ├── company.json
│   │   └── agents/
│   │       ├── creative-director/
│   │       └── tracking-specialist/
│   ├── attora/
│   │   ├── company.json
│   │   └── agents/
│   │       ├── operations-director/
│   │       ├── creative-director/
│   │       ├── copywriter/
│   │       └── quality-control/
│   └── vh-labs/
│       ├── company.json
│       └── agents/
│           ├── marketing-manager/
│           ├── creative-director/
│           ├── copywriter/
│           ├── developer/
│           ├── customer-service/
│           └── backend-marketer/
└── scripts/
    └── provision.mjs               # Provisions everything in Paperclip
```

## Human Leadership (Shared Across Companies)

| Person | Roles |
|--------|-------|
| **Maxwell Mayes** | Visionary (all), Investor Relations (Emuna), Sales Manager (VH Labs) |
| **Matt Benter** | Integrator (all) |
| **Casey Amundson** | Operations Director + Media Buyer (ASL), Media Buyer + Creative (VH Labs) |
| **Jorge Canga** | Affiliate/Brand Manager (ASL) |
| **Matt Payne** | Tech Director (ASL, VH Labs) |
| **Sanse** | Video Editor (Attora, VH Labs) |
| **John Webbs** | Funnel Builder (Attora, VH Labs) |

## AI Agent Design Principles

Each AI agent follows EOS (Entrepreneurial Operating System) accountability:

- **5 Functions**: Every agent has exactly 5 defined responsibilities
- **Clear Reporting**: Each agent knows who they report to and who reports to them
- **Human Owner**: Every top-level agent has a named human owner who reviews work and provides direction
- **SOUL.md**: Defines persona, strategic posture, and voice — how the agent thinks and communicates
- **HEARTBEAT.md**: Defines the work loop — what the agent does on every wake cycle
- **CONTEXT.md**: Business-specific knowledge the agent needs to do real work (must be populated before launch)

### Holding Company vs. Company-Specific

- **Emuna agents** (Financial Director, IR Support) serve ALL subsidiaries
- **Company-specific agents** are tuned to their company's domain (e.g., ASL Creative Director thinks in affiliate angles, Attora Creative Director thinks in DTC e-commerce)

### Human Ownership Map

Every AI agent has a human accountable for its output:

| Agent | Company | Human Owner |
|-------|---------|-------------|
| Financial Director | Emuna | Matt Benter |
| IR Support Alpha (Comms) | Emuna | Maxwell Mayes |
| IR Support Beta (CRM/Data) | Emuna | Maxwell Mayes |
| Creative Director | ASL | Casey Amundson |
| Tracking Specialist | ASL | Matt Payne |
| Operations Director | Attora | Matt Benter |
| Creative Director | Attora | Reports to Ops Director (AI) |
| Copywriter | Attora | Reports to Ops Director (AI) |
| Quality Control | Attora | Reports to Creative Director (AI) |
| Marketing Manager | VH Labs | Casey Amundson |
| Creative Director | VH Labs | Reports to Marketing Manager (AI) |
| Copywriter | VH Labs | Reports to Marketing Manager (AI) |
| Developer | VH Labs | Matt Payne |
| Customer Service | VH Labs | Casey Amundson |
| Backend Marketer | VH Labs | Reports to Marketing Manager (AI) |

### Agent-to-Agent Communication Protocol

Agents communicate through Paperclip's task system:

1. **Delegation**: Agent A creates a task in Paperclip with `parentId` linking to the parent task, assigns it to Agent B, and includes the brief/requirements in the task description.
2. **Pickup**: Agent B picks up the task on its next heartbeat cycle via `POST /api/issues/{id}/checkout`.
3. **Delivery**: Agent B completes the work, comments with deliverables, and updates task status.
4. **Review**: Agent A (or human owner) reviews the deliverable and either accepts or requests revision via comment.

No agent sends work to another agent outside Paperclip. No agent DMs a human. All work flows through tasks.

## Setup

### Prerequisites

- [Paperclip](https://github.com/paperclipai/paperclip) installed and running
- Node.js 18+

### Provision

```bash
# Dry run — preview what will be created
node scripts/provision.mjs --dry-run

# Provision everything
node scripts/provision.mjs

# Provision a single company
node scripts/provision.mjs --company attora
```

The provisioning script:
1. Creates companies in Paperclip (Emuna first, then subsidiaries)
2. Creates all AI agents with correct roles, capabilities, and metadata
3. Sets reporting lines between agents
4. Copies SOUL.md and HEARTBEAT.md to Paperclip's instruction directories

### Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `PAPERCLIP_URL` | `http://127.0.0.1:3100` | Paperclip API base URL |

## Launch Priority

See [LAUNCH_PRIORITY.md](LAUNCH_PRIORITY.md) for the phased rollout plan.

**Do NOT launch all 15 agents on day 1.** Start with 6 agents that have immediate ROI, prove they work, then expand. Each agent needs its CONTEXT.md populated with real business data before it goes live.

## Roadmap

- **Phase 1** (current): Org structure + agent personas provisioned in Paperclip. Launch 6 priority agents.
- **Phase 2**: Expand to remaining agents as infrastructure (data feeds, platform access, knowledge bases) is built.
- **Phase 3**: Company-specific agent tooling (copywriting tools, creative brief generators, tracking automation).
- **Future**: Media Buying Analyst (serves ASL + VH Labs), Compliance Reviewer (serves Attora + ASL).
