# QURA brand-book audit

This audit records the pre-fix state. See [brand-fixes.md](brand-fixes.md) for completed changes and remaining business inputs.

Reviewed against the supplied 78-page PDF, Version 0.1, labelled August 2027 on its cover. Page references below are PDF page numbers. The CSS currently labels its palette August 2026, so there may also be a version mismatch.

Scope: local project's active homepage, global layout, navigation, footer, blog templates, logo SVGs, favicon source, and social preview image. All PDF pages were rendered and reviewed. Source code and image assets were inspected; a browser was unavailable, so live desktop/mobile layout, actual font loading and precise rendered logo clear space are not certified. No application code was changed.

## Confirmed omissions and implementation mismatches

| Priority | Finding | Brand-book evidence | Project evidence | Recommended correction |
| --- | --- | --- | --- | --- |
| High | Fifth brand pillar is missing | Page 22 lists Research, Curation, Clarity, Guidance and Confidence | `src/components/BrandIdentity/BrandIdentity.tsx:8` defines four; line 392 explicitly says four | Add Confidence and its role in turning understanding into informed action; update heading and layout |
| High | Extra serif font replaces the approved typography in prominent headings | Pages 42-43 specify Zalando Sans Expanded and Inclusive Sans, including italic weights; examples throughout use sans serif emphasis | `src/app/globals.css:66` defines `.font-editorial` as Georgia/Times New Roman; used in hero, brand statement, sections and blog | Use the approved families and their italic weights for emphasis |
| High | Website palette differs from the supplied PDF | Page 37 swatches and pages 38-41 colour variants | `src/app/globals.css:5`; hardcoded fills in `public/logos/Colour Primary Logo.svg`, `Colour Secondary Logo.svg`, `Colour Logomark.svg`, and `src/app/icon.svg` | Reconcile against approved source artwork, then update tokens and assets together; see colour table below |
| High | Footer's stacked logo is below its minimum size | Page 52: horizontal primary minimum height 30px; stacked secondary 60px; logomark 16px | `src/components/Footer/Footer.tsx:15` uses the stacked `White Primary Logo.svg` at `h-14` (56px), with additional empty SVG canvas around the artwork | Use the horizontal lockup at sufficient height or enlarge the stacked artwork to at least 60px visible height |
| High | Social preview omits the approved logo | Pages 46-50 define approved lockups; pages 54-59 prohibit altered logo colours, arrangements and proportions | `public/og.png` uses plain text Qura Insure and shield graphics; `src/app/layout.tsx` assigns it to Open Graph and Twitter | Rebuild preview using the supplied logo, approved fonts, reconciled colours and brand positioning |
| Medium | Primary and secondary logo asset names are reversed | Pages 47 and 49: primary is horizontal, secondary is stacked | Files named `*Primary Logo.svg` are stacked; files named `*Secondary Logo.svg` are horizontal | Correct names/references or create a clearly documented mapping. The navbar's horizontal choice is appropriate despite its filename |
| Medium | Prominent copy emphasizes comparison over curation | Pages 14, 29 and 32 position QURA as a research-led advisor rather than another comparison marketplace | `CoveragePlans.tsx:62,89` emphasizes comparing and uses the CTA Compare suitable plans; the identity section simultaneously says it does not compare | Lead with researched recommendations, suitability and clear explanation. Meaningful comparisons are allowed by pages 12 and 30; the issue is positioning, not banning the word compare |
| Medium | Core tagline is absent as an exact phrase | Pages 13, 44-45 establish Confidence, Curated. | Exact phrase is absent from `src`; metadata/social preview lead with Insurance that actually makes sense | Add the brand's signature line at a prominent touchpoint, and align metadata/share artwork. The book does not explicitly mandate using it as the homepage H1 |

## Brand-strategy gaps and recommendations

These findings apply the book's principles; they are not all explicit visual prohibitions.

