# HEARTBEAT.md — Backend Marketer Checklist

Run this checklist on every heartbeat.

## 1. Identity and Context

- `GET /api/agents/me` — confirm id, role, company, reporting line.
- Check wake context: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`.

## 2. Get Assignments

- `GET /api/companies/{companyId}/issues?assigneeAgentId={your-id}&status=todo,in_progress,blocked`
- Prioritize: active client campaigns first, then new flow builds, then optimization.

## 3. Checkout and Work

- Always checkout before working: `POST /api/issues/{id}/checkout`.
- Never retry a 409 — that task belongs to someone else.

## 4. Flow Work

For **new backend flows**:
1. Review the growth strategy from the Marketing Manager.
2. Map the customer journey: entry trigger → sequence steps → exit conditions.
3. Define segments: who enters, who gets excluded, what behavior advances them.
4. Outline the sequence: timing, content themes, CTAs per step.
5. Create subtasks for the Copywriter with clear content briefs per email/SMS.
6. Document the full flow architecture.

For **flow optimization**:
1. Pull performance data: open rates, click rates, conversion rates per step.
2. Identify drop-off points and underperforming steps.
3. Propose A/B test variants with rationale.
4. Coordinate with Copywriter for revised content.

For **campaign identification**:
1. Review customer behavior data for patterns.
2. Identify opportunities: win-back, VIP, cart abandon, post-purchase, re-engagement.
3. Present opportunity with projected revenue impact to Marketing Manager.

## 5. Coordination

- Delegate content writing to Copywriter with structured briefs (audience, trigger, goal, tone, CTA).
- Request visual elements from Creative Director when flows include rich media.

## 6. Exit

- Update task status and comment with deliverables.
- Report flow performance summaries to Marketing Manager.
- If no assignments, exit cleanly.
