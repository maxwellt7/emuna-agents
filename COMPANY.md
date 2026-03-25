---
name: Emuna
description: Holding company operating Acquisition Systems, Attora, and VH Labs — with 15 AI agents across finance, investor relations, creative, operations, marketing, development, and customer service
slug: emuna
schema: agentcompanies/v1
version: 1.0.0
license: MIT
authors:
  - name: Maxwell Mayes
goals:
  - Build an AI-augmented organization that multiplies human capacity across all portfolio companies
  - Provide centralized financial management and investor relations across all entities
  - Scale creative production, copywriting, and marketing operations through specialized AI agents
  - Maintain clear accountability with every AI agent owned by a named human
includes:
  - companies/emuna/COMPANY.md
  - companies/asl/COMPANY.md
  - companies/attora/COMPANY.md
  - companies/vh-labs/COMPANY.md
---

# Emuna

Emuna is a holding company that owns and operates three subsidiaries, powered by 15 AI agents orchestrated through [Paperclip](https://github.com/paperclipai/paperclip).

## Portfolio

| Company | Focus | AI Agents | Human Team |
|---------|-------|-----------|------------|
| **Emuna** (Holding) | Shared finance & investor relations | Financial Director, IR Support Alpha, IR Support Beta | Maxwell Mayes, Matt Benter |
| **Acquisition Systems** | Performance marketing & affiliates | Creative Director, Tracking Specialist | Jorge Canga, Casey Amundson, Matt Payne |
| **Attora** | E-commerce revenue activation | Operations Director, Creative Director, Copywriter, Quality Control | Sanse, Webbs |
| **VH Labs** | Agency & fulfillment | Marketing Manager, Creative Director, Copywriter, Developer, Customer Service, Backend Marketer | Casey Amundson, Matt Payne, Sanse, John Webbs |

## Leadership

| Person | Role | Scope |
|--------|------|-------|
| **Maxwell Mayes** | Visionary | Vision, big ideas, creative problem solving, catalyst, big relationships |
| **Matt Benter** | Integrator | Execute the vision, own the P&L, filter & prioritize projects, drive processes & consistency, solve issues & bottlenecks |

## Architecture

### Shared Services (Emuna)

Emuna provides centralized services to all subsidiaries:

1. **Finance** — One Financial Director manages payouts, books, payroll, and financial strategy across all entities. Priority stack: payroll > payouts > reconciliation > reporting > strategy. Escalates to Matt Benter when entity priorities conflict.
2. **Investor Relations** — Two specialized agents support Maxwell's fundraising. Alpha handles communications and meetings. Beta handles CRM data and pipeline tracking.

### Company-Specific Agents

Each subsidiary has AI agents tuned to its domain:

- **ASL agents** think in affiliate angles, tracking links, and performance creative
- **Attora agents** think in DTC funnels, e-commerce offers, and conversion optimization
- **VH Labs agents** think in client campaigns, multi-vertical creative, and agency deliverables

### Human Ownership

Every AI agent has a named human owner. No agent operates in a vacuum.

| Agent | Company | Human Owner |
|-------|---------|-------------|
| Financial Director | Emuna | Matt Benter |
| IR Support Alpha | Emuna | Maxwell Mayes |
| IR Support Beta | Emuna | Maxwell Mayes |
| Creative Director | ASL | Casey Amundson |
| Tracking Specialist | ASL | Matt Payne |
| Operations Director | Attora | Matt Benter |
| Creative Director | Attora | → Ops Director (AI) |
| Copywriter | Attora | → Ops Director (AI) |
| Quality Control | Attora | → Creative Director (AI) |
| Marketing Manager | VH Labs | Casey Amundson |
| Creative Director | VH Labs | → Marketing Manager (AI) |
| Copywriter | VH Labs | → Marketing Manager (AI) |
| Developer | VH Labs | Matt Payne |
| Customer Service | VH Labs | Casey Amundson |
| Backend Marketer | VH Labs | → Marketing Manager (AI) |

### Agent Communication Protocol

All agent-to-agent work flows through Paperclip tasks:

1. Agent A creates a task with `parentId`, assigns to Agent B, includes the brief
2. Agent B picks up via `POST /api/issues/{id}/checkout` on next heartbeat
3. Agent B completes work, comments with deliverables, updates status
4. Agent A (or human owner) reviews and accepts or requests revision

## Operating Principles

- **Entity separation**: clean financial boundaries between all companies
- **Human-in-the-loop**: AI agents draft, humans approve and send
- **Escalation clarity**: Matt Benter for cross-entity conflicts, Maxwell Mayes for vision/investor decisions
- **Phase launches**: start with 6 high-ROI agents, expand based on results (see LAUNCH_PRIORITY.md)
- **Context before launch**: every agent needs CONTEXT.md populated with real business data before going live
- **Truth over comfort**: financial and performance data presented as-is, not softened

## Import to Paperclip

```bash
# Import each company individually
paperclip company import ./companies/emuna
paperclip company import ./companies/asl
paperclip company import ./companies/attora
paperclip company import ./companies/vh-labs

# Or from GitHub
paperclip company import maxwellt7/emuna-agents/companies/emuna
paperclip company import maxwellt7/emuna-agents/companies/asl
paperclip company import maxwellt7/emuna-agents/companies/attora
paperclip company import maxwellt7/emuna-agents/companies/vh-labs
```
