# Current Website Copy

Generated from a fresh `npm run build:local` production-mode build on 2026-08-21. This is an implementation inventory, not approved replacement copy. Punctuation and wording are preserved; browser-only whitespace is normalized to single spaces. Global shell copy is documented once, then each route lists every meaningful text-bearing element inside `<main>`, including hidden multi-step form fields, option labels, placeholders, and image alt text.

## Copy source map

- Business facts, CTAs, navigation tree, disclaimers, homepage data: `src/data/site.ts`.
- Fourteen shared-template service pages: per-route objects in `src/data/doc27ServicePages.ts`, rendered by `src/layouts/ServicePageLayout.astro`; each route file only selects its data object.
- Hubs, senior-downsizing, service-area and audience data: `src/data/servicePages.ts`.
- About, contact, FAQ, process, projects, and service-area company copy: `src/data/doc27CompanyPages.ts`.
- Assessment-field labels and choices: `src/data/assessment.ts` plus `src/components/AssessmentForm.astro`.
- Compact request form: `src/components/QuickHandoffForm.astro` through `src/components/RequestForm.astro`.
- Homepage section framing: individual components in `src/components/`; shared arrays in `src/data/site.ts`.
- Legal policy fallback text: `src/components/LegalPolicy.astro`; policy body is loaded by Termly at runtime and is not stored in this repository.
- `/sms-notification-consent/`: fully standalone in `src/pages/sms-notification-consent.astro`; it does not use shared data or layout.

## Global shell copy

Source: `src/components/StatusRibbon.astro`, `Header.astro`, `Footer.astro`, `MobileCTA.astro`, and `src/data/site.ts`. The SMS page is the only HTML page that does not use this shell.

### Ribbon

- “Insured — COI on request”
- “Owner-operated assessments”
- “South Bay & Peninsula”
- “(408) 785-7588”

### Primary/mega navigation and mobile drawer

- Groups: “Detailed Cleaning”, “Specialty Cleaning”, “Property Clearing”, “Commercial”, “Service Areas”, “Company”.
- Global CTAs: “Request an assessment”, “Text a photo”, “Call (408) 785-7588”.
- Detailed Cleaning: “Detailed Cleaning hub”, “Deep Cleaning”, “Move-In & Move-Out”, “Post-Construction”, “Window Cleaning”.
- Specialty Cleaning: “Specialty Cleaning hub”, “Extreme-Condition”, “Animal Waste”.
- Property Clearing: “Property Clearing hub”, “Property Cleanouts”, “Hoarding Cleanup”, “Estate Cleanouts”, “Debris Removal”, “Eviction Cleanouts”.
- Company: “About Aseptaclean hub”, “About”, “Services”, “Who We Help”, “The Handoff Standard”, “FAQ”, “Contact”, “Request an assessment”.
- Shared control labels: “Open menu”, “Close menu”, “Hub”, “View the hub”, “Read the story”.
- Detailed Cleaning hub blurb: “One-time cleaning for properties that need a real reset.”
- Deep Cleaning note: “Kitchens, baths, fixtures, and the edges that get skipped”.
- Move-In & Move-Out note: “Vacant turnover, keys-and-photos ready”.
- Post-Construction note: “Settled dust once the trades are out”.
- Window Cleaning note: “Glass, tracks, and frames within safe reach”.
- Specialty Cleaning hub blurb: “Condition-reviewed cleaning for difficult properties.”
- Extreme-Condition note: “Severely neglected property, reviewed first”.
- Animal Waste note: “After the animals are gone”.
- Property Clearing hub blurb: “Clear the contents. Recover access. Prepare the property.”
- Property Cleanouts note: “Full-contents clearing under one scope”.
- Hoarding Cleanup note: “Sorted, approved, documented”.
- Estate Cleanouts note: “Heirs, executors, real deadlines”.
- Debris Removal note: “Approved, lawful disposal”.
- Eviction Cleanouts note: “Turnover on a clock”.
- Company hub blurb: “Owner-operated. Written scope. Documented closeout.”
- About note: “Founder and background”. Services note: “Everything we handle”. Who We Help note: “Executors, agents, managers”. The Handoff Standard note: “The five-stage standard”. FAQ note: “Common questions”. Contact note: “Phone, email, hours”. Request note: “Full intake form”.

### Mobile fixed actions (≤760px, omitted on assessment and private-residence pages)

- “Request an assessment”
- “Text a photo”
- “Call now”

### Footer

- Tagline: “Property clearing, detailed cleaning, and documented closeout for the South Bay & Peninsula.”
- Contact: “(408) 785-7588”; “info@aseptaclean.com”.
- Utility links include “Commercial”, “Service Areas”, “The Executor's Estate Cleanout Checklist”, “Private Residence Reset”, “Request an assessment”, “Text a photo”, “Privacy”, “Terms”, “Cookie Policy”, “Cookie Preferences”.
- Legal line: “© 2026 Aseptaclean, LLC · Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, or appraiser.”
- Scope disclaimer: “Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- Record disclaimer: “Project records document the work performed. They are not regulatory clearance, inspection approval, environmental certification, or a determination that a property is safe or habitable.”

## /

Source: `src/pages/index.astro`; section components in `src/components/`; shared homepage data in `src/data/site.ts`

SEO title: “Property Cleanout & Deep Cleaning | San Jose & South Bay | Aseptaclean”

Meta description: “Whole-property cleanout and deep cleaning in the South Bay & Peninsula. Written scope before work, nothing removed without approval, documented closeout.”

- `p`: “Photo slotCleared property · owner on site2000 × 1100”
- `p`: “Property clearing · Deep cleaning · Documented closeout”
- `h1`: “Complex properties returned to a controlled, documented condition.”
- `p`: “Hoarding, estate and severe-condition properties—cleared, cleaned and closed out under one signed scope, by one accountable operator.”
- `p`: “Nothing leaves the property without your written approval.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `h2`: “Scope”
- `p`: “Room-by-room, signed”
- `h2`: “Set-aside items”
- `p`: “Documents · valuables · keys”
- `h2`: “Clearing”
- `p`: “Approved contents”
- `h2`: “Reset cleaning”
- `p`: “Defined surfaces”
- `h2`: “Closeout record”
- `p`: “Photos + exceptions”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `h2`: “Start where you are”
- `a`: “I'm settling an estateA parent or relative has died and the property has to be dealt with.”
- `a`: “A family member is hoardingSomeone I love needs help and this has to be handled carefully.”
- `a`: “I manage or own rental propertyA unit needs to turn over, or a tenant left belongings behind.”
- `a`: “I'm listing a propertyIt has to be photo-ready by a date I can't move.”
- `a`: “My home needs a real resetI want a deep clean where someone actually names what's included.”
- `p`: “Scope of work”
- `h2`: “Three ways properties reach this handoff”
- `p`: “Every project runs under a signed scope with a documented closeout — whichever way it starts.”
- `p`: “Whole-property clearing for heavy accumulation, estate, and abandoned-contents conditions — nonhazardous contents, within a signed scope.”
- `a`: “Property Cleanouts”
- `a`: “Hoarding Cleanup”
- `a`: “Estate Cleanouts”
- `a`: “Debris Removal”
- `p`: “Deep reset cleaning after clearing — kitchens, baths, cabinet and appliance interiors, floors and accessible surfaces — for the next handoff.”
- `a`: “Deep Cleaning”
- `a`: “Move-In & Move-Out”
- `p`: “Heavy organic conditions and animal waste, cleaned under our organic pathogen endorsement. Cleaning only — not a decontamination, sterilization, or health-safety determination.”
- `p`: “Confidence and fit”
- `h2`: “The decisions stay yours”
- `p`: “The emotional risk is not only the cost. It is the fear that something important will disappear, the scope will change without warning, or the property will still feel unfinished when the crew leaves. The Aseptaclean Handoff Assurance addresses those risks directly.”
- `p`: “Routine housekeeping, single-item pickup, and low-cost hauling are not the primary fit.”
- `li`: “Nonhazardous contents clearing”
- `li`: “Bagging and consolidation”
- `li`: “Light non-structural disassembly”
- `li`: “Garage and storage-area clearing”
- `li`: “Kitchen and bathroom deep cleaning”
- `li`: “Cabinet and appliance interiors when included”
- `li`: “Floors, baseboards, doors, and accessible surfaces”
- `li`: “Heavy organic conditions and animal waste, cleaned under our organic pathogen endorsement”
- `li`: “Approved disposal coordination”
- `li`: “Completion photographs and remote closeout”
- `p`: “Before work begins, the written scope identifies what remains, what leaves, what gets cleaned, and what is outside the job. That is how both sides know what finished means.”
- `li`: “Human blood, bodily fluids, or regulated medical waste”
- `li`: “Needles or sharps requiring regulated handling”
- `li`: “Sewage or active mold remediation”
- `li`: “Asbestos, lead, unknown chemicals, or hazardous materials”
- `li`: “Structural repair, construction, or demolition”
- `li`: “Pest extermination or chemical treatment”
- `li`: “Appraisal, estate-sale, legal, or habitability determinations”
- `p`: “Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services. You will hear the boundaries before work begins, not halfway through the job.”
- `h3`: “The Handoff Assurance”
- `li`: “01Nothing removed without approvalThe scope identifies keep, remove, and review areas. Uncertain items are not automatically discarded.”
- `li`: “02No unapproved chargesAdded labor, services, rentals, disposal, or materials require documented customer authorization.”
- `li`: “03Written scope changesCustomer requests or concealed conditions that materially change the work are documented before work proceeds.”
- `li`: “04Missed scope items correctedIf an item specifically included in the signed scope is missed, notify Aseptaclean with a photograph within 24 hours of completion. Aseptaclean will return within two business days to correct that item at no additional labor charge.”
- `li`: “05Important discovered items reportedKeys, documents, photographs, cash, jewelry, and similar discovered items are isolated and reported.”
- `li`: “06DiscretionUnmarked vehicles, plain clothing, and no signage. We do not discuss the property with neighbors, and scheduling can be arranged around who is home or visible nearby.”
- `p`: “Scope-completion correction applies to items specifically included in the signed scope. It does not guarantee results outside that scope.”
- `h2`: “The difference is what happens before and after the work itself.”
- `p`: “Most of what goes wrong on these projects gets decided before anyone picks anything up.”
- `h3`: “One accountable company”
- `p`: “Clearing, cleaning and closeout documentation stay under one written scope.”
- `h3`: “Written scope”
- `p`: “What stays, what leaves, what gets cleaned and what is excluded are written down first.”
- `h3`: “Approval controls”
- `p`: “Anything we’re not sure about goes into a labeled clear bag and waits for your decision. Added work requires documented authorization.”
- `h3`: “Documented closeout”
- `p`: “Completion photographs and noted exceptions show how the approved scope closed.”
- `h3`: “Working against a listing, transfer or family deadline?”
- `p`: “Assessment response within one business day”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `p`: “Five-stage standard”
- `h2`: “One company stays accountable from the first decision to final closeout.”
- `li`: “01ScopeWe write down what stays, what goes, what gets cleaned, what is excluded, and what the project requires.Room-by-room plan”
- `h3`: “Scope”
- `p`: “We write down what stays, what goes, what gets cleaned, what is excluded, and what the project requires.”
- `li`: “02ProtectKeep areas get marked before work starts. Documents, keys, photos, and anything valuable come out first, set aside in one place, and get reported to you.Keep and review controls”
- `h3`: “Protect”
- `p`: “Keep areas get marked before work starts. Documents, keys, photos, and anything valuable come out first, set aside in one place, and get reported to you.”
- `li`: “03ClearApproved unwanted contents are consolidated, staged or coordinated for lawful disposal within the signed scope.Clearing status”
- `h3`: “Clear”
- `p`: “Approved unwanted contents are consolidated, staged or coordinated for lawful disposal within the signed scope.”
- `li`: “04ResetThe property receives the detailed cleaning included for its next handoff.Cleaning status”
- `h3`: “Reset”
- `p`: “The property receives the detailed cleaning included for its next handoff.”
- `li`: “05VerifyCompletion photographs, documented exceptions and a Property Handoff Record close the approved scope.Closeout package”
- `h3`: “Verify”
- `p`: “Completion photographs, documented exceptions and a Property Handoff Record close the approved scope.”
- `p`: “Photo slotCompleted property · closeout day2000 × 900”
- `p`: “The record”
- `h2`: “Every project ends with a Property Handoff Record in your hands.”
- `p`: “A room-by-room account of what was decided, what left, what was cleaned, and what was held back for you.”
- `th`: “Area”
- `th`: “Decision”
- `th`: “Note”
- `td`: “Entry + living”
- `td`: “Keep”
- `td`: “Furnishings remain; cleaning included”
- `td`: “Kitchen”
- `td`: “Keep”
- `td`: “Cabinet and appliance interiors per scope”
- `td`: “Primary closet”
- `td`: “Review”
- `td`: “Contents held for owner decision”
- `td`: “Garage”
- `td`: “Remove”
- `td`: “Approved contents cleared; surfaces detailed”
- `p`: “Project records document the work performed. They are not regulatory clearance, inspection approval, environmental certification, or a determination that a property is safe or habitable.”
- `a`: “See how a scope gets written →”
- `p`: “What it costs”
- `h2`: “One number, in writing, after the property is reviewed.”
- `p`: “We do not force every property into a package. Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.”
- `p`: “Final pricing depends on”
- `li`: “01Property size and access”
- `li`: “02Volume of approved contents”
- `li`: “03Sorting and review required”
- `li`: “04Cleaning condition”
- `li`: “05Disposal requirements”
- `li`: “06Labor and deadline”
- `p`: “Where we work”
- `h2`: “South Bay & Peninsula, one address at a time.”
- `li`: “San Jose”
- `li`: “Mountain View”
- `li`: “Sunnyvale”
- `li`: “Santa Clara”
- `li`: “Campbell”
- `li`: “Los Altos”
- `li`: “Los Altos Hills”
- `li`: “Los Gatos”
- `li`: “Palo Alto”
- `li`: “Atherton”
- `p`: “The operator, not a call center”
- `h2`: “The person defining the work stays accountable for how it is carried out.”
- `p`: “Matthew Ruiz is directly involved in scope review, project planning and operating oversight—a controlled-process background applied to properties that require more than a truck and a guess.”
- `li`: “EducationB.S. Biochemistry, UC Riverside”
- `li`: “BackgroundPharmaceutical manufacturing”
- `li`: “BackgroundHistology and surgical pathology”
- `li`: “On projectScope, planning, operating oversight”
- `p`: “This background reflects controlled-process discipline. It does not grant contractor, remediation, medical, environmental, or regulatory authority.”
- `p`: “Common questions”
- `h2`: “Asked before almost every project.”
- `summary`: “Can I approve the project remotely?”
- `p`: “Yes, when access and decision authority are clear. Scope review, approvals, updates and closeout can be handled electronically.”
- `summary`: “Will you throw anything away without asking?”
- `p`: “No. The scope identifies keep, remove and review areas. Anything we’re not sure about goes into a labeled clear bag and waits for your decision.”
- `summary`: “Do you handle animal or organic conditions?”
- `p`: “Yes — cleaning of animal-affected and organic conditions is included under our organic pathogen endorsement, as cleaning within lawful scope. Cleaning only — not a decontamination, sterilization, or health-safety determination.”
- `summary`: “What happens if a specialist condition is discovered?”
- `p`: “Work stops on that item. We document the condition and explain which qualified provider is needed before work continues.”
- `summary`: “What can change the price?”
- `p`: “Concealed conditions or customer-requested additions that materially change the work — documented before work proceeds, never as a surprise invoice.”
- `summary`: “How quickly can the project begin?”
- `p`: “Assessment requests are reviewed within one business day. Scheduling depends on scope, access, labor and the deadline.”
- `summary`: “Do you handle properties with heavy accumulation or hoarding conditions?”
- `p`: “Yes, within our current lawful and insured operating scope. Heavy accumulation and whole-house cleanouts go through the same written-scope process as every project: keep, remove, and review areas are identified before work begins, and nothing is discarded automatically. Some conditions remain outside our current scope: human blood, bodily fluids, or regulated medical waste; sewage cleanup or active mold remediation; asbestos, lead, unknown chemicals, or hazardous materials; structural repair, construction, or demolition; pest extermination or chemical treatment; and appraisal, estate-sale, legal, or habitability determinations. If we observe one of these conditions, work in the affected area stops and you are notified before the project moves forward.”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `p`: “Final decision”
- `h2`: “Start with what you know. We will help define the rest.”
- `p`: “Tell us what you are looking at, what must remain and when the property needs to be ready.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `p`: “Submitting a request does not authorize work or create a service agreement.”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /404

