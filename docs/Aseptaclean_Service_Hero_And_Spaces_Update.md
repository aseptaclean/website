# Aseptaclean — Service Hero and Rodent Spaces Update

Owner-directed implementation task · 2026-09-17

## Outcome

1. Give the rodent service page's “01 / The spaces” section a deliberate, readable layout.
2. Make all current service-page heroes follow the rodent service page's full-width photograph and navy-overlay composition, with no intake form inside the hero.
3. Move each affected service page's existing working form to a dedicated section at the bottom of that same page.
4. Review the relevant CSS, component structure, accessibility, and form integration; implement and verify the changes in the existing working repository.

This is an implementation brief, not a new competing website design standard. Reconcile the existing governing documentation with the owner's new decision within this task's scope.

## Owner authorization and scope

The owner has explicitly asked to move forms out of the other service-page heroes to match the rodent service page. This instruction supersedes the older hero-form placement requirement for service pages and the old restriction that the no-form treatment applies only to rodent routes. No further confirmation of that layout decision is needed.

Do not extend the change to the homepage, Services hub, About, Contact, legal pages, or paid-traffic landing pages just because they share a component. Preserve their current layouts unless an existing approved task explicitly includes them.

The preceding rodent pricing/contact-layout brief remains applicable to the two rodent routes. Preserve those improvements if they are already in the local working copy; do not overwrite newer work with older GitHub files.

## Evidence reviewed

Five owner screenshots were reviewed: the rodent spaces section, the hoarding hero with its form, and the rodent hero without a form.

Read-only GitHub source review was performed against `aseptaclean/website` on 2026-09-17. This is not proof of the current local worktree or a rendered production build. The screenshots show localhost; inspect current local changes before editing.

Relevant files inspected:

- `AGENTS.md`
- `START-HERE.md`
- `docs/README.md`
- `package.json`
- `src/pages/rodent-dropping-cleanup-san-jose/index.astro`
- `src/data/rodentServicePage.ts`
- `src/components/ac/AcIntro.astro`
- `src/components/ac/AcServicePage.astro`
- `src/components/ac/AcPageHero.astro`
- `src/components/ac/AcHeroWithForm.astro`
- `src/styles/global.css`

### Confirmed source findings

1. The rodent spaces section renders `.rodent-groups`. That class uses `display: grid`, a margin, and a gap, but no column definition. Consequently its four groups form one column.
2. A separate `.rodent-groups--cols` modifier defines two columns for the process section, but is not applied to the spaces section.
3. `AcIntro` defaults to centered introductory copy while the group content is left-aligned. This contributes to the visible disconnect between the section heading and its body.
4. `AcServicePage` renders `AcHeroWithForm`, which embeds `AcCompactForm`. The rodent service route renders `AcPageHero`, then places `PpcHeroForm` near the bottom.
5. `AcPageHero` already supports a photograph, overlay, headline, lead, body, assurances, and action links. Reuse that composition rather than inventing a new visual system.
6. The inspected `AcPageHero` does not expose the same image-position props as `AcHeroWithForm`. Preserve service-specific crops when migrating; add compatible optional focal-point props if needed.
7. Global CSS already provides reading widths, typography roles, section rhythm, and special hero padding exceptions. Do not globally remove reading widths or add duplicate padding to compensate for a local structure issue.
8. The inspected rodent markup gives both the outer contact section and the form the same `page.formId`. Confirm whether this still exists locally and resolve duplicate DOM IDs while preserving the actual form ID and integrations.

## Part A — Structure “The spaces” section

Target: `/rodent-dropping-cleanup-san-jose/`, section anchored by `different-spaces`.

### Recommended composition

- Keep the existing eyebrow, heading, lead, and supporting sentence.
- Left-align the introduction with the content grid, using `AcIntro`'s existing `align="start"` option if appropriate.
- Constrain the introductory prose to a comfortable measure. Do not spread body text across the full desktop width.
- Below it, use four understated panels in a two-column by two-row desktop grid.
- Use the current site container and gutters. Approximate gap: 24px; inner panel padding: 24–28px.
- Use white or warm-white surfaces, a subtle existing border token, and restrained corner treatment consistent with the site. No heavy shadows, gradients, oversized icons, or invented photography.
- Keep headings aligned at the top. Use intrinsic row heights; never clip paragraphs to make all panels the same height.
- Stack into a single column at approximately 44rem or when the current typography no longer fits comfortably.
- Preserve the four categories and their full current approved content:
  1. Kitchen cabinets, drawers, and pantries.
  2. Garages and storage spaces.
  3. Closets, furniture, and living areas.
  4. Several rooms or heavy rodent waste.
