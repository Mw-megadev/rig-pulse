# 0003 · Previews are public and short-lived

- Status: accepted · 2026-10-21

## Context

Reviewers don't have lane access, so a page is reviewed from a copy. The status board's
preview went to a public link on 19 October and was still up on 21 October, lane data and
all. Nobody had removed it, because removing it was nobody's issue.

## Decision

- A preview is a static copy of the page (one HTML file) on a public host behind a public HTTPS link. Any bucket and
  any CLI will do, as long as the link is a real host (not an IP, not localhost) and we can delete it.
- Every preview is deleted once its review is in, and the plan has an issue for that.
- No previews in the repo, in issues, or in chat attachments: those can't be taken down.

## Consequences

- Each plan that ends in a review carries a clean-up step.
- A link that still resolves after the plan is done is a bug.
