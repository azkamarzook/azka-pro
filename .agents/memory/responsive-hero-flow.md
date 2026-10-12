---
name: Responsive hero flow
description: Avoid parent layout causing full-width hero content to compress and overflow.
---

For hero sections with a main content row plus a separate connection or summary board, keep the main row and board as vertical siblings using normal block flow or explicit column flex. A default row flex parent can compress two full-width children and cause clipping at desktop and mobile widths.

**Why:** The portfolio preview clipped its heading and pushed cards offscreen even though the production build passed; desktop and mobile screenshots exposed the parent-level layout mismatch.

**How to apply:** If text and cards remain clipped after adjusting child widths, inspect the parent display and flex direction, then verify with screenshots at desktop and phone sizes.
