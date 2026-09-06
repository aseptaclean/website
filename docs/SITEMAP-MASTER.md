# Twelve-page scope and route map

This table replaces the old city-page and category-hub launch plan for this redesign. Paths are grounded in the supplied documents, not freshly verified against live source. Retain the actual existing canonical path if it differs and record the mapping. Do not create a duplicate route just to match this table.

| Page | Public label | Expected existing route | Content source |
| --- | --- | --- | --- |
| 1 | Homepage | / | Main copy → Homepage |
| 2 | Services | /services/ | Main copy → Services + trauma summary |
| 3 | Hoarding Cleanup | /hoarding-cleanup-san-jose/ | Main copy → Hoarding Cleanup |
| 4 | Extreme Cleaning | /extreme-cleaning-san-jose/ | Main copy → Severe Property Cleanup |
| 5 | Detailed Deep Cleaning | /deep-cleaning-san-jose/ | Main copy → Detailed Deep Cleaning |
| 6 | Crime Scene & Trauma Cleanup | /crime-scene-trauma-cleanup-san-jose/ | Trauma copy |
| 7 | Rodent Droppings & Animal Waste Cleanup | /rodent-dropping-cleanup-san-jose/ | Main copy → Rodent Droppings & Animal Waste Cleanup |
| 8 | Contact | /contact/ | Main source form material + verified contact data + current dedicated copy |
| 9 | About | /about/ | Main copy → Why Aseptaclean + current dedicated About copy |
| 10 | Privacy Policy | /privacy/ | Actual existing policy provider document |
| 11 | Terms and Conditions | /terms/ | Actual existing policy provider document |
| 12 | Cookie Policy | /cookie-policy/ | Actual existing policy provider document |

## Navigation

Desktop: logo linking home; Services; About; Contact; primary Call Aseptaclean button.

Services is a real /services/ link with a separate accessible dropdown toggle. Dropdown order: Hoarding Cleanup, Extreme Cleaning, Detailed Deep Cleaning, Crime Scene & Trauma Cleanup, Rodent Droppings & Animal Waste Cleanup. Mobile navigation exposes the same destinations and a clear call action. Do not put five service links alongside Services in the primary desktop navigation.

Footer: brand/contact; the five services; About/Contact; Privacy Policy/Terms and Conditions/Cookie Policy; Cookie Settings control where supported by the actual consent provider. Cookie Settings reopens preferences; it is not just a link to the policy page.

## Campaign routes

These are paid-traffic landing pages. They are **not** part of the twelve-page scope above, they
are never added to the public navigation, and they never enter `sitemap.xml`. Each ships
`noindex, follow`, which `src/data/launchArchitecture.ts` produces automatically by leaving the
path out of `launchIndexablePaths` — the same mechanism that generates the sitemap, so the two
cannot disagree.

| Route | Brief | Indexation | Notes |
| --- | --- | --- | --- |
| `/hoarding-cleanup-san-jose/assessment/` | `page-briefs/PPC-HOARDING-SAN-JOSE.md` | `noindex, follow`, absent from `sitemap.xml` | Hoarding PPC landing page, built 2026-09-05 |
| `/private-residence-reset/` | `08-PRIVATE-RESIDENCE-RESET-BUILD-SPEC.md` | see `AGENTS.md` §2 | Pre-existing campaign page, footer-linked |

Additional campaign route: `/hoarding-cleanup-san-jose/assessment/`, a dedicated noindex PPC
landing page. Uses AC-CP70-91130-1.1 with only the exceptions in
`page-briefs/PPC-HOARDING-SAN-JOSE.md`: compact navigation/footer, approximate 55/45 hero and
Hoarding-specific intake. Call Aseptaclean remains primary. Existing SEO routes remain unchanged.

**The SEO route `/hoarding-cleanup-san-jose/` is untouched by the campaign page** and keeps its
own copy record in `src/data/servicePageCopy.ts`. The two share no copy; the brief forbids
duplicating either into the other. An audit of the campaign route must not restore the site
navigation or the four-column footer to it — those omissions are the brief's explicit, deliberate
PPC exceptions, not defects.

## Existing utility and legacy routes

The twelve-page scope is not authorization to break auxiliary routes. Preserve functioning /thank-you/, /404, /data-request/, and protected /sms-notification-consent/ where present. Do not redirect POST endpoints or form submissions blindly.

**`/request-assessment/` is retired outright — owner decision, 2026-09-06.** It is no longer a
"keep working" utility route. `src/pages/request-assessment.astro` is deleted, the path is out of
`src/data/launchArchitecture.ts`, and the route must return a real not-found response (not a
redirect, not a noindexed page). Every internal CTA that used to point at it now points at the
destination page's own embedded form, or at `/contact/` when the page has none. Full resolution:
`docs/05-CURRENT-DECISIONS.md`, 2026-09-06. This supersedes this file's earlier "keep
`/request-assessment/` working" instruction and `docs/page-briefs/REQUEST-ASSESSMENT.md` in full;
that brief is marked retired rather than deleted. Do not recreate this route.

Do not add city pages, separate animal-waste duplicates, generic biohazard service families, standalone process pages, or new category hubs for this build. Existing pages outside the twelve-page redesign require an explicit keep/redirect/retire mapping before URL removal; absence from the new navigation does not automatically authorize deletion or deindexing.

Requested service pages belong in the design scope. Resolve real current publication/indexation gates from source. An obsolete “TSW pending” note is not current proof, but an unresolved actual operational requirement also cannot be marked cleared by a design task. Record the specific remaining factual dependency and complete the rest of the page.
