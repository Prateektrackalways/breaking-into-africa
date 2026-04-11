export const chapters = [
  {
    id: 'intro',
    number: 1,
    title: 'Introduction — Why Africa, Why Now',
    shortTitle: 'Introduction',
    intro: 'Africa is not the future. It is the present — and the entrepreneurs who understand this earliest will build the most enduring businesses of the 21st century.',
    sections: [
      {
        type: 'stats',
        heading: 'Africa by the Numbers',
        stats: [
          { icon: '🌍', value: '1.4B', label: 'Population' },
          { icon: '📈', value: '$3.4T', label: 'Combined GDP' },
          { icon: '👶', value: '19', label: 'Median Age' },
          { icon: '📱', value: '615M', label: 'Mobile Users' },
        ],
      },
      {
        type: 'text',
        heading: 'The Opportunity of a Generation',
        body: `Africa is home to 54 countries, 1.4 billion people, and the world's fastest-growing middle class. By 2050, one in four people on Earth will be African. Yet for most global entrepreneurs, the continent remains a mystery — or worse, a caricature built from outdated headlines. This guide is designed to change that.\n\nOver the past decade, Africa has attracted record levels of foreign direct investment. Venture capital flowing into African startups went from near-zero in 2010 to over $6 billion in 2022. Infrastructure is being built at pace — roads, ports, fibre networks, airports. Mobile internet penetration is surging. And critically, Africa has the youngest median age of any continent — a demographic dividend that will shape global economics for the next century.`,
      },
      {
        type: 'cards',
        heading: 'Why Entrepreneurs Are Moving Fast',
        cards: [
          { icon: '🚀', title: 'Fastest-Growing Middle Class', body: 'Over 350 million Africans have entered the middle class in two decades — creating massive demand for products and services.', badge: 'Opportunity' },
          { icon: '📲', title: 'Mobile-First Economy', body: 'Africa skipped desktop internet and went straight to mobile. Over 615M smartphone users and growing at 10% annually.', badge: 'Tech' },
          { icon: '🏗️', title: 'Infrastructure Boom', body: '$170B invested annually in roads, ports, energy and fibre. The continent is building at a pace the world hasn\'t seen since post-war Europe.', badge: 'Growth' },
          { icon: '🤝', title: 'AfCFTA Trade Zone', body: 'The African Continental Free Trade Area creates a single market of 1.4B people — the largest free trade zone by participating countries on earth.', badge: 'Trade' },
          { icon: '💰', title: 'VC Funding Surge', body: 'African tech startups raised $6B+ in 2022. Fintech, healthtech, agritech and logistics are the hottest sectors.', badge: 'Investment' },
          { icon: '🌐', title: 'Diaspora Power', body: 'A $100B+ annual remittance flow from the African diaspora is fuelling consumer spending, startup funding and real estate.', badge: 'Network' },
        ],
      },
      {
        type: 'placeholder',
        heading: 'My Personal Story',
        body: 'Author\'s personal journey to Africa — first visit, moment of realisation, early business mistakes and wins, what made them stay and build. The specific moment everything clicked.',
      },
      {
        type: 'callout',
        variant: 'green',
        body: 'Africa is not a country. Treat each of the 54 nations as its own distinct market with unique laws, culture, language, and economic rhythm.',
      },
      {
        type: 'tip',
        heading: 'How to Use This Guide',
        body: 'Read Part 1 (Chapters 1–2) for the big picture, then jump directly to the country or topic most relevant to you. Each chapter is self-contained. Use the sidebar to navigate.',
      },
    ],
  },

  {
    id: 'regions',
    number: 2,
    title: 'Africa by Region — The Business Map',
    shortTitle: 'Regional Map',
    intro: 'Africa\'s five regions each have distinct economic personalities, business cultures, and entry points. Understanding the map is the first step.',
    sections: [
      {
        type: 'cards',
        heading: 'The Five Regions at a Glance',
        cards: [
          { icon: '🇰🇪', title: 'East Africa', body: 'Kenya, Ethiopia, Rwanda, Tanzania, Uganda. The "Silicon Savannah." Mobile-first, English-speaking, startup-friendly.', badge: '★ Best for Tech' },
          { icon: '🇳🇬', title: 'West Africa', body: 'Nigeria, Ghana, Ivory Coast, Senegal. Largest economy. Highest energy. Most dynamic entrepreneurial culture.', badge: '★ Best for Scale' },
          { icon: '🇿🇦', title: 'Southern Africa', body: 'South Africa, Botswana, Zambia. Most industrialised. World-class infrastructure and financial systems.', badge: '★ Best for Base' },
          { icon: '🇲🇦', title: 'North Africa', body: 'Morocco, Egypt, Tunisia. Gateway to Europe and Middle East. Free trade agreements. Growing tech scenes.', badge: '★ Best for Export' },
          { icon: '🇨🇩', title: 'Central Africa', body: 'DRC, Cameroon, Congo. Vast mineral wealth. Rainforest. Emerging opportunity for resource and agribusiness sectors.', badge: 'Frontier' },
        ],
      },
      {
        type: 'text',
        heading: 'East Africa — Silicon Savannah',
        body: `East Africa — led by Kenya, Ethiopia, Rwanda, Tanzania, and Uganda — is arguably the continent's most startup-friendly region. Nairobi has earned the nickname "Silicon Savannah" for its density of tech hubs, accelerators, and mobile-first innovation.\n\nThe region benefits from a relatively stable political environment, a growing English-speaking workforce, and the M-Pesa revolution that made East Africa a global leader in mobile payments. Rwanda deserves special mention: Kigali is one of Africa's cleanest, safest, and most business-friendly cities, consistently ranking at the top of continental ease-of-doing-business indexes.`,
      },
      {
        type: 'text',
        heading: 'West Africa — The Commercial Engine',
        body: `West Africa is the continent's commercial engine. Nigeria alone has a GDP exceeding $440 billion and a population of over 220 million. Lagos is one of the world's fastest-growing megacities. Ghana, next door, offers a more stable regulatory environment and is increasingly attractive as a regional HQ.\n\nIvory Coast is the world's largest cocoa producer and a major hub for francophone West Africa. The ECOWAS zone represents a 400M+ integrated market with growing infrastructure.`,
      },
      {
        type: 'text',
        heading: 'Southern Africa — The Continental Benchmark',
        body: `South Africa remains the continent's most industrialised economy, with world-class infrastructure, a sophisticated financial system, and strong property rights. Cape Town and Johannesburg are magnets for remote workers and expats.\n\nBotswana, Namibia, and Zambia offer quieter but compelling opportunities, particularly in natural resources, agriculture, and tourism.`,
      },
      {
        type: 'table',
        heading: 'Quick Regional Comparison',
        headers: ['Region', 'Ease of Entry', 'Market Size', 'Language', 'Best Sector'],
        rows: [
          ['East Africa', '⭐⭐⭐⭐⭐', 'Medium', 'English', 'Tech & Fintech'],
          ['West Africa', '⭐⭐⭐', 'Large', 'English/French', 'FMCG & Commerce'],
          ['Southern Africa', '⭐⭐⭐⭐', 'Medium', 'English', 'Finance & Tourism'],
          ['North Africa', '⭐⭐⭐⭐', 'Large', 'Arabic/French', 'Export & Manufacturing'],
          ['Central Africa', '⭐⭐', 'Small', 'French', 'Resources & Agri'],
        ],
      },
      {
        type: 'callout',
        variant: 'gold',
        body: 'For first-time Africa entrepreneurs, East Africa (Kenya) or Ghana offer the lowest barriers, the most English-speaking support networks, and the strongest startup ecosystems to plug into.',
      },
    ],
  },

  {
    id: 'east-africa',
    number: 3,
    title: 'East Africa Deep Dive — Kenya Focus',
    shortTitle: 'Kenya Focus',
    intro: 'Kenya is the continent\'s most accessible market for foreign entrepreneurs. Here\'s everything you need to set up, bank, and operate.',
    sections: [
      {
        type: 'stats',
        heading: 'Kenya at a Glance',
        stats: [
          { icon: '👥', value: '55M', label: 'Population' },
          { icon: '💵', value: '$118B', label: 'GDP' },
          { icon: '📱', value: '97%', label: 'Mobile Penetration' },
          { icon: '🏢', value: '1–3', label: 'Days to Register Co.' },
        ],
      },
      {
        type: 'steps',
        heading: 'How to Register a Company in Kenya',
        steps: [
          { title: 'Create BRS Account', body: 'Go to brs.go.ke and create a Business Registration Service account using your passport.', badge: 'Day 1' },
          { title: 'Reserve Company Name', body: 'Search and reserve your preferred company name. Cost: KES 150 (~$1). Takes minutes online.', badge: 'Day 1' },
          { title: 'File Incorporation Documents', body: 'Submit memorandum and articles of association, list of directors and shareholders. Foreign nationals can be sole directors.', badge: 'Day 1–2' },
          { title: 'Pay Registration Fee', body: 'KES 10,650 (~$80 USD) for a private limited company. Pay via M-Pesa or card on the portal.', badge: '$80' },
          { title: 'Receive Certificate', body: 'Certificate of Incorporation issued digitally in 1–3 business days. Fully valid for banking and contracts.', badge: 'Day 2–4' },
          { title: 'Get KRA PIN', body: 'Register for your Tax Identification Number at itax.kra.go.ke. Required for banking, leases, and hiring.', badge: 'Day 4–5' },
        ],
      },
      {
        type: 'table',
        heading: 'Kenya Business Setup Costs',
        headers: ['Item', 'Cost (USD)', 'Timeline', 'Where'],
        rows: [
          ['Company Registration', '~$80', '1–3 days', 'brs.go.ke'],
          ['KRA PIN (Tax Number)', 'Free', '1 day', 'itax.kra.go.ke'],
          ['Business Bank Account', 'Free–$50', '3–7 days', 'Equity / KCB / NCBA'],
          ['Work Permit (Class G)', '$2,000+', '4–12 weeks', 'immigration.go.ke'],
          ['Registered Office Address', '$50–200/mo', 'Immediate', 'Virtual office providers'],
          ['Local Accountant', '$100–300/mo', 'Immediate', 'Referral recommended'],
        ],
      },
      {
        type: 'text',
        heading: 'Banking in Kenya',
        body: `Kenya's banking sector is mature and competitive. Equity Bank, KCB, and NCBA are popular with SMEs and foreign businesses. Opening a business account typically requires: certificate of incorporation, KRA PIN certificate, board resolution, and ID/passport for all directors.\n\nM-Pesa for Business (Lipa na M-Pesa) is essential — it's how most Kenyan consumers and small businesses pay. Register for a Paybill or Till Number through Safaricom. Integration via the Daraja API is straightforward for digital platforms.`,
      },
      {
        type: 'tip',
        icon: '🏦',
        heading: 'Open Equity Bank First',
        body: 'Equity Bank is the most foreigner-friendly bank in Kenya for new businesses. They have dedicated SME relationship managers and the account opening process is faster than the big 4 banks.',
      },
      {
        type: 'warning',
        icon: '⚠️',
        heading: 'KRA PIN is Non-Negotiable',
        body: 'Kenya\'s KRA PIN (Tax Identification Number) is required for almost every formal business transaction — opening a bank account, signing a lease, hiring employees, importing goods. Get it on day one at itax.kra.go.ke.',
      },
      {
        type: 'list',
        heading: 'What Nairobi Offers Entrepreneurs',
        items: [
          { icon: '🏙️', title: 'World-Class Co-Working', body: 'Nairobi Garage, iHub, Ikigai — from $100/month with fast fibre and networking events.' },
          { icon: '✈️', title: 'Regional Hub Flights', body: 'JKIA connects to 50+ African cities. Ideal base for pan-African travel.' },
          { icon: '🌐', title: 'Strong Expat Network', body: 'Large, established community of foreign entrepreneurs via Internations and Facebook groups.' },
          { icon: '👩‍💻', title: 'Skilled Talent Pool', body: 'Growing supply of tech, finance and marketing talent, especially post-university.' },
          { icon: '🏠', title: 'Good Quality of Life', body: 'Westlands and Kilimani offer modern apartments, restaurants, gyms — comparable to mid-tier European cities.' },
          { icon: '📶', title: 'Excellent Connectivity', body: 'Some of the best mobile data speeds in Africa. Reliable 4G/LTE across Nairobi.' },
        ],
      },
      {
        type: 'placeholder',
        heading: 'Visa & Work Permits',
        body: 'Kenya visa types — tourist (eVisa), business visa, investor visa; work permit categories (Class G); Special Pass for interim work; costs, timelines, common pitfalls and how to avoid them.',
      },
    ],
  },

  {
    id: 'west-africa',
    number: 4,
    title: 'West Africa — Nigeria & Ghana Focus',
    shortTitle: 'Nigeria & Ghana',
    intro: 'West Africa is where the deals are biggest, the energy is highest, and the learning curve is steepest. Here\'s how to navigate it.',
    sections: [
      {
        type: 'stats',
        heading: 'West Africa by the Numbers',
        stats: [
          { icon: '🇳🇬', value: '$440B', label: 'Nigeria GDP' },
          { icon: '👥', value: '220M', label: 'Nigeria Population' },
          { icon: '🇬🇭', value: '$77B', label: 'Ghana GDP' },
          { icon: '🏙️', value: '15M+', label: 'Lagos Metro Population' },
        ],
      },
      {
        type: 'text',
        heading: 'Nigeria: Scale & Complexity',
        body: `Nigeria demands respect. It is the most populous Black nation on Earth, the largest economy in Africa, and home to an entrepreneurial culture that is arguably the continent's most dynamic. Lagos moves fast — deals are done on WhatsApp, relationships matter more than contracts, and execution speed separates winners from those still in planning mode.\n\nThe regulatory environment is more complex than Kenya or Ghana, and forex controls have historically been a challenge. But the market size — 220 million people, a vast diaspora sending billions home, a music, fashion and entertainment industry with global reach — makes navigating that complexity worthwhile for many businesses.`,
      },
      {
        type: 'text',
        heading: 'Ghana: The Gateway Strategy',
        body: `Many multinational companies choose Ghana as their West African base precisely because of what it's not: it is not as complex to navigate as Nigeria, it has fewer currency controls, and it scores consistently higher on ease of doing business indices.\n\nAccra is clean, relatively safe, and has a growing class of educated, English-speaking professionals. Ghana's GIPC (Ghana Investment Promotion Centre) has a dedicated service for foreign investors with a fast-track registration pathway.`,
      },
      {
        type: 'table',
        heading: 'Nigeria vs Ghana — Side by Side',
        headers: ['Factor', 'Nigeria 🇳🇬', 'Ghana 🇬🇭'],
        rows: [
          ['Market Size', '220M people', '33M people'],
          ['GDP', '$440B', '$77B'],
          ['Company Registration', 'CAC — 1–2 weeks', 'GIPC — 3–5 days'],
          ['Min. Foreign Capital', '$100,000', '$200,000'],
          ['Forex Controls', 'Complex (CBN)', 'More flexible'],
          ['Ease of Doing Business', 'More complex', 'More accessible'],
          ['Business Language', 'English', 'English'],
          ['Best For', 'Scale & consumer', 'Regional HQ & export'],
        ],
      },
      {
        type: 'steps',
        heading: 'Registering in Nigeria (CAC)',
        steps: [
          { title: 'Name Search & Reservation', body: 'Search at search.cac.gov.ng. Reserve your preferred name for 60 days.', badge: 'Day 1' },
          { title: 'Prepare Documents', body: 'Memorandum & Articles of Association, passport copies for all directors, share structure.', badge: 'Day 1–3' },
          { title: 'Submit via CAC Portal', body: 'File at pre.cac.gov.ng. Foreign-owned companies must file with a Nigerian lawyer or accredited agent.', badge: 'Day 3–5' },
          { title: 'Pay Stamp Duty', body: 'Stamped at Federal Inland Revenue. Cost varies by share capital (minimum N10,000 share capital recommended).', badge: 'Day 5–7' },
          { title: 'Receive Certificate', body: 'CAC issues the Certificate of Incorporation. Timeline: 1–2 weeks. Use a registered CAC agent to avoid delays.', badge: '1–2 weeks' },
        ],
      },
      {
        type: 'callout',
        variant: 'green',
        body: 'In Nigeria and Ghana, business is deeply relational. Expect meetings to start late. Expect extended small talk before getting to the point. This is not inefficiency — it is how trust is built. Never skip the relationship phase.',
      },
      {
        type: 'list',
        heading: 'Surviving & Thriving in Lagos',
        items: [
          { icon: '📱', title: 'WhatsApp is your CRM', body: 'Every deal, follow-up and update happens on WhatsApp. Set up WhatsApp Business from day one.' },
          { icon: '🚗', title: 'Budget for Traffic', body: 'Lagos traffic (\'go-slow\') is legendary. Budget 2–3x more time than maps suggest for every meeting.' },
          { icon: '🤝', title: 'Connector Culture', body: 'Find your key connectors early — the right introduction opens more doors than any LinkedIn message.' },
          { icon: '💵', title: 'Cash is Still King', body: 'Despite fintech growth, always have Naira cash. POS machines fail and ATMs run out.' },
          { icon: '🏢', title: 'Get a Lagos Address', body: 'Victoria Island or Lekki Phase 1 are the business districts. A VI address signals you\'re serious.' },
          { icon: '⚡', title: 'Backup Power Essential', body: 'Invest in a generator or UPS from day one. National grid supply is unreliable in most of Lagos.' },
        ],
      },
      {
        type: 'placeholder',
        heading: 'Forex & Banking in Nigeria',
        body: 'CBN forex regulations, I&E window, the 2023 rate unification, banking with Zenith/GTBank/Access, sending and receiving international payments, practical forex management strategies.',
      },
    ],
  },

  {
    id: 'south-africa',
    number: 5,
    title: 'Southern Africa — South Africa Focus',
    shortTitle: 'South Africa',
    intro: 'South Africa offers Africa\'s most sophisticated business infrastructure. Here\'s how to set up, what to watch for, and why it\'s still worth it.',
    sections: [
      {
        type: 'stats',
        heading: 'South Africa at a Glance',
        stats: [
          { icon: '💰', value: '$405B', label: 'GDP' },
          { icon: '👥', value: '62M', label: 'Population' },
          { icon: '🏦', value: '#1', label: 'Largest Stock Exchange in Africa' },
          { icon: '🌍', value: '14', label: 'Stanbic Countries' },
        ],
      },
      {
        type: 'text',
        heading: 'South Africa: The Continental Benchmark',
        body: `South Africa operates a first-world financial and legal infrastructure within an African context. The JSE (Johannesburg Stock Exchange) is the continent's largest by market cap. Property rights are well-protected. The rand (ZAR) is freely convertible.\n\nFor entrepreneurs from Europe, North America, or Asia, South Africa often feels like the most "familiar" entry point into African business. Cape Town is particularly attractive for remote workers and creative businesses — regularly cited as one of the world's top cities for quality of life, co-working, and startup culture.`,
      },
      {
        type: 'steps',
        heading: 'Register a Company (CIPC) — 5 Steps',
        steps: [
          { title: 'Create CIPC Account', body: 'Go to cipc.co.za and register a customer account. Takes 10 minutes.', badge: 'Free' },
          { title: 'Name Reservation', body: 'Reserve your company name. Cost: ZAR 50 (~$2.80). Processed in 1–2 days.', badge: '$2.80' },
          { title: 'Submit MOI', body: 'File your Memorandum of Incorporation. Use the standard CoR15.1A template for speed.', badge: 'Day 2–3' },
          { title: 'Pay Registration Fee', body: 'ZAR 125 (~$7) for a private company (Pty Ltd). Paid online.', badge: '$7' },
          { title: 'Receive CoR', body: 'Certificate of Incorporation issued in 1–5 business days. Foreign nationals can be directors and shareholders.', badge: '1–5 days' },
        ],
      },
      {
        type: 'highlight',
        heading: '💡 South Africa\'s Biggest Hidden Cost',
        body: 'Load-shedding (scheduled power cuts) can run 4–12 hours per day. Budget ZAR 5,000–30,000 upfront for a UPS or inverter system. This is not optional — it\'s cost of doing business.',
      },
      {
        type: 'table',
        heading: 'Load-Shedding Stages Explained',
        headers: ['Stage', 'Hours Off Per Day', 'Impact', 'Solution'],
        rows: [
          ['Stage 1–2', '2–4 hours', 'Minor disruption', 'UPS for computers'],
          ['Stage 3–4', '4–8 hours', 'Significant disruption', 'Inverter system'],
          ['Stage 5–6', '8–12 hours', 'Severe disruption', 'Generator essential'],
          ['Stage 7–8', '12–14 hours', 'Near-total disruption', 'Full off-grid setup'],
        ],
      },
      {
        type: 'list',
        heading: 'Cape Town vs Johannesburg — Which City?',
        items: [
          { icon: '🌊', title: 'Cape Town — Best for Lifestyle', body: 'Remote workers, creatives, tourism businesses. World-class quality of life. Slower pace. Strong expat community.' },
          { icon: '💼', title: 'Johannesburg — Best for Business', body: 'Financial capital. Most corporates HQ\'d here. Better B2B opportunities. Faster-moving deal environment.' },
          { icon: '🎓', title: 'Cape Town — Best for Recruiting', body: 'UCT and Stellenbosch graduates. Strong tech and design talent. Popular with startups.' },
          { icon: '🛫', title: 'Johannesburg — Best for Travel', body: 'OR Tambo is Africa\'s busiest airport. Better connections for pan-African and international travel.' },
        ],
      },
      {
        type: 'placeholder',
        heading: 'Visas, Work Permits & The Critical Skills List',
        body: 'Business visa, work permit timelines (6–18 months via VFS Global), Critical Skills Visa pathway, which professions qualify, how to apply, using an immigration attorney.',
      },
    ],
  },

  {
    id: 'exporting',
    number: 6,
    title: 'Exporting TO Africa',
    shortTitle: 'Exporting to Africa',
    intro: 'Africa imports over $600B in goods annually. Finding your slice of that market starts with understanding what sells, where, and how to get paid.',
    sections: [
      {
        type: 'stats',
        heading: 'The Export Opportunity',
        stats: [
          { icon: '📦', value: '$600B', label: 'Annual Imports' },
          { icon: '📱', value: '#1', label: 'Tech Hardware Demand' },
          { icon: '🌱', value: '65%', label: 'Arable Land Unused' },
          { icon: '🏥', value: '$259B', label: 'Healthcare Market by 2030' },
        ],
      },
      {
        type: 'cards',
        heading: 'What Sells Best in Africa',
        cards: [
          { icon: '📱', title: 'Technology & Electronics', body: 'Smartphones, laptops, solar equipment, CCTV, networking gear. Demand is insatiable and supply chains are weak.', badge: '🔥 High Demand' },
          { icon: '🌾', title: 'Agricultural Inputs', body: 'Seeds, fertiliser, irrigation systems, agri-tech. Africa has 65% of the world\'s uncultivated arable land.', badge: '🔥 High Demand' },
          { icon: '💊', title: 'Healthcare Products', body: 'Pharmaceuticals, medical devices, diagnostics. $259B market projected by 2030.', badge: '📈 Growing Fast' },
          { icon: '🧴', title: 'FMCG & Consumer Goods', body: 'Branded food, personal care, household goods. Growing middle class is brand-conscious.', badge: '📈 Growing Fast' },
          { icon: '🏗️', title: 'Construction Materials', body: 'Cement, steel, tiles, fittings. Infrastructure boom creates consistent demand across all regions.', badge: 'Steady' },
          { icon: '📚', title: 'Education & EdTech', body: 'Curriculum materials, EdTech platforms, vocational training. 600M Africans under 25 years old.', badge: 'Emerging' },
        ],
      },
      {
        type: 'steps',
        heading: 'Finding Your First African Buyer',
        steps: [
          { title: 'Identify Your Target Market', body: 'Choose one country first. Research import data at trademap.org for your HS code to see which African countries import most of your product.', badge: 'Research' },
          { title: 'Attend a Trade Show', body: 'Africa\'s Big Seven (Johannesburg), AfricaCom (Cape Town), GITEX Africa (Morocco). One trade show = 100 cold emails worth of meetings.', badge: 'Networking' },
          { title: 'Use LinkedIn Outreach', body: 'Search "distributor [your product] [country]" on LinkedIn. Connect with procurement managers at large retailers and wholesalers.', badge: 'Outreach' },
          { title: 'Contact the Chamber', body: 'Your country\'s chamber of commerce in target African market often has vetted distributor directories and can make warm introductions.', badge: 'Introduction' },
          { title: 'Request References', body: 'Before signing any distributor agreement, ask for 3 supplier references. Call them. Distributor quality varies enormously.', badge: 'Due Diligence' },
        ],
      },
      {
        type: 'table',
        heading: 'Key African Ports & Clearance Reality',
        headers: ['Port', 'Country', 'Official Clearance', 'Real-World Timeline', 'Tips'],
        rows: [
          ['Mombasa', 'Kenya', '3–5 days', '5–14 days', 'Use a KRA-licensed clearing agent'],
          ['Apapa/Lagos', 'Nigeria', '5–7 days', '2–6 weeks', 'Budget for demurrage. Hire local agent.'],
          ['Durban', 'South Africa', '2–3 days', '3–7 days', 'Most efficient port in Africa'],
          ['Tema', 'Ghana', '3–5 days', '5–10 days', 'Improving. Use GCNET system.'],
          ['Dar es Salaam', 'Tanzania', '3–5 days', '7–14 days', 'TICTS terminal is faster'],
        ],
      },
      {
        type: 'warning',
        icon: '⚠️',
        heading: 'Budget for Customs Delays',
        body: 'A container cleared in 3 days in theory can sit for 3 weeks in practice — especially at Apapa (Lagos). Always build buffer into shipment timelines and factor in demurrage costs when pricing your goods.',
      },
      {
        type: 'placeholder',
        heading: 'Payment Methods & Getting Paid Safely',
        body: 'Letters of credit for large orders, escrow services, Flutterwave and Paystack for SME payments, protecting against non-payment, common payment scams to avoid.',
      },
    ],
  },

  {
    id: 'importing',
    number: 7,
    title: 'Importing FROM Africa',
    shortTitle: 'Importing from Africa',
    intro: 'Africa produces some of the world\'s finest raw materials, agricultural products, and artisanal goods. Here\'s how to source them profitably.',
    sections: [
      {
        type: 'stats',
        heading: 'Africa\'s Export Strengths',
        stats: [
          { icon: '☕', value: '#1', label: 'Coffee (Ethiopia/Kenya)' },
          { icon: '🍫', value: '70%', label: 'World\'s Cocoa (W. Africa)' },
          { icon: '🫖', value: '30%', label: 'Global Black Tea (Kenya)' },
          { icon: '💎', value: '$40B+', label: 'Mineral Exports Annually' },
        ],
      },
      {
        type: 'cards',
        heading: 'Top Import Opportunities',
        cards: [
          { icon: '☕', title: 'Specialty Coffee', body: 'Ethiopian Yirgacheffe, Kenyan AA, Rwandan Bourbon. World\'s most prized single-origin coffees. Direct trade margins are exceptional.', badge: 'High Margin' },
          { icon: '🫖', title: 'Premium Tea', body: 'Kenya produces 30% of global black tea exports. CTC and orthodox varieties. Strong demand in UK, Middle East and Asia.', badge: 'Volume Play' },
          { icon: '🍫', title: 'Cocoa & Chocolate', body: 'Ivory Coast and Ghana produce 70% of world cocoa. Direct sourcing bypasses commodity exchanges for better pricing.', badge: 'Scale' },
          { icon: '💎', title: 'Minerals & Gemstones', body: 'Tanzanite (Tanzania), coloured gemstones (Zambia, Mozambique), rough diamonds. Requires specialist licensing.', badge: 'Specialist' },
          { icon: '👗', title: 'Fashion & Textiles', body: 'Ghanaian Kente, Kenyan leather, South African design. Growing demand in premium ethical fashion segment globally.', badge: 'Emerging' },
          { icon: '🌿', title: 'Botanical Extracts', body: 'Shea butter (West Africa), rooibos (South Africa), baobab oil. High demand in cosmetics and health food sectors.', badge: 'Niche' },
        ],
      },
      {
        type: 'steps',
        heading: 'How to Source Ethiopian Coffee Directly',
        steps: [
          { title: 'Identify Your Volume', body: 'Start with minimum 1 container (17–19 tonnes). Smaller volumes make direct trade uneconomical — use importers for under 1 tonne.', badge: 'Planning' },
          { title: 'Find ECX-Licensed Exporters', body: 'Ethiopian Coffee Exchange (ECX) regulates all exports. Find licensed exporters at ecx.com.et. Many have English-speaking staff.', badge: 'Compliance' },
          { title: 'Request Samples', body: 'Always cup samples before committing to a container. Use SCA (Specialty Coffee Association) cupping protocols. Score must be 80+ for specialty.', badge: 'Quality' },
          { title: 'Negotiate & Contract', body: 'Agree on price, moisture content, screen size, and delivery terms (usually FOB Djibouti Port for Ethiopian coffee).', badge: 'Contract' },
          { title: 'Arrange Shipping & Insurance', body: 'Use a freight forwarder experienced in coffee. Insure against moisture damage. Transit from Djibouti to Europe: ~25 days.', badge: 'Logistics' },
          { title: 'Clear Customs & Certify', body: 'Phytosanitary certificate, certificate of origin. Organic/Fair Trade certification adds 20–40% price premium in EU/US markets.', badge: 'Compliance' },
        ],
      },
      {
        type: 'table',
        heading: 'Certifications That Drive Premium Pricing',
        headers: ['Certification', 'Premium Added', 'Best For', 'Cost to Get'],
        rows: [
          ['Fair Trade (FLO)', '+15–25%', 'Coffee, cocoa, tea', '$2,000–5,000/year'],
          ['Organic (USDA/EU)', '+20–40%', 'All food products', '$1,500–4,000/year'],
          ['Rainforest Alliance', '+10–20%', 'Coffee, cocoa', '$1,000–3,000/year'],
          ['SCA Specialty (80+)', '+30–100%', 'Specialty coffee', 'Cupping cost only'],
          ['UTZ Certified', '+10–15%', 'Coffee, cocoa, tea', '$500–2,000/year'],
        ],
      },
      {
        type: 'callout',
        variant: 'gold',
        body: 'The single biggest margin improvement in African commodity importing is eliminating one layer of the supply chain. Buying directly from a cooperative instead of a broker typically adds 15–30% to your gross margin.',
      },
      {
        type: 'placeholder',
        heading: 'Documentation & Compliance',
        body: 'Phytosanitary certificates, certificates of origin, AGOA for US market access, EU Deforestation Regulation (EUDR) impact on cocoa/coffee sourcing, FDA requirements for US food imports.',
      },
    ],
  },

  {
    id: 'remote-vs-relocate',
    number: 8,
    title: 'Starting a Business Remotely vs. Relocating',
    shortTitle: 'Remote vs Relocating',
    intro: 'You don\'t have to move to Africa to build there. But you should understand the trade-offs before you decide.',
    sections: [
      {
        type: 'table',
        heading: 'Remote vs. Relocated — The Full Comparison',
        headers: ['Factor', 'Running Remotely', 'Being On The Ground'],
        rows: [
          ['Deal Speed', 'Slow — email/Zoom lag', 'Fast — in the room'],
          ['Relationship Building', 'Possible but limited', 'Far superior'],
          ['Market Intelligence', 'Second-hand', 'Real-time, first-hand'],
          ['Operational Cost', 'Lower', 'Higher'],
          ['Compliance Management', 'Harder', 'Easier'],
          ['Team Culture', 'Difficult to build', 'Natural'],
          ['Quality of Life', 'Familiar comforts', 'Adventure + growth'],
          ['Best For', 'Services, import/export, digital', 'Retail, hospitality, manufacturing'],
        ],
      },
      {
        type: 'text',
        heading: 'The Remote-First Model',
        body: `It is entirely possible to register and operate an African business without relocating. Many entrepreneurs run Kenyan or South African entities from London, Dubai, or Singapore, visiting quarterly. This works best for service businesses, import/export, and digital products.\n\nThe keys to making remote work: a trusted local partner or employee on the ground, a reliable bank account with online access, clear digital workflows (WhatsApp, Notion, Zoom), and a local accountant who will keep you compliant without you having to be present.`,
      },
      {
        type: 'list',
        heading: 'Making Remote Work — The Non-Negotiables',
        items: [
          { icon: '👤', title: 'One Trusted Person On The Ground', body: 'An operations manager, partner or EA who can be your eyes and ears. This person is your most important hire.' },
          { icon: '🏦', title: 'Reliable Bank Account', body: 'Online banking access from abroad. Equity Bank Kenya and FNB South Africa both offer strong digital banking.' },
          { icon: '📱', title: 'WhatsApp Business Set Up', body: 'All Africa business happens on WhatsApp. Set up a business profile with your local number before you leave.' },
          { icon: '📊', title: 'Local Accountant', body: 'Monthly bookkeeping, tax filings, payroll. Budget $150–400/month for a competent local accountant.' },
          { icon: '🗓️', title: 'Quarterly Visits Minimum', body: 'Plan to visit at least once per quarter. Relationships decay fast when you disappear. Presence = trust.' },
          { icon: '⚖️', title: 'Registered Local Address', body: 'Virtual office services in all major cities from $30–100/month. Required for registration and credibility.' },
        ],
      },
      {
        type: 'callout',
        variant: 'green',
        body: '"The deals that don\'t happen are the ones where the founder was never in the room." — A common refrain among Africa-focused investors. Presence compounds over time.',
      },
      {
        type: 'placeholder',
        heading: 'When Relocation Makes Sense',
        body: 'Industries that require physical presence, visa pathways that support relocation, hybrid models (3 months in Nairobi, 9 months remote), how to test a market with a 90-day trial relocation.',
      },
      {
        type: 'highlight',
        heading: '🌍 The Hybrid Model — Best of Both',
        body: 'Most successful foreign Africa entrepreneurs use a hybrid: 3–4 months per year on the ground (split across 2–3 visits), remote the rest of the time. This builds real relationships while keeping your cost base manageable.',
      },
    ],
  },

  {
    id: 'banking',
    number: 9,
    title: 'Banking, Forex & Payments',
    shortTitle: 'Banking & Payments',
    intro: 'Moving money in Africa used to be the #1 barrier for foreign businesses. In 2024, the options are better than ever — if you know where to look.',
    sections: [
      {
        type: 'stats',
        heading: 'Africa\'s Payment Revolution',
        stats: [
          { icon: '📱', value: '$300B', label: 'M-Pesa Annual Transactions' },
          { icon: '🌍', value: '30+', label: 'Countries on Flutterwave' },
          { icon: '💸', value: '$100B+', label: 'Annual Diaspora Remittances' },
          { icon: '🚀', value: '$6B', label: 'Fintech VC in 2022' },
        ],
      },
      {
        type: 'text',
        heading: 'M-Pesa & Mobile Money',
        body: `M-Pesa, launched by Safaricom in Kenya in 2007, is arguably the most important financial innovation of the 21st century in the developing world. Today it processes more than $300 billion in transactions annually across East Africa.\n\nFor any business operating in Kenya, Tanzania, or Uganda, integrating M-Pesa is not optional — it is expected. The Daraja API (developer.safaricom.co.ke) allows developers to build M-Pesa payments into any web or mobile platform. For non-tech businesses, a Lipa na M-Pesa Till Number gives you a simple QR code that customers pay from any phone.`,
      },
      {
        type: 'cards',
        heading: 'Payment Platforms by Use Case',
        cards: [
          { icon: '🦋', title: 'Flutterwave', body: 'Accept payments in 30+ African currencies. Settle in USD/EUR. Best for businesses operating across multiple countries.', badge: 'Pan-African' },
          { icon: '💳', title: 'Paystack', body: 'Acquired by Stripe. Best-in-class checkout for Nigeria and Ghana. Trusted by 200,000+ businesses.', badge: 'Nigeria/Ghana' },
          { icon: '📲', title: 'M-Pesa (Daraja)', body: 'Dominant in East Africa. Integrate via Daraja API. Essential for any Kenya-based business.', badge: 'East Africa' },
          { icon: '🌊', title: 'Wave', body: 'Zero-fee mobile money. Dominant in Senegal, Ivory Coast, Mali. Growing fast in francophone West Africa.', badge: 'Francophone' },
          { icon: '🐦', title: 'Chipper Cash', body: 'Cross-border transfers between Nigeria, Ghana, Kenya, Uganda, Rwanda. Low fees. Popular with SMEs.', badge: 'Cross-Border' },
          { icon: '🌐', title: 'Grey / Ebury', body: 'Multi-currency accounts supporting NGN, KES, GHS, ZAR + USD/EUR/GBP. Built for Africa-focused businesses.', badge: 'Multi-Currency' },
        ],
      },
      {
        type: 'table',
        heading: 'Cross-Border Payment Options Compared',
        headers: ['Platform', 'Best For', 'Fee', 'Settlement Time'],
        rows: [
          ['SWIFT', 'Large transfers $10K+', '$25–50 flat', '3–7 business days'],
          ['Wise Business', 'EU/US to Africa', '0.5–2%', '1–3 days'],
          ['Flutterwave', 'Africa to Africa', '1.4%', 'Same day'],
          ['Chipper Cash', 'SME cross-border', '0–1%', 'Minutes'],
          ['USDT/USDC', 'Crypto settlement', 'Gas fees only', 'Minutes'],
          ['Grey', 'Multi-currency holds', '1–2%', '1–2 days'],
        ],
      },
      {
        type: 'tip',
        icon: '💡',
        heading: 'The Stablecoin Strategy',
        body: 'Many experienced Africa-based entrepreneurs use USDT or USDC as a settlement layer for cross-border trade — especially between countries with forex controls like Nigeria or Ethiopia. Send stablecoins, convert to local currency at the other end. It\'s legal, fast, and avoids the 15–30% spread on parallel forex markets.',
      },
      {
        type: 'placeholder',
        heading: 'Forex Controls Deep Dive',
        body: 'Nigeria (CBN regulations, I&E window, 2023 unification), Ethiopia (strict controls, parallel market), Zimbabwe (multi-currency environment), Zimbabwe and ZWL instability, and how to practically navigate each.',
      },
    ],
  },

  {
    id: '90-days',
    number: 10,
    title: 'Your First 90 Days — Practical Relocation Guide',
    shortTitle: 'First 90 Days',
    intro: 'The first 90 days in Africa will teach you more than three years of research. Here\'s how to make every week count.',
    sections: [
      {
        type: 'stats',
        heading: 'Your 90-Day Targets',
        stats: [
          { icon: '🤝', value: '50+', label: 'New Connections' },
          { icon: '🏢', value: '1', label: 'Company Registered' },
          { icon: '🏦', value: '1', label: 'Bank Account Open' },
          { icon: '💰', value: '1', label: 'Revenue or Partnership' },
        ],
      },
      {
        type: 'steps',
        heading: 'Days 1–30: Land, Observe, Connect',
        steps: [
          { title: 'Arrive with an Open Mind', body: 'Don\'t try to execute immediately. Spend week 1 observing, eating local, riding local transport, understanding the daily rhythm.', badge: 'Week 1' },
          { title: 'Find a Co-Working Space', body: 'Join a co-working space in the first week. This is your fastest path to meeting other entrepreneurs and getting local intel.', badge: 'Week 1' },
          { title: 'Download the Essentials', body: 'Bolt (rides), local banking app, EskomSePush (if in SA), WhatsApp Business, local news app. Get a local SIM with data.', badge: 'Day 1' },
          { title: 'Attend 2 Events', body: 'Find startup meetups, chamber of commerce events, or industry gatherings. Internations.org is good for expat networks.', badge: 'Week 2–3' },
          { title: 'Build Your WhatsApp Groups', body: 'Add every meaningful person you meet to your WhatsApp contacts. Create a broadcast list. In Africa, WhatsApp = your CRM.', badge: 'Ongoing' },
        ],
      },
      {
        type: 'steps',
        heading: 'Days 31–60: Build the Foundation',
        steps: [
          { title: 'Register Your Company', body: 'File online using the guides in this book. Budget 1–5 business days depending on the country.', badge: 'Week 5' },
          { title: 'Open Your Bank Account', body: 'Bring all documents (certificate of incorporation, tax number, passport, board resolution). Go in person.', badge: 'Week 5–6' },
          { title: 'Hire Your First Local Person', body: 'An operations assistant, EA, or business development person. This single hire multiplies your effectiveness 5x.', badge: 'Week 6–7' },
          { title: 'Find a Local Accountant', body: 'Ask for referrals from your co-working space or entrepreneur network. Interview 2–3 before choosing.', badge: 'Week 6' },
          { title: 'Secure Medium-Term Housing', body: 'Move from Airbnb/hotel to a furnished monthly rental. Typically 40–60% cheaper. Neighbourhood matters — choose wisely.', badge: 'Week 5–6' },
        ],
      },
      {
        type: 'steps',
        heading: 'Days 61–90: First Win',
        steps: [
          { title: 'Make Your First Sale or Sign a Deal', body: 'It doesn\'t need to be big. The first transaction validates your model and builds your confidence and credibility.', badge: 'Month 3' },
          { title: 'Host or Attend a Business Dinner', body: 'Invite your 5 most interesting contacts to dinner. Relationships in Africa are built around shared meals, not boardrooms.', badge: 'Month 3' },
          { title: 'Document Your Learnings', body: 'Write down what surprised you, what was harder than expected, what was easier. This becomes your competitive intelligence.', badge: 'Ongoing' },
        ],
      },
      {
        type: 'list',
        heading: 'Pre-Departure Checklist',
        items: [
          { icon: '🛂', title: 'Valid Visa or eVisa', body: 'Apply minimum 2 weeks before travel. Many African countries offer eVisas at arrival or online.' },
          { icon: '🏥', title: 'Travel Insurance', body: 'Get coverage with medical evacuation included. AXA, Allianz, or SafetyWing for long stays.' },
          { icon: '💉', title: 'Vaccinations', body: 'Yellow fever (required for many countries), typhoid, hepatitis A/B, and malaria prophylaxis where relevant.' },
          { icon: '💵', title: 'USD Cash ($500+)', body: 'Always carry USD as backup. It\'s accepted informally in most African countries and useful at borders.' },
          { icon: '📋', title: 'Document Copies', body: 'Scan and upload passport, visas, certificates to Google Drive. Bring originals and 5 colour copies of everything.' },
          { icon: '📱', title: 'Unlocked Phone', body: 'Ensure your phone is unlocked for local SIMs. Buy a local SIM at the airport on arrival.' },
        ],
      },
      {
        type: 'callout',
        variant: 'gold',
        body: 'Africa rewards patience and presence. Show up, stay consistent, and the continent will open up to you in ways that no amount of remote research can replicate. One year of genuine presence is worth five years of watching from the outside.',
      },
      {
        type: 'highlight',
        heading: '🚀 Your Africa Journey Starts Now',
        body: 'You\'ve read the guide. You know the regions, the registration processes, the payment tools, the cultural nuances. The only thing left is to book the flight. The entrepreneurs who win in Africa are not the best-prepared — they\'re the ones who showed up.',
      },
    ],
  },
];
