# Dynamic Consent Demo — Final Boss Technology

This repository demonstrates a dynamic consent mechanism for synthetic media policy enforcement. The demo uses a simple front‑end to simulate viral‑threshold updates and verify requests against evolving policies.

## Overview

In a world where AI‑generated content can go viral in seconds, content governance needs to adapt in real‑time. This demo illustrates how a policy can expand to include new use cases (like `news-reporting`) when a media item crosses a viral threshold, and how verification queries return both a boolean `allowed` indicator and a `policyCommitment` that can be checked on‑chain.

## Usage

1. **Simulate a viral spike:** Click **Simulate Viral Spike** to increment the media views beyond the viral threshold. The policy will expand to allow `news-reporting` in addition to the base use cases.
2. **Enter request details:** Select a **Use Case** (e.g. marketing, research or news‑reporting) and **Region** (US, EU or ROW).
3. **Verify the request:** Click **Verify** to evaluate whether the request is allowed. The output shows:
   - `allowed`: `true` if the request meets use‑case, region and status criteria.
   - `policyCommitment`: a demo value representing a commitment hash for the current policy.
   - Evaluation details such as current views and the viral threshold.
4. **Optional actions:** Use **Reset** to restore the demo to its initial state or **Revoke** to simulate revoking consent.

All logic runs client‑side for demonstration purposes; no API keys or backend services are required.

## Patent Notice

**US Patent Application 19/240,581 (pending)** – “Blockchain‑Based Dynamic Consent Management for Synthetic Media.” This demo is provided for evaluation only and does not constitute legal advice.

## License

© Final Boss Technology. All rights reserved. Use of this repository is subject to the repository license.