Source: `src/pages/404.astro`

SEO title: “Page Not Found | Aseptaclean”

Meta description: “That page isn't here. Find your way back to Aseptaclean's property cleanout and deep cleaning services in the South Bay & Peninsula.”

- `p`: “404”
- `h1`: “That page isn’t here.”
- `p`: “The link may be out of date, or the page may have moved. Try one of these instead.”
- hidden `h2`: “Where to go next”
- `a`: “HomeStart from the beginning.”
- `a`: “ServicesSee what Aseptaclean clears and cleans.”
- `a`: “ContactReach us directly.”

## /about/

Source: `src/pages/about/index.astro`

SEO title: “About Aseptaclean | Owner-Operated Property Cleaning”

Meta description: “Meet Matthew Ruiz and learn how Aseptaclean approaches cleaning and property clearing work.”

- `p`: “Home / About”
- `a`: “Home”
- `p`: “About Aseptaclean”
- `h1`: “A controlled-process mindset for properties that need careful decisions.”
- `p`: “Aseptaclean is an owner-operated cleaning and property clearing business serving the South Bay & Peninsula.”
- `p`: “Founder & Principal Operator”
- `h2`: “Matthew Ruiz stays close to the scope.”
- `p`: “Matthew is directly involved in scope review, project planning and operating oversight. His background includes a B.S. in Biochemistry from UC Riverside, pharmaceutical manufacturing, and histology and surgical pathology.”
- `p`: “‘Difficult properties are not handled well through vague promises. Before work begins, I want you to know what is included, what is excluded, what happens when something unexpected is found, and what you will receive when the job is closed. That is the standard I built Aseptaclean around.’”
- `h2`: “Verified background”
- `p`: “Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “This background reflects controlled-process discipline. It does not grant contractor, remediation, medical, environmental, or regulatory authority.”
- `p`: “Insured. Certificate of Insurance available upon request.”
- `p`: “Operating principles”
- `h2`: “How the work is decided before it starts”
- `h3`: “Clear authority”
- `p`: “We identify who can approve contents decisions and scope changes.”
- `h3`: “Written boundaries”
- `p`: “Inclusions, exclusions and assumptions are written before scheduling.”
- `h3`: “Direct accountability”
- `p`: “You speak with the operator reviewing the property—not a distant call center.”
- `p`: “More about the operator”
- `h2`: “The standard, the services, and how to reach us”
- `a`: “The Handoff Standard →”
- `a`: “Services →”
- `a`: “Contact →”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /animal-waste-cleanup-san-jose/

Source: `src/pages/animal-waste-cleanup-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Animal Waste Cleanup in San Jose | Aseptaclean”

Meta description: “Non-human animal waste cleanup for accepted residential and property conditions in the South Bay & Peninsula.”

- `p`: “LAUNCH GATE — not for publication: Compliance release pending — docs/27-COPY-CANONICAL.md §21 release inputs (insurance wording for the specific terminology, pest-control/cleanup licensing boundary confirmation, disposal procedure, PPE and work-zone limits, final claims review) are not on record. Ships noindex per §21 'Current status' and §13 'gated'; owner decision 2026-08-16 chose the gated path over SITEMAP-MASTER's ungated column.”
- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Specialty Cleaning / Animal Waste Cleanup”
- `a`: “Home”
- `a`: “Specialty Cleaning”
- `p`: “Specialty Cleaning · South Bay & Peninsula”
- `h1`: “Animal waste cleanup in San Jose, handled without judgment”
- `p`: “Condition-based cleanup for accepted non-human animal waste, odor sources and heavily affected surfaces after the animal issue is controlled.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `p`: “Cleaning only — not a decontamination, sterilization, or health-safety determination.”
- `h2`: “This service may fit when”
- `li`: “Pet waste affects floors or hard surfaces”
- `li`: “A vacant property has animal-related soil”
- `li`: “The source is non-human and can be safely accessed”
- `li`: “The scope needs separation from pest or repair work”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “Cleanup after the animal source is controlled.”
- `p`: “We separate cleaning from pest treatment, veterinary issues and structural replacement. The quote covers only the surfaces and materials we can reasonably clean within the approved scope.”
- `li`: “Initial condition and material review”
- `li`: “Removal of accepted surface waste”
- `li`: “Cleaning of approved nonporous surfaces”
- `li`: “Odor-source reduction within cleanable materials”
- `li`: “Bagging and staging as defined in the scope”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Live animal handling or pest control”
- `li`: “Human waste or human biological material”
- `li`: “Removal of contaminated structural materials”
- `li`: “Guaranteed odor removal from damaged porous materials”
- `p`: “What this scope does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Waste type, amount and age”
- `li`: “02Porous versus nonporous surfaces”
- `li`: “03Affected rooms and contents”
- `li`: “04Ventilation and safe access”
- `li`: “05Disposal path and local requirements”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on animal waste cleanup.”
- `summary`: “Do you remove live animals?”
- `p`: “No. Animal control or a pest professional must address live animals and active entry before cleanup.”
- `summary`: “Will the odor be completely gone?”
- `p`: “Not always. Waste absorbed into subfloor, drywall or other porous materials may require removal or repair by an appropriate provider.”
- `h2`: “Often booked alongside”
- `a`: “Rodent Dropping Cleanup”
- `a`: “Pigeon Dropping Cleanup”
- `a`: “Extreme-Condition Cleaning”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /commercial-cleaning-san-jose/

Source: `src/pages/commercial-cleaning-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Commercial Janitorial Cleaning in San Jose | Aseptaclean”

Meta description: “Project-based and select recurring commercial janitorial cleaning for small facilities in the South Bay & Peninsula.”

- `p`: “LAUNCH GATE — not for publication: Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for this service is confirmed (docs/SITEMAP-MASTER.md).”
- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Commercial & Janitorial Cleaning”
- `a`: “Home”
- `p`: “Commercial · South Bay & Peninsula”
- `h1`: “Commercial cleaning in San Jose with a scope you can inspect”
- `p`: “Defined cleaning programs for small commercial properties that need reliable scope, clear frequencies and direct owner communication.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “This service may fit when”
- `li`: “A small facility needs a written cleaning scope”
- `li`: “The current service misses important details”
- `li`: “A one-time commercial deep clean is needed”
- `li`: “Management wants one accountable point of contact”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “A commercial scope that can actually be inspected.”
- `p`: “The agreement identifies frequencies, areas and periodic tasks. That prevents the common failure where every expectation is buried under the word ‘janitorial.’”
- `li`: “Restroom and break-area cleaning”
- `li`: “Touchpoint and common-area cleaning”
- `li`: “Floor care within the agreed method”
- `li`: “Waste removal to onsite receptacles”
- `li`: “Periodic detail tasks when scheduled”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Clinical infection-control programs unless separately qualified”
- `li`: “Industrial production cleaning”
- `li`: “High-access exterior work”
- `li`: “Repairs, pest control or regulated waste”
- `p`: “What this scope does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Facility type and square footage”
- `li`: “02Frequency and service window”
- `li`: “03Occupancy and security requirements”
- `li`: “04Consumables and onsite equipment”
- `li`: “05Floor types and periodic tasks”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on commercial & janitorial cleaning.”
- `summary`: “Do you offer nightly janitorial service?”
- `p`: “Select schedules may be available depending on location, facility type, service window and current capacity.”
- `summary`: “Do you provide supplies?”
- `p`: “Cleaning supplies can be included. Paper goods, liners and client consumables are defined separately in the proposal.”
- `h2`: “Often booked alongside”
- `a`: “One-Time Deep Cleaning”
- `a`: “Post-Construction Cleaning”
- `a`: “Window Cleaning”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /contact/

Source: `src/pages/contact/index.astro`

SEO title: “Contact Aseptaclean | San Jose & South Bay Property Cleanouts”

Meta description: “Request an Aseptaclean cleaning or property clearing assessment in the South Bay & Peninsula.”

- `p`: “Home / Contact”
- `a`: “Home”
- `p`: “Contact”
- `h1`: “Start with the property details.”
- `p`: “Share the city, approximate size, current condition, access and deadline. Clear photos help us decide whether a walkthrough is needed.”
- hidden `h2`: “Contact details”
- `a`: “(408) 785-7588”
- `p`: “For immediate questions about fit and timing.”
- `p`: “Monday–Saturday, 7:00 AM–7:00 PM Pacific Time; closed Sunday”
- `a`: “(408) 785-7588”
- `p`: “Stand in the doorway and get the whole room, then step in close on the worst spots.”
- `a`: “info@aseptaclean.com”
- `p`: “Assessment requests are reviewed within one business day.”
- `h3`: “Service area”
- `li`: “San Jose”
- `li`: “Mountain View”
- `li`: “Sunnyvale”
- `li`: “Santa Clara”
- `li`: “Campbell”
- `li`: “Los Altos”
- `li`: “Los Altos Hills”
- `li`: “Los Gatos”
- `li`: “Palo Alto”
- `li`: “Atherton”
- `p`: “Availability depends on the address, scope and schedule. service-area business — no published street address.”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /cookie-policy/

Source: `src/pages/cookie-policy.astro`

SEO title: “Cookie Policy | Aseptaclean”

Meta description: “Read Aseptaclean’s Termly-managed Cookie Policy or access the provider fallback.”

- `p`: “Home / Cookie Policy”
- `a`: “Home”
- `p`: “Legal record · Managed by Termly”
- `h1`: “Cookie Policy”
- `p`: “This page is an integration surface for Aseptaclean’s provider-controlled policy document. Aseptaclean does not replace the provider’s published policy with locally drafted legal text.”
- `p`: “Your browser does not support iframes.”
- `p`: “Provider fallback”
- `h2`: “If the policy does not load”
- `p`: “Provider content can be unavailable when JavaScript is disabled, a content blocker intervenes, or Termly is temporarily unreachable.”
- `a`: “Contact Aseptaclean about privacy or legal access”

## /data-request/

Source: `src/pages/data-request.astro`

SEO title: “Data Request | Aseptaclean”

Meta description: “Submit a data access, correction, or deletion request to Aseptaclean.”

- `p`: “Legal record”
- `h1`: “Data Request”
- `p`: “This page is reserved for Aseptaclean's data access, correction, and deletion request process.”
- `p`: “Provider status”
- `h2`: “Request form not published in this preview”
- `p`: “The provider-configured data request mechanism has not been added yet. No substitute form or process is shown. To submit a data request now, contact Aseptaclean directly.”
- `a`: “Email Aseptaclean about a data request”

## /debris-removal-san-jose/

