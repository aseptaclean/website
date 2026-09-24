# Implement the approved contact page

## Visual authority
Use contact-fragment.html as the exact visual source. The user approved the OPEN white layout, not the prior navy-banner, stock-photo or overlapping-panel alternatives. Do not reinterpret this as another landing page.

## Locked layout
1. Compact white header: Aseptaclean wordmark and descriptor left; Back to main website link right.
2. White introduction: small eyebrow, “Let’s talk about your property.” heading, short supporting line. Keep the heading compact rather than a large landing hero.
3. Open two-column contact section. Left is wider and contains the inquiry form. Right contains phone, hours, service area and what happens next. Both columns begin with a thin horizontal rule. No cards, stock photographs, shadows, navy hero, decorative numbers or overlapping panels.
4. Phone is (408) 785-7588 with tel:+14087857588. Hours shown are 7:00 AM–7:00 PM Pacific; confirm final operating days during copy review. Service area is South Bay & Peninsula, with ZIP confirmation language.
5. Simple warm-white footer: brand/copyright left and main-site link right.

## Form
Fields: full name required; phone required; email optional; five-digit property ZIP required; service dropdown required; message optional; photos optional; contact consent required. Services: estate, hoarding, rodent/animal waste, trauma/crime scene, extreme, detailed deep cleaning, other/not sure. CTA: Send an Inquiry.

The form uses native validation. Demo JavaScript only reports validation and photo selection locally. It does not submit, store, or upload. Keep the preview notice for demonstration. Before production launch, connect the existing site submission and upload backend, consent handling, success/error behavior and tracking; remove demo handling and notice only once those work. Never fire a lead conversion for local demo validation. Preserve existing production consent/privacy requirements; mockup consent is not a substitute for reviewing them.

## Styling
Inter, navy #1C355E, deep navy #122840, slate typography, warm white #F7F8FA. Root ID ac-contact-page. Preserve every style block in order for first integration: this exact source retains inherited CSS and later overrides. Consolidation is optional only after visual equivalence is verified. No inherited photograph or old layout needs to be rendered. Use the site's Lucide implementation for data-lucide icons.

The desktop form uses paired fields where room permits; tablet form fields stack; the entire contact section stacks below 580px with details below the form. Preserve native focus behavior and readable 16px inputs. Do not shrink fields to avoid wrapping.

## Scope and execution
Find the existing contact route and integrate there. Preserve its canonical, metadata, tracking, existing backend and unrelated site behavior. Do not redesign other pages, overwrite landing-page ZIPs, or deploy without authorization. Copy is provisional and should be reviewed separately without changing the locked layout.

1. Implement the exact structure and styling.
2. Wire production form, file upload, icons and existing shared systems.
3. Visually compare desktop, 768px, 390px and 320px. Check wrapping, column widths, no horizontal overflow and keyboard focus.
4. Verify phone/main-site links, service selection, required-field validation, photo selection, real submission errors/success and analytics.
5. Report changed files and checks actually performed.

## Validation performed for this package
Static checks confirmed form/status targets and in-page anchor references; Node JavaScript syntax check passed; exact source copy and ZIP integrity verified. Browser visual validation and live submission testing were not performed. No deployment occurred.
