import type { FilterGroup, SiteContent } from "./types";

/**
 * All site copy lives here. Replace the placeholder content (marked TODO) with the
 * barber's real details before launch. Components never hard-code copy.
 */
export const site: SiteContent = {
  barber: {
    brandName: "Marcus Reed", // TODO: barber's name or personal brand
    phone: "(301) 555-0142", // TODO
    address: "Suite 4, 123 Main Street\nYour Town, MD 20910", // TODO
    mapHref: "https://maps.google.com/?q=123+Main+Street", // TODO
    hours: [
      { days: "Tue–Fri", time: "10a – 7p" },
      { days: "Sat", time: "8a – 4p" },
      { days: "Sun–Mon", time: "Closed" },
    ],
    socials: [
      { label: "Instagram", href: "https://instagram.com/" }, // TODO
      { label: "TikTok", href: "https://tiktok.com/" },
      { label: "Google", href: "https://g.page/" },
    ],
    tagline: "Independent barber. Precision cuts, beard work and hot-towel shaves.",
  },

  seo: {
    siteUrl: "https://example.com", // TODO: production URL (used for canonical + structured data)
    defaultTitle: "Marcus Reed — Independent Barber",
    description: "Precision fades, tapers, beard work and hot-towel shaves by appointment. One barber, one chair, your full attention.",
    city: "Your Town",
    region: "MD",
    priceRange: "$$",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Cuts", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Book", href: "/#book" },
  ],

  booking: {
    embedSrc: "", // TODO: e.g. "https://calendly.com/marcus-reed/haircut"
    provider: "Calendly",
    openHref: "", // defaults to embedSrc
    embedHeight: 720,
    details: [
      { label: "Cuts from", value: "$35" },
      { label: "Typical cut", value: "45 min" },
      { label: "Deposit", value: "None" },
      { label: "Cancel", value: "2 hrs" },
    ],
    notes: ["Every appointment is with me — no hand-offs", "Arrive with clean, dry hair if you can", "Running late? Text me and I'll hold your spot 10 min"],
  },

  rating: { value: 4.9, count: 312, source: "Google" }, // TODO: real numbers only

  // TODO: replace with real reviews (verbatim, with permission).
  reviews: [
    { rating: 5, quote: "Best fade I've had in years. Marcus listens, takes his time, and I'm out in 40 minutes.", name: "Jordan T.", detail: "Skin fade" },
    {
      rating: 5,
      quote: "Booked at 9pm for the next morning. No waiting room, no rush — just a sharp lineup every time.",
      name: "Chris M.",
      detail: "Taper + beard",
    },
    { rating: 5, quote: "My son asks to see Marcus every two weeks. Patient with kids and the cut is always even.", name: "Alicia R.", detail: "Kids cut" },
  ],

  // TODO: add real photos to /public/cuts/ and set `image` on each cut.
  cuts: [
    {
      id: "skin-fade",
      name: "Skin fade",
      type: "straight",
      length: "short",
      duration: "45 min",
      price: "$35",
      featured: true,
      tag: "Most booked",
      description: "Bald at the sides, blended up to a textured top. Sharp lineup included.",
    },
    {
      id: "burst-fade-sponge",
      name: "Burst fade + sponge",
      type: "coily",
      length: "short",
      duration: "50 min",
      price: "$40",
      description: "A curved burst fade around the ear with sponge-twisted coils on top.",
    },
    {
      id: "taper-curls",
      name: "Taper + curls",
      type: "curly",
      length: "medium",
      duration: "50 min",
      price: "$40",
      featured: true,
      description: "Low taper that keeps the curl pattern full and defined on top.",
    },
    {
      id: "textured-crop",
      name: "Textured crop",
      type: "wavy",
      length: "short",
      duration: "40 min",
      price: "$35",
      featured: true,
      description: "Choppy, point-cut top with a blunt fringe and a mid fade.",
    },
    {
      id: "buzz-cut",
      name: "Buzz cut",
      type: "straight",
      length: "shaved",
      duration: "25 min",
      price: "$25",
      description: "One guard all over, clean neckline, crisp edges.",
    },
    {
      id: "360-waves",
      name: "360 waves",
      type: "coily",
      length: "shaved",
      duration: "35 min",
      price: "$30",
      featured: true,
      tag: "Waves",
      description: "Brushed-down low cut that sets the wave pattern, with a razor line.",
    },
    {
      id: "slick-back-undercut",
      name: "Slick back undercut",
      type: "straight",
      length: "medium",
      duration: "45 min",
      price: "$40",
      description: "Disconnected undercut with enough length on top to comb back.",
    },
    {
      id: "shoulder-length-trim",
      name: "Shoulder-length trim",
      type: "wavy",
      length: "long",
      duration: "45 min",
      price: "$40",
      description: "Weight removed, shape kept. Grows out clean for months.",
    },
    {
      id: "afro-shape-up",
      name: "Afro shape-up",
      type: "coily",
      length: "medium",
      duration: "45 min",
      price: "$40",
      description: "Rounded, even shape with a soft taper and a sharp hairline.",
    },
    {
      id: "curly-fringe",
      name: "Curly fringe",
      type: "curly",
      length: "short",
      duration: "40 min",
      price: "$35",
      description: "Curls pushed forward over a high drop fade.",
    },
    {
      id: "head-shave-beard",
      name: "Head shave + beard",
      type: "straight",
      length: "shaved",
      duration: "50 min",
      price: "$45",
      description: "Hot-towel razor shave with a sculpted beard.",
    },
    {
      id: "undercut-man-bun",
      name: "Undercut man bun",
      type: "wavy",
      length: "long",
      duration: "45 min",
      price: "$40",
      description: "Length kept on top, clean undercut underneath.",
    },
    {
      id: "two-strand-twists",
      name: "Two-strand twists",
      type: "coily",
      length: "long",
      duration: "90 min",
      price: "$70",
      description: "Even, defined twists with a taper at the neckline.",
    },
    {
      id: "modern-mullet",
      name: "Modern mullet",
      type: "curly",
      length: "long",
      duration: "50 min",
      price: "$45",
      description: "Short, faded sides with curly length at the back.",
    },
  ],

  about: {
    headline: "I've been cutting for ten years. I still treat every chair like my first client is sitting in it.",
    bio: [
      "I started cutting my friends' hair in my mom's kitchen in 2014. Two years later I had my license, and in 2020 I went independent so every client gets the same barber, every time.",
      "My chair is a private suite — no crowded waiting room, no rushing. We talk about what you want, I tell you honestly what will work with your hair, and then I take my time getting it right.",
    ],
    facts: [
      { value: "10", label: "years cutting" },
      { value: "4", label: "hair types, all welcome" },
      { value: "1", label: "chair, just me" },
    ],
    caption: "Licensed master barber · Maryland",
    portrait: undefined, // TODO: "/about/portrait.webp"
    timeline: [
      { year: "2014", title: "The kitchen chair", text: "Clippers from a pawn shop and a line of friends out the door." },
      { year: "2016", title: "Licensed", text: "Finished barber school and earned my Maryland license." },
      { year: "2018", title: "Master barber", text: "Two years on the floor of a busy shop, then my master license." },
      { year: "2020", title: "Went independent", text: "Opened my own private suite: one chair, fully booked in three months." },
      { year: "Today", title: "312 five-star reviews", text: "Still one chair. Still cutting every head myself." },
    ],
    approach: [
      { title: "Consult first", text: "Every cut starts with five minutes of talking — your hair, your routine, what you actually want." },
      { title: "Every hair type", text: "Straight, wavy, curly or coily: I've trained on all of it and I cut all of it." },
      { title: "On time, always", text: "One client at a time means your slot is your slot. No double-booking, no waiting." },
    ],
  },
};

export const HAIR_FILTERS: FilterGroup<"type" | "length">[] = [
  {
    key: "type",
    label: "Hair type",
    options: [
      { value: "straight", label: "Straight" },
      { value: "wavy", label: "Wavy" },
      { value: "curly", label: "Curly" },
      { value: "coily", label: "Coily" },
    ],
  },
  {
    key: "length",
    label: "Length",
    options: [
      { value: "shaved", label: "Shaved" },
      { value: "short", label: "Short" },
      { value: "medium", label: "Medium" },
      { value: "long", label: "Long" },
    ],
  },
];