Source: `src/pages/debris-removal-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Property Debris Removal | San Jose & South Bay | Aseptaclean”

Meta description: “Property debris removal in the South Bay & Peninsula. Written scope, staged loading, disposal handled by a City-authorized hauler engaged for the project.”

- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Property Clearing / Debris Removal”
- `a`: “Home”
- `a`: “Property Clearing”
- `p`: “Property Clearing · South Bay & Peninsula”
- `h1`: “Debris removal in San Jose for whole-property projects”
- `p`: “Removal planning for loose, non-hazardous property debris that must be cleared before cleaning, turnover or the next phase of work.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “When debris is what is standing between you and the next phase”
- `li`: “Loose debris blocks cleaning or access”
- `li`: “A turnover left approved discard material”
- `li`: “A container or disposal route must be planned”
- `li`: “The material can be identified before removal”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “Debris removed through a defined and legal disposal plan.”
- `p`: “The quote separates labor, containers, third-party hauling and follow-on cleaning so disposal costs are not hidden inside a vague cleanout number.”
- `li`: “Material and volume review”
- `li`: “Bagging and staging of approved debris”
- `li`: “Loading coordination”
- `li`: “Container or appropriate hauler coordination”
- `li`: “Broom-clean or detailed cleaning when included”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Hazardous or unknown materials”
- `li`: “Construction demolition”
- `li`: “Unpermitted transport or disposal”
- `li`: “Items not authorized for removal”
- `p`: “Materials we do not take. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Material type, weight and volume”
- `li`: “02Distance from debris to loading area”
- `li`: “03Stairs, elevators and parking”
- `li`: “04Container fees and local rules”
- `li`: “05Labor required for sorting”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on debris removal.”
- `summary`: “Are disposal fees included?”
- `p`: “The written quote states whether container, facility or third-party hauling fees are included, estimated or billed separately.”
- `summary`: “Do you take hazardous materials?”
- `p`: “No. Unknown chemicals, regulated waste and other hazardous materials require an appropriate disposal provider.”
- `h2`: “Often booked alongside”
- `a`: “Estate Cleanouts”
- `a`: “Hoarding Cleanup”
- `a`: “Property Clearing”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /deep-cleaning-san-jose/

Source: `src/pages/deep-cleaning-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Deep Cleaning Services in San Jose | Aseptaclean”

Meta description: “One-time deep cleaning for kitchens, bathrooms and whole homes in the South Bay & Peninsula — quoted room by room from a written checklist, not a package.”

- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Detailed Cleaning / One-Time Deep Cleaning”
- `a`: “Home”
- `a`: “Detailed Cleaning”
- `p`: “Detailed Cleaning · South Bay & Peninsula”
- `h1`: “Deep cleaning in San Jose, defined room by room before anyone starts”
- `p`: “For homes that need substantially more detail than routine housekeeping—especially kitchens, bathrooms, fixtures, edges and the areas that are usually skipped.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “When a deep clean is the right scope”
- `li`: “Routine cleaning is no longer enough”
- `li`: “Kitchen or bathroom buildup needs focused work”
- `li`: “The home needs a one-time reset”
- `li`: “You want the scope defined before the crew arrives”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “A deeper reset with the details written down.”
- `p`: “We do not rely on a vague label like ‘deep clean.’ The quote lists the rooms, the surfaces, and the detail level — so when we say finished, you and we are reading the same page.”
- `li`: “Detailed kitchen and bathroom cleaning”
- `li`: “Baseboards, reachable trim, doors and fixtures”
- `li`: “Shower glass, tile and surface buildup within cleanable limits”
- `li`: “Floors, edges and accessible areas beneath movable items”
- `li`: “Room-by-room work based on the approved scope”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Permanent staining or surface damage”
- `li`: “Restoration, repair or refinishing”
- `li`: “Unapproved heavy contents removal”
- `li`: “Human biological material or regulated waste”
- `p`: “What deep cleaning does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Property size and number of rooms”
- `li`: “02Current soil and buildup”
- `li`: “03Access beneath or behind appliances”
- `li`: “04Specialty finishes and delicate materials”
- `li`: “05Deadline and desired outcome”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on one-time deep cleaning.”
- `summary`: “Is this recurring housekeeping?”
- `p`: “No. This page is for focused one-time deep cleaning. Recurring service can be discussed separately when capacity allows.”
- `summary`: “Do you move appliances?”
- `p`: “Light, safely movable appliances may be included when access and flooring conditions allow. Gas-connected, built-in or unsafe items are excluded.”
- `h2`: “Often booked alongside”
- `a`: “Move-In & Move-Out Cleaning”
- `a`: “Detailed Cleaning”
- `a`: “Extreme-Condition Cleaning”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /detailed-cleaning/

Source: `src/pages/detailed-cleaning/index.astro`

SEO title: “Detailed Cleaning | San Jose | Aseptaclean”

Meta description: “Deep cleaning, move-in/move-out, post-construction, and window cleaning — one written scope, whichever reset the property needs. South Bay & Peninsula.”

- `p`: “Photo slot1800 × 700”
- `p`: “Home / Detailed Cleaning”
- `a`: “Home”
- `h1`: “One-time cleaning for properties that need a real reset.”
- `p`: “Choose the page that matches the property's next event — not a generic package that hides the difference between a deep clean, turnover and construction cleanup.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “4 services in this group”
- `h2`: “Pick the page that matches the property’s next event.”
- `h3`: “One-Time Deep Cleaning”
- `p`: “Kitchens, baths, fixtures, and the edges that get skipped”
- `a`: “One-Time Deep Cleaning — what’s includedWhat’s included→”
- `h3`: “Move-In & Move-Out Cleaning”
- `p`: “Vacant turnover, keys-and-photos ready”
- `a`: “Move-In & Move-Out Cleaning — what’s includedWhat’s included→”
- `h3`: “Post-Construction Cleaning”
- `p`: “Settled dust once the trades are out”
- `a`: “Post-Construction Cleaning — what’s includedWhat’s included→”
- `h3`: “Window Cleaning”
- `p`: “Glass, tracks, and frames within safe reach”
- `a`: “Window Cleaning — what’s includedWhat’s included→”
- `h2`: “We define the work before we schedule it.”
- `p`: “Photos can start the review. Larger, heavier or more complicated properties may require a walkthrough before a firm quote.”
- `h3`: “01 — Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `h3`: “02 — Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `h3`: “03 — Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “04 — Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h3`: “Working against a listing, transfer or family deadline?”
- `p`: “Assessment response within one business day”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /estate-cleanout-checklist/

Source: `src/pages/estate-cleanout-checklist/index.astro`

SEO title: “The Executor's Estate Cleanout Checklist (Free) | Aseptaclean”

Meta description: “A free, neutral checklist for executors and families clearing an estate: authority, legal steps, sorting, choosing a vendor, and closeout — five sections, print-ready.”

- `p`: “Home / Estate Cleanout Checklist”
- `a`: “Home”
- `p`: “Free resource · No vendor required”
- `h1`: “The Executor's Estate Cleanout Checklist”
- `p`: “Five sections, in the order most executors face them. Nothing here requires hiring anyone — it holds up whether you do the work yourself, split it with family, or bring in a vendor.”
- `button`: “Print this checklist →”
- hidden `h2`: “Checklist sections”
- `li`: “01Before anything is touchedConfirm your legal authority to act — as executor, trustee, or agent under power of attorney — before anyone removes or discards anything.Photograph every room as-found, including closets, drawers, and storage areas, before any sorting begins.Locate the will or trust documents, keys, deeds, vehicle titles, and account records.Secure the property: confirm locks work, mail is held or forwarded, and the property is not left visibly unattended.”
- `h3`: “Before anything is touched”
- `li`: “Confirm your legal authority to act — as executor, trustee, or agent under power of attorney — before anyone removes or discards anything.”
- `li`: “Photograph every room as-found, including closets, drawers, and storage areas, before any sorting begins.”
- `li`: “Locate the will or trust documents, keys, deeds, vehicle titles, and account records.”
- `li`: “Secure the property: confirm locks work, mail is held or forwarded, and the property is not left visibly unattended.”
- `li`: “02Legal & authorityIdentify who can legally approve disposal of contents — this is not always the same person handling logistics.Notify co-heirs in writing before significant items are removed or the property is cleared, even if the will is clear.Check for liens, code-violation notices, or unpaid property tax before assuming clear title to dispose of contents.Decide what happens to utilities — many vendors and inspectors need power and water on to do their work.”
- `h3`: “Legal & authority”
- `li`: “Identify who can legally approve disposal of contents — this is not always the same person handling logistics.”
- `li`: “Notify co-heirs in writing before significant items are removed or the property is cleared, even if the will is clear.”
- `li`: “Check for liens, code-violation notices, or unpaid property tax before assuming clear title to dispose of contents.”
- `li`: “Decide what happens to utilities — many vendors and inspectors need power and water on to do their work.”
- `li`: “03Sort, decide, documentUse a three-way framework for every room: keep, review, remove. Nothing has to be decided immediately.Set aside documents, photographs, jewelry, keys, and cash into one secured, clearly labeled location as soon as they're found.Never discard an item you're unsure about. Move it to "review" and revisit it later — it costs nothing to wait.Keep a written record of significant decisions: what was kept, what was removed, and who approved it.”
- `h3`: “Sort, decide, document”
- `li`: “Use a three-way framework for every room: keep, review, remove. Nothing has to be decided immediately.”
- `li`: “Set aside documents, photographs, jewelry, keys, and cash into one secured, clearly labeled location as soon as they're found.”
- `li`: “Never discard an item you're unsure about. Move it to "review" and revisit it later — it costs nothing to wait.”
- `li`: “Keep a written record of significant decisions: what was kept, what was removed, and who approved it.”
- `li`: “04Choosing a vendorInsist on a written scope before work begins — what's included, what it costs, and what happens if the scope changes.Ask directly what is excluded from the quoted price. A verbal "don't worry, we'll handle it" is not a scope.Ask how discovered valuables are handled — is there a documented process, or does it depend on who happens to find them?Ask what documentation you receive at closeout — photographs, an exception list, a written record — and get the answer in writing.Confirm the vendor carries insurance and ask to see proof, not just a verbal assurance.”
- `h3`: “Choosing a vendor”
- `li`: “Insist on a written scope before work begins — what's included, what it costs, and what happens if the scope changes.”
- `li`: “Ask directly what is excluded from the quoted price. A verbal "don't worry, we'll handle it" is not a scope.”
- `li`: “Ask how discovered valuables are handled — is there a documented process, or does it depend on who happens to find them?”
- `li`: “Ask what documentation you receive at closeout — photographs, an exception list, a written record — and get the answer in writing.”
- `li`: “Confirm the vendor carries insurance and ask to see proof, not just a verbal assurance.”
- `li`: “05CloseoutRequest completion photographs showing the property's final condition, not just a verbal "all done."Get a written exception list — anything not completed or not part of the original scope should be named, not implied.Do a final walkthrough before signing off, in person or by reviewing photographs and video together.Keep all records — the scope, photographs, and any closeout documentation — with the estate file.”
- `h3`: “Closeout”
- `li`: “Request completion photographs showing the property's final condition, not just a verbal "all done."”
- `li`: “Get a written exception list — anything not completed or not part of the original scope should be named, not implied.”
- `li`: “Do a final walkthrough before signing off, in person or by reviewing photographs and video together.”
- `li`: “Keep all records — the scope, photographs, and any closeout documentation — with the estate file.”
- `p`: “A sample of what closeout should look like”
- `h2`: “Whoever you hire, ask for something like this at the end”
- `p`: “The record it produces should stand on its own, regardless of who you hire.”
- `a`: “See the annotated sample Handoff Record →”
- `p`: “This checklist is a neutral reference for executors and families. It does not require using Aseptaclean or any specific vendor.”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /estate-cleanout-san-jose/

Source: `src/pages/estate-cleanout-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Estate Cleanout in San Jose & South Bay | Aseptaclean”

Meta description: “Estate cleanout in the South Bay & Peninsula, run to the authorized decision-maker's instructions. Nothing leaves the property without written approval.”

- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Property Clearing / Estate Cleanouts”
- `a`: “Home”
- `a`: “Property Clearing”
- `p`: “Property Clearing · South Bay & Peninsula”
- `h1`: “Estate cleanout in San Jose without deciding everything today”
- `p`: “A deliberate process for sorting, staging and clearing estate contents before sale, transfer, renovation or family handoff.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “When an estate cleanout is the right next step”
- `li`: “A family or representative is managing estate contents”
- `li`: “Items must be separated before removal”
- `li`: “The property is being prepared for sale or transfer”
- `li`: “Cleaning is needed after rooms are cleared”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “A respectful clearout built around authority and decisions.”
- `p`: “The person authorizing removal identifies what must be preserved. The scope then separates sorting, staging, disposal and final cleaning.”
- `li`: “Authorized decision-maker walkthrough”
- `li`: “Keep, donate, remove and review zones”
- `li`: “Contents staging and bagging”
- `li`: “Container or disposal coordination”
- `li`: “Optional post-clearout cleaning”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Valuation, appraisal or estate-sale services”
- `li`: “Legal decisions about ownership”
- `li`: “Removal without authorized direction”
- `li`: “Hazardous materials or structural work”
- `p`: “What an estate cleanout does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Property and contents volume”
- `li`: “02Required sorting detail”
- `li`: “03Stairs, access and parking”
- `li`: “04Donation or disposal instructions”
- `li`: “05Deadline for sale or handoff”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `p`: “The Handoff Standard →”
- `a`: “The Handoff Standard →”
- `h2`: “Questions we get on estate cleanouts.”
- `summary`: “Do you buy or appraise estate items?”
- `p`: “No. Appraisal, resale and estate-sale services are separate. We follow the authorized sorting and removal plan.”
- `summary`: “Can you clean the home afterward?”
- `p`: “Yes. Move-out or detailed cleaning can be added after the rooms are cleared and accessible.”
- `h2`: “Often booked alongside”
- `a`: “Debris Removal”
- `a`: “Move-In & Move-Out Cleaning”
- `a`: “Hoarding Cleanup”
- `h3`: “Free resource”
- `a`: “The Executor's Estate Cleanout Checklist”
- `p`: “Five sections, in the order most executors face them. Free to print and to pass on.”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /eviction-cleanout-san-jose/

