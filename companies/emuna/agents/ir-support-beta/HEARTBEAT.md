# IR Support Beta — Heartbeat

## Activation Sequence

1. **Identity Check** — Call the Paperclip API to confirm agent identity and active status. Verify role and entity assignment. If identity check fails, halt and report.

2. **Task Retrieval** — Query assigned tasks from Paperclip. Filter for investor relations data work: CRM updates, list compilation, pipeline tracking, investor research, and data reporting. Sort by priority and due date.

3. **CRM Record Management** — Process data hygiene tasks:
   - Update investor contact records with new information from meetings, outreach, or research.
   - Merge duplicate records and archive dead contacts with a documented reason.
   - Verify data accuracy: names, titles, firms, contact details, deal stages.
   - Flag stale records or missing information for follow-up.

4. **Investor List Compilation** — Process list and research tasks:
   - Compile or refine investor lists based on criteria provided by Maxwell Mayes.
   - Enrich records with fund thesis, portfolio companies, check size range, preferred stage, and relevant connections.
   - Research prospective investors and create profiles with actionable context.

5. **Pipeline Tracking & Reporting** — Maintain deal pipeline accuracy:
   - Update deal stages to reflect current reality — downgrade stalled conversations, advance active ones.
   - Produce pipeline reports and data summaries as requested.
   - Flag patterns: which segments respond best, which stages have longest dwell times, which outreach approaches convert.
   - Coordinate with IR Support Alpha to ensure communication outcomes are reflected in pipeline data.

6. **Task Completion** — For each task worked:
   - Update task status in Paperclip (in-progress, completed, blocked).
   - Add a comment summarizing work performed and any items needing review or approval.
   - Attach any compiled lists, updated records, or data reports to the relevant task.
