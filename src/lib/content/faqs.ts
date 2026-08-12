export type Faq = {
  question: string;
  answer: string;
  group: "Working together" | "Cost & contract" | "On site" | "After handover";
  /**
   * Optional labelled sub-points, rendered as a list beneath the answer.
   * Only the MEP question uses these; everything else is a single paragraph.
   */
  details?: { label: string; text: string }[];
  /** Closing paragraph, shown after `details`. */
  outro?: string;
};

export const FAQS: Faq[] = [
  /* --- Working together ------------------------------------------------ */
  {
    group: "Working together",
    question: "What does Design & Build mean?",
    answer:
      "Design & Build is an integrated approach where the design and execution of your project are managed by one team. This helps maintain better coordination between the design, materials, technical works and site execution from concept through to completion.",
  },
  {
    group: "Working together",
    question: "Do you offer design-only services?",
    answer:
      "Yes, depending on the project requirements. We can provide interior design and related design services separately, or combine them with our fit-out and execution services.",
  },
  {
    group: "Working together",
    question:
      "We already have an architect or designer. Can you work with their design?",
    answer:
      "Yes. We can work with an existing architect or designer and execute the approved design according to the agreed drawings, specifications and project requirements.",
  },
  {
    group: "Working together",
    question: "Do you provide furniture and furnishing as well?",
    answer:
      "Depending on the project scope, we can coordinate or provide various interior elements such as custom joinery, wardrobes, kitchens, furniture and other finishing elements. These items will be clearly specified in the quotation.",
  },
  {
    group: "Working together",
    question: "Can you help with material selection?",
    answer:
      "Yes. Our team can assist with selecting suitable finishes and materials based on the design concept, functionality, durability, budget and overall appearance of the project.",
  },
  {
    group: "Working together",
    question: "Do you undertake residential and commercial projects?",
    answer:
      "Yes. We can undertake interior fit-out requirements for residential and commercial spaces, depending on the project scope and our suitability for the specific requirements.",
  },
  {
    group: "Working together",
    question: "Do you provide turnkey interior fit-out solutions?",
    answer:
      "Yes. Where required, we can manage the project from design coordination through procurement, technical works, installation, finishing and handover, providing an integrated solution under one project team.",
  },
  {
    group: "Working together",
    question: "Why choose us?",
    answer:
      "We combine design coordination, technical expertise and professional site execution to provide a well-managed interior fit-out experience. Our focus is on clear communication, quality workmanship, attention to detail and delivering projects according to the agreed scope and requirements.",
  },

  /* --- Cost & contract -------------------------------------------------- */
  {
    group: "Cost & contract",
    question: "Is there a minimum project size or budget?",
    answer:
      "Project suitability depends on the scope and nature of the work rather than simply the size of the property. Contact us with your requirements and we will assess whether we are the right fit for your project.",
  },
  {
    group: "Cost & contract",
    question: "Is the site survey chargeable?",
    answer:
      "Site survey arrangements depend on the project and its requirements. Any applicable survey or consultation charges will be communicated clearly before the service is undertaken.",
  },
  {
    group: "Cost & contract",
    question: "How is the quotation prepared?",
    answer:
      "We prepare our quotation based on the agreed scope of work, drawings, specifications, materials, quantities, site conditions and other project requirements. A detailed quotation helps ensure clarity on what is included in the project.",
  },
  {
    group: "Cost & contract",
    question: "Is the quoted price fixed?",
    answer:
      "Our quotation is based on the agreed scope and specifications. Once the scope is confirmed, the agreed contract value remains applicable unless there are approved variations, changes in specifications, additional works or unforeseen conditions requiring adjustment.",
  },
  {
    group: "Cost & contract",
    question: "How are project payments structured?",
    answer:
      "Payments are normally arranged in stages according to the agreed contract and project progress. The payment schedule will be clearly communicated and agreed with the client before work begins.",
  },
  {
    group: "Cost & contract",
    question: "How can I get a quotation for my project?",
    answer:
      "Simply contact our team and share your project location, property type, approximate size, drawings if available, and your requirements. We will review the information and guide you through the next steps.",
  },

  /* --- On site ---------------------------------------------------------- */
  {
    group: "On site",
    question: "What happens before the project starts?",
    answer:
      "Before execution begins, we review the scope, drawings, materials, specifications, schedule, site conditions and other relevant requirements. This helps establish a clear understanding between the client and our team before work begins.",
  },
  {
    group: "On site",
    question: "How long does an interior fit-out project take?",
    answer:
      "The duration depends on the size and complexity of the project, design requirements, material selections, site conditions and required approvals. After reviewing the project scope, we can provide an estimated project schedule.",
  },
  {
    group: "On site",
    question: "Can we stay in the property while the work is in progress?",
    answer:
      "This depends on the type and extent of the work. For some projects, partial occupancy may be possible with appropriate safety measures. For major renovation or fit-out works, temporarily vacating the property may be more practical and safer.",
  },
  {
    group: "On site",
    question: "Who handles permits and authority approvals?",
    answer:
      "Where required, we can coordinate the necessary technical documentation and approval processes within the agreed scope of work. The specific approvals required depend on the project location, property type and nature of the works.",
  },
  {
    group: "On site",
    question: "How will we know what is happening during the project?",
    answer:
      "Our project team maintains communication with the client throughout the project. Progress updates, site coordination, material selections and important project decisions are communicated according to the agreed project management process.",
  },
  {
    group: "On site",
    question: "Can I make changes after the work has started?",
    answer:
      "Changes may be possible depending on the stage of the project. Any change that affects the cost, materials or timeline should be reviewed and approved before execution.",
  },
  {
    group: "On site",
    question: "Do you handle MEP works?",
    answer:
      "Yes. We provide MEP (Mechanical, Electrical and Plumbing) works as part of our interior fit-out services, depending on the requirements and scope of each project. Our MEP services include the installation, modification and coordination of essential building services, such as:",
    details: [
      {
        label: "Mechanical",
        text: "HVAC and air-conditioning works, ventilation and related mechanical services.",
      },
      {
        label: "Electrical",
        text: "Power and lighting installations, electrical wiring, distribution boards, switches, sockets and other electrical requirements within the project scope.",
      },
      {
        label: "Plumbing",
        text: "Water supply, drainage, sanitary installations and related plumbing works.",
      },
      {
        label: "MEP Coordination",
        text: "Coordination of MEP services with the interior design, ceilings, partitions, joinery and other fit-out works to ensure proper integration and efficient execution.",
      },
    ],
    outro:
      "Our team coordinates the MEP works with the overall fit-out programme and project requirements, with the exact scope, specifications and authority requirements agreed before execution.",
  },
  {
    group: "On site",
    question: "How do you maintain quality during the project?",
    answer:
      "Quality is managed through proper planning, material selection, technical coordination, site supervision and inspection at different stages of the project. Our aim is to deliver work that meets the agreed drawings, specifications and project requirements.",
  },

  /* --- After handover --------------------------------------------------- */
  {
    group: "After handover",
    question: "What happens at the end of the project?",
    answer:
      "Before handover, the completed works are reviewed and any identified snagging items are addressed according to the agreed scope. Once the works are completed and accepted, the project is formally handed over to the client.",
  },
  {
    group: "After handover",
    question: "What warranty do you provide?",
    answer:
      "Warranty coverage depends on the type of work, materials and agreed contract terms. The applicable warranty details will be clearly stated in the project documentation.",
  },
  {
    group: "After handover",
    question: "What happens if an issue occurs after handover?",
    answer:
      "If an issue covered by the agreed warranty or after-sales terms occurs after handover, the client can contact our team. We will review the issue and arrange the appropriate response according to the applicable warranty and project terms.",
  },
];

export const FAQ_GROUPS = Array.from(new Set(FAQS.map((f) => f.group)));
