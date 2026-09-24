# Locked design and implementation

## Authority
submission-flow-fragment.html is the exact accepted layout and copy, with the contrast correction applied. Preserve white page/email content surfaces, navy headings, slate body text, and white labels on navy actions. Preserve final color overrides and color-scheme:light. Do not revert to the earlier dark background.

## Thank-you page
Compact brand/phone header, inquiry-received indicator, “Thank you. / We’ll take it from here.” headline, receipt explanation, service/ZIP/reference summary, phone CTA and simple footer. Keep the statement that no appointment is booked. Display only after the server has durably accepted the inquiry, never merely on form click or local validation. Direct navigation without a valid receipt should show a neutral state rather than a fabricated success or someone else's details. Do not put personal data in query strings. Keep receipts out of search indexing and public caching.

## Customer email
Sender display name Aseptaclean. Subject pattern: We received your {{service_label}} inquiry | Aseptaclean. Greeting, receipt confirmation, reference/service/ZIP/phone, customer message, reply/call instructions, signature and no-booking qualifier. Escape all submitted text when rendering HTML. Omit absent optional fields cleanly. Send only if a valid email was supplied. Do not promise a delivery time or appointment that has not been arranged.

## Owner notification
Sender display name Aseptaclean Website. Send to the configured lead inbox. Reply-To is the validated customer email when available; otherwise omit it. Never set the customer's address as the sending From address. Subject: New lead: {{service_label}} · {{property_zip}} · {{full_name}}.

Lead name/service/ZIP and clickable phone are prominent. Include call/email actions, complete customer message, reference, received time in America/Los_Angeles, email, source form, source page, available attribution, photo status and recorded contact consent. Use real email-delivery status; the preview's “sent” label is sample data, not an unconditional status. For phone-only leads, omit email action and show confirmation not requested. Show attribution as unavailable when not captured; never fabricate a source.

## Data mapping
- Service comes from the submitted dropdown or known service-specific form context.
- Reference is a unique server-generated inquiry reference, not the sample AC-1048.
- full_name, email, phone, property_zip, message: validated submission values.
- phone link: normalized dialable phone; displayed value can retain readable formatting.
- received_at: actual accepted time, formatted in Pacific time with daylight-saving handling.
- form/page: actual submitting form and page, not a hard-coded /contact/ across every form.
- attribution: available source/medium/campaign and relevant click identifier retained by existing tracking; do not place personal data in analytics events.
- photos: distinguish received attachments, no attachments and upload failure; use protected access for owner attachment links.
- consent: actual recorded state/text version/time, not a hard-coded check.

## Integration sequence
1. Inspect existing form backend, email provider, tracking and routing before editing.
2. Preserve durable lead storage and return a valid receipt after successful acceptance.
3. Queue owner notification and optional customer confirmation; handle retries without duplicate leads or repeated emails. Email failure after acceptance must not cause the UI to tell a customer their already-stored inquiry failed.
4. Redirect to the thank-you page with safe receipt context. Fire the existing lead conversion once per accepted submission, not on arbitrary thank-you visits or refreshes.
5. Configure verified sender and monitored reply inbox through the existing provider. Sender/inbox addresses are intentionally unspecified; do not invent them.
6. Adapt email design into provider-compatible HTML with inline styles, email-safe layout and plain-text alternatives. The provided email HTML is a browser design reference with scoped CSS; do not send the three-tab preview or rely on JavaScript/Lucide in delivered email. Use a text arrow where an icon is needed.
7. Validate desktop/mobile page layout, light/dark host appearance, success/failure/direct-navigation behavior, no-email submissions, special characters, long messages, attachments and retries. Verify real email rendering in supported clients using controlled test recipients before launch.

## Scope
No new marketing consent, newsletter enrollment, CRM workflow or unsolicited follow-up sequence is authorized by this design lock. This package is for the three requested post-submission surfaces. No live sends or deployment occurred.

## Checks actually performed
Preview controls and matching panels checked; JavaScript syntax checked; primary explicit text/background contrast pairs computed at >=4.5:1; exact source copy and ZIP integrity verified. Browser rendering and email-client testing were not performed. Production integration remains to be done.
