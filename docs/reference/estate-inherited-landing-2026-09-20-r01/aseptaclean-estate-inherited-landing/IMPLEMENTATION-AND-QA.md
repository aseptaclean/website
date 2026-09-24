# Integration and verification

## Scope

This archive is a standalone design reference for a proposed update to the estate campaign landing page. It is not a production website or deployment. The archive's folder name is not a route instruction. Before implementation, inspect the repository and confirm the existing estate campaign route, canonical URL, redirects, production forms, and analytics. Do not modify the estate public service page or general hoarding page.

## Integration

- Read repository instructions. Preserve unrelated work.
- Use `#ac-inherited-estate` as the style boundary; preserve the full CSS cascade and responsive rules.
- Adapt the fragment into the existing framework, not the preview iframe.
- Keep working phone links and bottom-form anchor links.
- Replace demo submission behavior only when real backend handling is connected. Preserve consent, validation, spam controls, error reporting, campaign parameters, and conversion tracking.
- Map the role, contents, and timeline fields to supported backend fields. Do not silently discard them.
- Preview photo selection only counts local files. It uploads nothing. Do not present a working production upload unless the backend supports it.
- The form currently validates locally and explicitly says no inquiry was sent. Do not count this as a conversion.
- No real inquiries, notifications, or emails were sent.
- Existing photographic assets are embedded in the CSS. Lucide icons require an initializer in production; the exported preview uses its renderer's icon support. Preview fonts or icons may need network access.

## Editorial status

The user noted unspecified typos and requested a separate ZIP. The displayed source is preserved rather than guessing at substantive wording changes. Proofread the extracted text and rendered page before publishing; request clarification if the intended correction changes meaning. Do not redesign or replace the copy wholesale.

## Checks and limits

JavaScript syntax was checked when the mockup was created. Packaging verifies exact source preservation, complete CSS extraction, ZIP integrity, and all included checksums.

Browser-based visual and interaction tests remain outstanding: the available Playwright installation had no installed Chromium executable. Do not report rendered desktop/mobile QA or live submission testing as passed.

Before launch, verify desktop, tablet, 390px, and 320px: heading breaks, image crops, text contrast, wrapping, no horizontal overflow, FAQ controls, keyboard access, phone and anchor links, and supported form success/error flows. Use mock delivery for tests unless real test delivery is separately authorized. No push or deployment is authorized by this packaging request.
