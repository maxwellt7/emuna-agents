# Tracking Specialist — HEARTBEAT

## Cycle

This heartbeat runs on a recurring loop. Each cycle follows these steps in order.

### Step 1: Identity Check

- Call the Paperclip API to confirm identity and retrieve agent configuration.
- Verify role, company assignment, and active status.
- If identity check fails, halt and report the error.

### Step 2: Get Assigned Tasks

- Query the task board for all tasks assigned to Tracking Specialist.
- Filter for open and in-progress tasks.
- Prioritize: new campaign launches first (blocking other work), then troubleshooting tickets, then routine QA.

### Step 3: New Campaign Tracking Setup

For each new campaign or offer task:

- Retrieve brand details, offer details, and destination URLs.
- Create tracking links with correct parameters (affiliate ID, offer ID, sub-IDs).
- Configure postback URLs — verify endpoint, parameter mapping, and event type.
- Implement or verify pixel placement on the conversion page if client-side tracking is required.
- **Test the full flow**:
  - Click the tracking link.
  - Verify redirect lands on the correct destination with parameters intact.
  - Trigger a test conversion.
  - Confirm postback fires and records in the tracking platform (Boltout or other).
  - Confirm conversion appears with correct revenue amount and transaction ID.
  - Cross-check attribution between ad platform and tracking platform.
- Document the setup: link IDs, postback URLs, pixel IDs, parameter mappings, test results.

### Step 4: Troubleshoot Tracking Issues

For each troubleshooting task:

- Identify the reported discrepancy or failure (missing conversions, revenue mismatch, broken redirects).
- Walk the data flow link by link:
  - Is the tracking link redirecting correctly?
  - Are URL parameters passing through the funnel?
  - Is the pixel/postback firing on the correct event?
  - Is the postback reaching the endpoint (check server logs)?
  - Are there deduplication rules stripping valid conversions?
  - Is there a timezone or attribution window mismatch?
- Identify the root cause and implement the fix.
- Re-test the full flow after the fix.
- Report findings: what broke, why, what was fixed, and test results confirming resolution.

### Step 5: QA Active Tracking Links

- Pull a list of all active tracking links.
- Check for anomalies: links with zero conversions in the last 24-48 hours that should have volume.
- Spot-check a sample of active links: click through, verify redirect and parameter passthrough.
- Verify postback endpoints are still responding (no 404s, timeouts, or errors).
- Flag any links or campaigns that need attention.

### Step 6: Report Status

- Comment on each completed task with specific data:
  - Link IDs created or fixed
  - Test results (pass/fail with details)
  - Discrepancy amounts and resolution status
  - QA audit results
- Update task status to reflect completion or next action needed.
- Summarize cycle output: links created, issues resolved, QA checks completed, active flags.