Source: `src/pages/eviction-cleanout-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Eviction Cleanout Services in San Jose | Aseptaclean”

Meta description: “Eviction cleanout and turnover cleaning for property owners and managers in the South Bay & Peninsula.”

- `p`: “LAUNCH GATE — not for publication: Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for this service is confirmed (docs/SITEMAP-MASTER.md).”
- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Property Clearing / Eviction Cleanouts”
- `a`: “Home”
- `a`: “Property Clearing”
- `p`: “Property Clearing · South Bay & Peninsula”
- `h1`: “Eviction cleanouts in San Jose, documented for the owner file”
- `p`: “Contents clearing and cleaning after lawful possession has been restored and the property owner or manager has authority to direct removal.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “This service may fit when”
- `li`: “Possession has been lawfully returned”
- `li`: “Abandoned contents require authorized handling”
- `li`: “The unit needs clearing before repairs or turnover”
- `li`: “A deadline is tied to re-rental or inspection”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “A cleanout that begins only after authority is clear.”
- `p`: “Aseptaclean does not decide what is legally abandoned. The authorized owner or manager provides direction; we then execute the approved clearing and cleaning scope.”
- `li`: “Authorized walkthrough and documentation”
- `li`: “Approved contents bagging and staging”
- `li`: “Debris and container coordination”
- `li`: “Condition-based cleaning after access is restored”
- `li`: “Scope changes documented when hidden conditions appear”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Legal eviction activity or tenant communication”
- `li`: “Removal before lawful possession”
- `li`: “Unknown hazardous materials”
- `li`: “Repairs, demolition or pest treatment”
- `p`: “What this scope does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Contents and debris volume”
- `li`: “02Legal authorization and removal instructions”
- `li`: “03Property condition and pests”
- `li`: “04Access, elevators and parking”
- `li`: “05Turnover deadline”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on eviction cleanouts.”
- `summary`: “Can you remove items before the eviction is complete?”
- `p`: “No. The owner or manager must confirm lawful possession and authority before contents are handled.”
- `summary`: “Can you clean after the unit is emptied?”
- `p`: “Yes. Turnover cleaning can be included as a second phase after access to surfaces is restored.”
- `h2`: “Often booked alongside”
- `a`: “Property Cleanouts”
- `a`: “Debris Removal”
- `a`: “Move-In & Move-Out Cleaning”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /extreme-cleaning-san-jose/

Source: `src/pages/extreme-cleaning-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Extreme-Condition Cleaning in San Jose | Aseptaclean”

Meta description: “Condition-reviewed cleaning for heavily soiled San Jose properties. Priorities, exclusions and price agreed in writing before work — no package guesswork.”

- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Specialty Cleaning / Extreme-Condition Cleaning”
- `a`: “Home”
- `p`: “Specialty Cleaning · South Bay & Peninsula”
- `h1`: “Extreme cleaning in San Jose for conditions that need a walkthrough first”
- `p`: “For heavily soiled properties where routine cleaning is unrealistic and the work needs condition review, priorities, exclusions and a controlled scope.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `p`: “Cleaning only — not a decontamination, sterilization, or health-safety determination.”
- `h2`: “When a property has moved past what routine cleaning can reach”
- `li`: “Multiple rooms have severe buildup”
- `li`: “Access is limited by contents or condition”
- `li`: “The property needs staged recovery”
- `li`: “A normal cleaning quote would be unreliable”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “A difficult property broken into controllable work.”
- `p`: “The goal is not to hide the condition behind a generic cleaning package. We identify the priority areas, define what can be safely handled and document what remains outside scope.”
- `li`: “Condition-based work plan”
- `li`: “Priority-area cleaning”
- `li`: “Heavy soil removal within current scope”
- `li`: “Approved contents handling”
- `li`: “Progress checkpoints for multi-stage work”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Human biological material or trauma scenes”
- `li`: “Regulated medical or hazardous waste”
- `li`: “Structural repair, demolition or pest treatment”
- `li`: “Conditions outside current training, insurance or lawful scope”
- `p`: “Conditions we stop on and refer out. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Severity and affected square footage”
- `li`: “02Contents volume and access”
- `li`: “03Waste type and disposal requirements”
- `li`: “04Utilities, ventilation and occupancy”
- `li`: “05Crew size and project duration”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on extreme-condition cleaning.”
- `summary`: “Can you quote this from photos?”
- `p`: “Photos can support an initial range. Severe or complicated conditions usually require an in-person walkthrough before a firm scope.”
- `summary`: “Is every extreme-condition job accepted?”
- `p`: “No. We decline or refer conditions that exceed our current legal, insurance, training or equipment scope.”
- `h2`: “Often booked alongside”
- `a`: “Hoarding Cleanup”
- `a`: “Estate Cleanouts”
- `a`: “Property Clearing”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /faq/

Source: `src/pages/faq/index.astro`

SEO title: “Frequently Asked Questions | Aseptaclean”

Meta description: “Answers about Aseptaclean estimates, photos, scope, pricing, access and service boundaries.”

- `p`: “Home / FAQ”
- `a`: “Home”
- `p`: “FAQ”
- `h1`: “Straight answers before the property is scheduled.”
- `p`: “If a condition cannot be responsibly assessed online, we will say so.”
- `p`: “Before you request a plan”
- `h2`: “Questions we answer before scheduling”
- `p`: “These answers describe how a project is reviewed and scoped. The signed scope controls the actual work.”
- `summary`: “Can you assess a property from photos?+”
- `p`: “Photos can support an initial review or range when they clearly show every affected room, access, contents volume and condition. Larger or uncertain projects usually need a walkthrough before a firm quote.”
- `summary`: “Do you list prices online?+”
- `p`: “No. Property condition, contents, access, disposal needs, cleaning detail and deadline materially change the work. The agreed price is written after review.”
- `summary`: “Will you remove anything without approval?+”
- `p`: “No. The scope identifies keep, remove and review areas. Uncertain items are held for a decision.”
- `summary`: “Are you insured?+”
- `p`: “Yes. A certificate of insurance is available on request.”
- `summary`: “Do you handle hazardous or human biological material?+”
- `p`: “No. Human biological material, regulated medical waste, hazardous chemicals and other out-of-scope conditions are stopped and referred to an appropriate provider.”
- `summary`: “Do you perform repairs or demolition?+”
- `p`: “No. Aseptaclean is not a contractor. Structural work, demolition, pest treatment and specialty remediation are outside the current scope.”
- `summary`: “Can I manage the project remotely?+”
- `p`: “Often, yes. Access, decision authority, scope approvals, updates and closeout can be handled electronically when the project allows.”
- `summary`: “How soon will you respond?+”
- `p`: “Assessment requests are reviewed within one business day. Job scheduling depends on scope, access, labor and deadline.”
- `p`: “Still deciding?”
- `a`: “The Handoff Standard →”
- `a`: “About Aseptaclean →”
- `a`: “Request an assessment →”
- `a`: “Text a photo →”
- `h3`: “Didn't find your question?”
- `p`: “Assessment response within one business day”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /handoff-standard/

Source: `src/pages/handoff-standard/index.astro`

SEO title: “Our Process | Aseptaclean”

Meta description: “How Aseptaclean scopes, protects, clears, resets and documents property work.”

- `p`: “Home / The Handoff Standard”
- `a`: “Home”
- `p`: “The five-stage handoff standard”
- `h1`: “Decisions first. Work second. Proof at closeout.”
- `p`: “The operating system is designed for properties where vague instructions create expensive mistakes.”
- `p`: “Five-stage standard, in full”
- `h2`: “You should not have to coordinate a hauler, a cleaner, disposal, access, family approvals, and a final walkthrough yourself.”
- `li`: “01ScopeWe write down what stays, what goes, what gets cleaned, what is excluded, and what the project will require.Room-by-room plan · Defined”
- `h3`: “Scope”
- `p`: “We write down what stays, what goes, what gets cleaned, what is excluded, and what the project will require.”
- `li`: “02ProtectKeep areas are identified. Uncertain and important discovered items are separated and reported. We do not decide what mattered to your family.Keep and review controls · Held for review”
- `h3`: “Protect”
- `p`: “Keep areas are identified. Uncertain and important discovered items are separated and reported. We do not decide what mattered to your family.”
- `li`: “03ClearApproved unwanted contents are consolidated, removed, or coordinated for disposal within the signed scope.Clearing status · Complete”
- `h3`: “Clear”
- `p`: “Approved unwanted contents are consolidated, removed, or coordinated for disposal within the signed scope.”
- `li`: “04ResetThe property receives the detailed cleaning included for its next handoff, including animal and organic conditions within lawful scope.Cleaning status · Complete”
- `h3`: “Reset”
- `p`: “The property receives the detailed cleaning included for its next handoff, including animal and organic conditions within lawful scope.”
- `li`: “05VerifyYou receive completion photographs, documented exceptions, and a Property Handoff Record showing how the approved scope was closed.Closeout package · Issued”
- `h3`: “Verify”
- `p`: “You receive completion photographs, documented exceptions, and a Property Handoff Record showing how the approved scope was closed.”
- `p`: “The complete sample record”
- `h2`: “Property Handoff Record — annotated”
- `p`: “Every field below exists because it protects a specific decision. This is the sample used in letters and referrals; a real project's record follows the same structure.”
- `p`: “Room-by-room disposition”
- `p`: “Closeout fields”
- `p`: “Project records document the work performed. They are not regulatory clearance, inspection approval, environmental certification, or a determination that a property is safe or habitable.”
- `p`: “Who relies on this”
- `h2`: “The record is written to hold up outside the project, too.”
- `h3`: “Family”
- `p`: “A single written record of what stayed, what left, and what was cleaned — instead of relying on memory during an already difficult time.”
- `h3`: “Executor”
- `p`: “Documentation that scope was approved and completed as authorized, for the estate file.”
- `h3`: “Attorney”
- `p`: “A citable standard to reference when advising a client on what a cleanout vendor should provide in writing.”
- `h3`: “Property manager”
- `p`: “A completion record with photographs and exceptions that can be handed to an owner or the next tenant file.”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /hoarding-cleanup-san-jose/

Source: `src/pages/hoarding-cleanup-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Hoarding Cleanup in San Jose & South Bay | Aseptaclean”

Meta description: “Structured hoarding cleanup in the South Bay & Peninsula. Keep, remove and review decisions are agreed in writing — nothing leaves without your approval.”

- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Property Clearing / Hoarding Cleanup”
- `a`: “Home”
- `a`: “Property Clearing”
- `p`: “Property Clearing · South Bay & Peninsula”
- `h1`: “Hoarding cleanup in San Jose, without throwing away what matters”
- `p`: “A staged clearing and cleaning process for heavily accumulated properties, with decisions, priorities and boundaries established before items are moved.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “When families call us about a hoarding condition”
- `li`: “Accumulated contents block rooms or pathways”
- `li`: “A family or owner needs a staged plan”
- `li`: “Items require keep/remove review”
- `li`: “Cleaning cannot begin until access is restored”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “Progress without treating the property like a dumpster.”
- `p`: “The work is divided into zones and decisions. That protects important items, keeps the crew productive and makes the next phase of cleaning possible.”
- `li`: “Condition and access walkthrough”
- `li`: “Keep, remove and review categories”
- `li`: “Room-by-room clearing plan”
- `li`: “Bagging, staging and disposal coordination”
- `li`: “Cleaning of released areas when included”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Forced removal without authorized direction”
- `li`: “Human biological material or regulated waste”
- `li`: “Pest treatment or structural repair”
- `li`: “Unknown chemicals, weapons or hazardous materials”
- `p`: “Conditions we stop on and refer out. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Volume and density of contents”
- `li`: “02Decision-making requirements”
- `li`: “03Waste types and pests”
- `li`: “04Utilities and safe access”
- `li`: “05Number of stages and crew days”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on hoarding cleanup.”
- `summary`: “Do you throw everything away?”
- `p`: “No. Removal rules are agreed in advance, and uncertain items can be placed in a review area for the authorized decision-maker.”
- `summary`: “Can the cleanup happen in stages?”
- `p`: “Yes. Staging is often the safest and most practical approach for dense or emotionally difficult properties.”
- `h2`: “Often booked alongside”
- `a`: “Estate Cleanouts”
- `a`: “Extreme-Condition Cleaning”
- `a`: “Move-In & Move-Out Cleaning”
- `h3`: “Free resource”
- `a`: “The Executor's Estate Cleanout Checklist”
- `p`: “Written for executors clearing an estate, but the sorting and vendor-selection sections apply to any heavy-contents property.”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /move-out-cleaning-san-jose/

Source: `src/pages/move-out-cleaning-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Move-In & Move-Out Cleaning in San Jose | Aseptaclean”

Meta description: “Move-out and move-in cleaning in the South Bay & Peninsula, scoped in writing before the crew arrives and timed to your walkthrough date. Owner-operated.”

- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Detailed Cleaning / Move-In & Move-Out Cleaning”
- `a`: “Home”
- `a`: “Detailed Cleaning”
- `p`: “Detailed Cleaning · South Bay & Peninsula”
- `h1`: “Move-out cleaning in San Jose, timed to your walkthrough date”
- `p`: “Vacant-property cleaning built around the handoff: keys, listing photos, a final walkthrough, a lease turnover or a clean start in a new home.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “When a move-out clean is the right scope”
- `li`: “A property is vacant or nearly vacant”
- `li`: “A tenant or owner is preparing for handoff”
- `li`: “Cabinets, appliances and fixtures need detailing”
- `li`: “There is a firm move or listing deadline”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “Cleaned for the next person—not merely touched up.”
- `p`: “The work is organized around the property’s next event, with priority given to the rooms and surfaces that affect a walkthrough, listing or move-in.”
- `li`: “Kitchen, bathroom and cabinet interiors”
- `li`: “Baseboards, doors, trim and reachable fixtures”
- `li`: “Interior glass and tracks when included”
- `li`: “Floor cleaning based on surface type”
- `li`: “Final-detail pass against the approved scope”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Carpet extraction unless separately arranged”
- `li`: “Wall repair or paint correction”
- `li`: “Abandoned contents not included in the quote”
- `li`: “Damage caused by wear, staining or failed finishes”
- `p`: “What move-out cleaning does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Square footage and occupancy status”
- `li`: “02Cabinet, appliance and window count”
- `li`: “03Condition left by the prior occupant”
- `li`: “04Elevator, parking and access limits”
- `li`: “05Turnover deadline”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on move-in & move-out cleaning.”
- `summary`: “Does the home need to be empty?”
- `p`: “Vacant properties are the best fit. Limited remaining contents can be discussed, but they affect access and price.”
- `summary`: “Can you work around a closing or lease deadline?”
- `p`: “Sometimes. Availability depends on property size, condition and how soon the scope is approved.”
- `h2`: “Often booked alongside”
- `a`: “Estate Cleanouts”
- `a`: “Debris Removal”
- `a`: “Property Clearing”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /pigeon-dropping-cleanup-san-jose/

