/**
 * SERVICE-PAGE PUBLIC COPY — transcribed from the owner-supplied copy documents.
 *
 * Sources (docs/20-COPY-MAP.md §1–§2):
 *   docs/aseptaclean-all-website-copy.md            Hoarding · Severe Property Cleanup · Rodent · Detailed Deep Cleaning
 *   docs/aseptaclean-crime-scene-trauma-cleanup.md  Crime Scene & Trauma Cleanup
 *
 * Display transformations applied: §3.1 (Severe Property Cleanup → Extreme Cleaning, display
 * strings only, route unchanged) and §3.2/§3.3 (CTA labels come from src/data/site.ts, never
 * from the source copy's own button words).
 *
 * Claims-law removals applied, each recorded in docs/20-COPY-MAP.md §4:
 *   - "gross filth" clauses dropped entirely (AGENTS.md §7);
 *   - "biohazard remediation" as a service claim narrowed (AGENTS.md §7, doc 21 §3);
 *   - "Insured" suppressed until a COI is verified (AGENTS.md §3);
 *   - TSW #933 kept ONLY on the trauma record below (AGENTS.md §3 TSWMP placement).
 *
 * `Section` is a discriminated union so a page's composition is data, not markup. Doc 30 §20
 * and design-system §29 both require service pages to share the system without sharing one
 * layout — each record below chooses its own section order, split directions, and emphasis.
 */

export type Section =
  | {
      kind: "split";
      eyebrow?: string;
      heading: string;
      id: string;
      lead?: string;
      body?: string[];
      pullQuote?: string;
      list?: string[];
      listTone?: "include" | "exclude";
      listColumns?: 1 | 2;
      image?: string;
      imageAlt?: string;
      needsAsset?: string;
      /**
       * `3/4` is the contained portrait plate AcSplit added for the founder photograph. The three
       * landscape ratios cover-crop a 3:4 master to roughly half its height, which is where the
       * face is, so every "Why Aseptaclean" section that carries the real portrait uses this.
       */
      ratio?: "4/3" | "5/4" | "16/9" | "3/4";
      reverse?: boolean;
      tone?: "light" | "soft";
      /**
       * Renders the founder-authority-limit clause beneath the section. Mandatory wherever the
       * founder's background appears — docs/02-CURRENT-FACTS.md "Preserve factual boundaries".
       */
      founderLimit?: boolean;
      /** Paragraphs after the pull quote, where the source continues past its bold line. */
      closing?: string[];
    }
  | {
      kind: "intro";
      eyebrow?: string;
      heading: string;
      id: string;
      lead?: string;
      body?: string[];
      list?: string[];
      listTone?: "include" | "exclude";
      listColumns?: 1 | 2;
      tone?: "light" | "soft";
    }
  | {
      kind: "dark";
      eyebrow?: string;
      heading: string;
      headingAccent?: string;
      id: string;
      body?: string[];
      pullQuote?: string;
      list?: string[];
      image?: string;
      imageAlt?: string;
      needsAsset?: string;
    }
  | {
      /**
       * Two or more NAMED source lists rendered as lists, not paraphrased into prose.
       * docs/20-COPY-MAP.md: "Render every selected sentence verbatim... lists remain lists."
       */
      kind: "roomLists";
      eyebrow?: string;
      heading: string;
      id: string;
      lead?: string;
      body?: string[];
      groups: { title: string; items: readonly string[] }[];
      close?: string;
      pullQuote?: string;
      image?: string;
      imageAlt?: string;
    }
  | {
      kind: "steps";
      eyebrow?: string;
      heading: string;
      id: string;
      lead?: string;
      steps: { title: string; body: string }[];
    }
  | {
      kind: "twoLists";
      eyebrow?: string;
      heading: string;
      id: string;
      lead?: string;
      body?: string[];
      includeTitle: string;
      include: string[];
      excludeTitle: string;
      exclude: string[];
      close?: string;
    }
  | {
      kind: "faq";
      heading: string;
      id: string;
      items: { question: string; answer: string }[];
    };

export interface ServicePageRecord {
  slug: string;
  /** Public display name — docs/20-COPY-MAP.md §3.4. */
  name: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  heroLead: string;
  heroBody: string[];
  /** Factual reassurance lines under the hero actions. Never a badge wall. */
  heroAssurances: string[];
  heroImage: string;
  heroImageAlt: string;
  /**
   * Optional `object-position` focal point for the hero crop. Omit for `50% 50%` — only set it
   * when the mobile slice would otherwise miss the subject. See AcHeroWithForm's Props.
   */
  heroImagePosition?: string;
  /**
   * Stacked-viewport (<1200px) hero geometry. Omit for the sitewide `overlay` behaviour.
   * `split-band` bounds the photograph to the copy region and drops the form beneath it —
   * a route-scoped exception, currently held by the trauma record alone. See AcHeroWithForm.
   */
  heroStackedLayout?: "overlay" | "split-band";
  /** `object-position` for the stacked crop, where it differs from the desktop focal. */
  heroStackedImagePosition?: string;
  heroNeedsAsset?: string;
  /** Extra verified items for the trust strip. Only the trauma route may pass TSW #933. */
  trustLead?: string[];
  sections: Section[];
  finalHeading: string;
  finalBody: string[];
}

// ---------------------------------------------------------------------------

