import type { ImageKey } from "@/lib/images";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Cost" | "Design" | "Process" | "Regulation" | "Materials";
  date: string;
  readingMinutes: number;
  author: string;
  authorRole: string;
  image: ImageKey;
  body: Block[];
  featured?: boolean;
};

export const POSTS: Post[] = [
  {
    slug: "why-dubai-renovation-budgets-move",
    title: "Why Dubai renovation budgets move — and how to stop yours",
    excerpt:
      "Almost every overrun we are asked to rescue traces back to the same root cause: a price given before anybody looked behind the walls.",
    category: "Cost",
    date: "2026-06-18",
    readingMinutes: 7,
    author: "Daniel Wright",
    authorRole: "Managing Director",
    image: "craft-strip-out",
    featured: true,
    body: [
      {
        type: "p",
        text: "A homeowner shows us a quotation. It is four pages long, it arrived five days after the contractor first walked the house, and it is eleven per cent cheaper than ours. Nine months later the same homeowner is at forty per cent over that number and the contractor has left. We see some version of this several times a year, and the cause is almost never dishonesty. It is arithmetic performed on information nobody had.",
      },
      { type: "h2", text: "A price is a claim about the unknown" },
      {
        type: "p",
        text: "When a contractor prices a renovation in five days, they have seen the finishes and nothing else. They have not traced the drainage, opened a wall, tested the distribution board or established whether the slab is where the original drawings say it is. Every one of those unknowns has a cost attached, and the contractor has three options: guess high and lose the job, guess low and recover it later through variations, or find out first.",
      },
      {
        type: "p",
        text: "In a competitive market with cost-sensitive clients, the second option wins work. This is why the cheapest quotation is so often the most expensive project.",
      },
      { type: "h2", text: "What actually goes wrong" },
      {
        type: "p",
        text: "Across the projects we have been called in to complete, the recurring discoveries are remarkably consistent:",
      },
      {
        type: "ul",
        items: [
          "Drainage falls that do not run where the drawings show, requiring floor build-ups nobody budgeted for.",
          "Distribution boards at capacity, so any added cooling or kitchen load means a DEWA upgrade application.",
          "Waterproofing in wet areas that was never tanked, only sealed at the surface — invisible until the ceiling below stains.",
          "Structural walls shown as partitions, discovered at the moment of demolition.",
          "Chilled-water or split systems sized for the original plan, not the open-plan one now being built.",
        ],
      },
      {
        type: "p",
        text: "None of these is exotic. All of them are findable in advance. None of them is findable in five days.",
      },
      { type: "h2", text: "The survey is the whole argument" },
      {
        type: "p",
        text: "We charge for a three-week technical survey before we will give a construction price, and we lose a certain number of prospective clients at exactly that sentence. The survey involves a laser-measured model of the building, CCTV of the drainage, an electrical and cooling assessment, and selected opening-up works — small, deliberate holes in the right places, made good afterwards.",
      },
      {
        type: "quote",
        text: "A free survey is not a survey. It is a sales visit with a tape measure.",
      },
      {
        type: "p",
        text: "What it buys is the ability to commit. Because we know what is behind the wall, we can issue a fixed price and hold it. Across our last forty projects the final account has landed within an average of two per cent of the contract sum, and in most of those cases the two per cent was a change the client chose to make.",
      },
      { type: "h2", text: "Questions worth asking any contractor" },
      {
        type: "ul",
        items: [
          "What investigation will you carry out before you give me a price, and what will it cost?",
          "Is your price fixed against a written specification, and may I see that specification?",
          "Under what circumstances can this number change, in writing?",
          "May I speak to a client whose final account was higher than their contract sum?",
        ],
      },
      {
        type: "p",
        text: "The last question is the useful one. Every contractor has a project that went over. The ones worth hiring will tell you about it, explain why, and put you in touch with the client anyway.",
      },
    ],
  },
  {
    slug: "designing-for-forty-five-degrees",
    title: "Designing for 45°C: what actually keeps a Dubai house cool",
    excerpt:
      "Shading, orientation and thermal mass do more for comfort than any amount of installed cooling capacity — and they cost less to run for the next thirty years.",
    category: "Design",
    date: "2026-05-02",
    readingMinutes: 8,
    author: "Yasmin Rahal",
    authorRole: "Head of Design",
    image: "ext-facade-detail",
    featured: true,
    body: [
      {
        type: "p",
        text: "The default response to Gulf heat is mechanical: install more cooling. It works, in the sense that the house reaches setpoint. It also produces a building that is expensive to run, uncomfortable near the glass, and entirely dependent on plant that will need replacing twice in your ownership. The alternative is to stop the heat before it arrives.",
      },
      { type: "h2", text: "Shading is the highest-return decision you will make" },
      {
        type: "p",
        text: "Direct solar gain through glazing is the single largest cooling load in a typical Dubai villa. A square metre of unshaded west-facing glass can admit several hundred watts at four o'clock in July. The same square metre behind a deep reveal, a brise-soleil or a colonnade admits a fraction of it — while the view through it is unchanged.",
      },
      {
        type: "p",
        text: "This is why our façades tend to have depth. At Sarab House the entire west elevation sits behind a two-storey colonnade of stone piers. The lake view is completely open; the glass sees no direct sun after two in the afternoon. The house holds setpoint through a July afternoon on roughly two-thirds of the cooling capacity a comparable villa would install.",
      },
      { type: "h2", text: "Orientation is free, and it is decided once" },
      {
        type: "p",
        text: "On a new-build plot, which way the principal rooms face is the cheapest decision in the project and the most permanent. Living spaces to the north and east, service and circulation to the west, sleeping accommodation where it will be cool at night rather than where the view happens to be best at noon.",
      },
      {
        type: "quote",
        text: "Orientation costs nothing at concept stage and cannot be bought back at any price once the foundations are poured.",
      },
      { type: "h2", text: "Glass specification is not a single number" },
      {
        type: "p",
        text: "Homeowners are usually shown a U-value. In this climate the more consequential figure is the solar heat gain coefficient — how much of the sun's energy the glazing lets through. A low-e double-glazed unit with a well-chosen coating can cut solar gain substantially without the grey cast that makes a room feel like an aquarium. Specify both numbers, and specify them per elevation rather than for the whole house.",
      },
      { type: "h2", text: "Mass, and why it matters at night" },
      {
        type: "p",
        text: "Heavy construction — concrete, stone, thick blockwork — absorbs heat slowly during the day and releases it slowly at night. In a desert climate with a large diurnal swing this smooths the load on the cooling system and makes rooms feel steadier. Lightweight construction with a lot of glass does the opposite: it tracks the outside temperature almost immediately.",
      },
      { type: "h2", text: "Air movement, which we mostly forget" },
      {
        type: "p",
        text: "For roughly five months of the year, Dubai's evenings are pleasant. A house that cannot be opened up cannot take advantage of them. Cross-ventilation, stack effect through a stairwell, and — in the local idiom — wind towers all extend the shoulder seasons. At Barajeel Villa a pair of contemporary barajeel above the roof terrace let the upper floor run on natural ventilation for about five months annually.",
      },
      {
        type: "p",
        text: "None of this is a rejection of air conditioning. It is a way of making sure the air conditioning is doing a job the building has already made small.",
      },
    ],
  },
  {
    slug: "villa-renovation-permits-dubai",
    title: "Villa renovation permits in Dubai: what it takes and how long",
    excerpt:
      "A practical map of the approvals between a signed contract and a legal start on site — and which of them you can run in parallel.",
    category: "Regulation",
    date: "2026-04-09",
    readingMinutes: 9,
    author: "Omar Haddad",
    authorRole: "Head of Delivery",
    image: "abs-facade",
    body: [
      {
        type: "p",
        text: "Homeowners consistently underestimate this stage. Design gets attention because it is enjoyable and construction gets attention because it is visible, but the eight or so weeks of approvals in between are where optimistic programmes go to die. Here is what the sequence actually looks like.",
      },
      { type: "h2", text: "Who has to say yes" },
      {
        type: "ul",
        items: [
          "The relevant building authority — Dubai Municipality for most of the city, or the free-zone authority where your community sits under one such as Trakhees or the DDA.",
          "Your community developer or master developer, for anything affecting the external envelope, and often for internal works too.",
          "DEWA, where electrical load increases or the water connection changes.",
          "Dubai Civil Defence, on larger projects or where fire strategy is affected.",
          "The owners' association or building management, for anything in a tower.",
        ],
      },
      { type: "h2", text: "The realistic timeline" },
      {
        type: "p",
        text: "For a full villa transformation with no external changes, budget six to eight weeks from complete submission to permit in hand. Add external alterations — a new opening, a changed roof line, an extension — and it becomes ten to fourteen, because the developer NOC has to land before the authority submission is complete. Structural alterations require a submission stamped by a registered structural engineer, which adds its own lead time.",
      },
      {
        type: "quote",
        text: "The approvals clock does not start when you sign a contract. It starts when the submission is complete — and completeness is entirely within your team's control.",
      },
      { type: "h2", text: "What causes the delay" },
      {
        type: "p",
        text: "In our experience almost all avoidable delay comes from incomplete first submissions. A drawing set missing a detail, a structural calculation not stamped, an NOC applied for in the wrong sequence. Each round trip costs one to three weeks, and three round trips is a quarter of a year.",
      },
      {
        type: "p",
        text: "This is another reason we insist on completing the design before pricing. A finished technical package is also, not coincidentally, a submittable one.",
      },
      { type: "h2", text: "What you can run in parallel" },
      {
        type: "ul",
        items: [
          "Long-lead procurement — stone reservation, joinery timber, imported ironmongery, glazing — can begin as soon as the design is fixed.",
          "Site set-up, hoarding, welfare and utility connections can be arranged pending permit.",
          "Demolition of purely internal, non-structural elements is sometimes permissible ahead of the main permit, but confirm this in writing rather than assuming it.",
        ],
      },
      {
        type: "p",
        text: "Handled properly, the approvals period is not dead time. It is the window in which everything that has a twelve-week lead time gets ordered — so that the day the permit arrives, the site is genuinely ready.",
      },
    ],
  },
  {
    slug: "stone-selection-slab-by-slab",
    title: "Choosing stone slab by slab, and why we photograph the block",
    excerpt:
      "The difference between a specified material and a reserved one is the difference between a sample board and the wall you will actually live with.",
    category: "Materials",
    date: "2026-03-14",
    readingMinutes: 6,
    author: "Yasmin Rahal",
    authorRole: "Head of Design",
    image: "int-kitchen-garden",
    body: [
      {
        type: "p",
        text: "A stone sample is a 100 millimetre square. The wall it is meant to represent is four metres wide. Between those two facts sits most of the disappointment homeowners feel when the material finally arrives.",
      },
      { type: "h2", text: "Natural stone is not a product" },
      {
        type: "p",
        text: "Two slabs cut from different blocks of the same named marble can differ more from each other than from a different stone entirely. Veining direction, background tone, the density of movement — all vary by block, sometimes dramatically. Specifying a name and a finish tells your supplier almost nothing about what you are expecting.",
      },
      { type: "h2", text: "Reserving, not ordering" },
      {
        type: "p",
        text: "We take clients to the slab yard, or where the block is abroad, we have it photographed against a scale rule under consistent light. You choose the actual block. It is tagged, reserved in your name and held. Nothing else gets cut from it.",
      },
      {
        type: "quote",
        text: "You are not choosing a material. You are choosing the specific piece of the earth that is going into your house.",
      },
      { type: "h2", text: "Templating around the veining" },
      {
        type: "p",
        text: "Once the block is yours, layout becomes a design decision rather than a fabrication one. We digitally template the slab and position the cuts so the veining does what we want it to — running continuously from a kitchen island up onto the wall behind it, or book-matched across a fireplace so the pattern mirrors about the centre line.",
      },
      {
        type: "p",
        text: "At Reem Residence the client noticed this without being told. That is the correct outcome. Good stonework should read as inevitable rather than as clever.",
      },
      { type: "h2", text: "Practical notes for the Gulf" },
      {
        type: "ul",
        items: [
          "Honed finishes hide etching far better than polished ones, which matters in a kitchen and in any bathroom with hard water.",
          "Light-coloured limestone outdoors stays usable underfoot in summer; dark granite does not.",
          "Every porous stone needs sealing on a schedule, and that schedule belongs in the handover pack, not in the installer's memory.",
          "Order the offcuts with the slab. In five years the only matching stone in the world will be the piece you kept.",
        ],
      },
    ],
  },
  {
    slug: "design-build-versus-traditional",
    title: "Design-and-build versus the traditional route: an honest comparison",
    excerpt:
      "We are not neutral on this. But the traditional model genuinely is the better answer for some projects, and it is worth knowing which.",
    category: "Process",
    date: "2026-02-05",
    readingMinutes: 7,
    author: "Daniel Wright",
    authorRole: "Managing Director",
    image: "int-loft-glass",
    body: [
      {
        type: "p",
        text: "In the traditional model you appoint an architect, they design the house, the design is tendered to contractors, and the winner builds it. In design-and-build, one firm does both under a single contract. We are a design-and-build firm and so our view is obviously interested. It is still worth setting out the trade honestly.",
      },
      { type: "h2", text: "What the traditional route gives you" },
      {
        type: "ul",
        items: [
          "Genuine price competition at tender, on a like-for-like specification.",
          "An architect whose only client is you, with no commercial interest in the construction cost.",
          "Design freedom unconstrained by what one particular builder is good at.",
        ],
      },
      {
        type: "p",
        text: "These are real advantages. For a highly bespoke architectural house where the design ambition is the entire point, and where the client has the time and appetite to run a proper tender, the traditional route can be the right one.",
      },
      { type: "h2", text: "What it costs you" },
      {
        type: "p",
        text: "The gap between design and construction is a commercial interface, and interfaces are where risk accumulates. When something is wrong on site, the architect says the contractor built it incorrectly and the contractor says the drawing was inadequate. Both are frequently right. You are the only person in the room with an interest in resolving it, and you are the one paying for the delay.",
      },
      {
        type: "quote",
        text: "Every contract boundary is a place where a problem can become somebody else's. Design-and-build removes the boundary rather than managing it.",
      },
      { type: "h2", text: "Where design-and-build wins" },
      {
        type: "ul",
        items: [
          "Renovation of an existing building, where what you find on site changes the design — and the person who has to redesign it is already standing there.",
          "Programme-critical projects, because design and procurement can overlap.",
          "Any project where the client's priority is a single point of accountability over the last five per cent of design freedom.",
        ],
      },
      { type: "h2", text: "The question that actually decides it" },
      {
        type: "p",
        text: "Ask yourself how much time you are willing to spend adjudicating between two firms who disagree. If the answer is any amount at all, the traditional route is available to you and it is a legitimate choice. If the answer is none, you want one contract — and you should then interrogate very hard whether the firm offering it can genuinely design, or whether it is a contractor with a draughtsman.",
      },
    ],
  },
  {
    slug: "what-a-weekly-report-should-contain",
    title: "What a weekly construction report should actually contain",
    excerpt:
      "Most progress reports are photographs and reassurance. A useful one tells you where the money is, where the programme is, and what you have to decide next.",
    category: "Process",
    date: "2026-01-16",
    readingMinutes: 5,
    author: "Omar Haddad",
    authorRole: "Head of Delivery",
    image: "craft-artisan",
    body: [
      {
        type: "p",
        text: "Almost every contractor sends something weekly. Very few send something you could act on. The distinction matters most in month seven, when the initial excitement has gone and the only thing standing between you and an unpleasant surprise is the quality of your information.",
      },
      { type: "h2", text: "The four things that belong in it" },
      {
        type: "p",
        text: "A report is useful when it answers four questions without you having to ask them.",
      },
      {
        type: "ul",
        items: [
          "What was completed this week, photographed, against what the programme said would be completed.",
          "The live cost position: contract sum, approved variations, anticipated final account. One line each.",
          "What we need from you, with a date against each item and a note of what happens if it slips.",
          "What is now at risk, named honestly, with the mitigation we are proposing.",
        ],
      },
      {
        type: "quote",
        text: "A report that only contains good news is not a report. It is marketing with a date on it.",
      },
      { type: "h2", text: "The decisions register is the important part" },
      {
        type: "p",
        text: "Client decisions are the most common cause of delay on a well-run site — not because clients are slow, but because nobody told them a decision was pending until it was already late. Every outstanding decision should be listed every week from the moment it becomes relevant, with the date by which it must be made and the consequence of missing it.",
      },
      {
        type: "p",
        text: "Our clients receive this every Friday. It is unglamorous, it takes our project managers about ninety minutes a week, and it is probably the single highest-return thing we do.",
      },
      { type: "h2", text: "What to do with it" },
      {
        type: "p",
        text: "Read the cost line and the risk section first. Photographs are the pleasant part but they are also the part that cannot tell you anything bad. If three consecutive reports show no risks at all on a live construction site, that is itself the finding.",
      },
    ],
  },
];

export const POST_CATEGORIES = Array.from(new Set(POSTS.map((p) => p.category)));

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, limit = 3): Post[] {
  const current = getPost(slug);
  if (!current) return POSTS.slice(0, limit);
  return [
    ...POSTS.filter((p) => p.slug !== slug && p.category === current.category),
    ...POSTS.filter((p) => p.slug !== slug && p.category !== current.category),
  ].slice(0, limit);
}
