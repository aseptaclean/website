# Calls, forms, policies, and current application behavior

## Call actions

- Primary link label: **Call Aseptaclean**.
- Target: **tel:+14087857588**, read from the central verified phone data.
- Display **(408) 785-7588** beside/under the call action on Contact and in the footer. Do not create multiple conflicting constants.
- Header, homepage hero, service heroes, contextual closing sections, and mobile call control use this behavior. Actual informational page links still navigate; service cards must not all become phone links.
- A tel link requests the device's calling handler. Do not claim a call occurred or was answered merely because it was clicked.
- Use an existing analytics event for call-link clicks if available, or a single consistent call_click event with page and placement only. Do not send form content or phone numbers as analytics properties. Do not silently change ad attribution or call tracking providers.
- No automatic dialing, unsolicited calls, 24/7 claims, or automatic call recording is added by this brief.

## Forms remain a secondary way to contact Aseptaclean

Home and each of the five service pages: compact form inside the desktop photo hero; below the hero copy on mobile. Services hub and About: secondary Send a Message link to /contact/#contact-form, no mandatory duplicate hero form. Contact: the main form in a visible split section. Preserve the existing assessment form utility route.

Form title: **Tell us about the property.**
Supporting sentence, from the source: **You do not need to know exactly what service you need.**
Submit button: **Send Message**. This is a real submit button, not a telephone anchor.
Secondary navigation label: **Send a Message**. Home/service hero secondary links focus or scroll to their own form; elsewhere link to Contact's form. Keep Send Photos only where a working upload/SMS/photo route exists. The trauma page must not require graphic images to initiate contact.

Desired compact fields: Full Name, Phone Number, Property ZIP Code, What are you dealing with?, Tell us what's going on. Preserve their actual backend field names, required/optional states, current validation, anti-spam, consent text, helper copy, upload logic, and successful submission route. If the actual schema includes additional required fields, accommodate them rather than silently removing them to match a screenshot.

Display service choices: Hoarding Cleanup; Extreme Cleaning; Detailed Deep Cleaning; Crime Scene & Trauma Cleanup; Rodent Droppings & Animal Waste Cleanup; Not Sure. Map these labels to existing internal enum values. Renaming a visible option does not authorize breaking the CRM contract. Preselect the relevant service on its page while permitting correction.

Do not make SMS consent prechecked or required to click the telephone link. Do not replace established consent wording with copy invented for this redesign. A successful UI must reflect a real accepted submission; preserve error states and user input after failures. Do not show a fake success state for a placeholder endpoint.

## Contact layout

H1: Contact Aseptaclean (explicit UI adaptation for the call-first page).
Left column: Call Aseptaclean, visible phone number, current verified hours, email link, existing service-area information. Right column: form with id contact-form. On mobile, phone/details appear before form. Keep existing upload capability available where it works. Do not add the entire long questionnaire to the hero.

## Provider policies and cookie controls

The supplied snapshots show Termly-managed Privacy, Terms, and Cookie Policy pages. They contain wrappers, not the policy body. This package therefore specifies the page shell and preservation behavior, not newly authored legal policies.

Read the actual current policy embeds, provider IDs, fallback links, consent initialization, analytics gating, and privacy-request routes in the repository. Preserve the real documents and established consent behavior. Use the existing provider if it has changed; do not install Termly solely because an old snapshot names it.

Legal page shell: shared compact header; breadcrumb; one page H1; readable full policy in the page flow; shared footer. Avoid photographic heroes, repeated sales CTAs inside policy content, tiny fixed-height scrolling policy boxes, and giant blank embed spacers. Preserve provider-required dimensions/behavior when they constrain the wrapper. Use a clear provider fallback if already configured and a Contact link when content cannot load.

Cookie Policy is a readable policy page. Cookie Settings is the working control to reopen preferences. Confirm keyboard access and mobile compatibility; keep the banner and mobile call control from covering each other. Do not remove required consent UI to make the hero fit.

## Integration checklist to complete in the actual repo

- [ ] Root/nested AGENTS.md read; website-specific authority entries reconciled without overwriting unrelated rules.
- [ ] Actual routes mapped to the twelve requested pages.
- [ ] Central phone/email/hours/area data read.
- [ ] Form endpoint, schema, required fields, service enum mapping, errors, and success route recorded.
- [ ] Existing uploads/SMS/CRM/notifications/anti-spam preserved and checked.
- [ ] Current consent wording/provider/policy IDs and fallback links read.
- [ ] Factual display checks and remaining service publication issues identified individually.
- [ ] No secrets copied into the documentation or rendered page.
