---
name: JSPV team page — no "areas"
description: Content/design rule for the team (Equip) page — JSPV has no organizational "areas".
---

# JSPV team page has NO "areas"

JSPV does not organize its executive into "areas" (àrees / áreas). The team page (`Equip.tsx`)
must NOT group members by area, render area labels/badges, or use area wording in visible copy
(hero subtitle, stats, SEO description, member bios).

Only the **Secretary General** is featured separately (distinct hero card); every other member
is an equal plain white square tile in one flat grid. Clicking a tile slides a red panel up to
reveal the bio.

**Why:** The user explicitly stated multiple times "no tenemos áreas en JSPV" and asked for a
flat, collective presentation. This reflects the organization's self-image.

**How to apply:** The `ExecutiveMember.area` field still exists in `content.ts` and stale i18n
keys (`statsAreas`, `nucliTitle`, `otherAreas`, `executiveAreas`) still exist in ca.ts/es.ts —
these are dead/legacy and must NOT be reintroduced into the rendered team page. Do not trust the
presence of `area` metadata as a signal to group by area.
