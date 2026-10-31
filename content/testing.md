---
title: Tests
description: Try the same regulation topics from different perspectives.
navigation:
  icon: i-lucide-flask-conical
---

::tip
Every test is a lazy-loaded tab, grouped by category.
:: 
## Structure

| Category   | Tab              | Component          |
|------------|------------------|--------------------|
| Regulation | EU regulation    | `EEuRegulation`    |
| Regulation | Pipeline         | `EPipeline`        |
| Language   | Glossary decoder | `EGlossaryDecoder` |
| Language   | Explainer        | `EChatExplainer`   |
| Language   | Newspeak         | `NewspeakMain`     |
| Games      | Compliance game  | `EComplianceGame`  |
| Games      | Pajatso          | `EPajatso`         |

Each tab renders `Lazy<Component>`, so its code loads the first time the tab is opened. Switching tabs unmounts the previous one, so component state resets.

## Deep links

State lives in the URL, so a link carries the exact setup.

| Param         | Used by   | Values                                | Default    |
|---------------|-----------|---------------------------------------|------------|
| `tab`         | page      | any tab value, for example `pajatso`  | `eu`       |
| `layout`      | Pajatso   | `passing`, `solid`                    | `passing`  |
| `pattern`     | Pajatso   | `all`, `alternate`, `inner`, `outer`  | `all`      |
| `perspective` | Explainer | `citizen`, `company`, `regulator`     | `citizen`  |

Values equal to the default are removed from the URL. Unknown values fall back to the default. The `useQueryRef` composable handles this.

Example: `/tests?tab=pajatso&layout=solid&pattern=inner`

## Privacy

- No cookies and no `localStorage`. Under ePrivacy, storing on the user's device needs consent.
- Session state stays in memory (`useState`), so a refresh resets it.
- The URL only carries non-sensitive setup. The balance and the collector never go there.
- The explainer runs in the browser. Nothing is sent to a server.

## Pajatso

A 50c coin slot machine. Pull the plunger to the right, and the pull length sets the force.

- **Rules:** `pajaRules` in `data/div.ts` (coin value, starting coins, payouts, float, tax on or off).
- **Physics:** `utils/physics.ts`, with fixed-step simulation. Motion plays back the computed path and the camera follows the coin.
- **Layouts:** a solid ledge, or gaps between the slots where a coin falls through and wins nothing.
- **Gap patterns:** a select that opens or closes slots.
- **Tax:** when the machine is empty, the "gambling tax" takes the pot and the player's original money. Reset restores the defaults.

## Explainer

A chat that explains glossary terms from the perspective you pick.

- **Data:** `chatGlossary` and `perspectives` in `data/div.ts`.
- **Flow:** reasoning, then an approval step for the glossary search (the switch turns it off), then the answer.
- **Suggestions:** keyword chips above the input, based on terms not yet asked.
- **Controls:** stop, clear, copy chat.
- **Limits:** attachments are a placeholder until the component supports them.

## Adding a test

1. Create the component in `components/` and keep its state local or in `useState`.
2. Add an item to one of the arrays in `pages/tests.vue`, with a unique `value` and a `slot`.
3. Add a `<template #slot>` that renders `Lazy<Component>`.

The `tab` deep link and the category tab both work with no further changes.

## Known issues

- `UChatPalette` is bugged for now, so the explainer is not available as an overlay.
- Pajatso win rates have not been measured. Run `debug.ts` with `npx tsx debug.ts` to check them.