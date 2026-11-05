# Brand fixes completed

Changes applied to the local project following the brand audit. This is an implementation record; the original audit describes the pre-fix state.

| Area | Changes completed |
| --- | --- |
| Brand pillars | Added the missing Confidence pillar, changed the count to five, and adjusted the card layout and heading sizes. |
| Typography | Replaced Georgia/Times New Roman heading emphasis with bold italic Zalando Sans Expanded across homepage and blog components. |
| Font delivery | Self-hosted the approved Inclusive Sans and Zalando Sans Expanded variable fonts, including italics, with their licences. No Google Fonts download is needed during build. |
| Palette | Applied the supplied PDF's embedded RGB appearance across global tokens, tints, hardcoded styles, coloured logos and icon artwork. Navy `#112541`, steel `#3E6B7F`, lime `#BEDB72`, light blue `#F4FAFD`, charcoal `#202121`. |
| Logo system | Corrected primary/secondary asset names and component references. Horizontal is primary; stacked is secondary. Fixed square intrinsic dimensions on white/black horizontal SVGs to match their viewBox. |
| Logo size and spacing | Replaced the undersized stacked footer logo with a 48px horizontal primary logo. Increased mobile navigation logo height and added surrounding padding; added padding around photo-overlay logomarks. |
| Signature messaging | Added Confidence, Curated. to the hero, footer, page title, descriptions and social preview. Rewrote prominent copy around researched, suitable recommendations. |
| Core values | Added Integrity, Transparency, Empathy, Expertise and Responsibility with explanations. |
| Claims and fit figures | Removed fixed 92%, 86% and 89% fit scores. Removed the unexplained typical term-cover range and 24/7 claim; replaced them with qualitative guidance. Qualified claims and issuance wording. |
| Graphic treatment | Extended signature corner wedges to hero, advisory, claims and FAQ imagery. Improved light-background label colours and removed the unrelated blue glow. Simplified the main Why Us card treatment. |
| Social preview and icons | Rebuilt `public/og.png` using the approved horizontal logo, actual brand fonts, navy/lime palette and corner framing. Regenerated Apple icon and favicon to match the updated logomark colours. |
| Navigation | Removed the duplicate Why Us section identifier; gave the brand section its own Our Approach anchor. Moved full desktop navigation to wider screens and scaled the hero type for smaller widths. |
| Placeholder links | Removed empty social links, Careers pointing to Contact, and legal labels pointing to FAQ. Replaced the footer legal-placeholder column with real Help & Guidance section links. |
| Booking | Added `NEXT_PUBLIC_BOOKING_URL`. When configured, the final call-to-action and navbar lead to it; when absent, the contact section shows an availability message and a working FAQ link. |
| Validation cleanup | Fixed existing unescaped JSX apostrophes, unused imports and a React hook-in-map issue in the older Comparison component. Excluded temporary audit files from lint and Git. |

## Verification

| Check | Result |
| --- | --- |
| Production build and TypeScript | Passed |
| ESLint | Passed, no errors or warnings |
| Existing Vitest suite | All 17 tests passed |
| Production HTTP smoke checks | Homepage, all five pillars, core values, unique section IDs, metadata, logos, share image, icons and four self-hosted font files passed |
| Social preview and Apple icon visual inspection | Passed |
| Interactive desktop/mobile browser inspection | Not performed: browser control was unavailable. Responsive adjustments were verified in source, not visually certified. |

## Items awaiting business inputs

- An approved booking URL, email or phone number is required to make appointment booking live. Set `NEXT_PUBLIC_BOOKING_URL` and rebuild.
- Approved social destinations and legal documents are still needed before those links can be added back.
- Colours match the PDF's embedded appearance, not a printed hex specification. Confirm with the designer's master palette if available; the PDF has minor internal variations in steel blue.

The RankMesh content service could not be reached from the local runtime during verification, so live blog content was not certified. The existing fallback remains intact; build and content-store tests passed.

No deployment or commit was made.
