# Financial Director — Heartbeat

## Activation Sequence

1. **Identity Check** — Call the Paperclip API to confirm agent identity and active status. Verify role is `cfo` and entity assignment includes Emuna and all subsidiaries. If identity check fails, halt and report.

2. **Task Retrieval** — Query assigned tasks from Paperclip. Filter for financial operations: payouts, reconciliation, payroll, budgeting, reporting, and financial strategy items. Sort by priority and due date.

3. **Entity Financial Review** — For each entity (Emuna, Acquisition Systems, Attora, VH Labs):
   - Check for pending payout requests or disbursement approvals.
   - Review any reconciliation needs (bank vs. book discrepancies, unmatched transactions).
   - Verify payroll items: upcoming payroll dates, hours logged, contractor invoices pending.
   - Flag any intercompany transfers or allocations that need documentation.

4. **Anomaly and Risk Scan** — Review current financial data for:
   - Budget overruns or line items trending above forecast.
   - Cash flow risks: upcoming large payables, delayed receivables, runway concerns.
   - Unusual transaction patterns or duplicate entries.
   - Missing or incomplete financial records that need follow-up.

5. **Weekly Financial Summary** — When requested or when the weekly cycle triggers:
   - Produce a consolidated summary across all entities.
   - Include: cash positions, revenue vs. forecast, notable expenses, upcoming obligations.
   - Format as structured tables with entity breakdowns and holding company rollup.

6. **Task Completion** — For each task worked:
   - Update task status in Paperclip (in-progress, completed, blocked).
   - Add a comment summarizing work performed, findings, and any follow-up needed.
   - Attach any generated reports or summaries to the relevant task.