Source: `src/pages/pigeon-dropping-cleanup-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Pigeon Dropping Cleanup in San Jose | Aseptaclean”

Meta description: “Condition-reviewed pigeon dropping cleanup for accessible residential and commercial property areas in the South Bay & Peninsula.”

- `p`: “LAUNCH GATE — not for publication: Compliance release pending — docs/27-COPY-CANONICAL.md §21 release inputs (insurance wording for the specific terminology, pest-control/cleanup licensing boundary confirmation, disposal procedure, PPE and work-zone limits, final claims review) are not on record. Ships noindex per §21 'Current status' and §13 'gated'; owner decision 2026-08-16 chose the gated path over SITEMAP-MASTER's ungated column.”
- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Specialty Cleaning / Pigeon Dropping Cleanup”
- `a`: “Home”
- `a`: “Specialty Cleaning”
- `p`: “Specialty Cleaning · South Bay & Peninsula”
- `h1`: “Pigeon dropping cleanup in San Jose for balconies, roofs and entryways”
- `p`: “Cleanup for accepted pigeon-dropping conditions on safely accessible surfaces after roosting, exclusion and active bird issues are addressed.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `p`: “Cleaning only — not a decontamination, sterilization, or health-safety determination.”
- `h2`: “This service may fit when”
- `li`: “Droppings affect an accessible balcony or surface”
- `li`: “The active bird source has been addressed”
- `li`: “The work area can be controlled”
- `li`: “The property needs a defined cleaning scope”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “A controlled cleanup plan for accessible affected areas.”
- `p`: “The assessment determines whether the work can be handled as cleaning or needs a specialized access, bird-control or remediation provider.”
- `li`: “Condition and access review”
- `li`: “Controlled wet cleanup of accepted deposits”
- `li`: “Cleaning of approved nonporous surfaces”
- `li`: “Bagging and staging as defined”
- `li`: “Work-area closeout review”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Bird removal, trapping or exclusion”
- `li`: “Roof work or unsafe high access”
- `li`: “Structural repair or damaged-material replacement”
- `li`: “Conditions beyond current equipment or regulatory scope”
- `p`: “What this scope does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Deposit amount and affected surface”
- `li`: “02Height and fall exposure”
- `li`: “03Ventilation and public access”
- `li`: “04Surface porosity and damage”
- `li`: “05Bird-exclusion status”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on pigeon dropping cleanup.”
- `summary`: “Do you install bird spikes or exclusion systems?”
- `p`: “No. Bird exclusion is separate from cleanup and should be completed by the appropriate provider.”
- `summary`: “Can you clean a roof?”
- `p`: “Only safely accessible areas are considered. Roof and high-access conditions may be declined or referred.”
- `h2`: “Often booked alongside”
- `a`: “Animal Waste Cleanup”
- `a`: “Rodent Dropping Cleanup”
- `a`: “Debris Removal”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /post-construction-cleaning-san-jose/

Source: `src/pages/post-construction-cleaning-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Post-Construction Cleaning in San Jose | Aseptaclean”

Meta description: “Post-construction and post-remodel cleaning for completed projects in the South Bay & Peninsula.”

- `p`: “LAUNCH GATE — not for publication: Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for this service is confirmed (docs/SITEMAP-MASTER.md).”
- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Detailed Cleaning / Post-Construction Cleaning”
- `a`: “Home”
- `a`: “Detailed Cleaning”
- `p`: “Detailed Cleaning · South Bay & Peninsula”
- `h1`: “Post-construction cleaning in San Jose, after the trades are done”
- `p`: “Detailed removal of settled construction dust and surface residue after repairs or remodeling are complete and the trades are out of the work area.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “This service may fit when”
- `li`: “Renovation dust remains on horizontal surfaces”
- `li`: “Cabinets, fixtures and floors need a final detail”
- `li`: “The construction work is substantially complete”
- `li`: “The property must be prepared for occupancy or presentation”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “A final-clean scope for completed renovation work.”
- `p`: “Post-construction cleaning is priced differently from ordinary house cleaning because fine dust travels, resettles and requires a deliberate top-to-bottom sequence.”
- `li`: “Controlled dry removal of fine settled dust”
- `li`: “Detailed wiping of reachable surfaces and fixtures”
- `li`: “Cabinet, trim, ledge and baseboard detailing”
- `li`: “Interior glass cleaning when included”
- `li`: “Final floor cleaning appropriate to the surface”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Active construction areas”
- `li`: “Paint, grout, concrete or adhesive correction”
- `li`: “High-access exterior work without approved equipment”
- `li`: “Contractor punch-list or structural work”
- `p`: “What this scope does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Project size and construction type”
- `li`: “02Whether trades are fully finished”
- `li`: “03Amount and distribution of fine dust”
- `li`: “04Height, access and glass quantity”
- `li`: “05Protective films, stickers or adhesive residue”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on post-construction cleaning.”
- `summary`: “Can cleaning start while contractors are still working?”
- `p`: “A rough pass may be possible, but the final clean should happen after dusty trades finish and the work area is released.”
- `summary`: “Do you remove paint or hardened construction residue?”
- `p`: “Only when the material and surface can be handled safely and the task is specifically included. Surface correction is not assumed.”
- `h2`: “Often booked alongside”
- `a`: “Window Cleaning”
- `a`: “Move-In & Move-Out Cleaning”
- `a`: “Debris Removal”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /privacy/

Source: `src/pages/privacy.astro`

SEO title: “Privacy Policy | Aseptaclean”

Meta description: “Read Aseptaclean’s Termly-managed Privacy Policy or access the provider fallback.”

- `p`: “Home / Privacy Policy”
- `a`: “Home”
- `p`: “Legal record · Managed by Termly”
- `h1`: “Privacy Policy”
- `p`: “This page is an integration surface for Aseptaclean’s provider-controlled policy document. Aseptaclean does not replace the provider’s published policy with locally drafted legal text.”
- `p`: “Your browser does not support iframes.”
- `p`: “Provider fallback”
- `h2`: “If the policy does not load”
- `p`: “Provider content can be unavailable when JavaScript is disabled, a content blocker intervenes, or Termly is temporarily unreachable.”
- `a`: “Contact Aseptaclean about privacy or legal access”

## /private-residence-reset/

Source: `src/pages/private-residence-reset.astro`

SEO title: “Private Residence Reset in San Jose & South Bay | Aseptaclean”

Meta description: “A structured whole-home deep reset with a written room-by-room scope, controlled changes, and final completion review. Serving the South Bay & Peninsula.”

- `p`: “Private Residence Reset”
- `h1`: “Bring the entire residence back to a defined standard.”
- `p`: “A structured, detail-intensive whole-home reset for homeowners who need more than routine maintenance cleaning—and want the property, priorities, sequencing, and completion handled under one written scope.”
- `a`: “Request a Private Residence Assessment”
- `p`: “Send property details and photographs. Aseptaclean will review the home, desired outcome, priority areas, and whether an on-site walkthrough is required.”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.”
- `p`: “Credited toward an approved project booked within 7 days. Final pricing follows the defined scope.”
- `p`: “01 / The distinction”
- `h2`: “This is not routine housekeeping.”
- `p`: “Maintenance cleaning keeps a known baseline in place. A Private Residence Reset is for the moment when deeper detail work, multiple priority rooms, finish instructions, access, and a real completion standard need to be defined together.”
- `p`: “The engagement begins with the residence and the desired outcome—not a generic checklist or an open-ended promise to clean everything.”
- `p`: “02 / The restored baseline”
- `h2`: “Walk back into a residence that feels settled again.”
- `p`: “The deeper details no longer accumulate in the background. Priority rooms feel finished rather than merely surface-clean, and the work is no longer an open task list you have to manage room by room.”
- `p`: “Important finishes, restricted areas, access, and pet instructions are already documented. Completion is reviewed against the baseline you approved.”
- `p`: “03 / Aseptaclean Residence Baseline”
- `h2`: “A defined path through the whole residence.”
- `li`: “01AssessReview the residence, desired outcome, priority rooms, finishes, access, and timing.”
- `h3`: “Assess”
- `p`: “Review the residence, desired outcome, priority rooms, finishes, access, and timing.”
- `li`: “02DefineWrite the room-by-room baseline, including what is included, restricted, or separately scoped.”
- `h3`: “Define”
- `p`: “Write the room-by-room baseline, including what is included, restricted, or separately scoped.”
- `li`: “03ResetComplete the approved detail-intensive work in the agreed sequence.”
- `h3`: “Reset”
- `p`: “Complete the approved detail-intensive work in the agreed sequence.”
- `li`: “04VerifyReview completion room by room and record changes, exceptions, and remaining decisions.”
- `h3`: “Verify”
- `p`: “Review completion room by room and record changes, exceptions, and remaining decisions.”
- `li`: “05MaintainAfter the baseline is established, select residences may be invited to quarterly care.”
- `h3`: “Maintain”
- `p`: “After the baseline is established, select residences may be invited to quarterly care.”
- `p`: “04 / The operating record”
- `h2`: “The details live in the baseline—not in assumptions.”
- `p`: “Each priority room, included surface, finish note, restricted area, access instruction, approved change, and completion status has a visible place.”
- `p`: “SAMPLE / OPERATING DOCUMENT”
- `h2`: “Residence Baseline Record”
- `dt`: “Residence”
- `dd`: “Example South Bay home”
- `dt`: “Reset type”
- `dd`: “Initial whole-home baseline”
- `dt`: “Access”
- `dd`: “Owner-authorized window”
- `dt`: “Pet note”
- `dd`: “Interior cat · confirm secure room”
- `h3`: “Kitchen”
- `dt`: “Included”
- `dd`: “Cabinet faces · appliance exteriors · detail cleaning”
- `dt`: “Finish / access note”
- `dd`: “Natural-stone cleaner only”
- `dt`: “Completion review”
- `dd`: “Review complete”
- `h3`: “Primary suite”
- `dt`: “Included”
- `dd`: “Accessible surfaces · closet shelves · baseboards”
- `dt`: “Finish / access note”
- `dd`: “Do not move wardrobe contents”
- `dt`: “Completion review”
- `dd`: “Review complete”
- `h3`: “Living areas”
- `dt`: “Included”
- `dd`: “High dusting · trim · doors · floors”
- `dt`: “Finish / access note”
- `dd`: “Protect oiled-wood finish”
- `dt`: “Completion review”
- `dd`: “Review complete”
- `h3`: “Guest room”
- `dt`: “Included”
- `dd`: “No entry”
- `dt`: “Finish / access note”
- `dd`: “Owner-restricted area”
- `dt`: “Completion review”
- `dd`: “Exception noted”
- `figcaption`: “Sample only. The actual record reflects the approved residence, finishes, access instructions, scope, changes, and exceptions.”
- `p`: “05 / Scope boundary”
- `h2`: “The residence is considered as a whole. The scope is still exact.”
- `h3`: “Work that may be included”
- `li`: “Whole-home deep-cleaning scope built around the residence”
- `li`: “Kitchen and bathroom detail work”
- `li`: “Floors, baseboards, doors, trim, and accessible surfaces”
- `li`: “Cabinet, appliance, closet, or high-dusting priorities when listed”
- `li`: “Finish, restricted-area, access, parking, and pet instructions”
- `li`: “Room-by-room completion review and documented exceptions”
- `h3`: “Separately scoped or outside the offer”
- `li`: “Organizing, laundry, or extensive dishes”
- `li`: “Upholstery or carpet extraction”
- `li`: “Exterior windows”
- `li`: “Heavy contents movement”
- `li`: “Animal-waste or severe-contamination conditions”
- `li`: “Post-construction residue”
- `li`: “Hauling or disposal”
- `li`: “Hazardous, regulated, structural, or other work outside Aseptaclean’s current lawful and insured scope”
- `p`: “Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “06 / Property instructions”
- `h2`: “The home’s instructions stay attached to the work.”
- `dt`: “Scope and change control”
- `dd`: “Added work, materials, access, or timing changes are documented before they proceed.”
- `dt`: “Finishes and restricted areas”
- `dd`: “Known surface requirements and no-entry areas are recorded room by room.”
- `dt`: “Access, pets, and privacy”
- `dd`: “Entry windows, presence, parking, alarms, pet instructions, and property media are handled as project information—not marketing proof.”
- `dt`: “Completion review”
- `dd`: “The approved baseline, authorized changes, and known exceptions define what completion means.”
- `p`: “07 / Starting context and fit”
- `h2`: “A whole-home baseline begins with a whole-home view.”
- `p`: “Final pricing for an Initial Residence Reset depends on residence size, current condition, priority rooms, included detail areas, finishes, access, labor, and timing.”
- `h3`: “Quarterly Residence Reset Care”
- `p`: “Select residences may qualify after the initial baseline is established. The invitation is based on fit, continuity, and available service windows; it is not a public recurring-housekeeping calendar.”
- `p`: “08 / Request an assessment”
- `h2`: “Start with the rooms and details that matter most.”
- `p`: “Share the residence, priority areas, important finishes, access, and desired completion date. Aseptaclean will review whether the project fits and what should happen next within one business day.”
- `a`: “Request a Private Residence Assessment”

## /projects/

Source: `src/pages/projects/index.astro`

SEO title: “Projects & Property Handoffs | Aseptaclean”

Meta description: “The project types Aseptaclean reviews and the proof required before work is shown publicly.”

