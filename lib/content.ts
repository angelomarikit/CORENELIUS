export type Fact = { value: string; label: string };

export type Person = {
  id: string;
  name: string;
  role: string;
  reportsTo: string;
};

export type ServiceItem = { title: string; summary: string };

export type WhySlide = { kicker: string; title: string; points: string[] };

export type Advantage = { title: string; summary: string };

export type PortfolioItem = {
  title: string;
  category: string;
  image: string;
  summary: string;
};

export type ProjectItem = {
  title: string;
  owner: string;
  status: string;
  group: string;
};

export type PartnerGroup = { title: string; clients: string[] };

export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    primaryCta: string;
    primaryHref: string;
    secondaryCta: string;
    secondaryHref: string;
    imagePrimary: string;
    imagePrimaryAlt: string;
    imageSecondary: string;
    imageSecondaryAlt: string;
    facts: Fact[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    quote: string;
    image: string;
    imageAlt: string;
    imageCaption: string;
  };
  vision: {
    eyebrow: string;
    title: string;
    vision: string;
    mission: string;
  };
  organization: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
    imageAlt: string;
    people: Person[];
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ServiceItem[];
  };
  why: {
    eyebrow: string;
    title: string;
    intro: string;
    slides: WhySlide[];
  };
  schematic: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
    imageAlt: string;
    caption: string;
  };
  advantages: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
    imageAlt: string;
    imageCaption: string;
    items: Advantage[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    intro: string;
    items: PortfolioItem[];
  };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ProjectItem[];
  };
  partners: {
    eyebrow: string;
    title: string;
    intro: string;
    groups: PartnerGroup[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    phone: string;
    email: string;
    website: string;
    address: string;
    footerNote: string;
  };
};

export const sectionKeys = [
  "hero",
  "about",
  "vision",
  "organization",
  "services",
  "why",
  "schematic",
  "advantages",
  "portfolio",
  "projects",
  "partners",
  "contact",
] as const;

export type SectionKey = (typeof sectionKeys)[number];

