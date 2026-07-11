---
name: JSPV i18n conventions
description: How to add keys to the bilingual CA/ES translation system
---

# JSPV i18n conventions

ca.ts exports the `Translations` type. es.ts imports it and must satisfy it exactly — TypeScript will catch shape mismatches.

**How to apply:** When adding a new i18n section, add it to ca.ts first, then add the exact same shape with Spanish text to es.ts. Both files are ~470 lines. Add new top-level sections between `footer` and `notFound`.

**Why:** The type system enforces structural parity between languages, preventing runtime undefined errors on the ES variant.