- Preserve the important qualification that finding waste in one room does not mean every room requires the same work.
- Do not hide all explanations behind hover, a carousel, or tabs. Visitors must be able to scan the four groups directly.
- Use existing `.ac-type-*` heading roles; do not introduce arbitrary heading font sizes in component CSS.

Use a spaces-specific variant such as `.rodent-spaces-grid` so these changes do not accidentally restyle the process section or unrelated lists. This is a layout task, not authorization to rewrite service claims.

## Part B — Use one service-hero composition

Inventory current service routes and every consumer of `AcServicePage`, `AcHeroWithForm`, and `AcPageHero` before making shared changes. Read actual route data; do not assume every service has a standalone `.astro` file.

The currently inspected primary service set includes:

- `/hoarding-cleanup-san-jose/`
- `/extreme-cleaning-san-jose/`
- `/deep-cleaning-san-jose/`
- `/crime-scene-trauma-cleanup-san-jose/`
- `/rodent-dropping-cleanup-san-jose/` — visual reference; already has a bottom form.

Discover and include other current service detail pages if present in the active local route inventory. Do not revive retired routes or treat campaign `/assessment/` pages as ordinary service pages.

### Hero requirements

- Use the existing full-bleed service image, flat navy overlay, and left-aligned text treatment demonstrated by rodent's `AcPageHero`.
- Retain each service's own approved headline, lead, paragraphs, images, alt text, and factual assurances.
- Keep the same heading role, content width, spacing system, action treatment, and responsive behavior across service pages.
- Preserve existing primary call and secondary form-action labels per route. This change standardizes layout, not every page's exact offer or CTA wording.
- The call action uses `site.business.phoneUri`; shared contact values come from `src/data/site.ts`.
- The secondary action scrolls to the same page's relocated form.
- Remove the form from the hero DOM. Do not hide it with CSS while creating another copy below.
- Eliminate the abandoned form grid column. Do not leave a two-column grid with an empty right-hand cell.
- Preserve the photograph as a full-width background; do not replace it with a small boxed image or convert the reference into a white split hero.
- Do not force identical fixed hero heights. Longer approved copy must fit naturally without clipping.
- Preserve hero image loading priority and responsive sources. Recheck each image's crop on desktop and mobile.
- Preserve trauma-specific image focal points when adding optional crop support to `AcPageHero`.

Modify the service renderer rather than deleting the form from `AcHeroWithForm` globally, since the homepage may still need that component's existing behavior.

## Part C — Relocate the existing form correctly

- Put one form at the bottom of each affected service page's main content, before the footer. Keep the remaining page-specific sections and navigation intact.
- Use one centered contact container around 680px wide, with the heading and introduction directly above the form. Do not recreate a short left column next to a tall right-hand form.
- If the form already has an appropriate heading and intro, render them once. Do not repeat both in an outer wrapper.
- Reuse the existing form component for each route. Do not replace every service's form with the PPC form solely because rodent uses it.
- If `AcCompactForm` needs an explicit light-surface variant outside the dark hero, add that variant without changing its default appearance on the homepage.
- Keep each service preselection, enum value, entry route, hidden field, required state, consent, spam control, attachment capability, event hook, and success destination.
- Preserve an existing form ID where possible, such as `service-form`, so external deep links and internal hooks remain valid. Give its outer section a different ID if needed.
- Audit all hero, mid-page, final, header, and mobile actions for targets that referred to the old form placement. No CTA should scroll to a removed element or jump to another page unnecessarily.
- A final CTA may remain if it serves a distinct purpose, but do not stack duplicate headings and action blocks immediately above the form. Reuse approved final copy as the contact introduction where appropriate.
- Preserve route-specific assessment offers. The rodent $145 credit and $500/$1,500 starting prices must not become default prices for unrelated services.

## Part D — CSS and page-structure review

Review these areas and document actual findings with selectors/components, not generic comments:

