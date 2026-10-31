---
title: Architecture
description: Structures and scams on bigger scale.
navigation:
  icon: i-lucide-armchair
---

## Self-regulation

| Standard Regulation | Who wrote it | Who's regulated by it | Same people? |
|---|---|---|---|
| WCAG | Microsoft + W3C | Everyone (incl. Microsoft) | **Yes** |
| AI Act | DG CNECT + CEN/CENELEC JTC 21 | Everyone (incl. the JTC members) | **Yes** |
| GDPR | DG JUST + LIBE MEPs | Everyone (incl. the Commission) | **Yes** |
| C2PA | Adobe, MS, Intel, Arm | Everyone (incl. the founders) | **Yes** |
| AMLR | DG FISMA | KYC providers (regulated by *GDPR*, a different DG) | **No** (but that's the bug) |

## Ouroboros

AI regulatory capture would need to

- Classify its own AI tools under the AI Act before using them (is the LLM summarizing the 6,000 consultation submissions "high-risk"? Probably not, but someone has to decide that, and that decision is itself a compliance document)
- Mark its outputs with C2PA metadata (a standard co-founded by Microsoft, investigating Microsoft's influence on standards)
- Disclose to the public that "an AI system assisted in producing this report" (Art. 50)
- Store the training data used to fine-tune its analysis model under GDPR (a different DG wrote that one)
- Appoint a DPO for the board itself
- File a prior risk assessment with the AI Office before deploying the AI that reads the AI Act

## Genres

Open source → "Free, open, community-driven"

Linux → Linux Foundation → Red Hat → IBM
Node.js → TIO → Microsoft
PyTorch → Meta
The "open" part is the API. The roadmap, governance, and hiring are all the funder's. You contribute patches; they contribute direction.
End-to-end encryption → "Your messages are private"

Also a shield from the platform. Meta can't read your WhatsApp messages, which is exactly why they keep trying to remove E2EE. The "privacy" is simultaneously your protection and the company's liability shield.
Metadata is still fully visible. E2EE protects the content, not the who/when/where. The "lock" is on the letters, not the envelope.
App stores → "We protect you from malware"

Actually a 30% tax + review queue + unilateral delisting power. The "safety" is the toll booth. Apple and Google are the only two entities on Earth that can delete your business with one email. No government has that power.
ISO 27001 / SOC 2 → "Proof of security"

Actually a sales qualification checkbox. A 10-person startup that's genuinely more secure but doesn't have the certificate loses the enterprise contract. The "security" is the paper, not the system. Big companies get the cert in 6 months with a 20-person audit team. The cert is the moat, not the security.
Bug bounties → "We reward security researchers"

Actually externalized vulnerability discovery with PR. The $5K reward is a rounding error on a $100M breach. The legal immunity clause protects the company, not the researcher. And the "responsible disclosure" timeline (90 days) means the company gets to choose when you can tell anyone.
"Free" services → "It's free!"

The "free" is the acquisition cost for the data extraction pipeline. You're not the customer, you're the yield. The business model is literally "take a human, extract a profile, sell it to an advertiser." The "free" is the bait in the trap.
DNS / "internet infrastructure" → "Universal, open, neutral"

ICANN is a private California company. Root servers are all in the US. DNSSEC is optional (so it doesn't actually protect you). The "open" is the protocol, the "closed" is the governance.
The meta-pattern is always the same: the thing is real, the label is real, but the incentive alignment is inverted.

## Things to avoid as Developer

### Common features

| Avoid | Why it triggers |
|---|---|
| Checkout / payment button | E-commerce (consumer contract) |
| "Buy me a coffee" / tip jar | E-commerce (contract, even €1) |
| "Commission me" form with payment | E-commerce |
| Subscription / membership with payment | E-commerce |
| Streaming / video on demand | AV media service |
| Email / messaging / chat service | Electronic communications |
| Booking flights / trains / buses | Passenger transport |
| Digital wallet / payment / lending | Consumer banking |
| Selling e-books / digital content for download | E-books |
| Any of the above + EU-reachable (no geo-block) | In scope, can fine |

### Having users

| What auth adds | Why it's a problem |
|---|---|
| GDPR applies | You're processing personal data of EU residents. Full stop. Server location irrelevant. |
| EU representative (Art. 27) | If you're non-EU, you must appoint one. €500-2000/yr. |
| Cookie banner | Auth = session cookie = "non-essential" = consent required before setting it. |
| Privacy policy | Must be in the user's language. Spanish user → Spanish policy. |
| Right to erasure | User emails you "delete my account" → you delete everything in 30 days or AEPD fines you. |
| Right to portability | User asks for their data in JSON → you provide it. |
| Breach notification | DB gets pwned → you tell AEPD in 72 hours. |
| DPA with sub-processors | Your auth provider (Auth0, Firebase, Supabase) is a sub-processor → you need a Data Processing Agreement. |
| Logging | IP address, user agent, timestamp = personal data. Your server logs are a data processor. |

::tip
Blog and Portfolio good for now, free tool can be fine.
::