export const servicePageCopy: ServicePageRecord[] = [
  // =========================================================================
  // HOARDING CLEANUP
  // =========================================================================
  {
    slug: "/hoarding-cleanup-san-jose/",
    name: "Hoarding Cleanup",
    seoTitle: "Hoarding Cleanup in San Jose | Aseptaclean",
    seoDescription:
      "Hoarding cleanup for homes that have become overwhelming. We assess the condition, define what stays and what goes, and work through the property in order.",
    eyebrow: "Hoarding Cleanup",
    h1: "When a home has become overwhelming, we help you get it back under control.",
    heroLead: "You do not need to clean before calling us.",
    heroBody: [
      "You do not need to organize anything first. And you do not need to know exactly what kind of cleanup you need.",
      "Show us the home exactly as it is. Aseptaclean will assess the condition, help define what stays and what needs to go, and build a clear plan for working through the property."
    ],
    heroAssurances: [
      "Private and respectful",
      "Clear scope before work begins",
      "Photos welcome",
      "No need to prepare the property first"
    ],
    heroImage: "hoarding-living-room",
    heroImageAlt:
      "A living room where boxes, textiles and household belongings cover the sofa and floor, leaving a narrow walkway",
    sections: [
      {
        kind: "split",
        eyebrow: "01 / Start here",
        heading: "Start where things are now.",
        id: "start",
        lead: "Homes can become difficult to manage for all kinds of reasons.",
        body: [
          "Sometimes belongings slowly accumulate over the years. Sometimes an illness, loss, family situation, animal problem, or major life change causes things to get away from someone.",
          "And sometimes a family member walks into a property and realizes the situation is much bigger than they expected. Whatever brought you here, you do not have to solve it before contacting us."
        ],
        pullQuote: "Our job is to figure out what needs to happen next.",
        // Package slot 04 — the guide's hoarding "access" image. It shows what the section says:
        // the property as it actually is, with belongings narrowing the route through it.
        image: "hoarding-restricted-walkway",
        imageAlt:
          "A residential hallway narrowed by household belongings and cardboard boxes stacked along both sides",
        ratio: "5/4",
        reverse: true
      },
      {
        kind: "intro",
        eyebrow: "02 / What is underneath",
        heading: "More than clearing things out",
        id: "underneath",
        lead: "Removing clutter may only be one part of the job.",
        body: ["Once rooms begin to open up, we may find years of buildup underneath, including:"],
        list: [
          "Heavy soil and neglected surfaces",
          "Trash or spoiled material",
          "Strong odors",
          "Rodent droppings or nesting material",
          "Animal urine or feces",
          "Pest-affected areas",
          "Heavily soiled kitchens and bathrooms",
          "Rooms that have not been accessible for a long time"
        ],
        listColumns: 2,
        tone: "soft"
      },
      {
        kind: "steps",
        eyebrow: "03 / The plan",
        heading: "A clear plan before the work begins",
        id: "plan",
        lead: "When everything feels like one enormous problem, the first thing we do is break it down.",
        steps: [
          {
            title: "Assess the property",
            body: "We look at the condition of the rooms, the amount of material, access, sanitation concerns, odors, and anything else that may affect the work."
          },
          {
            title: "Understand what matters",
            body: "Not everything in a cluttered home is trash. We identify what should stay, what can be removed, and what needs to be reviewed before anything happens."
          },
          {
            title: "Work through the property in order",
            body: "The home is cleared and cleaned systematically so we can reach the areas that actually need attention."
          },
          {
            title: "Address what was underneath",
            body: "Once areas become accessible, we can properly clean the surfaces and conditions that were hidden by clutter."
          },
          {
            title: "Walk the property with you",
            body: "At the end, we review the agreed scope and make sure nothing important was missed."
          }
        ]
      },
      {
        kind: "dark",
        eyebrow: "04 / Belongings",
        heading: "We understand that important things",
        headingAccent: "can be mixed into the clutter.",
        id: "belongings",
        body: [
          "Family photos. Documents. Jewelry. Keys. Medications. Financial records. Keepsakes. Items that may look unimportant to someone else but matter deeply to the family.",
          "That is why we do not walk into a property assuming everything needs to disappear."
        ],
        pullQuote:
          "Before removal begins, there should be a clear understanding of what can go, what stays, and what needs a closer look.",
        // Package slot 05 — the guide's hoarding "sorting and belongings" image.
        image: "hoarding-garage-contents",
        imageAlt:
          "A residential garage holding boxes, storage tubs, folded bedding, shelving and a chair"
      },
      {
        kind: "split",
        eyebrow: "05 / Beyond clutter",
        heading: "Sometimes the cleanup goes beyond clutter.",
        id: "beyond",
        lead: "A home may also have sanitation problems underneath what you can see.",
        body: [
          "Rodent activity, animal waste, spoiled material, sharps, heavy buildup, and other contamination can change how an area should be handled. When we find those conditions, we adjust the cleanup to the problem in front of us.",
          "The goal is not simply to make the house look better."
        ],
        pullQuote:
          "The goal is to deal with what is actually making the property difficult to use.",
        // Package slot 08. The section is about sanitation conditions found UNDER the contents —
        // a soiled floor is that condition. Replaces a gloved-hands stock photograph.
        image: "extreme-cleaning-floor-edges",
        imageAlt:
          "A room floor with heavy soiling and dark staining spreading across the carpet toward a doorway"
      },
      {
        // RESTORED 2026-09-04 — docs/page-briefs/HOARDING.md item 5. This section was absent and
        // its slot held an empty invented heading ("The questions people usually ask before they
        // call"). Source: "Why Aseptaclean approaches these properties differently".
        kind: "split",
        eyebrow: "06 / Why Aseptaclean",
        heading: "Why Aseptaclean approaches these properties differently",
        id: "why-aseptaclean",
        lead: "Aseptaclean was built around a simple idea:",
        pullQuote: "Look carefully first. Then decide what the property actually needs.",
        body: [
          "Our founder's background includes biochemistry, pharmaceutical manufacturing, and surgical pathology—environments where details, contamination, and following the right process matter.",
          "That experience shaped how we work today.",
          "We do not rush into a difficult property and start moving things just to make fast visual progress."
        ],
        closing: [
          "We assess the condition.",
          "We establish the plan.",
          "Then we work through the property in the right order."
        ],
        founderLimit: true,
        // The section's subject is the founder's own background, so it carries the real
        // photograph of him rather than a stock figure in coveralls.
        image: "founder-matthew-ruiz",
        imageAlt: "Matthew Ruiz, founder of Aseptaclean",
        ratio: "3/4",
        reverse: true
      },
      {
        kind: "faq",
        heading: "Common questions",
        id: "faq",
        items: [
          {
            question: "Are you going to judge the condition of the house?",
            answer:
              "No. If you have been putting off the call because you are embarrassed about the property, you are not the only person who has felt that way. You do not need to make the home look better for us. You do not need an explanation ready. You can simply show us what is going on. We'll start there."
          },
          {
            question: "Are you going to throw everything away?",
            answer:
              "No. We do not assume everything in a cluttered home is disposable. What stays, what goes, and what needs to be reviewed should be established before removal begins. If there are particular belongings, rooms, documents, or valuables that need special attention, tell us. We will build that into the plan."
          },
          {
            question: "Is the situation too bad?",
            answer:
              "You can still call us. Some properties need straightforward clearing and detailed cleaning. Others involve years of accumulation, heavy sanitation issues, animal or rodent contamination, strong odors, or rooms that have not been usable for a long time. The first step is not deciding whether your home is bad enough. The first step is letting us see what is actually happening."
          },
          {
            question: "What does hoarding cleanup cost?",
            answer:
              "There is no honest flat price for this type of work. A home with moderate clutter is very different from a property with years of accumulation, extensive sorting, animal contamination, or heavy cleaning underneath. After we understand the property, we can explain what we recommend, what is included, and what the work will cost. For some properties, photos or video may be enough to get started. For larger or more complicated situations, we may recommend an on-site assessment."
          }
        ]
      },
      {
        kind: "intro",
        eyebrow: "07 / Cost",
        heading: "What changes the cost",
        id: "cost",
        lead: "The cost depends on things such as:",
        list: [
          "How much material is in the property",
          "How much sorting is required",
          "Number of affected rooms",
          "Access",
          "Property size",
          "Sanitation conditions",
          "Disposal needs",
          "Odors",
          "Amount of detailed cleaning required"
        ],
        listColumns: 2
      }
    ],
    finalHeading: "You do not have to solve the whole property today.",
    finalBody: [
      "You only need to take the first step.",
      "Send us a few photos, tell us what is going on, or request a private assessment. We'll help you understand what needs to happen from there."
    ]
  },

  // =========================================================================
  // EXTREME CLEANING  (source: "Severe Property Cleanup" — docs/20-COPY-MAP.md §3.1)
  // Route unchanged: /extreme-cleaning-san-jose/
  // =========================================================================
  {
    slug: "/extreme-cleaning-san-jose/",
    name: "Extreme Cleaning",
    seoTitle: "Extreme Cleaning in San Jose | Aseptaclean",
    seoDescription:
      "Extreme cleaning for properties that have gone beyond a normal deep clean — heavy buildup, trash, animal waste, odors, and long-neglected rooms.",
    eyebrow: "Extreme Cleaning",
    h1: "When a property has gone beyond normal cleaning, we help get it back under control.",
    heroLead: "Some homes need more than a deep clean.",
    heroBody: [
      "There may be heavy buildup, trash, animal waste, rodent contamination, strong odors, neglected rooms, or areas that have not been usable for a long time.",
      "You do not need to clean before calling. You do not need to know what service to ask for. Show us the property as it is, and we'll help you understand what needs to happen next."
    ],
    heroAssurances: [
      "Private and respectful",
      "Clear scope before work begins",
      "Photos welcome",
      "No need to prepare the property first"
    ],
    heroImage: "extreme-cleaning-neglected-kitchen",
    heroImageAlt:
      "A neglected kitchen with heavy grease buildup around the stove and accumulated grime along the floor edges",
    sections: [
      {
        kind: "split",
        eyebrow: "01 / As it is",
        heading: "You can show us the property exactly as it is.",
        id: "as-it-is",
        lead: "You do not need to make it look better before we see it. In fact, we would rather you didn't.",
        body: [
          "Seeing the property in its current condition helps us understand what is actually going on and what may be needed.",
          "If you are unsure where to start, that is okay."
        ],
        pullQuote: "Starting is our job too.",
        // Package slot 08 — an Extreme Cleaning supporting image, and the one that literally
        // shows a property "exactly as it is": dirty flooring, dusty baseboards, perimeter
        // buildup and a doorway for scale.
        image: "extreme-cleaning-floor-edges",
        imageAlt:
          "A low view into a neglected room showing dirty flooring, dusty baseboards and buildup along the perimeter",
        reverse: true
      },
      {
        kind: "intro",
        eyebrow: "02 / The condition",
        heading: "This is not always a cleaning problem.",
        id: "condition",
        lead: "A property can reach a point where simply sending in a cleaning crew is not the right answer.",
        body: ["We may be dealing with:"],
        list: [
          "Heavy dirt and buildup",
          "Trash or spoiled material",
          "Animal urine or feces",
          "Rodent droppings or nesting material",
          "Strong or persistent odors",
          "Pest-affected areas",
          "Heavily soiled kitchens or bathrooms",
          "Long-neglected rooms",
          "Areas blocked by accumulated belongings or debris",
          "Properties left in poor condition after an occupant"
        ],
        listColumns: 2,
        tone: "soft"
      },
      {
        kind: "dark",
        eyebrow: "03 / Diagnosis",
        heading: "What looks like one problem",
        headingAccent: "may actually be several.",
        id: "several",
        body: [
          "A room may look dirty when the larger issue is underneath stored material. An odor may have a specific source. Rodent contamination may extend into cabinets, shelving, or storage areas.",
          "Animal waste may have affected the surface underneath it. Years of buildup may be hiding conditions that cannot be evaluated until the area is opened up.",
          "The question is not just how dirty it is. The better question is what is causing the property to be difficult to use, and what has to happen to correct it."
        ],
        pullQuote: "That is why we do not start with a generic cleaning checklist. We start with the property in front of us.",
        // Package slot 17. The body says contamination "may extend into cabinets, shelving, or
        // storage areas" — a storage shelf is the literal subject. Replaces a Commons house
        // exterior, which showed none of what the section describes.
        image: "rodent-storage-contents",
        imageAlt:
          "A storage shelf holding cardboard boxes, a plastic tub and a basket, with debris and scattered droppings across the shelf and floor"
      },
      {
        kind: "steps",
        eyebrow: "04 / The work",
        heading: "Our job is to make the situation manageable.",
        id: "manageable",
        lead: "Large cleanups can feel impossible when everything is mixed together. So we break the project down.",
        steps: [
          {
            title: "First, we understand the property.",
            body: "What happened? Which areas are affected? What concerns are already known? What can and cannot be accessed?"
          },
          {
            title: "Then we define the work.",
            body: "We identify what needs attention, what can be cleaned, what may need to be removed, and what decisions need to be made before work begins."
          },
          {
            title: "Then we work through the property in the right order.",
            body: "Not randomly. Not just where the mess is easiest to see. We work through the agreed scope so the property becomes easier to manage as the project moves forward."
          },
          {
            title: "At the end, we review what was completed.",
            body: "You should know what was addressed, what was outside the scope, and whether anything still needs attention."
          }
        ]
      },
      {
        kind: "split",
        eyebrow: "05 / The real problem",
        heading:
          "We do not want to make the property look better while leaving the real problem behind.",
        id: "real-problem",
        lead: "A quick visual improvement is not always the same thing as solving the problem.",
        body: [
          "If an odor has a source, that source matters. If animal or rodent contamination is present, where it is present matters. If an area has been buried under material for years, what is underneath matters.",
          "That is why our goal is not simply to make the property photograph better."
        ],
        pullQuote:
          "The goal is to understand what is happening and address the work that actually needs to be done.",
        // Package slot 07 — the second Extreme Cleaning supporting image. Accumulated buildup on
        // fixtures and tile joints is the "real problem left behind" this section describes.
        image: "extreme-cleaning-bathroom-buildup",
        imageAlt:
          "A neglected bathroom with soap residue, mineral buildup on the fixtures and dirty tile joints",
        ratio: "5/4"
      },
      {
        kind: "intro",
        eyebrow: "06 / Scope changes",
        heading: "You should know what you are agreeing to.",
        id: "scope-changes",
        lead: "Extreme cleaning projects can change once hidden areas become accessible.",
        body: [
          "A cabinet may be opened. Stored material may be moved. A floor that has not been visible in years may be uncovered. That can reveal something that was impossible to see at the beginning.",
          "If we find a condition that materially changes the agreed scope, we stop and explain what we found before additional work is performed.",
          "No major surprise work added after the fact."
        ],
        tone: "soft"
      },
      {
        // RESTORED 2026-09-04 — docs/page-briefs/EXTREME-CLEANING.md item 5 groups this with the
        // scope section above. Source heading: "Why Aseptaclean".
        kind: "split",
        eyebrow: "06 / Why Aseptaclean",
        heading: "Why Aseptaclean",
        id: "why-aseptaclean",
        lead: "Aseptaclean was built around work where details matter.",
        body: [
          "Our founder's background includes biochemistry, pharmaceutical manufacturing, and surgical pathology.",
          "That experience shaped a simple way of working:"
        ],
        pullQuote: "Look closely. Understand the condition. Then decide what the property actually needs.",
        closing: [
          "We do not assume every difficult property needs the same solution.",
          "We do not start with a one-size-fits-all checklist.",
          "And we do not rush through a property just to create a dramatic before-and-after.",
          "We want the work to make sense for the condition that is actually there."
        ],
        founderLimit: true,
        // Real founder photograph — the section is about his background. Replaces a stock figure
        // in coveralls and a respirator.
        image: "founder-matthew-ruiz",
        imageAlt: "Matthew Ruiz, founder of Aseptaclean",
        ratio: "3/4",
        reverse: true
      },
      {
        kind: "faq",
        heading: "Common questions",
        id: "faq",
        items: [
          {
            question: "Is this too bad for you?",
            answer:
              "You do not need to decide that before calling. If the property feels beyond what a normal house cleaner should be handling, send us photos or tell us what is happening. We will help you figure out whether this is the right type of cleanup."
          },
          {
            question: "Do I need to clean first?",
            answer:
              "No. Please show us the property as it is. You do not need to pick things up, move things around, or make the home presentable before we see it."
          },
          {
            question: "Will you judge how the property got this way?",
            answer:
              "No. There are a lot of reasons a home can become difficult to manage. Illness. Loss. Animals. A difficult tenant. A family situation. Years of things slowly getting away from someone. We are there to deal with the property, not criticize the person behind it."
          },
          {
            question: "Can I just send photos?",
            answer:
              "Yes. Photos or video are often the easiest way to start. They may give us enough information to understand the general condition and determine whether an on-site assessment is needed. For more complicated properties, we may need to see the space in person before giving you a reliable scope."
          },
          {
            question: "What does extreme cleaning cost?",
            answer:
              "There is no useful flat price for this type of work. Two homes of the same size can require completely different amounts of work. Once we understand the property, we can explain what we recommend, what is included, and what the work will cost. We would rather give you a realistic scope than a low number that changes once the job begins."
          }
        ]
      },
      {
        kind: "intro",
        eyebrow: "07 / Cost",
        heading: "What changes the cost",
        id: "cost",
        lead: "Price may depend on:",
        list: [
          "How much of the property is affected",
          "Amount of material or debris",
          "Level of buildup",
          "Animal or rodent contamination",
          "Access",
          "Sorting or clearing required",
          "Disposal needs",
          "Odor conditions",
          "Number of affected rooms",
          "Level of detailed cleaning required",
          "Conditions that become visible once areas are opened up"
        ],
        listColumns: 2
      }
    ],
    finalHeading: "You do not need to know what to call the problem.",
    finalBody: [
      "Maybe it is severe cleaning. Maybe it involves rodents or animal waste. Maybe the property has simply reached a point where you do not know who to call.",
      "That is fine. Send us a few photos and tell us what is happening. We will help you figure out the next step."
    ]
  },

  // =========================================================================
  // RODENT DROPPINGS & ANIMAL WASTE CLEANUP
  // =========================================================================
  {
    slug: "/rodent-dropping-cleanup-san-jose/",
    name: "Rodent Droppings & Animal Waste Cleanup",
    seoTitle: "Rodent Droppings & Animal Waste Cleanup in San Jose | Aseptaclean",
    seoDescription:
      "Cleanup of the droppings, urine, nesting material, and affected surfaces rodent and animal activity leaves behind. Aseptaclean does not provide pest control.",
    eyebrow: "Rodent Droppings & Animal Waste Cleanup",
    h1: "The rodents may be gone. What they left behind still needs attention.",
    heroLead: "Droppings are often only the part you can see.",
    heroBody: [
      "Rodents can leave behind urine, nesting material, contaminated debris, odors, and waste in cabinets, storage areas, garages, living spaces, and other areas they have traveled through.",
      "Aseptaclean cleans the conditions left behind after rodent activity. We assess where the contamination is, determine what needs attention, and build the cleanup around the actual condition of the property."
    ],
    heroAssurances: [
      "Cleanup only — not pest control",
      "Photos are a good place to start",
      "Scope defined before work begins"
    ],
    heroImage: "rodent-utility-room-context",
    heroImageAlt:
      "A residential utility room with a low shelf, cardboard boxes and a small scattering of rodent droppings near the wall",
    sections: [
      {
        kind: "dark",
        eyebrow: "01 / Before you clean",
        heading: "Found rodent droppings?",
        headingAccent: "Don't sweep or vacuum them first.",
        id: "before-you-clean",
        body: [
          "It may seem like the fastest way to get rid of them. It isn't the recommended way to handle rodent waste.",
          "The CDC advises against sweeping or vacuuming dry rodent urine, droppings, or nesting material before it has been properly wetted and disinfected. Disturbing dry waste can put contaminated particles into the air.",
          "If you have already vacuumed or swept the area, don't panic. Just tell us what happened when you contact us."
        ],
        pullQuote: "The important thing is understanding the condition before more cleanup is done.",
        // Package slot 16. The section is specifically about droppings a reader might be about to
        // sweep, so it shows droppings. Replaces a gloved-hands stock photograph.
        image: "rodent-hard-surface-detail",
        imageAlt:
          "A close view of dry rodent droppings scattered on a concrete floor against a painted baseboard"
      },
      {
        kind: "twoLists",
        eyebrow: "02 / Two different jobs",
        heading: "Pest control handles the rodents. We handle what they left behind.",
        id: "two-jobs",
        lead: "These are two different parts of solving a rodent problem.",
        body: [
          "A pest-control company may trap or remove rodents and determine how they are entering the property. That does not automatically mean the affected areas have been cleaned.",
          "After rodent activity, a property may still have:"
        ],
        includeTitle: "What can remain after the activity stops",
        include: [
          "Droppings",
          "Urine contamination",
          "Nesting material",
          "Contaminated debris",
          "Odors",
          "Soiled cabinets and drawers",
          "Affected storage areas",
          "Waste underneath belongings",
          "Contamination on accessible floors and other surfaces"
        ],
        excludeTitle: "What Aseptaclean does not do",
        exclude: [
          "Trapping",
          "Extermination",
          "Rodent exclusion or entry-point sealing",
          "Structural repairs",
          "HVAC work",
          "Pest identification or treatment"
        ],
        close:
          "Stopping the infestation matters. Cleaning the affected property matters too. Aseptaclean focuses on the cleanup side."
      },
      {
        kind: "split",
        eyebrow: "03 / Extent",
        heading: "Seeing a few droppings does not always tell you the whole story.",
        id: "extent",
        lead: "Rodents move. The place where you first noticed droppings may not be the only place they have been.",
        body: [
          "You may see waste along a garage wall and later find it behind stored items. You may find droppings in one kitchen cabinet and discover additional activity in nearby drawers or storage areas.",
          "Urine may not be as obvious as feces. Nesting material may be hidden. That is why we do not build the scope around a quick glance at the most visible pile of droppings."
        ],
        pullQuote:
          "We want to understand where the activity occurred and which accessible areas were actually affected.",
        // Package slot 05. The body says waste is found "along a garage wall and later behind
        // stored items" — a garage of stored contents is that scene. Replaces a Commons kitchen.
        image: "hoarding-garage-contents",
        imageAlt:
          "A residential garage holding boxes, storage tubs, shelving, framed pictures and stored furniture along both walls",
        reverse: true,
        ratio: "5/4"
      },
      {
        kind: "intro",
        eyebrow: "04 / Assessment",
        heading: "What we look at during an assessment",
        id: "assessment",
        lead: "Every property is different. We may look at:",
        list: [
          "Where droppings are present — one isolated area is very different from evidence throughout multiple rooms",
          "How widespread the activity appears to be, beyond the first visible spot",
          "What surfaces are affected — hard floor, cabinet interior, upholstery, stored cardboard, carpet, and unfinished material cannot automatically be treated the same way",
          "Whether contents are involved — boxes, shelving, furniture, and food-storage areas can make the cleanup more involved",
          "Whether urine, nesting material, or odors are present",
          "Whether additional areas need another specialist"
        ],
        body: ["You should know what problem we are solving before you pay us to solve it."],
        tone: "soft"
      },
      {
        kind: "steps",
        eyebrow: "05 / Method",
        heading: "How Aseptaclean approaches rodent cleanup",
        id: "method",
        steps: [
          {
            title: "Assess the affected area",
            body: "We begin by understanding where rodent activity has occurred and how much of the property appears to be affected. For smaller situations, photos may be enough to determine the next step."
          },
          {
            title: "Define the cleanup area",
            body: "We establish what areas and surfaces are included before work begins. Visible droppings in one location do not automatically mean every room needs the same level of work."
          },
          {
            title: "Control the cleanup",
            body: "Rodent waste should not simply be dry-swept around a property. The cleanup method is selected based on the condition, affected surfaces, and extent of contamination."
          },
          {
            title: "Remove waste and affected debris within the scope",
            body: "Droppings, nesting material, and other affected material included in the scope are addressed before detailed surface cleaning is completed."
          },
          {
            title: "Clean and disinfect affected accessible surfaces",
            body: "Once visible waste has been addressed, the affected surfaces included in the scope are cleaned and disinfected using products and methods appropriate for the material and condition."
          },
          {
            title: "Review the property",
            body: "We review what was completed and identify anything we found that may require attention outside the original scope."
          }
        ]
      },
      {
        // RESTORED 2026-09-04 — docs/page-briefs/RODENT-ANIMAL-WASTE.md item 4 pairs this source
        // block with the affected-areas section that follows it.
        kind: "split",
        eyebrow: "05 / Scope",
        heading: "Not every rodent cleanup is the same.",
        id: "not-every",
        lead: "A handful of mouse droppings in an empty garage is one type of job.",
        body: [
          "Droppings throughout a furnished home are another.",
          "A property with months or years of rodent activity, contaminated contents, animal waste, heavy odors, or multiple affected rooms is different again.",
          "The scope should match the actual problem.",
          "That is why we do not sell every customer the same “rodent cleanup package.”"
        ],
        pullQuote: "We look first. Then we tell you what the property actually needs.",
        // Package slot 17 — the guide's rodent "contents and scope" image.
        image: "rodent-storage-contents",
        imageAlt:
          "A residential storage shelf holding cardboard boxes and a plastic tub, with dust and a small scattering of rodent droppings on the shelf",
        reverse: true
      },
      {
        kind: "split",
        eyebrow: "06 / Surfaces",
        heading: "Rodent contamination can affect more than floors.",
        id: "surfaces",
        lead: "Depending on where the activity occurred, cleanup may involve accessible:",
        list: [
          "Floors",
          "Baseboards",
          "Shelving",
          "Cabinets",
          "Drawers",
          "Counters",
          "Storage areas",
          "Garages",
          "Closets",
          "Furniture surfaces",
          "Contents",
          "Other hard surfaces within the affected area"
        ],
        listColumns: 2,
        body: [
          "Different materials may require different decisions. Some items can be cleaned. Some may need to be isolated or discarded. Some conditions may need a different specialist entirely."
        ],
        pullQuote:
          "We would rather tell you that clearly than pretend one cleaning method works everywhere.",
        // Package slot 16 — the guide's rodent "affected surfaces" image. Restrained and
        // informational: it shows a shelf surface, not diagnostic or pathogen imagery, which
        // doc 21 §3 and AGENTS.md §7 both require of anything on this route.
        image: "rodent-hard-surface-detail",
        imageAlt:
          "A close view of a plain utility-room shelf with light household dust and a small scattering of rodent droppings near the back edge"
      },
      {
        // RESTORED 2026-09-04 — docs/page-briefs/RODENT-ANIMAL-WASTE.md item 5.
        // Source heading: "Why Aseptaclean", with its own outcome subheading.
        kind: "split",
        eyebrow: "07 / Why Aseptaclean",
        heading: "Why Aseptaclean",
        id: "why-aseptaclean",
        lead: "We treat the source condition—not just the visible mess.",
        body: [
          "Aseptaclean was built around work where understanding the condition matters.",
          "Our founder's background includes biochemistry, pharmaceutical manufacturing, and surgical pathology.",
          "That experience shaped the way we approach specialty cleanup:"
        ],
        pullQuote: "Look carefully. Understand what is affected. Control the process. Then do the work in the right order.",
        closing: [
          "We do not assume that seeing droppings means we already understand the job.",
          "We assess first.",
          "Then we build the cleanup around what is actually there."
        ],
        founderLimit: true,
        // Real founder photograph — the section is about his background. Replaces a stock figure
        // in coveralls.
        image: "founder-matthew-ruiz",
        imageAlt: "Matthew Ruiz, founder of Aseptaclean",
        ratio: "3/4"
      },
      {
        kind: "faq",
        heading: "Common questions",
        id: "faq",
        items: [
          {
            question: "The pest-control company already cleaned some of it. Do I still need you?",
            answer:
              "Maybe. Maybe not. We are not going to tell you that every sighting of a rodent dropping requires a major cleanup project. If the affected area has already been properly cleaned and there is nothing meaningful left for us to address, we will tell you. If droppings, urine, nesting material, odors, or affected areas remain, we can determine what additional cleanup makes sense."
          },
          {
            question: "I only found a few droppings. Is this overkill?",
            answer:
              "Not necessarily. A small, isolated amount is different from a widespread infestation. Send us photos. If it appears straightforward, we can tell you. If the pictures suggest a larger problem, we can explain why we recommend looking further. You should not have to buy a large cleanup just because you called a specialty company."
          },
          {
            question: "What if there are droppings inside cabinets?",
            answer:
              "Tell us. Cabinets, drawers, pantries, and food-storage areas deserve particular attention because rodents can move through multiple connected spaces. Photos of the affected cabinets and surrounding areas are helpful when we are determining the scope."
          },
          {
            question: "What if the rodents are still there?",
            answer:
              "The active rodent problem needs to be addressed. Aseptaclean does not provide pest control. If rodents continue entering the property after cleanup, they can contaminate the area again. That is why cleanup and pest control need to be treated as two connected parts of the problem."
          },
          {
            question: "Can you tell me the price from photos?",
            answer:
              "Often, photos can help us determine whether the job appears small and straightforward or whether an on-site assessment is needed. We would rather understand the job before giving you a price than give you a cheap number that changes once work starts."
          }
        ]
      },
      {
        kind: "intro",
        eyebrow: "07 / Cost",
        heading: "What changes the cost",
        id: "cost",
        lead: "For more extensive contamination, pricing may depend on:",
        list: [
          "Number of affected areas",
          "Amount of droppings and waste",
          "Length and extent of rodent activity",
          "Contents",
          "Surface types",
          "Access",
          "Animal waste",
          "Odors",
          "Amount of detailed cleaning required",
          "Conditions found once affected areas become accessible"
        ],
        listColumns: 2
      }
    ],
    finalHeading: "Start with photos.",
    finalBody: [
      "If you found rodent droppings and do not know how serious the problem is, you do not need to figure it out yourself.",
      "Photograph where you found the droppings, the surrounding area, any nearby cabinets or storage, and any other areas where you have seen signs of rodents. Then tell us what you know."
    ]
  },

  // =========================================================================
  // DETAILED DEEP CLEANING
  // =========================================================================
  {
    slug: "/deep-cleaning-san-jose/",
    name: "Detailed Deep Cleaning",
    seoTitle: "Detailed Deep Cleaning in San Jose | Aseptaclean",
    seoDescription:
      "Detailed deep cleaning for homes that need more than a standard cleaning checklist — heavy kitchen and bathroom buildup, neglected detail, move-in and move-out resets.",
    eyebrow: "Detailed Deep Cleaning",
    h1: "When a normal cleaning is not enough.",
    heroLead: "Some homes do not need routine cleaning. They need time, detail, and a much closer look.",
    heroBody: [
      "Maybe the property has been neglected for a while. Maybe buildup has accumulated in the kitchen or bathrooms. Maybe you are moving into a home and want it properly reset before bringing your belongings in.",
      "We look at the condition of the home first, identify what needs the most attention, and build the cleaning around the property in front of us."
    ],
    heroAssurances: [
      "Condition-based, not a fixed checklist",
      "Photos welcome",
      "Scope defined before work begins"
    ],
    heroImage: "detailed-deep-cleaning-kitchen",
    heroImageAlt:
      "An everyday residential kitchen with light grease around the cooking area and traces of dust along the edges",
    sections: [
      {
        kind: "split",
        eyebrow: "01 / Condition first",
        heading: "A deep clean should not mean the same thing in every home.",
        id: "condition-first",
        lead: "Two homes can have the same number of bedrooms and require completely different amounts of work.",
        body: [
          "One may need detailed dust removal and bathrooms. Another may have years of grease buildup in the kitchen. Another may have mineral deposits, neglected edges, dirty cabinets, heavy soil around fixtures, and rooms that have not been properly cleaned in a long time.",
          "That is why we do not believe a serious deep clean should start with “How many bedrooms and bathrooms?” That matters. But the condition matters more."
        ],
        // Package slot 07. The section lists "mineral deposits ... heavy soil around fixtures" as
        // a condition that changes the work; this is that. Kept away from the page's own kitchen
        // hero so the two do not sit adjacent. Replaces a Commons kitchen.
        image: "extreme-cleaning-bathroom-buildup",
        imageAlt:
          "A bathroom with mineral deposits and soil across the tub surround, shower glass and floor tile",
        reverse: true
      },
      {
        kind: "intro",
        eyebrow: "02 / Good fit",
        heading: "We clean based on what the home actually needs.",
        id: "fit",
        lead: "Aseptaclean may be a good fit when you are dealing with:",
        list: [
          "A home that has not been thoroughly cleaned for a long time",
          "Heavy kitchen buildup",
          "Grease and residue around cooking areas",
          "Bathrooms with significant buildup",
          "Dust along edges, ledges, trim, and detailed surfaces",
          "Dirty doors, frames, fixtures, and touch points",
          "Move-in cleaning before occupying a home",
          "Move-out cleaning requiring more than a basic turnover",
          "Homes preparing for sale",
          "Properties that need a detailed reset",
          "Areas that previous cleaning did not fully address"
        ],
        listColumns: 2,
        body: [
          "The goal is not to rush through every room and check boxes. The goal is to identify what is making the home feel unfinished, dirty, or neglected and put the time where it actually matters."
        ],
        tone: "soft"
      },
      {
        // RESTORED VERBATIM 2026-09-04. The three source lists (Kitchens / Bathrooms / Living
        // areas and bedrooms) had been compressed into three prose sentences, which dropped
        // every individual line item. docs/page-briefs/DETAILED-DEEP-CLEANING.md item 3 asks for
        // a "Room/surface detail section with photograph", and docs/20-COPY-MAP.md requires
        // lists to remain lists.
        kind: "roomLists",
        eyebrow: "03 / What detailed means",
        heading: "What does “detailed” actually mean?",
        id: "detailed",
        lead: "It means we pay attention to the parts of a home that are easy to pass over during routine cleaning.",
        body: ["Depending on the agreed scope, that may include:"],
        groups: [
          {
            title: "Kitchens",
            items: [
              "Counters and backsplashes",
              "Cabinet exteriors",
              "Appliance exteriors",
              "Accessible areas around appliances",
              "Sink and faucet detailing",
              "Grease and food residue",
              "Fixtures",
              "Doors and frames",
              "Baseboards and edges",
              "Floors",
              "Detailed buildup around commonly used areas"
            ]
          },
          {
            title: "Bathrooms",
            items: [
              "Showers and tubs",
              "Tile and grout surfaces",
              "Sinks and counters",
              "Fixtures",
              "Toilet exterior and surrounding areas",
              "Mirrors",
              "Cabinet exteriors",
              "Doors and frames",
              "Baseboards and edges",
              "Floors",
              "Buildup around high-use areas"
            ]
          },
          {
            title: "Living areas and bedrooms",
            items: [
              "Horizontal surfaces",
              "Ledges",
              "Trim",
              "Doors",
              "Door frames",
              "Baseboards",
              "Accessible fixtures",
              "Detail dusting",
              "Floors",
              "Areas that need additional hand cleaning"
            ]
          }
        ],
        close: "The exact scope depends on the property.",
        pullQuote:
          "We would rather tell you clearly what we are cleaning than hide behind the words “deep clean.”",
        // Package slot 11 — the guide's Detailed Deep Cleaning "scope/detail" image, beside the
        // room-by-room scope lists it illustrates.
        image: "deep-cleaning-window-track",
        imageAlt:
          "A residential sliding window track with trapped dust and grit along the grooves"
      },
      {
        kind: "dark",
        eyebrow: "04 / The difference",
        heading: "We look for the areas",
        headingAccent: "that make the biggest difference.",
        id: "difference",
        body: [
          "A home can be technically clean and still not feel clean. That often happens because the obvious surfaces were handled while the details were ignored.",
          "Grease remains around the edges of a kitchen. Dust is sitting on trim and ledges. Bathroom buildup is still visible around fixtures. Doors and frames have years of hand marks. Baseboards were never addressed. Corners were rushed.",
          "Those details matter because they change the way the entire room feels."
        ],
        pullQuote:
          "Aseptaclean focuses on the condition of the space, not just the center of the floor.",
        // Package slot 12. The body names baseboards, trim and rushed corners by name; this is
        // the baseboard-and-floor junction it is describing.
        image: "deep-cleaning-baseboard-edge",
        imageAlt:
          "The junction between a white baseboard and wood-look flooring with a fine line of dust along the edge"
      },
      {
        kind: "split",
        eyebrow: "05 / Surfaces",
        heading: "Not every mark should be attacked the same way.",
        id: "surfaces",
        lead: "Different materials react differently to cleaning.",
        body: [
          "Natural stone is not the same as porcelain. Painted cabinetry is not the same as unfinished wood. Metal fixtures may have finishes that can be damaged by aggressive products.",
          "Some mineral buildup can be improved. Some staining may be permanent. Some surfaces may already be worn, etched, scratched, or damaged. That is why more chemical and more scrubbing are not always better.",
          "If something appears to be damage rather than removable soil, we will tell you."
        ],
        pullQuote: "We look at the surface before deciding how aggressively it should be cleaned.",
        // Package slot 10 — the guide's Detailed Deep Cleaning "bathroom" image. Mineral
        // deposits on glass and chrome are exactly the "some buildup improves, some staining is
        // permanent" distinction this section makes.
        image: "deep-cleaning-shower-deposits",
        imageAlt:
          "A residential shower glass panel and chrome fixture with hard-water spots and light soap residue"
      },
      {
        kind: "steps",
        eyebrow: "06 / Method",
        heading: "How we approach a detailed deep clean",
        id: "method",
        steps: [
          {
            title: "Understand your priorities",
            body: "Tell us what is bothering you most. Maybe it is the kitchen. Maybe it is the bathrooms. Maybe the entire property needs attention before move-in. That gives us a starting point."
          },
          {
            title: "Look at the condition",
            body: "Photos may be enough for straightforward properties. Larger or more detailed projects may require a walkthrough so we can see the condition, materials, access, and level of buildup."
          },
          {
            title: "Define the scope",
            body: "Before work begins, we identify what is included and what requires additional time or approval."
          },
          {
            title: "Clean in a logical order",
            body: "We work through the agreed areas systematically so details are not lost in the rush to make the home look finished."
          },
          {
            title: "Review the work",
            body: "At completion, we review the agreed scope and identify anything we could not reasonably correct through cleaning."
          }
        ]
      },
      {
        kind: "intro",
        eyebrow: "07 / Scope",
        heading: "Some work takes significantly more time.",
        id: "scope",
        lead: "Certain requests can change the size of the project. Examples may include:",
        list: [
          "Inside cabinets and drawers",
          "Interior windows",
          "Heavy grease buildup",
          "Significant mineral deposits",
          "Large amounts of contents that must be moved",
          "Heavy buildup behind or around appliances",
          "Specialty or sensitive surfaces",
          "Areas requiring extensive hand detailing",
          "Adhesive or residue removal",
          "Conditions that were not visible during the original assessment"
        ],
        listColumns: 2,
        body: [
          "These are not automatically included simply because a service is called a “deep clean.” If they matter to you, tell us. We can build them into the scope instead of surprising you later."
        ],
        tone: "soft"
      },
      {
        kind: "twoLists",
        eyebrow: "08 / Move-in and move-out",
        heading: "Move-in and move-out cleaning",
        id: "move",
        lead: "A vacant home is one of the best opportunities to clean areas that become hard to reach once furniture and belongings arrive.",
        body: [
          "A detailed move-in clean focuses on the areas you will interact with every day: kitchens, bathrooms, cabinetry, fixtures, doors, trim, floors, high-touch surfaces, and the details that are easier to address while the home is empty.",
          "A move-out can expose years of buildup that furniture and belongings were hiding. We can assess the empty property and build the cleaning around what actually needs attention."
        ],
        includeTitle: "Move-out cleaning may be useful for",
        include: [
          "Homeowners preparing to sell",
          "Tenants with demanding move-out requirements",
          "Property managers",
          "Families preparing a home for the next occupant",
          "Properties needing a deeper reset after long-term occupancy"
        ],
        excludeTitle: "When a different service fits better",
        exclude: [
          "Heavy waste accumulation",
          "Animal contamination",
          "Rodent activity",
          "Severe neglect"
        ],
        close:
          "If the condition goes beyond detailed cleaning, we will tell you — a different Aseptaclean service may be the better fit."
      },
      {
        // RESTORED 2026-09-04 — docs/page-briefs/DETAILED-DEEP-CLEANING.md item 7.
        // Source heading: "Why Aseptaclean".
        kind: "split",
        eyebrow: "08 / Why Aseptaclean",
        heading: "Why Aseptaclean",
        id: "why-aseptaclean",
        lead: "Aseptaclean was built around a higher level of attention to condition and process.",
        body: [
          "Our founder's background includes biochemistry, pharmaceutical manufacturing, and surgical pathology.",
          "That experience reinforced something simple:"
        ],
        pullQuote: "Details matter, surfaces matter, and the way work is performed matters.",
        closing: [
          "We bring that mindset into residential cleaning without pretending your home is a laboratory.",
          "It simply means we do not believe in rushing through the same checklist regardless of what the property actually needs.",
          "We look first.",
          "Then we build the work around the condition."
        ],
        founderLimit: true,
        // Real founder photograph — the section is about his background. Replaces a stock
        // suburban house exterior, which illustrated nothing the section says.
        image: "founder-matthew-ruiz",
        imageAlt: "Matthew Ruiz, founder of Aseptaclean",
        ratio: "3/4"
      },
      {
        kind: "faq",
        heading: "Common questions",
        id: "faq",
        items: [
          {
            question: "Why not hire a normal house cleaner?",
            answer:
              "Sometimes you should. If your home needs regular maintenance cleaning, Aseptaclean may not be the best fit. Our detailed deep cleaning service is intended for homes that need more time, more attention, or more corrective work than a routine cleaning visit normally allows. If what you need is straightforward, we will tell you. We are not trying to turn every cleaning request into a large project."
          },
          {
            question: "Do I need to know exactly what I want cleaned?",
            answer:
              "No. You can tell us what bothers you. You can send photos. You can walk us through the home. We can help turn that into a clear scope."
          },
          {
            question: "Do you clean everything in the house?",
            answer:
              "Only what is included in the agreed scope. That is intentional. “Deep clean the whole house” can mean very different things to different people. We would rather define the work clearly than leave you guessing about what was supposed to be included."
          },
          {
            question: "Can you remove every stain or mark?",
            answer:
              "No cleaning company can honestly promise that. Some conditions are removable soil. Others are staining, wear, etching, discoloration, damaged finishes, or material deterioration. We will make a reasonable effort within the agreed scope, but we will not damage a surface chasing a result that cleaning cannot safely produce."
          },
          {
            question: "What does detailed deep cleaning cost?",
            answer:
              "There is no useful flat price based only on square footage. Once we understand the property and your priorities, we can explain what is included and what the work will cost. We would rather scope the job correctly than give you a low number and rush the work to make the price work."
          }
        ]
      }
    ],
    finalHeading: "Not sure whether you need detailed deep cleaning?",
    finalBody: [
      "Send us photos. Show us the kitchen. Show us the bathrooms. Show us the areas that bother you.",
      "Tell us what you want the home to feel like when the work is finished. We will help you determine the right level of cleaning from there."
    ]
  },

  // =========================================================================
  // CRIME SCENE & TRAUMA CLEANUP
  // Source: docs/aseptaclean-crime-scene-trauma-cleanup.md
  // The ONLY route authorised to publish TSW #933 (AGENTS.md §3).
  // =========================================================================
  {
    slug: "/crime-scene-trauma-cleanup-san-jose/",
    name: "Crime Scene & Trauma Cleanup",
    seoTitle: "Crime Scene & Trauma Cleanup in San Jose | Aseptaclean",
    seoDescription:
      "Discreet crime scene and trauma cleanup after the scene has been released. California Registered Trauma Scene Waste Management Practitioner, TSW #933.",
    eyebrow: "Crime Scene & Trauma Cleanup",
    h1: "Professional cleanup after a traumatic event.",
    heroLead:
      "When law enforcement, emergency responders, or the coroner have completed their work and released the scene, blood, bodily fluids, affected belongings, and regulated waste may still remain.",
    heroBody: [
      "Aseptaclean provides discreet crime scene and trauma cleanup for homes, businesses, vehicles, and other accepted properties."
    ],
    heroAssurances: [
      "California Registered Trauma Scene Waste Management Practitioner",
      "TSW #933",
      "Discreet, unmarked response"
    ],
    // OWNER-APPROVED REPLACEMENT 2026-09-06. Was package slot 13 `trauma-residential-context`,
    // an empty residential room chosen because it depicted no incident and no person. The owner
    // supplied and approved a cleanup image for this slot by name, which supersedes both that
    // choice and the blanket no-generated-people rule FOR THIS PAGE ONLY (see the scoped-approval
    // note in AcServicePage.astro's image registry and docs/06-ASSET-MANIFEST.md).
    //
    // Two consequences are deliberate and recorded rather than hidden: the hero now shows a
    // person, and it now shows incident content — a stained floor being cleaned. Alt text
    // describes the visible activity only. It does not present the figure as an Aseptaclean
    // employee, and no logo, crew caption or project claim accompanies it.
    //
    // The related-service cards on the OTHER routes still carry `trauma-residential-context`.
    // The approval names this page; extending a person-image to the home, services hub and
    // cross-link rows would exceed it.
    heroImage: "trauma-residential-floor-cleanup",
    heroImageAlt:
      "A worker in a protective suit and respirator kneeling to clean a stained hardwood floor in a residential room",
    // DESKTOP focal. At >=1200px the hero box is wider than the master's ratio, so cover fits to
    // width and the whole width is shown — X is inert here and only Y trims. Left at the value
    // set on 2026-09-06; the action is clearly readable at 1440px.
    heroImagePosition: "30% 50%",
    // STACKED-VIEWPORT GEOMETRY — owner-authorised route exception, 2026-09-06 (second pass).
    //
    // The first pass reported an unresolved limit here: with the shared hero's media box spanning
    // copy AND form, a 390px viewport produced a 390x1575 box for a 1672x941 master. Cover kept
    // ~14% of the source width, the form panel hid everything past ~47% of the height, and the
    // floor-level cleaning action — which sits at roughly 60-95% height — was unreachable by any
    // object-position, because the crop follows the box and not the focal point. The mobile hero
    // showed a hood and a respirator and no recognisable work.
    //
    // The owner authorised the geometry change rather than an image swap or a copy cut. Below
    // 1200px the photograph is now sized against the COPY REGION ONLY and the form follows it in
    // normal flow on the section's solid navy. That box is roughly 390x700 instead of 390x1575,
    // so cover now fits to HEIGHT: the full source height is shown and the surviving width goes
    // from ~14% to ~31%. Desktop is not in the exception and did not change.
    heroStackedLayout: "split-band",
    // Stacked focal, measured against the new box rather than the old one. The kneeling worker,
    // both gloved hands with cloths and the stained floor sit between roughly 15% and 50% of the
    // source width; 34% centres the surviving ~31%-wide band on that action instead of on the
    // suit fabric the old 30% landed on at the old box shape.
    heroStackedImagePosition: "34% 50%",
    // The one route AGENTS.md §3 authorises for this credential.
    trustLead: ["California Registered TSW Practitioner · TSW #933"],
    sections: [
      {
        kind: "intro",
        eyebrow: "01 / Situations",
        heading: "Crime Scene & Trauma Cleanup Services",
        id: "situations",
        lead: "Aseptaclean can assess and provide cleanup for accepted situations involving:",
        list: [
          "Suicide cleanup — blood, bodily fluids, and affected areas following a suicide or serious self-harm incident, after the scene has been released",
          "Homicide and crime scene cleanup, once law enforcement has finished processing the scene",
          "Unattended death and decomposition cleanup, including biological material, affected contents, and odor-related conditions within the approved scope",
          "Blood and bodily fluid cleanup following significant blood loss caused by an accident, injury, or medical event",
          "Workplace and accident cleanup in workplaces, commercial properties, and residential settings",
          "Vehicle biohazard cleanup — accepted blood, bodily fluid, and other biological contamination inside personal or commercial vehicles"
        ],
        body: [
          "Not sure which service describes the situation? Call us and tell us what happened. We will help determine the appropriate next step."
        ],
        tone: "soft"
      },
      {
        kind: "split",
        eyebrow: "02 / After the scene is released",
        heading:
          "After the scene is released, the cleanup becomes the property owner's responsibility.",
        id: "after-release",
        lead: "Law enforcement, firefighters, paramedics, and coroners respond to the emergency and investigation.",
        body: [
          "They generally do not perform the cleanup that remains afterward. That may leave a homeowner, family member, property manager, or business owner trying to understand what needs to happen next.",
          "Aseptaclean steps in after the scene has been released to assess the affected area and define the cleanup."
        ],
        pullQuote: "You do not need to clean or prepare the area before contacting us.",
        // Package slot 02. A quiet, unoccupied residential interior — the state a property is in
        // once the scene has been released and before any cleanup is arranged.
        image: "property-interior-introduction",
        imageAlt:
          "An unfurnished residential interior with wood flooring, looking from the living room through to an adjoining room",
        ratio: "5/4",
        reverse: true
      },
      {
        kind: "split",
        eyebrow: "03 / Why it differs",
        heading: "Why professional trauma cleanup is different",
        id: "why-different",
        lead: "Blood and bodily fluids should not be treated like an ordinary household spill.",
        body: [
          "The visible area may not show the full extent of what was affected. Depending on the incident, biological material may reach floors, walls, furniture, cabinets and nearby surfaces, personal belongings, fabrics and other porous materials, vehicles, and areas surrounding the primary scene.",
          "The material and condition matter. A hard surface may require a different approach than fabric, carpeting, or personal contents."
        ],
        pullQuote: "Aseptaclean assesses the affected area before defining the cleanup.",
        // OWNER-APPROVED REPLACEMENT 2026-09-06. Was package slot 14 `trauma-residential-surfaces`,
        // a bare floor/wall/baseboard junction. This is the page's "cleaning affected surfaces"
        // slot and the owner supplied an image of exactly that: a suited worker cleaning an
        // exposed floor surface. It answers the section's own subject — "The material and
        // condition matter. A hard surface may require a different approach than fabric,
        // carpeting, or personal contents" — where the previous image only showed an unaffected
        // surface. Scoped approval as above; `trauma-residential-surfaces` stays in the source
        // tree and the registry, now unplaced.
        image: "trauma-floor-surface-cleaning",
        // Alt narrowed 2026-09-06 by the claims check. The first draft ended "…with carpet pulled
        // back at the edges". Accurate, but it foregrounds material removal next to a scope list
        // that covers cleaning and disinfection and contains no removal line — the same
        // implication the owner ruled out for `trauma-affected-carpet-detail`. The floor IS
        // exposed wood and the worker IS cleaning it, so this states the subject the owner
        // named ("protective-suited worker cleaning an exposed residential floor surface")
        // without narrating an action the page does not offer. "A worker", never "our
        // technician" — nothing here presents the figure as an Aseptaclean employee.
        imageAlt:
          "A worker in a protective suit and respirator cleaning an exposed wood floor in a residential bedroom"
      },
      {
        kind: "intro",
        eyebrow: "04 / Scope",
        heading: "What Aseptaclean does",
        id: "scope",
        lead: "Depending on the approved scope, trauma-scene cleanup may include:",
        list: [
          "Assessment of the affected area",
          "Establishment of the cleanup work area",
          "Blood and bodily fluid cleanup",
          "Cleaning and disinfection of accepted affected surfaces",
          "Handling of affected personal contents",
          "Packaging of regulated trauma-scene waste",
          "Coordination of regulated waste transportation and disposal",
          "Project and waste documentation as applicable",
          "Final review of the completed scope"
        ],
        listColumns: 2,
        body: [
          "Every scene is different. The work is defined around the actual condition of the property rather than a standard package."
        ],
        tone: "soft"
        // NO IMAGE — SETTLED BY OWNER RULING, 2026-09-06.
        //
        // The owner supplied `trauma-affected-carpet-detail.png` (a suited worker cutting and
        // lifting affected carpet) for "the supporting section explaining affected materials and
        // scope boundaries," with the standing instruction not to place it where it would imply
        // Aseptaclean performs excluded removal work, and to report rather than broaden the offer
        // if no suitable section exists.
        //
        // RULING: the image is left unused. It stays outside the production page, and NO service,
        // claim or exclusions section may be added in order to accommodate it. Do not "fix" the
        // unused file by inventing a slot for it here or anywhere else on this route.
        //
        // The reasoning the ruling accepted — no suitable section exists on this page:
        //   · The nine-item list above is this route's only scope statement, and every line is
        //     assessment, containment, CLEANING, disinfection, handling of contents, packaging,
        //     coordination, documentation or review. None covers removal of affected building
        //     materials — flooring, carpet or otherwise. The source of record,
        //     docs/aseptaclean-crime-scene-trauma-cleanup.md "What Aseptaclean does", carries the
        //     same nine lines and no removal line either.
        //   · This page publishes no exclusions or scope-boundary section at all. Sections 01–10
        //     are situations, after-release, why-it-differs, this scope list, process, discretion,
        //     belongings, regulated waste, why-Aseptaclean, FAQ and cost.
        //   · Section 03 explains affected MATERIALS but is not a boundary statement; placing a
        //     carpet-being-cut-out image against "a hard surface may require a different approach
        //     than fabric, carpeting" would read as Aseptaclean's answer for carpet, which is the
        //     precise implication the owner ruled out.
        //   · `kind: "intro"` renders no image slot, so this section cannot carry one without a
        //     component change — which would be building a new visual slot to host a claim the
        //     copy does not make.
        //
        // The file is installed in src/assets/aseptaclean/ and preserved, but is NOT in
        // AcServicePage's image registry, so it cannot be placed by naming it. That is now the
        // permanent state, not a pending item. Recorded in docs/06-ASSET-MANIFEST.md.
      },
      {
        kind: "steps",
        eyebrow: "05 / Process",
        heading: "How the process works",
        id: "process",
        steps: [
          {
            title: "Contact Aseptaclean",
            body: "Tell us where the property is, whether the scene has been released, and the general nature of the incident. You do not need to provide graphic photographs simply to make first contact."
          },
          {
            title: "We assess the scene",
            body: "We review the affected areas, surfaces, contents, access, and waste conditions. From there, we define the proposed scope of work and pricing."
          },
          {
            title: "Cleanup begins after approval",
            body: "Aseptaclean performs the approved cleanup and manages accepted regulated trauma-scene waste generated during the project."
          },
          {
            title: "Final review and documentation",
            body: "The completed areas are reviewed against the approved scope. Project and waste records are maintained as applicable to the job."
          }
        ]
      },
      {
        kind: "dark",
        eyebrow: "06 / Discretion",
        heading: "Discreet and",
        headingAccent: "private service.",
        id: "discretion",
        body: [
          "A traumatic event can attract attention that the people involved never asked for. We keep communication focused on the authorized client and the work that needs to be completed.",
          "Aseptaclean does not publicly share identifiable project photographs or details without permission. We do not discuss the circumstances of the scene with neighbors, media, or unrelated third parties.",
          "And we do not require unnecessary graphic information just to determine whether we can help."
        ],
        pullQuote: "The cleanup should not make a private situation more public."
        // NO IMAGE, 2026-09-05. This section's subject is a communication practice — who we talk
        // to and what we do not disclose. It is not a visible property condition, and the owner
        // image package contains nothing that depicts it. The stock technician-in-a-respirator
        // photograph that sat here illustrated none of the copy and read as an Aseptaclean crew
        // member, which doc 21 §6 forbids. AcDarkBand drops its media column when no image is
        // passed, so this renders as a single full-width dark band rather than a blank plate.
      },
      {
        kind: "split",
        eyebrow: "07 / Belongings",
        heading: "Personal belongings are handled with care.",
        id: "belongings",
        lead: "A crime or trauma scene can involve personal belongings that have financial or emotional importance.",
        body: [
          "Photographs. Documents. Electronics. Clothing. Furniture. Keepsakes. Other personal items.",
          "We do not automatically treat everything inside an affected area as disposable. The condition of the item, material, cleanup feasibility, and direction of the authorized client are considered before important belongings are discarded."
        ],
        // Package slot 05. The section lists the belongings at stake — "Photographs. Documents.
        // Electronics. Clothing. Furniture. Keepsakes." — and this shows exactly that class of
        // stored household property. No incident content. Replaces a Commons empty room, which
        // showed the opposite of belongings.
        image: "hoarding-garage-contents",
        imageAlt:
          "Stored household belongings in a garage — cardboard boxes, storage tubs, framed pictures, a lamp and folded textiles",
        ratio: "5/4",
        reverse: true
      },
      {
        kind: "split",
        eyebrow: "08 / Regulated waste",
        heading: "Regulated biohazard waste",
        id: "regulated-waste",
        lead: "Trauma-scene cleanup can generate waste that cannot simply be treated as ordinary household trash.",
        body: [
          "Aseptaclean is a California Registered Trauma Scene Waste Management Practitioner, TSW #933.",
          "Regulated waste transportation and disposal are coordinated through an authorized third-party waste transportation partner. Waste documentation is maintained as applicable to the project."
        ],
        // NO IMAGE, 2026-09-05. The required subject is regulated-waste handling or waste
        // documentation, and the owner image package contains nothing of the kind — it is
        // eighteen property-condition photographs and the founder portrait. The stock photograph
        // that sat here was a marked clinical-waste bin on a public street with passers-by in
        // frame; beyond the people, placing it beside the TSW #933 registration read as
        // Aseptaclean's own waste operation, which is a capability claim this section explicitly
        // attributes to a third-party transport partner. Reported as an unresolved slot in
        // docs/06-ASSET-MANIFEST.md rather than filled with an unrelated interior. AcSplit
        // renders copy-only when no image is passed.
      },
      {
        kind: "intro",
        eyebrow: "09 / Why Aseptaclean",
        heading: "Why Aseptaclean",
        id: "why",
        lead: "Assess the scene. Define the scope. Perform the approved cleanup. Document the work.",
        // The source line "Aseptaclean provides biohazard remediation and specialty property
        // cleanup" is NOT reproduced — AGENTS.md §7 bars "remediation" and "biohazard" as a
        // service claim. The list below drops "Insured" for the same COI reason as every other
        // route. See docs/20-COPY-MAP.md §4.
        list: [
          "California Registered Trauma Scene Waste Management Practitioner — TSW #933",
          "Owner-operated",
          "Supported by an established regulated waste transportation and disposal pathway",
          "Focused on defined scope and documented work"
        ],
        body: [
          "Our founder's background includes a B.S. in Biochemistry, pharmaceutical manufacturing, and surgical pathology. That background helped shape Aseptaclean's emphasis on careful, procedure-driven work."
        ],
        tone: "soft"
      },
      {
        kind: "faq",
        heading: "Frequently asked questions",
        id: "faq",
        items: [
          {
            question: "Does insurance cover crime scene or trauma cleanup?",
            answer:
              "It may. Homeowners, renters, commercial, vehicle, or other insurance policies may provide coverage depending on the circumstances and the policy. The insurance carrier determines whether a loss is covered. Aseptaclean can provide documentation related to our work, including estimates, scopes, invoices, and available project records that may assist with the claims process. You do not need to know whether insurance applies before contacting us."
          },
          {
            question: "When can cleanup begin?",
            answer:
              "Aseptaclean begins after the scene has been released by the appropriate authority. We do not interfere with an active crime scene or investigation."
          },
          {
            question: "Do I need to clean anything before you arrive?",
            answer:
              "No. You do not need to clean, move belongings, or prepare the affected area before contacting us."
          },
          {
            question: "Do I have to send photos?",
            answer:
              "No. A short explanation is enough to begin. If photographs would help us evaluate the project, we will tell you what would be useful."
          },
          {
            question: "Do I have to be at the property?",
            answer:
              "Not always. If access has been authorized and there is a clear decision-maker for the project, portions of the work may be coordinated remotely."
          },
          {
            question: "What happens to affected belongings?",
            answer:
              "It depends on the item and its condition. Some belongings may be suitable for cleaning. Others may require disposal. Important items are not automatically discarded without considering the condition and the client's instructions."
          },
          {
            question: "Do you handle the biohazard waste?",
            answer:
              "Yes. Accepted regulated trauma-scene waste generated during Aseptaclean's cleanup is packaged and managed through the appropriate regulated waste process. Transportation and disposal are coordinated through our third-party waste transportation partner."
          },
          {
            question: "Can you work with my insurance company?",
            answer:
              "Aseptaclean can provide estimates, invoices, scopes, and available project documentation that may be useful during an insurance claim. Coverage and payment decisions remain with the insurer and policyholder."
          }
        ]
      },
      {
        kind: "intro",
        eyebrow: "10 / Cost",
        heading: "How much does trauma cleanup cost?",
        id: "cost",
        lead: "Every scene is different. Pricing may depend on:",
        list: [
          "Size of the affected area",
          "Amount of blood or bodily fluid",
          "Number of affected areas",
          "Surface and material types",
          "Personal contents involved",
          "Waste volume",
          "Access",
          "Odor conditions",
          "Duration of the condition",
          "Amount of cleanup required"
        ],
        listColumns: 2,
        body: ["Once we understand the scene, we can explain the proposed scope and cost."]
      }
    ],
    finalHeading: "You do not have to know what to do next.",
    finalBody: [
      "Most people who contact us have never dealt with a situation like this before.",
      "Tell us where the property is, whether the scene has been released, what happened, and which area appears to be affected. We will help you determine the next step."
    ]
  }
];

export const findServicePage = (slug: string) =>
  servicePageCopy.find((page) => page.slug === slug);
