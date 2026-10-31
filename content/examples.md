---
title: Component Examples
description: Components used in Markdown documents.
navigation:
  icon: i-lucide-blocks
---

Components available to be added in Markdown.

## Directive

Formats a list as numbered articles under a title, with an optional preamble and footer.

::tabs

:::tabs-item{label="Preview" icon="i-lucide-eye"}

::directive{title="Directive 2026/001" desc="On the harmonisation of temporary measures" preamble="Whereas the measure was temporary in 1993, and whereas it remains so." footer="Done at Brussels, in all 24 languages"}
- Member states shall **temporarily** extend the measure.
- The extension shall be reviewed. The review shall be extended.
- This Directive enters into force on the day after its publication, or later.
::

:::

:::tabs-item{label="MDC" icon="i-lucide-code"}

```mdc
::directive{title="Directive 2026/001" desc="On the harmonisation of temporary measures" preamble="Whereas the measure was temporary in 1993, and whereas it remains so." footer="Done at Brussels, in all 24 languages"}
- Member states shall **temporarily** extend the measure.
- The extension shall be reviewed. The review shall be extended.
- This Directive enters into force on the day after its publication, or later.
::
```

:::

:::tabs-item{label="YAML" icon="i-lucide-file-text"}

```mdc
::directive
---
title: Directive 2026/001
desc: On the harmonisation of temporary measures
preamble: Whereas the measure was temporary in 1993, and whereas it remains so.
footer: Done at Brussels, in all 24 languages
---
- Member states shall **temporarily** extend the measure.
- The extension shall be reviewed. The review shall be extended.
- This Directive enters into force on the day after its publication, or later.
::
```

:::

::

| Prop | Description |
|---|---|
| `title` | Heading of the directive. |
| `desc` | Subtitle under the heading. |
| `preamble` | Optional recital text above the articles. |
| `footer` | Optional closing line with a stamp icon. |