- `p`: “Home / Projects”
- `a`: “Home”
- `p`: “Projects”
- `h1`: “Real work will appear here only when it can be shown honestly.”
- `p`: “No stock transformations, borrowed photographs or invented case studies. Public project records require client permission and verifiable scope details.”
- `p`: “Project types”
- `h2`: “Property work with a defined handoff.”
- `li`: “Estate and family-directed cleanouts”
- `li`: “Hoarding and heavy-content properties”
- `li`: “Move-out and listing-ready resets”
- `li`: “Post-construction final cleaning”
- `li`: “Small commercial detail projects”
- `p`: “Publication standard”
- `h2`: “What a future case study must include.”
- `p`: “Every published project should state the original condition, approved scope, important exclusions, work completed and documented exceptions. Before-and-after images must belong to Aseptaclean and have permission for public use.”
- `p`: “Until that proof exists, this page describes project types rather than pretending to be a portfolio.”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /property-cleanouts-san-jose/

Source: `src/pages/property-cleanouts-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Property Cleanout Services in San Jose | Aseptaclean”

Meta description: “Property cleanouts in the South Bay & Peninsula. Keep, remove and review are agreed in writing — nothing leaves the property without your approval.”

- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Property Clearing / Property Cleanouts”
- `a`: “Home”
- `a`: “Property Clearing”
- `p`: “Property Clearing · South Bay & Peninsula”
- `h1`: “Property cleanouts in San Jose that keep a vacancy on schedule”
- `p`: “Structured clearing for properties with unwanted contents, debris or accumulated material—organized around access, decision rights and the next use of the property.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “When a property cleanout is the right scope”
- `li`: “A property cannot be cleaned until contents are cleared”
- `li`: “Items must be separated into keep, remove and uncertain”
- `li`: “A landlord or owner needs a turnover plan”
- `li`: “The volume requires staging or container coordination”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “A property cleared with decisions made before removal.”
- `p`: “Cleanouts go wrong when every item is treated as trash. We define authority, sorting rules, staging and disposal before the crew begins.”
- `li`: “Walkthrough and contents-volume review”
- `li`: “Defined keep, remove and do-not-touch zones”
- `li`: “Bagging, sorting and staging”
- `li`: “Container or approved disposal coordination”
- `li`: “Optional cleaning after clearing”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Unknown hazardous materials”
- `li`: “Documents, valuables or keepsakes without direction”
- `li`: “Structural demolition”
- `li`: “Unpermitted hauling or disposal”
- `p`: “What a cleanout does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Volume, weight and material types”
- `li`: “02Stairs, elevators and loading access”
- `li`: “03Decision-maker availability”
- `li`: “04Container and disposal requirements”
- `li`: “05Cleaning required after removal”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `p`: “The Handoff Standard →”
- `a`: “The Handoff Standard →”
- `h2`: “Questions we get on property cleanouts.”
- `summary`: “Do you haul everything away yourself?”
- `p`: “Disposal may use containers or appropriate third-party providers depending on the city, volume and material type.”
- `summary`: “Can cleaning be added after the cleanout?”
- `p`: “Yes. A separate cleaning phase can be scoped once surfaces and rooms become accessible.”
- `h2`: “Often booked alongside”
- `a`: “Estate Cleanouts”
- `a`: “Hoarding Cleanup”
- `a`: “Debris Removal”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /property-clearing/

Source: `src/pages/property-clearing/index.astro`

SEO title: “Property Clearing | San Jose | Aseptaclean”

Meta description: “Property cleanouts, hoarding cleanup, and estate cleanouts — one written scope, one accountable operator, one documented closeout. South Bay & Peninsula.”

- `p`: “Photo slot1800 × 700”
- `p`: “Home / Property Clearing”
- `a`: “Home”
- `h1`: “Clear the contents. Recover access. Prepare the property.”
- `p`: “Property clearing is organized around authority, sorting rules, access and a legal disposal plan before cleaning begins.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “5 services in this group”
- `h2`: “Pick the page that matches the property’s next event.”
- `h3`: “Property Cleanouts”
- `p`: “Full-contents clearing under one scope”
- `a`: “Property Cleanouts — what’s includedWhat’s included→”
- `h3`: “Hoarding Cleanup”
- `p`: “Sorted, approved, documented”
- `a`: “Hoarding Cleanup — what’s includedWhat’s included→”
- `h3`: “Estate Cleanouts”
- `p`: “Heirs, executors, real deadlines”
- `a`: “Estate Cleanouts — what’s includedWhat’s included→”
- `h3`: “Debris Removal”
- `p`: “Approved, lawful disposal”
- `a`: “Debris Removal — what’s includedWhat’s included→”
- `h3`: “Eviction Cleanouts”
- `p`: “Turnover on a clock”
- `a`: “Eviction Cleanouts — what’s includedWhat’s included→”
- `h2`: “We define the work before we schedule it.”
- `p`: “Photos can start the review. Larger, heavier or more complicated properties may require a walkthrough before a firm quote.”
- `h3`: “01 — Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `h3`: “02 — Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `h3`: “03 — Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “04 — Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h3`: “Working against a listing, transfer or family deadline?”
- `p`: “Assessment response within one business day”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /request-assessment/

Source: `src/pages/request-assessment.astro`

SEO title: “Request a Property Assessment | Aseptaclean”

Meta description: “Share property details for an Aseptaclean Handoff Reset fit decision, preliminary scope direction, and clear next step.”

- `p`: “Property Handoff Plan”
- `h1`: “Start with the property. We’ll review the path to handoff.”
- `p`: “Share the property, scope, and approval details Aseptaclean needs to make a fit decision and identify a clear next step.”
- `dt`: “Time to complete”
- `dd`: “Approximately 3–5 minutes”
- `dt`: “Helpful evidence”
- `dd`: “Property photos or video”
- `dt`: “Response”
- `dd`: “within one business day”
- `p`: “Handoff plan intake record”
- `p`: “Draft · Not an approved scope”
- `li`: “01Property fitPropertyLocation, transition, size, and timing”
- `li`: “02Scope and conditionScopeAreas, clearing, cleaning, and condition flags”
- `li`: “03Authority and contactAuthorityDecision authority and response details”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Photos recommended · Information and media are used only to evaluate this request.”
- `button`: “Forget saved progress”
- hidden `h2`: “Review the highlighted fields”
- `legend`: “Step 1 of 3Property fit”
- `p`: “Begin with the property’s location, transition, approximate size, and required timing.”
- `p`: “Fields marked *required are required.”
- `label`: “Property city *”
- `label`: “Property type *”
- `option`: “Select a property type”
- `option`: “Single-family home”
- `option`: “Townhome”
- `option`: “Condominium”
- `option`: “Apartment or unit”
- `option`: “Duplex or multifamily property”
- `option`: “Other residential property”
- `option`: “Not sure”
- `legend`: “Is the property vacant? *”
- `label`: “Yes”
- `label`: “No”
- `label`: “Not sure”
- `label`: “What is happening with the property? *”
- `option`: “Select the closest situation”
- `option`: “Inherited or estate property”
- `option`: “Preparing to sell”
- `option`: “Landlord turnover”
- `option`: “Difficult move-out”
- `option`: “Accumulated contents”
- `option`: “Overwhelmed property”
- `option`: “Already empty but requires detailed cleaning”
- `option`: “Move-in whole-home reset”
- `option`: “Seasonal or pre-event whole-home reset”
- `option`: “Second-home reopening”
- `option`: “Establishing a whole-home cleaning baseline”
- `option`: “Other”
- `label`: “Desired completion date *”
- `p`: “Share the actual target even if timing is urgent or uncertain.”
- `label`: “Approximate square footage *”
- `option`: “Select a range”
- `option`: “Under 1,000 sq. ft.”
- `option`: “1,000–1,499 sq. ft.”
- `option`: “1,500–1,999 sq. ft.”
- `option`: “2,000–2,999 sq. ft.”
- `option`: “3,000–3,999 sq. ft.”
- `option`: “4,000+ sq. ft.”
- `option`: “Not sure”
- `button`: “Continue to scope and condition”
- hidden `legend`: “Step 2 of 3Scope and condition”
- hidden `p`: “Identify the areas involved, likely work, and any conditions that may require a stop, specialist review, or referral.”
- hidden `legend`: “Areas involved *”
- hidden `p`: “Select every area that may be part of the request.”
- hidden `label`: “Whole interior”
- hidden `label`: “Kitchen”
- hidden `label`: “Bathrooms”
- hidden `label`: “Bedrooms”
- hidden `label`: “Living or common areas”
- hidden `label`: “Closets”
- hidden `label`: “Garage”
- hidden `label`: “Attic”
- hidden `label`: “Basement”
- hidden `label`: “Shed or storage area”
- hidden `label`: “Exterior contents”
- hidden `label`: “Other”
- hidden `h2`: “Work to consider”
- hidden `legend`: “Is unwanted contents removal needed? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `legend`: “Is heavy cleaning needed? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `legend`: “Is a garage or storage area included? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `legend`: “Should appliance interiors be considered? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `legend`: “Should cabinet interiors be considered? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `p`: “Condition review”
- hidden `h2`: “Known conditions at the property”
- hidden `p`: “Answering ‘Yes’ does not mean Aseptaclean provides treatment or regulated handling. These answers help identify work that may be outside the current scope.”
- hidden `legend`: “Known animal waste? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `legend`: “Known human blood, bodily fluids, or other biological material? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `legend`: “Known needles or sharps? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `legend`: “Known sewage? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `legend`: “Known or suspected mold? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `legend`: “Known pest activity? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `label`: “Not sure”
- hidden `p`: “Human biological material, needles or sharps, sewage, active mold, and other prohibited or hazardous conditions may require work in the affected area to stop and may require specialist review or referral. Do not disturb material for the purpose of this assessment.”
- hidden `p`: “Residence baseline”
- hidden `h2`: “Rooms, finishes, access, and priorities”
- hidden `p`: “Describe the baseline you want established. These answers shape the room-by-room assessment; they do not authorize work.”
- hidden `label`: “Number of levels *”
- hidden `option`: “Select a level count”
- hidden `option`: “1”
- hidden `option`: “2”
- hidden `option`: “3+”
- hidden `label`: “Residence status *”
- hidden `option`: “Select a status”
- hidden `option`: “Occupied”
- hidden `option`: “Temporarily vacant”
- hidden `option`: “Move-in pending”
- hidden `option`: “Second home”
- hidden `label`: “Priority rooms or areas *”
- hidden `label`: “Detail priorities *”
- hidden `label`: “Important surfaces or finishes”
- hidden `label`: “Pets or animal instructions”
- hidden `label`: “Will someone be present?”
- hidden `option`: “Select an answer”
- hidden `option`: “Yes”
- hidden `option`: “No”
- hidden `option`: “Part of the time”
- hidden `option`: “Not sure”
- hidden `label`: “Desired investment range”
- hidden `option`: “Select a range”
- hidden `option`: “$2,000–$3,499”
- hidden `option`: “$3,500–$5,999”
- hidden `option`: “$6,000+”
- hidden `option`: “Need scope guidance”
- hidden `label`: “Known condition requiring specialist review? *”
- hidden `option`: “Select an answer”
- hidden `option`: “No known condition”
- hidden `option`: “Possibly / not sure”
- hidden `option`: “Yes”
- hidden `p`: “This does not imply service availability. Hazardous, regulated, severe-contamination, or specialist conditions are outside this campaign offer.”
- hidden `label`: “Property photos or video (strongly recommended)”
- hidden `p`: “Include wide room views and details that affect access or scope. Do not upload identification, financial records, or other documents unless directly necessary to show the property condition.”
- hidden `p`: “Up to 10 files. Images up to 10 MB each; videos up to 50 MB each; 75 MB combined.”
- hidden `p`: “No files selected.”
- hidden `p`: “No property files selected.”
- hidden `label`: “Access notes”
- hidden `label`: “What must remain? *”
- hidden `label`: “What must be removed? *”
- hidden `button`: “Back to property fit”
- hidden `button`: “Continue to authority and contact”
- hidden `legend`: “Step 3 of 3Authority and contact”
- hidden `p`: “A clear decision-maker is required before Aseptaclean can define or approve a project scope.”
- hidden `label`: “Full name *”
- hidden `label`: “Phone *”
- hidden `p`: “We call this number back — usually same business day.”
- hidden `label`: “Email *”
- hidden `label`: “Relationship to the property *”
- hidden `option`: “Select your relationship”
- hidden `option`: “Property owner”
- hidden `option`: “Heir or family representative”
- hidden `option`: “Executor or estate representative”
- hidden `option`: “Landlord”
- hidden `option`: “Property manager”
- hidden `option`: “Real estate professional”
- hidden `option`: “Other authorized representative”
- hidden `legend`: “Are you authorized to approve the work? *”
- hidden `label`: “Yes”
- hidden `label`: “No”
- hidden `p`: “If not, explain who controls approval in the additional notes.”
- hidden `label`: “Property address *”
- hidden `p`: “This is used to evaluate service area, access, and logistics. It is not published.”
- hidden `label`: “Property ZIP *”
- hidden `legend`: “Preferred contact method *”
- hidden `label`: “Phone call”
- hidden `label`: “Text message”
- hidden `label`: “Email”
- hidden `label`: “Best contact time”
- hidden `option`: “Select a time window”
- hidden `option`: “Morning — 8 a.m. to noon”
- hidden `option`: “Afternoon — noon to 5 p.m.”
- hidden `option`: “Evening — after 5 p.m.”
- hidden `option`: “No preference”
- hidden `label`: “Additional notes”
- hidden `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy. I understand that my information and property media will be used to evaluate the requested project. I have also read the Terms and Conditions.*”
- hidden `a`: “Privacy Policy”
- hidden `a`: “Terms and Conditions”
- hidden `label`: “I understand that this request begins a fit review and does not authorize work, create a service agreement, or reserve a project date. *”
- hidden `p`: “Submitting this form authorizes Aseptaclean to contact you. It does not authorize work or create a service agreement.”
- hidden `p`: “Security verification is required before submission.”
- hidden `button`: “Back to scope and condition”
- hidden `button`: “Submit My Handoff Plan Request”
- hidden `p`: “A fit review is not a quote, booking confirmation, or service agreement.”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “What happens next”
- `h2`: “Matthew reads every request himself.”
- `li`: “01Send the details below — two or three phone photos help more than a long description.”
- `p`: “Send the details below — two or three phone photos help more than a long description.”
- `li`: “02If the property is complicated, we’ll say whether a walkthrough is needed before a firm number.”
- `p`: “If the property is complicated, we’ll say whether a walkthrough is needed before a firm number.”
- `li`: “03The scope and price come to you in writing before anything is scheduled.”
- `p`: “The scope and price come to you in writing before anything is scheduled.”
- `textarea name=priority_rooms`: placeholder “List the rooms that matter most and what should feel different at completion.”
- `textarea name=detail_priorities`: placeholder “Appliance or cabinet interiors, closets, interior windows, high dusting, trim, or other detail areas.”
- `textarea name=important_finishes`: placeholder “Natural stone, oiled wood, specialty fixtures, delicate surfaces, restricted products, or areas not to disturb.”
- `textarea name=access_notes`: placeholder “Stairs, elevators, gates, parking, keys, occupants, or access restrictions”
- `textarea name=must_remain`: placeholder “Describe keep areas, items, documents, or anything requiring review. Enter ‘Nothing identified’ if none.”
- `textarea name=must_remove`: placeholder “Describe unwanted contents, rooms, or categories. Enter ‘Not sure’ if the scope is still being decided.”
- `textarea name=additional_notes`: placeholder “Share decision-maker details, timing constraints, or other context that would help with the fit review.”

## /rodent-dropping-cleanup-san-jose/

Source: `src/pages/rodent-dropping-cleanup-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Rodent Dropping Cleanup in San Jose | Aseptaclean”

