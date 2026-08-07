export type Faq = {
  question: string;
  answer: string;
  group: "Working together" | "Cost & contract" | "On site" | "After handover";
};

export const FAQS: Faq[] = [
  {
    group: "Working together",
    question: "What does design-and-build actually mean here?",
    answer:
      "It means one company, one contract and one accountability. We design your house completely — architecture, interiors, engineering — and then we construct it with our own site team. There is no handover between a designer who blames the builder and a builder who blames the drawings, because both are us.",
  },
  {
    group: "Working together",
    question: "Do you take on projects outside Dubai?",
    answer:
      "We work across Dubai and, selectively, in Abu Dhabi and Ras Al Khaimah. Beyond the UAE we do not, because the thing we sell is a site team we employ directly and a workshop we own — neither travels well.",
  },
  {
    group: "Working together",
    question: "Can we appoint you for design only?",
    answer:
      "Occasionally, but we will usually say no. Our design is priced on the assumption that we will be the ones to build it, and the level of detail we go to is only economic because it saves us money on site. A design-only fee that reflected that detail would look expensive next to a conventional practice.",
  },
  {
    group: "Working together",
    question: "We already have an architect. Will you build their design?",
    answer:
      "Yes, provided the package is complete enough to price properly and we are permitted a technical review before we commit to a number. We will raise anything we think will cause a problem on site, in writing, once. After that it is your architect's call and we build what is drawn.",
  },
  {
    group: "Cost & contract",
    question: "What is the minimum project you will take on?",
    answer:
      "Around AED 320,000 for a single-room rebuild such as a kitchen or a principal bathroom, and around AED 2.4 million for a full villa transformation. Below that we are not the efficient choice and we will point you towards a firm that is.",
  },
  {
    group: "Cost & contract",
    question: "Why do you charge for the survey?",
    answer:
      "Because a free survey is not a survey. Three weeks of measuring, drainage tracing and opening-up works costs us real money, and it is the single reason our fixed prices hold. A firm that surveys for free is either not surveying or is recovering the cost inside a number you have not seen yet.",
  },
  {
    group: "Cost & contract",
    question: "Is the fixed price genuinely fixed?",
    answer:
      "Yes, against the specification it was priced on. It moves in two circumstances: you change your mind, or we open a wall and find something no survey could reasonably have found. The second is rare because of stage two, and when it happens you see the evidence and the cost before any work proceeds.",
  },
  {
    group: "Cost & contract",
    question: "How are payments structured?",
    answer:
      "Against dated milestones tied to completed work, not to the calendar. You never pay for a stage before it exists. The survey and design stages are invoiced separately and are deductible from the construction contract if you proceed with us.",
  },
  {
    group: "On site",
    question: "How long will it take?",
    answer:
      "A single room is ten to eighteen weeks. A full villa transformation is nine to fourteen months on site, plus roughly five months of design and permits before that. A ground-up house is sixteen to twenty-four months. We give you a dated programme at fixed-price stage and we report against it every week.",
  },
  {
    group: "On site",
    question: "Can we live in the house during the works?",
    answer:
      "For single-room and phased projects, usually yes — we use dust screens, negative-pressure extraction and sealed routes, and we programme around you. For a full transformation, no. The house will be without power, water or a roof at various points, and pretending otherwise costs everyone money.",
  },
  {
    group: "On site",
    question: "Who handles permits and authority approvals?",
    answer:
      "We do, entirely. Dubai Municipality or the relevant authority, DEWA, your community developer, and the building management company for tower work. You are told what has been submitted and what has come back. Nothing is passed to you to chase.",
  },
  {
    group: "On site",
    question: "How will we know what is happening?",
    answer:
      "A written report every Friday with progress photographs, position against programme, the live cost position, and any decision we need from you — each with a deadline. Plus a named project manager who answers their phone and a monthly walkthrough on site.",
  },
  {
    group: "After handover",
    question: "What warranty do you provide?",
    answer:
      "Ten years on structure, five years on workmanship including all wet areas, and the manufacturer's warranty on every installed product, registered in your name and handed over in the O&M pack.",
  },
  {
    group: "After handover",
    question: "What happens if something fails after we move in?",
    answer:
      "You call the same project manager. Anything affecting water, power or cooling is attended within twenty-four hours; everything else within five working days. We also schedule a full aftercare visit at twelve months, booked at handover so nobody has to remember it.",
  },
  {
    group: "After handover",
    question: "Do you furnish the house as well?",
    answer:
      "We deliver everything permanent — joinery, stone, lighting, window treatments. Loose furniture and styling are available as an add-on service and about half our clients take it. The other half arrive with their own things, which is entirely the point of a house.",
  },
];

export const FAQ_GROUPS = Array.from(new Set(FAQS.map((f) => f.group)));
