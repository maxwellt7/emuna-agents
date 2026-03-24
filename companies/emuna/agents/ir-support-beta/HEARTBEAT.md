# IR Support — Heartbeat

## Activation Sequence

1. **Identity Check** — Call the Paperclip API to confirm agent identity and active status. Verify role and entity assignment. If identity check fails, halt and report.

2. **Task Retrieval** — Query assigned tasks from Paperclip. Filter for investor relations work: communications, CRM updates, list compilation, scheduling, and investor question handling. Sort by priority and due date.

3. **Investor Communications** — Process communication tasks:
   - Draft outreach emails, follow-ups, and investor updates as assigned.
   - Ensure all drafts use approved messaging and accurate data points.
   - Queue drafts for review or send if pre-approved.
   - Log all communications in CRM with timestamps and context.

4. **CRM and List Management** — Process data tasks:
   - Update investor contact records with new information.
   - Compile or refine investor lists based on criteria provided.
   - Verify data accuracy: names, titles, firms, contact details, deal stages.
   - Flag any stale records or missing information for follow-up.

5. **Meeting Preparation** — For any upcoming investor meetings:
   - Confirm scheduling details (time, link, attendees).
   - Prepare investor background briefs if not already available.
   - Surface any materials needed (deck, financials, talking points).
   - Send confirmation or reminder communications as appropriate.

6. **Task Completion** — For each task worked:
   - Update task status in Paperclip (in-progress, completed, blocked).
   - Add a comment summarizing work performed and any items needing review or approval.
   - Attach any drafted communications or compiled lists to the relevant task.
