# Aseptaclean website build kits — master index

Packaging revision: 2026-09-19-r01.

Start here, then read the selected package's PACKAGE-STATUS.md and START-HERE.md. Work one page package at a time. Each package has a unique enclosing folder; preserve that folder when extracting. Do not flatten all files into one directory.

This revision standardizes filenames and organization only. Existing page copy, layout, images, pricing decisions, service boundaries, and approval scope remain as supplied. Revision r01 refers to this packaging scheme; it does not reset earlier design version history.

## Package map

Source and preview paths below are relative to their package folders.

| Package | Folder | Source fragment | Browser preview | Approval status |
|---|---|---|---|---|
| contact | `aseptaclean-contact/` | `contact-fragment.html` | `contact-preview.html` | Layout approved; copy provisional |
| estate-service | `aseptaclean-estate-service/` | `estate-service-fragment.html` | `estate-service-preview.html` | Approved reference; see START-HERE.md for authority and scope |
| estate-landing | `aseptaclean-estate-landing/` | `estate-landing-fragment.html` | `estate-landing-preview.html` | Layout approved; copy provisional |
| extreme-service | `aseptaclean-extreme-service/` | `extreme-service-fragment.html` | `extreme-service-preview.html` | Approved reference; see START-HERE.md for authority and scope |
| hoarding-service | `aseptaclean-hoarding-service/` | `hoarding-service-fragment.html` | `hoarding-service-preview.html` | Approved reference; see START-HERE.md for authority and scope |
| home | `aseptaclean-home/` | `reference/home-fragment.html` | `reference/home-preview.html` | Approved reference; see START-HERE.md for authority and scope |
| rodent-service | `aseptaclean-rodent-service/` | `rodent-service-fragment.html` | `rodent-service-preview.html` | Approved reference; see START-HERE.md for authority and scope |
| rodent-landing | `aseptaclean-rodent-landing/` | `rodent-landing-fragment.html` | `rodent-landing-preview.html` | Layout approved; copy provisional |
| submission-flow | `aseptaclean-submission-flow/` | `submission-flow-fragment.html` | `submission-flow-preview.html` | Submission-flow design approved; sample inquiry data only |
| trauma-service | `aseptaclean-trauma-service/` | `trauma-service-fragment.html` | `trauma-service-preview.html` | Approved reference; see START-HERE.md for authority and scope |

## Implementation rules

1. Treat service and campaign landing pages as separate targets. Preserve existing repository routes and integration contracts. Folder names are not new URLs.
2. Use fragments as implementation references and previews for visual inspection. Preserve existing embedded CSS ordering; do not also load extracted CSS unless removing its embedded duplicate.
3. Follow the package's own authority hierarchy. The homepage retains its copy-document authority. Other packages retain their existing source/preview authority rules.
4. Contact, estate landing, and rodent landing copy remains provisional as explicitly recorded in the supplied packages. Their renamed copy files say provisional. This organizational update does not approve or rewrite that copy.
5. Demo forms and preview email designs are not production submission systems. Preserve the existing integration requirements and QA limitations.
6. This bundle contains the ten supplied packages only. It is not evidence that every page of the website is included.

## Verification

All original non-checksum files retained under their mapped names. Text changes limited to declared filename/folder substitutions; binary assets preserved byte-for-byte. Added package-status notes and this index. Rebuilt and verified checksums, ZIP integrity, and unique archive paths. No visual redesign or production deployment performed.
