---
name: JSPV opengraph.jpg is a real homepage screenshot
description: The jspv social-share image is a rendered homepage screenshot that the platform restores; don't expect custom OG art to persist.
---

`artifacts/jspv/public/opengraph.jpg` is a real, rendered screenshot of the live homepage hero (1280x720), not a grey placeholder.

**Why:** When I replaced it with a custom branded graphic, a checkpoint/platform restore reverted `public/opengraph.jpg` back to the committed homepage-screenshot version within the same session. The screenshot is already a strong, representative social-share image, so it's the intended OG asset.

**How to apply:** Treat `public/opengraph.jpg` as platform-managed. Don't swap it for bespoke art expecting it to stick; if a different OG image is truly needed, confirm the change survives a checkpoint before relying on it.
