/**
 * DEMONSTRATION CONTENT. These quotes and the people attributed to them are
 * written to exercise the design — they are not real client reviews.
 * Replace them with genuine, permissioned testimonials before publishing.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  project?: string;
  /** Slug of the case study, when one exists. Cleared when the demo villa
   *  projects were replaced by real work — the link renders only if set. */
  projectSlug?: string;
  /** Two-letter monogram used in place of a photograph. */
  initials: string;
  rating: 5;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "We interviewed four firms. Wright Brothers were the only ones who told us what our original brief would actually cost, and the only ones who said part of it was a bad idea. Twenty months later the number on the final account was within two per cent of the number they gave us in month three.",
    name: "Hessa Al Marri",
    role: "Homeowner",
    location: "Jumeirah",
    project: "Barajeel Villa",
    initials: "HM",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "What sold us was the survey. They spent three weeks measuring and opening things up before they would quote. Every other contractor gave us a price in four days — and every one of those prices would have moved.",
    name: "James Whitfield",
    role: "Homeowner",
    location: "Emirates Hills",
    project: "Sarab House",
    initials: "JW",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "I have built three houses in two countries. This is the first time the people who designed it were still standing on site at handover. That single fact removes about eighty per cent of the arguments.",
    name: "Dr. Anand Krishnan",
    role: "Homeowner",
    location: "Al Barari",
    project: "Ghaf House",
    initials: "AK",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "The building management on our tower is famously difficult. We never spoke to them once. Wright Brothers handled every permit, every NOC and every lift booking for eleven months.",
    name: "Leïla Haddad",
    role: "Homeowner",
    location: "Palm Jumeirah",
    project: "Al Marsa Penthouse",
    initials: "LH",
    rating: 5,
  },
  {
    id: "t5",
    quote:
      "We were living in the house throughout. Nineteen weeks of construction and I never once found dust in a bedroom. That is not luck, it is a system.",
    name: "Rania Nasser",
    role: "Homeowner",
    location: "Dubai Hills Estate",
    project: "Meridian Townhouse",
    initials: "RN",
    rating: 5,
  },
  {
    id: "t6",
    quote:
      "Our previous renovation, with a different firm, had eleven variation orders. This one had two, both of which we requested ourselves. I did not know that was possible in Dubai.",
    name: "Tom Beaumont",
    role: "Homeowner",
    location: "Arabian Ranches",
    project: "Falaj Courtyard",
    initials: "TB",
    rating: 5,
  },
  {
    id: "t7",
    quote:
      "They reserved the actual stone block and sent us photographs of it before it was cut. When the kitchen went in, the veining ran from the island straight onto the wall behind it. Nobody asked us to notice. We noticed.",
    name: "Mariam Al Suwaidi",
    role: "Homeowner",
    location: "District One",
    project: "Reem Residence",
    initials: "MS",
    rating: 5,
  },
  {
    id: "t8",
    quote:
      "Weekly reports with photographs, a live cost position, and a named person who answered the phone. After two years of a different contractor, the professionalism was almost disorienting.",
    name: "Peter Lindqvist",
    role: "Homeowner",
    location: "Palm Jumeirah",
    project: "Nakheel Villa",
    initials: "PL",
    rating: 5,
  },
  {
    id: "t9",
    quote:
      "Eighteen months after handover a shower valve failed. Someone was at the house the same afternoon. That is when you actually find out who you hired.",
    name: "Sofia Marchetti",
    role: "Homeowner",
    location: "Jumeirah",
    initials: "SM",
    rating: 5,
  },
];