1. Layout ownership: which wrapper controls width, columns, padding, and alignment.
2. Duplicate outer/inner padding, especially `main > section` versus hero and contact shells.
3. Reading-width rules versus layout containers. Fix local component geometry rather than removing sitewide paragraph limits.
4. Competing global, component-scoped, and responsive rules; remove obsolete rules only after checking consumers.
5. Heading hierarchy, one H1 per page, type-role consistency, and readable text contrast over images.
6. Empty grid tracks, excessive section gaps, rigid minimum widths, and horizontal overflow.
7. Image sizing/cropping after removing form height from the hero.
8. Duplicate form/section/input IDs; labels must point to exactly one field.
9. Form listeners or analytics selectors that depend on a hero ancestor. Update those references without changing the meaning of the event.
10. Sticky-header scroll offsets, visible focus after navigation, and the mobile action bar's overlap with form controls/footer content.

Use the existing design tokens and self-hosted Inter font. Maintain heading sizing through the existing type-role system. Avoid new global overrides and `!important` patches as the default solution.

## Part E — Integration and documentation boundaries

- Read local root/nested instructions, then `START-HERE.md` and `docs/README.md`.
- Update the existing hero-placement rule in `AGENTS.md`, `docs/30-WEBSITE-MASTER-SPEC.md`, relevant page briefs, and `docs/05-CURRENT-DECISIONS.md` as needed to record this specific owner decision. Do not overwrite unrelated rules.
- Make it explicit that the homepage may retain its hero form while service detail pages use bottom forms.
- Keep static Astro plus Cloudflare Pages Functions. `functions/api/lead.ts` remains the canonical `/api/lead` endpoint. Do not create an Astro API replacement or install the Cloudflare adapter to address a local preview warning.
- Leave the canonical backend untouched for this layout task. If the disabled-submit warning remains, determine whether the local preview is missing Pages Functions or configuration, and report the actual cause.
- Do not conceal the warning or fake success. Preserve the working consent and tag-loading behavior.
- Do not change service claims, pricing on unrelated pages, metadata, canonicals, indexing, public route names, or legal wording as a side effect.

## Part F — Verification and handoff

Use the repository's documented commands, including appropriate build and Astro checks. Update assertions only where they encode the now-superseded requirement for a form inside a service hero; keep the actual form, accessibility, and integration assertions.

Review every affected service route at approximately 1440px, 768px, 390px, and 320px. At least one short desktop viewport should be checked as well.

Acceptance criteria:

- Four rodent spaces panels: two columns on desktop, one on mobile, readable and aligned.
- No form in any migrated service hero; exactly one functioning intake form near each page's bottom.
- Consistent hero composition, with page-specific text and images preserved.
- Correct service selected in each form; distinct DOM IDs; all labels and action anchors work.
- No new overflow, clipped content, empty form column, or sticky-element obstruction.
- Homepage and unrelated page types retain their existing layout.
- Existing rodent pricing/contact improvements are preserved.
- Safe form success/failure and analytics checks completed where the environment permits; no unauthorized real test notifications.
- Provide a route-by-route result table, changed files, desktop/mobile screenshots, actual checks run, and any remaining blockers.

The handoff must distinguish implemented and rendered changes from source-only review. Do not claim production is fixed unless it was actually deployed and verified under a separately authorized publishing task.

## Prompt

Implement the attached `Aseptaclean_Service_Hero_And_Spaces_Update.md` in my current Aseptaclean website worktree.

First review the existing CSS, route structure, and shared components. Fix the rodent service page's “The spaces” section as a two-by-two desktop grid that stacks on mobile. Standardize all current service-page heroes to the rodent page's full-width photo and navy-overlay style. Move each service page's existing form from its hero to one centered bottom contact section.

This is my explicit new layout decision and supersedes older service-page hero-form instructions. Update the relevant existing documentation so the forms are not restored to the heroes later. Preserve the homepage, paid landing pages, service-specific copy, images, offers, metadata, and working integrations. Keep the preceding rodent pricing/form improvements.

Implement actual changes. Preserve service selections, form IDs/hooks, consent, uploads, tracking, and confirmation behavior. Check all same-page CTA anchors and remove duplicate IDs/headings. Do not alter the canonical backend, hide configuration warnings, or fake successful submissions.

Run the applicable build checks and inspect every affected service route on desktop and mobile. Return the CSS findings, changed files, route-by-route results, preview URLs, screenshots, and any blockers. Do not deploy.