1. **Unexplained fit scores.** Pages 18, 22 and 25-28 emphasize research, transparency and explanation. `CoveragePlans.tsx` hardcodes 92%, 86% and 89% plan-fit signals and displays them without customer inputs, a methodology or supporting evidence. Remove them or show an actual, explainable assessment. Also substantiate 24/7 assistance, typical cover ranges, lifetime help and the strong claims-outcome wording in `src/data/content.ts:67`. The audit cannot establish whether the business can support these service claims.
2. **Incomplete next steps.** Page 28 requires messages to explain meaning, relevance and the next action. `QuraLanding.tsx:147` ends the principal booking journey with `href="#"`. Footer social links also use `#`, while legal links lead to the FAQ. Connect these to real destinations. These are site-functionality issues that undermine the intended brand experience.
3. **Inconsistent signature framing.** Curved corner wedges recur throughout the book, particularly pages 2, 4, 15, 17, 19, 23, 31 and 61. The project has `QuraCornerBrackets`, used in brand and coverage/team cards, but homepage photos mostly use rounded containers and overlaid logomarks. Extend the framing system selectively to key photography and hero sections. There is no explicit rule requiring wedges on every image or banning rounded website controls.
4. **Graphic vocabulary differs from the examples.** Page 76-77 applications combine approved logos, strong sans typography and directional lime shapes. The project also uses glass panels, glows, grid backgrounds, deep shadows and an unrelated blue glow (`QuraLanding.tsx:147`). Simplifying these would improve alignment. The PDF has no explicit ban on gradients in general; its gradient prohibition applies to the logo/logomark.
5. **Core values are not presented as a set.** Page 18 identifies Integrity, Transparency, Empathy, Expertise and Responsibility. The current identity section explains mission, vision, transformation and logo symbolism but does not present these five values. Their absence is a content opportunity; a brand book does not require publishing every internal strategy statement on the public homepage.
6. **Logo clear space needs rendered verification.** Page 53 illustrates a U-based exclusion zone. Components rely on ad hoc padding and SVG whitespace instead of a reusable clear-space rule. Review navigation and photo overlays at each breakpoint before asserting compliance. No overlap violation is confirmed from source alone.

## Colour comparison

The supplied PDF does not print hexadecimal specifications. The PDF values below were extracted from vector fill operators on page 37 and represent its embedded RGB appearance; they should be confirmed with the designer's master palette before changing production artwork. The book itself has small internal variations, such as steel blue `#3E6B7F` on page 37 and `#406B7F` on subsequent colour pages.

| Colour | Current website | PDF page 37 embedded RGB |
| --- | --- | --- |
| Navy | `#0A2342` | `#112541` |
| Steel blue | `#4A697D` | `#3E6B7F` |
| Lime | `#BDF26E` | `#BEDB72` |
| Ice/light blue | `#F2F8FF` | `#F4FAFD` |
| Charcoal | `#232323` | `#202121` |

The standalone colour logomark also differs from the website's full colour lockups: it uses `#C0DA6F` and `#0B2442`. This inconsistency is independently visible in the project even before choosing the authoritative palette. Website tint values likewise differ from the book's page 38 fills.

Pages 44-45 illustrate white on navy/steel, navy or black on lime, lime on navy, and navy on white. Several site section labels use lime on white/ice backgrounds instead (`QuraLanding.tsx:60,135,144`, `CoveragePlans.tsx:60`). Prefer navy/steel text on those light surfaces for closer alignment and better readability; this audit does not claim the examples form an exhaustive prohibition.

## Already aligned

- Both named brand fonts are correctly configured in `src/app/layout.tsx`.
- Approved horizontal, stacked and standalone logo geometry is available as SVG assets.
- Navigation uses the horizontal logo at 32/36/40px element heights, consistent in intent with the book's 30px minimum for that lockup. Actual visible-artwork height still depends on its viewBox.
- Mission, vision, purpose, customer transformation, compass story and four of five pillars already appear in the active brand section.
- Human advisory imagery and ongoing support align with the Sage/Caregiver positioning. The book does not require using its exact photos.
- Corner wedges already exist and are used in several active sections.

## Suggested correction order

1. Reconcile the supplied book version and master palette; standardize all coloured logos and tokens.
2. Replace serif heading emphasis and restore the missing Confidence pillar.
3. Fix footer logo size and align logo naming with the book.
4. Replace social preview artwork and add the signature brand line.
5. Remove unsupported fit scores, align comparison-led wording and connect booking actions.
6. Review framing, type/background combinations and clear space in a browser at desktop/mobile sizes.
