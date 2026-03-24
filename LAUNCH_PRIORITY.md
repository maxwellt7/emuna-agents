# Launch Priority

Phased rollout plan for Emuna AI agents. Launch lean, prove ROI, then expand.

## Phase 1: Day 1 Launch (6 agents)

These agents produce immediate value with minimal infrastructure:

| Agent | Company | Why First |
|-------|---------|-----------|
| **Financial Director** | Emuna | Reconciliation, payroll tracking, and payout management save hours/week across all entities |
| **IR Support Alpha** | Emuna | Investor comms drafting directly supports active fundraising |
| **Operations Director** | Attora | Funnel briefs and launch strategy coordinate the existing team (Webbs, Sanse) |
| **Copywriter** | Attora | Immediate content production: VSLs, ads, emails, LPs for launches |
| **Marketing Manager** | VH Labs | Campaign coordination and reporting across agency clients |
| **Copywriter** | VH Labs | Client deliverable production — landing pages, emails, ad copy |

### Phase 1 Prerequisites

Before launching each agent, ensure:
- [ ] Paperclip server running with company created
- [ ] Agent provisioned with SOUL.md and HEARTBEAT.md copied
- [ ] At least 3 seed tasks created in Paperclip for the agent
- [ ] CONTEXT.md populated with current business data
- [ ] Human owner briefed on how to assign work and review output

## Phase 2: Weeks 4-8 (expand based on Phase 1 results)

| Agent | Company | Depends On |
|-------|---------|------------|
| **IR Support Beta** | Emuna | CRM system access configured |
| **Creative Director** | Attora | Ops Director producing briefs that need creative execution |
| **Creative Director** | VH Labs | Marketing Manager generating campaign strategies that need creative |
| **Quality Control** | Attora | Creative Director producing assets that need QC |

## Phase 3: Months 3-6 (infrastructure-dependent)

| Agent | Company | Blocked By |
|-------|---------|------------|
| **Creative Director** | ASL | Needs performance data feeds from ad platforms |
| **Tracking Specialist** | ASL | Needs Boltout/tracking platform API integration |
| **Developer** | VH Labs | Needs defined project backlog and repo access |
| **Customer Service** | VH Labs | Needs knowledge base seeded per client |
| **Backend Marketer** | VH Labs | Needs email/SMS platform access per client |

## Future Agents (Not Yet Built)

Identified gaps from org review:

| Agent | Company | Purpose |
|-------|---------|---------|
| **Media Buying Analyst** | ASL + VH Labs | Pull spend data, flag underperformers, daily/weekly reports — directly supports Casey |
| **Compliance Reviewer** | Attora + ASL | Review customer-facing copy against FTC/regulatory requirements before launch |

## Anti-Patterns

- Do NOT launch all 15 agents on day 1. Empty agents with no tasks burn API spend and produce nothing.
- Do NOT launch agents without CONTEXT.md populated. A persona without business context is an expensive chatbot.
- Do NOT let AI agents assign work to humans without a human manager in the loop.
