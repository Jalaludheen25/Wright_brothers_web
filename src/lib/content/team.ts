/**
 * DEMONSTRATION CONTENT. These people, biographies and tenures are written to
 * exercise the design — they are not real staff. Replace before publishing.
 */

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  bio: string;
  since: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Daniel Wright",
    role: "Managing Director",
    initials: "DW",
    since: "Founder, 2009",
    bio: "Trained as a structural engineer in Manchester, moved to Dubai in 2006 and spent three years watching good designs get built badly. Founded the practice with his brother to close the gap between the two.",
  },
  {
    name: "Michael Wright",
    role: "Construction Director",
    initials: "MW",
    since: "Founder, 2009",
    bio: "Twenty-four years on site, the last sixteen of them in the Gulf. Holds the Grade A contractor classification personally and still walks every project at least once a fortnight.",
  },
  {
    name: "Yasmin Rahal",
    role: "Head of Design",
    initials: "YR",
    since: "Joined 2014",
    bio: "Architect, AA graduate, formerly of a Beirut practice with a long history of courtyard housing. Leads concept and interior architecture, and is the reason our façades have depth.",
  },
  {
    name: "Omar Haddad",
    role: "Head of Delivery",
    initials: "OH",
    since: "Joined 2016",
    bio: "Runs the site teams, the programme and the authority submissions. Responsible for the Friday report, which he wrote the first version of and has refused to let anyone shorten.",
  },
  {
    name: "Priya Menon",
    role: "Commercial Director",
    initials: "PM",
    since: "Joined 2018",
    bio: "Quantity surveyor by training. Owns the fixed price — she is the person who has to defend it, which is why she is in the room from the first survey onward.",
  },
  {
    name: "Ahmed Barakat",
    role: "Workshop Manager",
    initials: "AB",
    since: "Joined 2012",
    bio: "Runs our joinery workshop in Al Quoz and the fixing teams that install what it makes. Third-generation cabinetmaker; his grandfather's chisels are in the workshop.",
  },
];

/** Values shown on the About page. */
export const VALUES = [
  {
    title: "Find out first",
    body: "We investigate before we commit. A price given without knowledge is a guess with a signature on it, and someone always pays for the difference later.",
  },
  {
    title: "Draw it completely",
    body: "Every junction resolved on paper before it is resolved on site. A change costs nothing in week six and a great deal in month nine.",
  },
  {
    title: "Say the difficult thing early",
    body: "If the brief and the budget do not agree, we say so in the first meeting. It loses us work. It has never lost us a client.",
  },
  {
    title: "Own the whole of it",
    body: "One team, one contract, one number to call. We removed the interface rather than learning to manage it.",
  },
  {
    title: "Build for the second owner",
    body: "The parts nobody sees — waterproofing, substrates, fixings — are specified as though the house will be surveyed in thirty years. Because it will be.",
  },
  {
    title: "Stay after handover",
    body: "A ten-year structural warranty and a twelve-month aftercare visit booked before we leave. The relationship does not end with the final invoice.",
  },
];
