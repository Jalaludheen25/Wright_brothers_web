/**
 * The team — real, client-supplied names, roles and descriptions.
 *
 * `since` stays optional and unset; no start dates have been supplied and the
 * card skips it cleanly. Never invent biographical detail for a named person
 * here — everything below came from the client.
 */

export type TeamMember = {
  name: string;
  role: string;
  /** Two-letter monogram used in place of a photograph. */
  initials: string;
  bio?: string;
  since?: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Jinto Jose",
    role: "Founder & CEO",
    initials: "JJ",
    bio: "Leads the company with a strong vision for delivering reliable, high-quality technical services and ensuring complete customer satisfaction.",
  },
  {
    name: "Riya Varghese",
    role: "General Manager",
    initials: "RV",
    bio: "Oversees daily operations, project coordination and client relationships to ensure every project runs smoothly.",
  },
  {
    name: "Ribin Varghese",
    role: "Accountant",
    initials: "RV",
    bio: "Manages financial operations, budgeting, invoicing and administrative processes with accuracy and transparency.",
  },
  {
    name: "Tina Martin",
    role: "HR Administrator",
    initials: "TM",
    bio: "Handles recruitment, employee management and organisational support while maintaining an efficient workplace.",
  },
  {
    name: "Akhil Raj",
    role: "Site Engineer",
    initials: "AR",
    bio: "Supervises project execution on site, ensuring quality standards, safety and timely completion.",
  },
  {
    name: "Anandhu",
    role: "Site Engineer",
    initials: "A",
    bio: "Coordinates construction activities, technical inspections and site operations to deliver high-quality workmanship.",
  },
  {
    name: "Ziyad",
    role: "Site Supervisor",
    initials: "Z",
    bio: "Monitors day-to-day site activities, manages field teams and ensures work is completed efficiently.",
  },
  {
    name: "Muhmed",
    role: "Site Supervisor",
    initials: "M",
    bio: "Supports on-site operations by coordinating workers, maintaining quality and ensuring project progress.",
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