export function isSectionKey(value: string): value is SectionKey {
  return (sectionKeys as readonly string[]).includes(value);
}

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: "Philippines",
    title: "CORENELIUS",
    highlight: "Technologies & Construction Inc.",
    subtitle:
      "Sewage treatment plants, infrastructure, and integrated construction — led by a licensed sanitary engineer and built around our Advanced Oxidation Process.",
    primaryCta: "Our technology",
    primaryHref: "#why",
    secondaryCta: "Start a project",
    secondaryHref: "#contact",
    imagePrimary: "/media/hero-river.jpg",
    imagePrimaryAlt:
      "Riverside infrastructure works with pile driving, a pedestrian bridge, and the city skyline beyond",
    imageSecondary: "/media/hero-planning.jpg",
    imageSecondaryAlt:
      "Two engineers in safety vests reviewing construction drawings on site in the Philippines",
    facts: [
      { value: "2004", label: "Clean Water Act" },
      { value: "DAO 2021-19", label: "Compliant plant design" },
      { value: "AOP", label: "Ozone oxidation" },
      { value: "2 m", label: "Shallowest chamber we design" },
    ],
  },
  about: {
    eyebrow: "The company",
    title: "A sanitary engineer’s practice, scaled into a technology firm.",
    paragraphs: [
      "Corenelius Construction is headed by a licensed sanitary engineer who knows the science and the guiding principles behind sewage treatment plant design, in strict compliance with the Philippine Clean Water Act of 2004 and DENR Administrative Order No. 2021-19.",
      "The company is a technology provider of sewage treatment plants, using a process developed in-house: the Advanced Oxidation Process, or AOP. Completed projects have earned strong client satisfaction.",
      "AOP uses ozone alone to oxidize and break down chemical compounds in wastewater, and to destroy microorganisms such as viruses, bacteria, and protozoa.",
    ],
    quote:
      "Ozone alone does the oxidation. No chlorine, enzymes, coagulant, flocculant, or starters.",
    image: "/media/stp-panels.jpg",
    imageAlt:
      "Stainless steel control panels for pH and residual chlorine monitoring beside blue process piping",
    imageCaption: "Plant controls for an AOP installation.",
  },
  vision: {
    eyebrow: "Direction",
    title: "Vision and mission",
    vision:
      "We envision becoming one of the Philippines’ leading providers of innovative sewage treatment plant technologies and integrated wastewater management solutions — setting the standard for environmental performance, operational excellence, and sustainable water management.",
    mission:
      "To set the benchmark for excellence in wastewater engineering by delivering superior technology, dependable solutions, and exceptional service. We are committed to cultivating a home for the country’s finest engineers, technical professionals, and skilled personnel — empowering them through continuous training, innovation, and professional growth. By combining expertise, technology, and sustainability, we deliver wastewater solutions that create lasting value for our clients, communities, and the environment.",
  },
  organization: {
    eyebrow: "People",
    title: "Organizational chart",
    intro: "The leadership of the company, from the president through operations, engineering, and finance.",
    image: "/media/org-chart.jpg",
    imageAlt:
      "Organizational chart of Corenelius Technologies and Construction, headed by Engr. Cornelio D. Macapagal, President",
    people: [
      { id: "cornelio", name: "Engr. Cornelio D. Macapagal", role: "President", reportsTo: "" },
      { id: "ian", name: "Engr. Ian Lorenz Agcamaran", role: "Vice President", reportsTo: "cornelio" },
      { id: "darwin", name: "Darwin Canlas Quinto", role: "Business Development Head", reportsTo: "ian" },
      { id: "aaron", name: "Aaron A. Solatorio", role: "Sales Associate", reportsTo: "darwin" },
      { id: "joshua", name: "Engr. Joshua Calvario", role: "Engineering Associate", reportsTo: "ian" },
      { id: "karloe", name: "Karloe Jued Veloso", role: "Safety Officer", reportsTo: "joshua" },
      { id: "nicko", name: "Nicko Vine Macapagal", role: "Site Manager", reportsTo: "joshua" },
      { id: "john", name: "John Salac", role: "Site Supervisor", reportsTo: "joshua" },
      {
        id: "oscar",
        name: "Engr. Oscarlito Malveda",
        role: "Vice President for Operations and Technical Head",
        reportsTo: "cornelio",
      },
      { id: "jerome", name: "Jerome Bryan Sarabia", role: "Operations and Logistics Manager", reportsTo: "oscar" },
      { id: "alvack", name: "Alvack Rach Daggong", role: "CAD Operator", reportsTo: "jerome" },
      { id: "adrian", name: "Engr. Adrian Manalansan", role: "Structural Engineering Manager", reportsTo: "cornelio" },
      { id: "raymo", name: "Raymo Gino Palaca", role: "Chief Financial Officer", reportsTo: "cornelio" },
      { id: "elisa", name: "Elisa Mora", role: "Executive Secretary Head", reportsTo: "raymo" },
      { id: "angelica", name: "Angelica Louise Llamado", role: "Admin Assistant / Procurement", reportsTo: "elisa" },
    ],
  },
  services: {
    eyebrow: "What we do",
    title: "Services",
    intro:
      "Sewage treatment is the center of the practice. The other disciplines are how a site is designed, built, and kept running.",
    items: [
      {
        title: "Sewage treatment plant",
        summary: "Design and build of STPs, including upgrades, rehabilitation, and full plants.",
      },
      {
        title: "Solid waste management",
        summary: "Planning and works for solid waste alongside facilities and project sites.",
      },
      {
        title: "Structural works",
        summary: "Structural design and construction for buildings and plant structures.",
      },
      {
        title: "Interior works",
        summary: "Interior fit-out coordinated with the building and its services.",
      },
      {
        title: "Mechanical & electrical works",
        summary: "MEP design, installation, and maintenance for plants and buildings.",
      },
      {
        title: "Fire protection",
        summary: "Fire protection systems delivered with the rest of the building works.",
      },
      {
        title: "Sanitary & plumbing",
        summary: "Sanitary and plumbing systems led by licensed sanitary engineering.",
      },
      {
        title: "Automation works",
        summary: "Controls and automation for treatment plants and building systems.",
      },
      {
        title: "Advanced Oxidation Process",
        summary: "Our ozone process for oxidizing compounds and destroying microorganisms.",
      },
    ],
  },
  why: {
    eyebrow: "AOP, plainly",
    title: "Why teams choose this plant",
    intro: "Seventeen practical differences, grouped so they can be read one theme at a time.",
    slides: [
      {
        kicker: "Filipino technology",
        title: "Proud Pinoy technology",
        points: ["DAO 2021-19 compliant", "Closed chamber design"],
      },
      {
        kicker: "Clean by design",
        title: "No odor, no sludge, no dosing chemicals",
        points: [
          "No foul odor",
          "No biological sludge production",
          "No consumable chemicals such as chlorine, enzymes, coagulant, flocculant, or starters",
          "Reusable treated wastewater for flushing, cleaning, and watering plants",
        ],
      },
      {
        kicker: "Fits the site",
        title: "Compact, including low-flow plants",
        points: [
          "Can provide a compact or low-flow STP",
          "Smaller footprint compared with conventional technologies",
          "Deep chambers are not required, and the plant can be designed down to 2 meters",
          "Can be solar powered",
        ],
      },
      {
        kicker: "Simple to own",
        title: "Easy to run, inexpensive to keep",
        points: [
          "Very easy operation and maintenance procedures",
          "Minimal manpower required for operation and maintenance",
          "Unmonopolized parts and services for operation and maintenance",
          "Very low operational expenditure",
          "Automated system",
          "After-sales service is optional",
        ],
      },
    ],
  },
  schematic: {
    eyebrow: "Process",
    title: "Schematic flow",
    intro:
      "Influent meets a bar screen, then equalization, then the AOP tank. Ozone, multimedia filtration, and reverse osmosis carry the water to effluent. Residue can return as backwash.",
    image: "/media/schematic.png",
    imageAlt:
      "Proposed schematic flow diagram showing screening, equalization, the AOP tank, ozone, filtration, and reverse osmosis",
    caption: "Proposed schematic flow diagram · Not to scale",
  },
  advantages: {
    eyebrow: "Core",
    title: "What we hold the work to",
    intro: "Four commitments. The plant, the drawing, and the finished site are judged against them.",
    image: "/media/core-crew.jpg",
    imageAlt: "Crew in orange coveralls compacting and sweeping a street repair",
    imageCaption: "Site work in the field.",
    items: [
      {
        title: "Customer satisfaction",
        summary: "Completed plants and buildings are judged by how the client lives with them afterward.",
      },
      {
        title: "Objective",
        summary: "Every job starts from a clear engineering objective: capacity, compliance, and a system operators can run.",
      },
      {
        title: "Reliable technology",
        summary: "AOP is developed in-house. Ozone oxidizes compounds in the wastewater and destroys microorganisms.",
      },
      {
        title: "Environmental stewardship",
        summary: "Treatment is aligned with the Clean Water Act of 2004 and DAO 2021-19, and treated water can be reused.",
      },
    ],
  },
  portfolio: {
    eyebrow: "Selected work",
    title: "Project portfolio",
    intro: "Three kinds of work we are asked to deliver. The record of individual projects follows.",
    items: [
      {
        title: "STP AOP",
        category: "Treatment",
        image: "/media/stp-panels.jpg",
        summary: "Ozone-based sewage treatment plants, including controls, process piping, and commissioning.",
      },
      {
        title: "Residential",
        category: "Buildings",
        image: "/media/residential.jpg",
        summary: "Design and build of homes and residential buildings, from the structure through the services.",
      },
      {
        title: "Infrastructure",
        category: "Civil works",
        image: "/media/hero-river.jpg",
        summary: "Infrastructure and civil works delivered with the same project team as the plant and the building.",
      },
    ],
  },
  projects: {
    eyebrow: "Record",
    title: "Project highlights",
    intro:
      "A selection of completed and on-going work. Six at a time — open a card for the owner and the scope.",
    items: [
      { title: "5-stage household water filtration", owner: "Gonzales Residence, Valenzuela", status: "completed", group: "Water systems" },
      { title: "4-stage household water filtration", owner: "Pacheco Residence, Valenzuela", status: "completed", group: "Water systems" },
      { title: "5-stage household water filtration", owner: "Roxas Residence, Valenzuela", status: "completed", group: "Water systems" },
      { title: "Centralized household water filtration with pump and tank", owner: "Caloocan", status: "completed", group: "Water systems" },
      { title: "5-stage household water filtration", owner: "Ferrer Residence, Valenzuela", status: "completed", group: "Water systems" },
      { title: "Centralized household water filtration with UV sterilizer", owner: "Bautista Residence, Nueva Ecija", status: "completed", group: "Water systems" },
      { title: "5-stage household water filtration", owner: "PhilSports Complex, Pasig City", status: "completed", group: "Water systems" },
      { title: "4-stage household water filtration", owner: "Montevilla Residence, Valenzuela", status: "completed", group: "Water systems" },
      { title: "Design and build of a 2-storey mansion", owner: "Cornelio Macapagal", status: "completed", group: "Buildings" },
      { title: "200 sqm office fit-out and MEPS maintenance", owner: "KMC Solution Inc., BGC, Taguig", status: "completed", group: "Buildings" },
      { title: "Design and build of a 4-storey residential building", owner: "Mr. & Mrs. Perez", status: "completed", group: "Buildings" },
      { title: "Design and build of an 80 sqm residential building", owner: "Mrs. Ardevela", status: "completed", group: "Buildings" },
      { title: "Design and build of a 120 sqm residential building", owner: "Mr. and Mrs. Payumo", status: "completed", group: "Buildings" },
      { title: "Design and build of STP", owner: "United Diagnostic Laboratory", status: "completed", group: "Treatment plants" },
      { title: "Design and build of a 2 CMPD compact STP (AOP)", owner: "Maynilad Water Services Inc.", status: "completed", group: "Treatment plants" },
      { title: "Technical consultancy, project management, automation, and electro-mechanical subcontract of an STP house", owner: "DENR-MMDA", status: "completed", group: "Treatment plants" },
      { title: "Technical consultation and project management of a 2,500-meter trash boom for Manila Bay", owner: "DPWH", status: "completed", group: "Infrastructure" },
      { title: "STP upgrade to AOP, rehabilitation, and design and build of a 400 CMPD STP", owner: "Empire East Land Holdings Inc., Rochester Condominium", status: "completed", group: "Treatment plants" },
      { title: "Design and build of tertiary treatment", owner: "Tri-City Medical Center", status: "completed", group: "Treatment plants" },
      { title: "STP upgrade to AOP, rehabilitation, and design and build of a 2,000 CMPD STP", owner: "Pioneer Woodlands", status: "completed", group: "Treatment plants" },
      { title: "Design and build of STP", owner: "Langaray People's Market", status: "completed", group: "Treatment plants" },
      { title: "Design and build of a 500 CMPD STP", owner: "DOH-TRC Bicutan", status: "completed", group: "Treatment plants" },
      { title: "Design and build of a 300 CMPD STP for EVM Convention Center", owner: "Hammertime Construction Inc.", status: "completed", group: "Treatment plants" },
      { title: "Supply and installation of 2.2 km supply for the MOA Complex desalination project", owner: "SM Mall of Asia", status: "completed", group: "Infrastructure" },
      { title: "Design and build of a 500 CMPD STP with tertiary treatment", owner: "DENR-MMDA", status: "completed", group: "Treatment plants" },
      { title: "Design and build of a 1,500 CMPD existing STP upgrading and retrofitting", owner: "National Kidney and Transplant Institute (NKTI)", status: "ongoing", group: "Treatment plants" },
      { title: "Rehabilitation of STP", owner: "San Lorenzo General Hospital", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of STP", owner: "NHA Panghulo, Malabon", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of a 210 CMPD STP", owner: "DOH-DA TRC", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of a 150 CMPD STP for DOTC Clark Railway", owner: "Gauge Precision Engineering", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build for system integration of AOP into an existing sequence batch reactor", owner: "Quirino Memorial Medical Center", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of a 100 CMPD STP, electromechanical", owner: "Metro South Medical Center", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of STP", owner: "Toclong Elementary School", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of a 100 CMPD STP, electromechanical", owner: "Alabang General Hospital", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of STP", owner: "Estanislao Villanueva Memorial Elementary School", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of a 100 CMPD STP (AOP)", owner: "Global Medical Center", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of STP (AOP)", owner: "AboitizLand-Ajoya Capas", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of a 100 CMPD STP (AOP)", owner: "AboitizLand-Ajoya Cabanatuan", status: "ongoing", group: "Treatment plants" },
      { title: "Design and build of STP (AOP)", owner: "AboitizLand Hospital", status: "ongoing", group: "Treatment plants" },
      { title: "STP rehabilitation, design and build of 100 cu.m, electromechanical", owner: "Unihealth Parañaque Hospital", status: "ongoing", group: "Treatment plants" },
      { title: "Electrical works of One Boracay Hotel & Restaurant", owner: "One Boracay", status: "ongoing", group: "Buildings" },
      { title: "Design and build of a 400 CMPD STP", owner: "Muntinlupa Medical Center", status: "ongoing", group: "Treatment plants" },
      { title: "Construction of a 3-storey apartment building with roof deck", owner: "Victor Tan Po", status: "ongoing", group: "Buildings" },
      { title: "STP conversion to AOP technology, Kwing Construction Corp project", owner: "Imus, Cavite Municipal Hall", status: "ongoing", group: "Treatment plants" },
      { title: "STP conversion to AOP technology", owner: "The Address Condominium", status: "ongoing", group: "Treatment plants" },
    ],
  },
  partners: {
    eyebrow: "Alongside",
    title: "Business partners and clienteles",
    intro: "The groups move across the page. Click one to read the names.",
    groups: [
      {
        title: "Construction & trading firms",
        clients: [
          "Ajacore Engineering Services Inc.",
          "Mactan Rock Industries Inc.",
          "AboitizLand Inc.",
          "Tokwing Construction",
          "A.E. Centeno Construction Inc.",
          "Framecon Asia Builders",
          "Millenumeractors Corporation",
          "MCKV Construction Services",
          "E.D. Pountan Construction and Trading",
          "Apse Consulting",
          "A.A. Eugenio Electromechanical Engineering Services",
          "RC Ramos Construction Corp",
          "Quadnorth Enterprise Int'l",
          "Novaterra Circular Economy",
        ],
      },
      {
        title: "Healthcare, medical & other institutions",
        clients: [
          "National Kidney and Transplant Institute (NKTI)",
          "Maynilad Water Services",
          "Department of Health",
          "Wee Communities",
          "Tri-City Medical Center",
          "Unihealth Medical Center",
          "Metro South Medical Center",
          "Alabang Medical Center",
          "Pope John Paul Medical Center",
          "Medical Center Muntinlupa",
          "United Diagnostics Laboratory",
          "Sto. Tomas Hospital",
          "Fabella Hospital",
        ],
      },
      {
        title: "Real estate, commercial & residential",
        clients: [
          "Divimart",
          "Versailles Town Plaza Handbay",
          "Plaza",
          "Biñan Theatre",
          "Profriends",
          "Hop-Inn Hotel",
          "Clark Hospital",
          "Diamond Square Congressional",
          "8 Storey Building, Visayas Avenue",
          "Landco",
        ],
      },
      {
        title: "Government & public sector",
        clients: ["Imus, Cavite LGU", "DOH-TRC Bicutan", "Versailles Town Plaza Handbay", "Clark Hospital"],
      },
    ],
  },
  contact: {
    eyebrow: "Plaridel, Bulacan",
    title: "Tell us about the site",
    intro: "Share the location, the flow if you know it, and the kind of work you need. We reply from the Plaridel office.",
    phone: "+63 916-544-0687",
    email: "coreneliusconstruction@gmail.com",
    website: "www.coreneliusconstruction.com",
    address: "Block 51 Lot 20\nLa Mirada Royale Subd. Brgy. Bangaii\nPlaridel, Bulacan, 3015",
    footerNote: "Sewage treatment and construction, engineered in the Philippines.",
  },
};

export function mergeContent(base: SiteContent, patch: unknown): SiteContent {
  if (!patch || typeof patch !== "object" || Array.isArray(patch)) return base;
  const incoming = patch as Partial<Record<SectionKey, object>>;
  const next: Record<SectionKey, object> = { ...base };
  for (const key of sectionKeys) {
    const value = incoming[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      next[key] = { ...next[key], ...value };
    }
  }
  return next as SiteContent;
}
