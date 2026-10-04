# FindIt — Decisions

## Product decision
FindIt focuses on one practical campus problem: helping students recover lost items. The primary flow is **report → discover → smart match → verify → recover**.

## USP / matching decision
The main differentiator is an explainable rule-based matching engine. A possible match receives points from category (35), location (30), date proximity (20 max), and description word overlap (15 max). The score is deliberately transparent so it can be explained in an interview rather than presented as an unexplained AI prediction.

## State and storage
This is an interview-ready local prototype, so browser `localStorage` is used instead of a remote backend. This keeps the demo self-contained and reliable without API keys. In production, reports, authentication and permissions should move to a backend such as Supabase/Firebase.

## Safe handover
Instead of exposing another student's contact information as the primary action, the prototype includes a verification-request flow where a claimant provides a private identifying detail before arranging a handover.

## Analytics decision
Campus Pulse uses the same report data to show location hotspots, report mix and recovery statistics. The map is intentionally a lightweight campus visualization rather than a dependency on a paid maps API.

## UI decision
The interface uses reusable React components and plain CSS. Dark/light mode, responsive layouts, modals, cards, empty states, validation feedback and toast notifications are implemented without a UI library.

## Error handling
The report form validates required fields, description length, image type and image size. Search/filter empty states and destructive-action confirmations are also handled.