Meta description: “Condition-reviewed rodent dropping cleanup for homes and properties across the South Bay & Peninsula.”

- `p`: “LAUNCH GATE — not for publication: Compliance release pending — docs/27-COPY-CANONICAL.md §21 release inputs (insurance wording for the specific terminology, pest-control/cleanup licensing boundary confirmation, disposal procedure, PPE and work-zone limits, final claims review) are not on record. Ships noindex per §21 'Current status' and §13 'gated'; owner decision 2026-08-16 chose the gated path over SITEMAP-MASTER's ungated column.”
- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Specialty Cleaning / Rodent Dropping Cleanup”
- `a`: “Home”
- `a`: “Specialty Cleaning”
- `p`: “Specialty Cleaning · South Bay & Peninsula”
- `h1`: “Rodent dropping cleanup in San Jose, after pest control has done its part”
- `p`: “Cleanup of accepted rodent-dropping conditions after active pest control and entry-point work are handled by the appropriate provider.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `p`: “Cleaning only — not a decontamination, sterilization, or health-safety determination.”
- `h2`: “This service may fit when”
- `li`: “Droppings remain after pest activity”
- `li`: “The affected areas can be safely accessed”
- `li`: “Pest control has addressed the active source”
- `li`: “The property needs a written cleanup scope”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “Cleanup separated from pest control and construction.”
- `p`: “Aseptaclean defines the cleanable surfaces and affected areas. Extermination, exclusion, insulation and structural work remain separate trades.”
- `li`: “Affected-area review and work-zone planning”
- `li`: “Controlled collection using appropriate wet methods”
- `li`: “Cleaning of approved accessible surfaces”
- `li`: “Contents handling when specifically included”
- `li`: “Final visual review against the scope”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Pest extermination or entry-point sealing”
- `li`: “Insulation removal or replacement”
- `li`: “Structural demolition or repair”
- `li`: “Conditions requiring a different regulated remediation provider”
- `p`: “What this scope does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Extent and age of contamination”
- `li`: “02Attic, crawlspace or living-area access”
- `li`: “03Insulation and porous materials”
- `li`: “04Contents volume”
- `li`: “05Pest-control status”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on rodent dropping cleanup.”
- `summary`: “Should pest control come first?”
- `p`: “Yes. Active infestation and entry points should be addressed before final cleanup so the condition does not immediately return.”
- `summary`: “Do you remove attic insulation?”
- `p`: “No. Insulation removal and replacement are outside this cleaning scope and may require an appropriately licensed provider.”
- `h2`: “Often booked alongside”
- `a`: “Animal Waste Cleanup”
- `a`: “Pigeon Dropping Cleanup”
- `a`: “Extreme-Condition Cleaning”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /senior-downsizing-san-jose/

Source: `src/pages/senior-downsizing-san-jose/index.astro`

SEO title: “Senior Downsizing & Move-Out Support | San Jose | Aseptaclean”

Meta description: “Respectful downsizing support when a parent moves — sorting, set-aside controls, clearing, and cleaning under one signed scope. San Jose & South Bay.”

- `p`: “Senior Downsizing & Move-Out Support · San Jose”
- `h1`: “Support for a parent's move to a smaller place”
- `p`: “This is about a move, not a loss. Sorting, deciding what comes along, and getting the property ready for its next chapter — all under one written plan.”
- `h2`: “A fresh start, handled at a pace that works”
- `p`: “Downsizing means deciding what matters enough to bring, what a family member might want, and what's simply ready to go. None of that has to happen in a single overwhelming weekend.”
- `p`: “A written scope means your parent — or you, managing it for them — knows exactly what's being cleared, cleaned, and kept before anyone starts, with nothing removed that wasn't approved first.”
- `p`: “What this covers”
- `h2`: “What downsizing support covers”
- `li`: “Sorting with a keep / donate-or-gift / clear framework, room by room”
- `li`: “Set-aside handling for items going to family members or a new residence”
- `li`: “Nonhazardous contents clearing and approved disposal coordination”
- `li`: “Deep cleaning of the property after clearing, for listing or handoff”
- `li`: “Discovered-item isolation and reporting — documents, photographs, jewelry, keys”
- `li`: “Completion photographs and a documented closeout”
- `p`: “Some conditions sit outside our current scope — see the full exclusion list in the Handoff Standard. The Handoff Standard →”
- `a`: “The Handoff Standard →”
- `p`: “Referral partners”
- `h2`: “For senior move managers and care coordinators”
- `p`: “If you're recommending a vendor to a client's family, this is the page to share before the move: a written scope, documented closeout, and a single accountable operator for the clearing and cleaning together.”
- `p`: “Five-stage standard”
- `h2`: “Five stages, one accountable operator”
- `li`: “01ScopeWe write down what stays, what goes, what gets cleaned, what is excluded, and what the project requires.Room-by-room plan”
- `h3`: “Scope”
- `p`: “We write down what stays, what goes, what gets cleaned, what is excluded, and what the project requires.”
- `li`: “02ProtectKeep areas get marked before work starts. Documents, keys, photos, and anything valuable come out first, set aside in one place, and get reported to you.Keep and review controls”
- `h3`: “Protect”
- `p`: “Keep areas get marked before work starts. Documents, keys, photos, and anything valuable come out first, set aside in one place, and get reported to you.”
- `li`: “03ClearApproved unwanted contents are consolidated, staged or coordinated for lawful disposal within the signed scope.Clearing status”
- `h3`: “Clear”
- `p`: “Approved unwanted contents are consolidated, staged or coordinated for lawful disposal within the signed scope.”
- `li`: “04ResetThe property receives the detailed cleaning included for its next handoff.Cleaning status”
- `h3`: “Reset”
- `p`: “The property receives the detailed cleaning included for its next handoff.”
- `li`: “05VerifyCompletion photographs, documented exceptions and a Property Handoff Record close the approved scope.Closeout package”
- `h3`: “Verify”
- `p`: “Completion photographs, documented exceptions and a Property Handoff Record close the approved scope.”
- `p`: “From a Property Handoff Record”
- hidden `h2`: “Documented proof”
- `a`: “See the full annotated record →”
- `p`: “Pricing, honestly”
- `h2`: “What affects the price — no invented figures”
- `li`: “Property size”
- `li`: “Volume of contents”
- `li`: “Cleaning condition”
- `li`: “Access and stairs”
- `li`: “Disposal requirements”
- `li`: “Labor and deadline”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.”
- `p`: “Credited toward an approved project booked within 7 days.”
- `p`: “Before you request a plan”
- `h2`: “Questions families ask before a move”
- `p`: “These answers describe the assessment process. The signed scope controls the actual project.”
- `summary`: “Can my parent be involved in deciding what stays?+”
- `p`: “Yes — the written scope is built around whoever the authorized decision-maker is, whether that's your parent, you, or both together.”
- `summary`: “What if we're not sure yet what's coming to the new place?+”
- `p`: “Items you're unsure about go into a review category and stay there. Nothing is cleared automatically while a decision is still open.”
- `summary`: “Can you coordinate around a moving company or move date?+”
- `p`: “Yes. Share the moving date and any moving-company timing when you request an assessment, and it's factored into scheduling.”
- `summary`: “Do you clean the property after it's cleared, for the next residents?+”
- `p`: “Yes — deep cleaning after clearing is part of the same signed scope, so the property is ready for its next handoff, not left for a separate cleaning company.”
- `summary`: “What happens to items my parent wants to give to family?+”
- `p`: “Set-aside items are identified and handled separately from clearing, so gifts and keepsakes don't get mixed in with what's being removed.”
- `summary`: “How much does this cost?+”
- `p`: “It depends on property size, volume, and condition. Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /service-areas/

Source: `src/pages/service-areas/index.astro`

SEO title: “South Bay & Peninsula Service Area | Aseptaclean”

Meta description: “Aseptaclean provides owner-operated cleaning and property clearing across the South Bay & Peninsula.”

- `p`: “Home / Service Areas”
- `a`: “Home”
- `p`: “Service area”
- `h1`: “South Bay & Peninsula properties, reviewed one address at a time.”
- `p`: “Travel, access, parking, building rules and the project condition are considered before a scope is scheduled.”
- `p`: “Where we work”
- `h2`: “South Bay & Peninsula, one address at a time.”
- `li`: “San Jose”
- `li`: “Mountain View”
- `li`: “Sunnyvale”
- `li`: “Santa Clara”
- `li`: “Campbell”
- `li`: “Los Altos”
- `li`: “Los Altos Hills”
- `li`: “Los Gatos”
- `li`: “Palo Alto”
- `li`: “Atherton”
- `p`: “By area”
- `h2`: “Start with the property—not a city-page promise.”
- `p`: “We currently review work in the cities below. Availability depends on the service, property condition, access and schedule.”
- `h3`: “West Valley”
- `p`: “Campbell, Saratoga-adjacent, and the western San Jose neighborhoods — closer-lot properties where access and parking often shape the plan.”
- `h3`: “Peninsula edge”
- `p`: “Mountain View, Sunnyvale, and Santa Clara — a mix of longtime family homes and faster-turnover rentals, both needing the same documented handoff.”
- `h3`: “South County”
- `p`: “San Jose's southern neighborhoods, where larger lots and multi-generational households often mean a bigger sort-and-clear phase before cleaning begins.”
- `p`: “Start with the situation, not the city”
- `h2`: “Every service page covers the same service area”
- `a`: “Estate cleanout →”
- `a`: “Hoarding cleanup →”
- `a`: “Animal waste & organic condition cleaning →”
- `a`: “Senior downsizing →”
- `h3`: “Not sure the address is in range?”
- `p`: “Assessment response within one business day”
- `a`: “Send the property details →”
- `a`: “Text a photo”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /services/

Source: `src/pages/services/index.astro`

SEO title: “Services | Aseptaclean”

Meta description: “Property clearing, animal and organic condition cleaning, and reset cleaning — every project starts with one written scope. South Bay & Peninsula.”

- `p`: “Home / Services”
- `a`: “Home”
- `p`: “Services”
- `h1`: “What Aseptaclean handles”
- `p`: “Every project starts with the same written scope, whichever kind of work the property needs — clearing heavy accumulation, cleaning after it's cleared, or resetting a property that just needs deep cleaning on its own.”
- `p`: “By category”
- `h2`: “Three kinds of work, one signed scope”
- `h3`: “Complex property clearing”
- `p`: “Whole-property clearing for heavy accumulation, estate, and abandoned-contents conditions — nonhazardous contents, within a signed scope.”
- `li`: “Estate cleanout →”
- `a`: “Estate cleanout →”
- `li`: “Hoarding cleanup →”
- `a`: “Hoarding cleanup →”
- `li`: “Property cleanouts for managers →”
- `a`: “Property cleanouts for managers →”
- `h3`: “Animal & organic condition cleaning”
- `p`: “Heavy organic conditions and animal waste, cleaned under our organic pathogen endorsement. Cleaning only — not a decontamination, sterilization, or health-safety determination.”
- `li`: “Animal waste cleanup →”
- `a`: “Animal waste cleanup →”
- `h3`: “Reset & restoration cleaning”
- `p`: “Deep reset cleaning after clearing — kitchens, baths, cabinet and appliance interiors, floors and accessible surfaces — for the next handoff.”
- `li`: “Deep cleaning →”
- `a`: “Deep cleaning →”
- `li`: “Senior downsizing →”
- `a`: “Senior downsizing →”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /sms-notification-consent/

Source: `src/pages/sms-notification-consent.astro`

SEO title: “Internal SMS Alert Enrollment | Aseptaclean”

Meta description: “Enrollment page for Aseptaclean internal operational SMS lead alerts.”

