# Install the CSS reference profile

Profile AC-CP70-91130-1.1. This is an add-on, not a replacement for your whole docs folder.

1. Copy `docs/reference/` and its evidence folder into the project.
2. Replace the older `docs/styles/website-reference.css` with this version. Map it into production components; do not load competing global stylesheets.
3. Copy the optional read-only audit helper and selector example from `scripts/`. Keep them out of the public website bundle.
4. Add this pointer to the current docs README and master: “Visual measurement and CSS audit baseline: docs/reference/aseptaclean-css-profile.md, profile AC-CP70-91130-1.1. Copy, facts, routes, forms and policy requirements retain their current scoped authorities.”
5. Use `docs/reference/CSS-AUDIT-PROMPT.md` with the actual build for the next audit.

Home and all five service pages have photo heroes with forms. Primary action is Call Aseptaclean; forms remain. Contact and legal pages have their own page-type requirements. If older instructions conflict, reconcile the documentation instead of letting both remain active.

The existing 4:3 Aseptaclean card-image target remains; source screenshots appear approximately 3:2. This distinction is recorded, not silently changed.

No site code was changed or live website audited in creating this package.

## Version 1.1 update

Replace the prior profile, target JSON, reference CSS, audit prompt and collector with these matching versions. Above-fold desktop hero fit is now mandatory at four specified viewports on all eight photo-hero pages. Short-desktop form spacing is tightened without reducing input/button readability. Add a pointer to profile §7 in the active master and retire earlier “goal only” language. Mobile retains headline/call priority and a naturally flowing form. The actual site must be measured before anyone claims it passes.

The same revision includes the owner-approved descriptor **Biohazard Remediation & Specialty Property Cleanup**. Apply `docs/reference/descriptor-update.patch` to the current copy map and Home/Services briefs, merging the exact display changes if files have diverged. The homepage main headline and individual service-page names remain intact.
