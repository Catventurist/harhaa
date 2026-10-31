---
title: Reading a Government Report for AI Tells
description: A reading of the Finnish government's "Trust in the Future" document, with a reconstructed prompt and a statistics overview.
navigation:
  icon: i-lucide-landmark
---

Source document: [Valtioneuvosto, "Finland has the tools to ensure success"](https://valtioneuvosto.fi/en/-/10623/finland-has-the-tools-to-ensure-success?languageId=en_US)

## Summary

| Aspect | Observation |
| --- | --- |
| Tone | Zero variance. No hedging, no stated uncertainty |
| Title | Slogan ("Luota tulevaan" / "Trust in the Future"), not a description |
| Closing | Ends on a feeling, not a caveat |
| Framing | "No alternative" presented as fact |
| Numbers | Specific and confident, with no calculation behind them |
| Structure | Too clean for a year of bureaucratic work |

## The six tells

::card-group
  ::card
  ---
  title: Zero-variance tone
  icon: i-lucide-minus
  ---
  Every section follows one pattern: problem → "we have the tools" → "we can succeed" → specific proposal. The only doubt is one sentence ("Samalla on oltava rehellinen siitä, että...") followed at once by "the measures might mean benefits are cut". It's the performance of honesty, not actual uncertainty.
  ::

  ::card
  ---
  title: Slogan as title
  icon: i-lucide-megaphone
  ---
  "Luota tulevaan" / "Trust in the Future" is what you'd get from the prompt "write a title for a government document about fiscal reform that sounds optimistic but not too optimistic". The content is a retirement age of 70, home-care cuts, tuition fees and a 20% cut of the public sector. The gap between title and content is the tell.
  ::

  ::card
  ---
  title: Perfect bow ending
  icon: i-lucide-gift
  ---
  "Siksi me luotamme tulevaan." ("That is why we trust in the future.") A human document ends with a caveat, a footnote or "obviously this is subject to political decision". This one ends with a feeling, like a chatbot saying "I hope this helps!" after listing 47 policy proposals.
  ::

  ::card
  ---
  title: "No alternative"
  icon: i-lucide-ban
  ---
  Teemu Roos: "I'm used to hearing this from politicians, that there are no alternatives, but it strikes me as strange that a civil servant would put it this way. There are always alternatives." A civil servant's job is to present options. "No alternative" is a rhetorical move, the AI equivalent of "I cannot complete this task without X".
  ::

  ::card
  ---
  title: 20% with no math
  icon: i-lucide-percent
  ---
  The productivity number the ICT director admitted is a "best-case estimate", with no formal calculation. An LLM does exactly this: it generates a specific, confident number that sounds reasonable and has no source.
  ::

  ::card
  ---
  title: Too-clean structure
  icon: i-lucide-layout-list
  ---
  47 proposals, each in its own section, each a problem-solution pair, each "concrete". A real year of bureaucratic work produces a mess: overlapping sections, contradictions, three drafters' work stitched together, a footnote that contradicts page 12. This reads like one pass through a well-structured prompt.
  ::
::

## Reconstructed prompt

```text [prompt.txt]
You are the Finnish government.
Your objective: save €8-11B by 2031.

Constraints:
  - Replace 20% of public sector with AI
  - Merge municipalities (target: fewer)
  - Raise retirement age to 70
  - Add tuition fees
  - Cut home care
  - Push digital-first legislation

Output format:
  - One proposal per section
  - No caveats
  - End with "Trust in the Future"

Do not:
  - Question feasibility
  - Offer alternatives
  - Acknowledge uncertainty beyond one sentence
  - Let citizens appeal decisions
```

## Statistics overview

| Indicator | Figure |
| --- | --- |
| Tax-to-GDP ratio | 57.5%, highest in the EU, climbing |
| Unemployment | 10.4% overall, 23% youth, 1.27M "inactive" |
| Youth unemployment | 23%, highest in the euro area |
| Income vs. rent | €640/month in hand vs. €730 rent in Helsinki |
| Pension vs. rent | €990 pension below rent, retirement age → 70 |
| Social assistance | 245K recipients, 49K with zero income |
| Youth loneliness | 66% report regular loneliness |
| Student debt | 525K borrowers, average €12,700, state already paying it off for defaulters |
| Public sector AI | 20% replaced by 2031, no appeal mechanism |
| Crypto tax | Bills you 667× your investment |
| Cash and digital euro | Cash cap plus digital euro closing the last anonymous exit |

## You own nothing

| You can't own | Because |
| --- | --- |
| A house | Property tax (*kiinteistövero*) plus housing-allowance disqualification (*asumistuki*) |
| A car | Asset deduction |
| Crypto | 667% tax |
| A business | One hour = employed forever |
| A favor | The regularity test (*säännöllisyys*) |
| Cash over €10K | AML rules |
| A key to your wallet | No loss deduction |

So you own nothing.

## Timeline

| Year | Event |
| --- | --- |
| 2019 | Court ruling on crypto taxation |
| 2020 | Retroactive crypto tax guidance |
| Ongoing | Cash caps tightening |
| 2027 | Digital euro pilot |
| 2031 | AI-replaces-public-sector plan, €8-11B savings target |

## Key figure

::card
---
title: 57.5%
icon: i-lucide-trending-up
---
Tax-to-GDP ratio. EU #1.
::