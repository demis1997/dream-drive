/* ============================================================
   DriveDraw — data layer (plain JS, attached to window)
   ============================================================ */
(function () {
  const DRAW = {
    edition: "EDITION 01",
    name: "Audi RS6 Mansory",
    sub: "Avant — Full Carbon Widebody",
    valuation: "£185,000",
    cashAlt: "£165,000",
    location: "Delivered nationwide, UK",
    // Draw close: ~8 weeks out from the 4 June 2026 "today"
    drawDate: "2026-07-31T20:00:00+01:00",
    drawDateLabel: "31 July 2026 · 20:00 BST",
    ticketPrice: 29,
    ticketsTotal: 19995,
    ticketsSold: 14380,
    maxPerPerson: 75,
    odds: "1 in 19,995",
  };

  const SPECS = [
    { k: "Power",        v: "1000", u: "PS",     note: "Mansory-tuned 4.0 TFSI V8" },
    { k: "0–100 km/h",   v: "2.8",  u: "sec",    note: "Quattro all-wheel launch" },
    { k: "Top speed",    v: "330",  u: "km/h",   note: "Derestricted" },
    { k: "Torque",       v: "1000", u: "Nm",     note: "Peak from 2,400 rpm" },
  ];

  // Hotspot callouts overlaid on the hero car (percentages of image box)
  const HOTSPOTS = [
    { id: "aero",  x: 26, y: 78, label: "Forged carbon front lip", detail: "Mansory aero kit, exposed twill weave" },
    { id: "wheel", x: 17, y: 64, label: "22ʺ forged monoblock",    detail: "Centre-lock style, lime accent ring" },
    { id: "hood",  x: 58, y: 47, label: "Carbon vented bonnet",    detail: "Race-spec extraction louvres" },
    { id: "light", x: 79, y: 56, label: "Matrix LED signature",    detail: "Laser high-beam, dynamic indicators" },
  ];

  const ANGLES = [
    { id: "front",      label: "3/4 Front",     src: "assets/rs6-hero.jpg",        pos: "center 58%" },
    { id: "studio",     label: "Studio",        src: "assets/gallery-studio.jpg",      pos: "center 62%" },
    { id: "frontdet",   label: "Front Detail",  src: "assets/gallery-front-detail.jpg", pos: "center 45%" },
    { id: "wheel",      label: "Forged Wheel",  src: "assets/gallery-wheel.jpg",       pos: "center center" },
    { id: "cockpit",    label: "Cockpit",       src: "assets/gallery-cockpit.jpg",     pos: "center 55%" },
    { id: "seatsfront", label: "Front Seats",   src: "assets/gallery-seats-front.jpg", pos: "center 45%" },
    { id: "seatsrear",  label: "Rear Seats",    src: "assets/gallery-seats-rear.jpg",  pos: "center 50%" },
  ];

  const STEPS = [
    { n: "01", t: "Secure your tickets", d: "Choose how many entries you want. Every ticket is a unique, numbered slot in the draw — the more you hold, the better your odds." },
    { n: "02", t: "Answer the question", d: "A short skill-based question qualifies your entry, keeping the draw fully compliant under UK prize-competition law." },
    { n: "03", t: "Watch the live draw", d: "Entries close on the timer. The winning number is drawn live and verified on camera by an independent adjudicator." },
    { n: "04", t: "Drive the extraordinary", d: "We arrange white-glove handover anywhere in the UK — or take the tax-free cash alternative. Your call." },
  ];

  const TRUST = [
    { k: "Independently drawn", d: "Every draw is conducted live and overseen by an external adjudicator. Random selection via verified RNG, recorded end-to-end." },
    { k: "Guaranteed to draw", d: "The car is owned outright and the draw goes ahead on the date shown — sold out or not. No rollovers, no excuses." },
    { k: "Skill-based & compliant", d: "Structured as a prize competition under the Gambling Act 2005. A genuine question gates every entry." },
    { k: "Secure checkout", d: "Payments handled by a PCI-DSS Level 1 processor. 3-D Secure on every transaction. We never store your card." },
  ];

  const WINNERS = [
    {
      name: "Daniel Okafor",
      city: "Manchester",
      car: "Lamborghini Huracán EVO",
      edition: "Draw 12 · Mar 2026",
      odds: "Held 14 tickets",
      slot: "winner-1",
      quote: "I watched the live draw in my kitchen and genuinely didn't believe it. Three days later it was on my driveway. The whole handover felt like a film.",
      video: true,
    },
    {
      name: "Priya & Sam Bhatt",
      city: "Leeds",
      car: "Porsche 911 Turbo S",
      edition: "Draw 10 · Jan 2026",
      odds: "Held 6 tickets",
      slot: "winner-2",
      quote: "We took the keys and the cash top-up. Paid off the mortgage and still got the car of our dreams. Surreal doesn't cover it.",
      video: true,
    },
    {
      name: "Marcus Reilly",
      city: "Glasgow",
      car: "£140,000 Cash",
      edition: "Draw 09 · Dec 2025",
      odds: "Held 2 tickets",
      slot: "winner-3",
      quote: "Two tickets. Two. I took the cash alternative and it changed everything for my family overnight. Still can't quite process it.",
      video: false,
    },
  ];

  const SOCIAL = [
    { handle: "@carlife_uk", note: "\"DriveDraw handover days hit different 🏁\"", slot: "social-1" },
    { handle: "@theresa.m", note: "\"Still buzzing from the live draw last night\"", slot: "social-2" },
    { handle: "@apex.collective", note: "\"Cleanest RS6 build in the UK right now\"", slot: "social-3" },
  ];

  const STATS = [
    { v: "£4.2M", k: "In prizes awarded" },
    { v: "37", k: "Draws completed" },
    { v: "41", k: "Life-changing winners" },
    { v: "100%", k: "Draws fulfilled" },
  ];

  const FAQ = [
    { q: "When does the draw take place?", a: "The draw closes on the date shown on the countdown and is conducted live the same evening. Entries placed after the timer hits zero roll into the next edition." },
    { q: "What if not all tickets sell?", a: "The draw goes ahead regardless. The car is owned outright — there is no minimum number of entries and no rollover of the prize." },
    { q: "Can I take cash instead of the car?", a: "Yes. Every winner may choose the tax-free cash alternative shown on the prize. It is paid by bank transfer within five working days." },
    { q: "How do I know it's fair?", a: "Each draw is recorded and overseen by an independent adjudicator using a verified random number generator. Full results are published afterwards." },
    { q: "Is there a limit on entries?", a: "To keep the draw fair, entries are capped per person per edition. The current cap is shown at checkout." },
  ];

  window.DD = { DRAW, SPECS, HOTSPOTS, ANGLES, STEPS, TRUST, WINNERS, SOCIAL, STATS, FAQ };
})();
