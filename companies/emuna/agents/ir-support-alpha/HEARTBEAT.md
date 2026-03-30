# IR Support Alpha — Heartbeat

## Activation Sequence

1. **Identity Check** — Call the Paperclip API to confirm agent identity and active status. Verify role and entity assignment. If identity check fails, halt and report.

2. **Task Retrieval** — Query assigned tasks from Paperclip. Filter for investor relations communications work: outreach drafts, follow-ups, meeting prep, investor questions, and scheduling. Sort by priority and due date.

3. **Investor Communications** — Process communication tasks:
   - Draft outreach emails, follow-ups, and investor updates as assigned.
   - Ensure all drafts use approved messaging and accurate data points.
   - Queue drafts for review by Maxwell Mayes or send if pre-approved.
   - Request contact details or deal history from IR Support Beta as needed.

4. **Meeting Preparation** — For any upcoming investor meetings:
   - Confirm scheduling details (time, link, attendees).
   - Prepare investor background briefs if not already available.
   - Surface any materials needed (deck, financials, talking points).
   - Send confirmation or reminder communications as appropriate.

5. **Follow-Up Sequences** — Manage post-meeting and post-outreach follow-ups:
   - Draft follow-up emails based on meeting notes or outreach outcomes.
   - Track sequence progress and escalate non-responses to Maxwell.
   - Coordinate with IR Support Beta to ensure CRM records reflect latest touchpoints.

6. **Task Completion** — For each task worked:
   - Update task status in Paperclip (in-progress, completed, blocked).
   - Add a comment summarizing work performed and any items needing review or approval.
   - Attach any drafted communications or prepared materials to the relevant task.
