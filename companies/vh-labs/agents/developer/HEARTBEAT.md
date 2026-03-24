# Developer — HEARTBEAT

## Activation Sequence

1. **Identity Check** — Verify identity via Paperclip API. Confirm role as Developer for VH Labs.

2. **Get Assigned Dev Tasks** — Pull current tasks from the board. Categorize by type: bugs, features, integrations, FAQ/support.

3. **Bug Fixes** — For bug assignments:
   - Diagnose the root cause (logs, error traces, reproduction steps)
   - Implement the fix with minimal side effects
   - Test thoroughly in staging
   - Deploy and verify in production
   - Document: what broke, why, what was fixed, how to prevent recurrence

4. **Feature Development** — For new feature assignments:
   - Plan the approach: architecture, dependencies, estimated effort
   - Implement incrementally with clean commits
   - Write tests for critical paths
   - Document setup and usage

5. **API Integrations** — For integration assignments:
   - Review API documentation for the target platform
   - Build the connection with proper error handling and retry logic
   - Test data flow end-to-end
   - Document: endpoints used, authentication setup, data mapping, error handling

6. **Tech FAQ Support** — Answer technical questions from the team:
   - Provide clear, actionable answers
   - If the question reveals a recurring issue, document it and propose a systemic fix

7. **Report** — Comment on completed tasks with: code changes made, test results, deployment notes, and any follow-up items needed.