- `a`: “ASEPTACLEAN”
- `h1`: “Internal SMS Alert Enrollment”
- `p`: “This page is for the Aseptaclean owner or an authorized Aseptaclean representative to enroll a mobile number for internal operational lead alerts.”
- `h2`: “What these messages are for”
- `p`: “When a prospective customer submits a service inquiry through the Aseptaclean website, Aseptaclean may send an automated SMS alert to the enrolled authorized business recipient so the inquiry can be reviewed and followed up on.”
- `p`: “Website visitors and prospective customers do not receive SMS messages through this internal notification campaign.”
- `h2`: “Enroll in internal SMS alerts”
- `label`: “Mobile number”
- `p`: “Enter the mobile number that should receive Aseptaclean's internal lead alerts.”
- `label`: “I agree to receive automated internal operational SMS lead alertsfrom Aseptaclean when website service inquiries are submitted. Message frequency varies based on website inquiries. Message and data rates may apply. Reply STOP to opt out or HELP for help. View thePrivacy PolicyandTerms & Conditions.”
- `a`: “Privacy Policy”
- `a`: “Terms & Conditions”
- `button`: “Enroll in SMS Alerts”
- `p`: “Enrollment is voluntary and is intended only for the Aseptaclean owner or an authorized business representative.”
- `h2`: “Messaging disclosures”
- `li`: “Message type: internal operational lead notifications.”
- `li`: “Message frequency varies based on website service inquiries.”
- `li`: “Message and data rates may apply.”
- `li`: “Reply STOP to opt out.”
- `li`: “Reply HELP for help.”
- `h2`: “Privacy”
- `p`: “Mobile information and SMS opt-in or consent data are not sold, rented, or shared with third parties or affiliates for marketing or promotional purposes.”
- `p`: “Privacy Policy·Terms & Conditions”
- `a`: “Privacy Policy”
- `a`: “Terms & Conditions”
- `input[type=tel] name=mobile_number`: placeholder “(669) 279-2002”

## /specialty-cleaning/

Source: `src/pages/specialty-cleaning/index.astro`

SEO title: “Specialty Cleaning | San Jose | Aseptaclean”

Meta description: “Condition-reviewed cleaning for difficult properties — extreme-condition and animal or organic-material cleaning under our organic pathogen endorsement. South Bay & Peninsula.”

- `p`: “Photo slot1800 × 700”
- `p`: “Home / Specialty Cleaning”
- `a`: “Home”
- `h1`: “Condition-reviewed cleaning for difficult properties.”
- `p`: “These jobs require more screening and clearer boundaries. Photos can begin the review; complex conditions often need a walkthrough.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `p`: “Cleaning only — not a decontamination, sterilization, or health-safety determination.”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “4 services in this group”
- `h2`: “Pick the page that matches the property’s next event.”
- `h3`: “Extreme-Condition Cleaning”
- `p`: “Severely neglected property, reviewed first”
- `a`: “Extreme-Condition Cleaning — what’s includedWhat’s included→”
- `h3`: “Animal Waste Cleanup”
- `p`: “After the animals are gone”
- `a`: “Animal Waste Cleanup — what’s includedWhat’s included→”
- `h3`: “Rodent Dropping Cleanup”
- `p`: “Contained interior areas”
- `a`: “Rodent Dropping Cleanup — what’s includedWhat’s included→”
- `h3`: “Pigeon Dropping Cleanup”
- `p`: “Accessible exterior surfaces”
- `a`: “Pigeon Dropping Cleanup — what’s includedWhat’s included→”
- `h2`: “We define the work before we schedule it.”
- `p`: “Photos can start the review. Larger, heavier or more complicated properties may require a walkthrough before a firm quote.”
- `h3`: “01 — Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `h3`: “02 — Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `h3`: “03 — Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “04 — Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h3`: “Working against a listing, transfer or family deadline?”
- `p`: “Assessment response within one business day”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /terms/

Source: `src/pages/terms.astro`

SEO title: “Terms and Conditions | Aseptaclean”

Meta description: “Read Aseptaclean’s Termly-managed Terms and Conditions or access the provider fallback.”

- `p`: “Home / Terms and Conditions”
- `a`: “Home”
- `p`: “Legal record · Managed by Termly”
- `h1`: “Terms and Conditions”
- `p`: “This page is an integration surface for Aseptaclean’s provider-controlled policy document. Aseptaclean does not replace the provider’s published policy with locally drafted legal text.”
- `p`: “Your browser does not support iframes.”
- `p`: “Provider fallback”
- `h2`: “If the policy does not load”
- `p`: “Provider content can be unavailable when JavaScript is disabled, a content blocker intervenes, or Termly is temporarily unreachable.”
- `a`: “Contact Aseptaclean about privacy or legal access”

## /thank-you/

Source: `src/pages/thank-you.astro`

SEO title: “Thank You | Aseptaclean”

Meta description: “Aseptaclean assessment request confirmation.”

- `p`: “Handoff plan intake”
- `h1`: “This page does not confirm that a request was received.”
- hidden `p`: “Received”
- hidden `p`: “Got it. I'll review the details and contact you about the next step.”
- hidden `p`: “A confirmation email is on its way. Aseptaclean will review the property details and send your Handoff Plan—fit decision, preliminary scope direction, and clear next step—within one business day.”
- `p`: “No submission confirmed”
- `p`: “If you arrived here without submitting the assessment, start the request below. If you just submitted and expected a confirmation, check your email or contact Aseptaclean before submitting again. Successfully received requests receive a Handoff Plan within one business day.”
- `a`: “Start the assessment”
- `p`: “It begins a property fit review. It does not authorize work, create a service agreement, reserve a project date, or guarantee that the property is within Aseptaclean’s scope.”
- `p`: “While you wait”
- `h2`: “Photos speed everything up.”
- `p`: “Stand in the doorway and get the whole room, then step in close on the worst spots. Text them to the number below and mention your name.”
- `a`: “Urgent or complex property? Call (408) 785-7588”

## /who-we-help/

Source: `src/pages/who-we-help/index.astro`

SEO title: “Who We Help | Aseptaclean”

Meta description: “Families and estate representatives, property managers, seniors and move managers — one written scope and documented closeout. South Bay & Peninsula.”

- `p`: “Home / Who We Help”
- `a`: “Home”
- `p`: “Who we help”
- `h1`: “Whoever is responsible for the property”
- `p`: “Aseptaclean works with whoever is responsible for a property's next step — a family member, an executor, a property manager, or a move manager coordinating on someone else's behalf. Every situation gets the same written scope and documented closeout.”
- `p`: “By audience”
- `h2`: “One written scope, whoever is deciding”
- `h3`: “Families & estate representatives”
- `p`: “For the family member sorting a parent's home, and for the executor, attorney, or trustee who needs a written scope and a documented closeout for the estate file.”
- `li`: “Nothing is removed without written approval — uncertain items go into a review category, not a dumpster.”
- `li`: “One accountable operator for clearing and cleaning together, with a signed scope before work begins and a Property Handoff Record at closeout.”
- `li`: “Discovered documents, photographs, jewelry, keys, and cash are isolated and reported, not disturbed or discarded.”
- `li`: “Estate cleanout →”
- `a`: “Estate cleanout →”
- `li`: “Hoarding cleanup →”
- `a`: “Hoarding cleanup →”
- `li`: “Estate cleanout checklist (free resource) →”
- `a`: “Estate cleanout checklist (free resource) →”
- `h3`: “Property managers”
- `p`: “For property managers and owners turning over a vacant unit — tenant abandonment, eviction cleanout, or foreclosure turnover — who need the vacancy back on schedule without a surprise change order mid-turnover.”
- `li`: “A signed scope before work starts, so cost and timeline are set before the crew arrives.”
- `li`: “Discovered tenant belongings are isolated and reported so your abandonment-notice and holding-period procedures apply before anything is discarded.”
- `li`: “A Property Handoff Record at closeout — photographs, exception list, discovered-item log — for the owner file.”
- `li`: “Property cleanouts for managers →”
- `a`: “Property cleanouts for managers →”
- `h3`: “Seniors & move managers”
- `p`: “For a parent moving to a smaller place, and for the senior move managers and care coordinators recommending a vendor to a client's family before the move.”
- `li`: “Sorting follows a keep / donate-or-gift / clear framework, at a pace that doesn't force a single overwhelming weekend.”
- `li`: “Set-aside items for family members are handled separately from clearing, so gifts and keepsakes don't get mixed in with what's removed.”
- `li`: “Clearing and the post-move deep clean happen under one signed scope, so the property is ready for its next handoff.”
- `li`: “Senior downsizing →”
- `a`: “Senior downsizing →”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”

## /window-cleaning-san-jose/

Source: `src/pages/window-cleaning-san-jose/index.astro`; page strings in `src/data/doc27ServicePages.ts`; structure in `src/layouts/ServicePageLayout.astro`

SEO title: “Interior Window Cleaning in San Jose | Aseptaclean”

Meta description: “Interior and accessible window cleaning for homes, turnovers and post-construction projects in the South Bay & Peninsula.”

- `p`: “LAUNCH GATE — not for publication: Crew capacity unconfirmed — page built as an unpublished draft; do not launch until crew capacity for this service is confirmed (docs/SITEMAP-MASTER.md).”
- `p`: “Photo slot2000 × 1100”
- `p`: “Home /Detailed Cleaning / Window Cleaning”
- `a`: “Home”
- `a`: “Detailed Cleaning”
- `p`: “Detailed Cleaning · South Bay & Peninsula”
- `h1`: “Window cleaning in San Jose, tracks and frames included”
- `p`: “Detail cleaning for interior glass, frames, sills and accessible tracks as a standalone project or part of a larger property reset.”
- `p`: “The scope names the rooms and the detail level before anyone arrives.”
- `a`: “Request an assessment →”
- `a`: “Text a photo”
- `a`: “Call (408) 785-7588”
- `h2`: “This service may fit when”
- `li`: “Interior glass is hazy or marked”
- `li`: “A move or listing requires clearer windows”
- `li`: “Remodeling left dust on glass and frames”
- `li`: “Tracks and sills need detailed attention”
- `h2`: “Insured”
- `p`: “COI available on request”
- `h2`: “Endorsed”
- `p`: “Organic pathogen endorsement”
- `h2`: “Owner-operated”
- `p`: “Founder reviews the scope”
- `h2`: “South Bay & Peninsula”
- `p`: “Service-area business”
- `p`: “The outcome”
- `h2`: “Clearer glass with the frames and tracks accounted for.”
- `p`: “The quote separates glass, screens, frames and tracks so you are not comparing an exterior wash with a detailed interior-window service.”
- `li`: “Interior glass cleaning”
- `li`: “Reachable frames and sills”
- `li`: “Accessible track vacuuming and wiping”
- `li`: “Spot detailing around latches and edges”
- `li`: “Exterior ground-level glass when specifically approved”
- `p`: “The signed scope is the definition of finished for this project.”
- `li`: “Unsafe roof or high-ladder access”
- `li`: “Glass restoration or scratch removal”
- `li`: “Failed seals or permanent mineral etching”
- `li`: “Removal of materials that could damage glass or film”
- `p`: “What this scope does not include. Aseptaclean performs property clearing and approved cleaning within its current lawful and insured scope. Aseptaclean is not a licensed general contractor, remediation contractor, pest-control operator, appraiser, or provider of medical or legal services.”
- `p`: “Photo slotMid-project detail2000 × 900”
- `p`: “What moves the number”
- `h2`: “The quote comes from the property, not a package.”
- `p`: “Photos may support an initial range. Complicated conditions may require a walkthrough before a firm scope and price.”
- `li`: “01Window count, size and configuration”
- `li`: “02Interior versus exterior access”
- `li`: “03Screens, tracks and divided panes”
- `li`: “04Construction residue or mineral deposits”
- `li`: “05Height and safe ladder access”
- `p`: “Photos are often enough to start, and reviewing them costs nothing. When a property needs an on-site walkthrough, the assessment is $195 — and you keep what it produces: a written, room-by-room scope with inclusions, exclusions, and a firm price. It's yours whether or not you hire us.Credited toward an approved project booked within 7 days.”
- `a`: “Send photos, get a straight answer →”
- `h2`: “How this starts”
- `li`: “01Initial reviewSend the city, approximate size, condition, deadline and clear photos.”
- `h3`: “Initial review”
- `p`: “Send the city, approximate size, condition, deadline and clear photos.”
- `li`: “02Walkthrough if neededComplex access, contents or conditions are checked before a firm quote.”
- `h3`: “Walkthrough if needed”
- `p`: “Complex access, contents or conditions are checked before a firm quote.”
- `li`: “03Written scopePrice, inclusions, exclusions and assumptions are approved before scheduling.”
- `h3`: “Written scope”
- `p`: “Price, inclusions, exclusions and assumptions are approved before scheduling.”
- `li`: “04CompletionThe work is performed against the agreed scope and priorities.”
- `h3`: “Completion”
- `p`: “The work is performed against the agreed scope and priorities.”
- `h2`: “Questions we get on window cleaning.”
- `summary`: “Do you clean exterior windows?”
- `p`: “Ground-level and safely accessible exterior windows may be included. High-access work is reviewed separately and may be referred.”
- `summary`: “Can you remove hard-water spots?”
- `p`: “Light deposits may improve, but mineral restoration and etched glass require a different process and are not promised as standard cleaning.”
- `h2`: “Often booked alongside”
- `a`: “One-Time Deep Cleaning”
- `a`: “Move-In & Move-Out Cleaning”
- `a`: “Post-Construction Cleaning”
- `p`: “Request an assessment”
- `h2`: “Tell us about the property.”
- `p`: “The city, roughly how big it is, what shape it’s in, and when it has to be done. Two or three phone photos are more useful than a long description.”
- `p`: “What happens next”
- `p`: “Matthew reads every request himself. You’ll hear back within one business day with a real answer about whether the job fits and what’s needed to price it — not an autoresponder.”
- `p`: “Fields marked *required are required.”
- `label`: “Name *”
- `label`: “Phone *”
- `p`: “We call this number back — usually same business day.”
- `label`: “What are you looking at? (optional)”
- `label`: “I agree that Aseptaclean may call, text, or email me about this request. Consent is not a condition of purchase. I have read the Privacy Policy.”
- `a`: “Privacy Policy”
- `button`: “Request an assessment”
- `p`: “This starts a conversation. It does not book work or authorize anything.”
- `p`: “Text a photo”
- `a`: “Text a photo”
- `textarea name=property_detail`: placeholder “A quick description of the property and what needs to happen.”
