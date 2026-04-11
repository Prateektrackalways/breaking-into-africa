const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

async function generateEbookPdf() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  const html = buildPdfHtml();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    // Cover page (page 1) has no margins — body content pages have margins
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size:9px;color:#888;width:100%;text-align:center;padding:0 18mm;box-sizing:border-box;">
        <span class="pageNumber"></span>
      </div>`,
  });

  await browser.close();
  return pdfBuffer;
}

function buildPdfHtml() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', Arial, sans-serif; color: #222; background: #fff; }

  /* Cover page — full bleed image */
  .cover {
    width: 210mm; height: 297mm;
    page-break-after: always;
    margin: 0; padding: 0;
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    background: #0d1f13;
  }
  .cover img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center top;
    display: block;
  }

  /* About Author page */
  .about { padding: 60px 40px; page-break-before: always; background: #fffaf0; }
  .about-header { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #c9a84c; font-weight: 700; margin-bottom: 24px; }
  .about-flex { display: flex; gap: 32px; align-items: flex-start; }
  .about-photo { width: 160px; height: 160px; object-fit: cover; border-radius: 12px; flex-shrink: 0; }
  .about h2 { font-size: 26px; font-weight: 800; color: #1a4a2e; margin-bottom: 4px; }
  .about-title { font-size: 13px; color: #c9a84c; font-weight: 600; margin-bottom: 16px; }
  .about p { font-size: 13px; line-height: 1.85; color: #444; margin-bottom: 12px; }
  .about-links { margin-top: 16px; font-size: 12px; color: #1a4a2e; }
  .about-links div { margin-bottom: 4px; }

  /* TOC */
  .toc { padding: 60px 40px; page-break-after: always; }
  .toc h2 { font-size: 28px; color: #1a4a2e; border-bottom: 3px solid #c9a84c; padding-bottom: 12px; margin-bottom: 32px; }
  .toc-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dotted #ddd; font-size: 14px; }
  .toc-item .ch-num { color: #c9a84c; font-weight: 700; min-width: 80px; }
  .toc-item .ch-title { flex: 1; color: #222; }
  .toc-item .pg { color: #999; }

  /* Chapter */
  .chapter { padding: 60px 40px; page-break-before: always; }
  .chapter-number { font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #c9a84c; font-weight: 700; margin-bottom: 10px; }
  .chapter h2 { font-size: 30px; color: #1a4a2e; font-weight: 800; margin-bottom: 8px; line-height: 1.3; }
  .chapter-rule { width: 50px; height: 3px; background: #c9a84c; margin: 18px 0 28px; }
  .chapter p { font-size: 14px; line-height: 1.9; color: #333; margin-bottom: 16px; }
  .chapter h3 { font-size: 17px; font-weight: 700; color: #1a4a2e; margin: 28px 0 12px; }
  .callout { background: #f0f7f2; border-left: 4px solid #1a4a2e; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 20px 0; }
  .callout.gold { background: #fdf8ec; border-left-color: #c9a84c; }
  .callout p { margin: 0; font-size: 13.5px; color: #2a4a35; font-style: italic; }
  .placeholder { background: #f5f3ee; border: 1px dashed #c9a84c; border-radius: 6px; padding: 14px 18px; margin: 18px 0; color: #8a7a5a; font-size: 13px; font-style: italic; }
</style>
</head>
<body>

<!-- COVER — full bleed image -->
<div class="cover">
  <img src="https://guide.prateek.africa/assets/cover_hires.jpg" alt="Breaking Into Africa by Prateek Jain" />
</div>

<!-- TABLE OF CONTENTS -->
<div class="toc">
  <h2>Table of Contents</h2>
  ${[
    ['Chapter 1', 'Introduction — Why Africa, Why Now'],
    ['Chapter 2', 'Africa by Region — The Business Map'],
    ['Chapter 3', 'East Africa Deep Dive — Kenya Focus'],
    ['Chapter 4', 'West Africa — Nigeria & Ghana Focus'],
    ['Chapter 5', 'Southern Africa — South Africa Focus'],
    ['Chapter 6', 'Exporting TO Africa'],
    ['Chapter 7', 'Importing FROM Africa'],
    ['Chapter 8', 'Starting a Business Remotely vs. Relocating'],
    ['Chapter 9', 'Banking, Forex & Payments'],
    ['Chapter 10', 'Your First 90 Days — Practical Relocation Guide'],
  ].map(([num, title], i) => `
  <div class="toc-item">
    <span class="ch-num">${num}</span>
    <span class="ch-title">${title}</span>
  </div>`).join('')}
</div>

<!-- CHAPTERS -->
${getPdfChapters()}

<!-- ABOUT THE AUTHOR -->
<div class="about">
  <div class="about-header">About the Author</div>
  <div class="about-flex">
    <img class="about-photo" src="https://guide.prateek.africa/assets/author_portrait_square.jpg" alt="Prateek Jain" />
    <div>
      <h2>Prateek Jain</h2>
      <div class="about-title">Co-Founder at Trackalways · Nairobi, Kenya</div>
      <p>Prateek Jain is an entrepreneur, builder, and cross-border operator based in Nairobi, Kenya. Originally from Bhopal, India, he moved to East Africa to build businesses at the intersection of technology, logistics, and services.</p>
      <p>He is the Director and co-owner of <strong>Trackalways Ltd.</strong>, a GPS tracking and telematics company operating across Kenya and Uganda, and runs <strong>Anasa Living</strong> (serviced apartments in Nairobi) and <strong>Code Crumble</strong> (web development and SaaS tools).</p>
      <p>With experience spanning cloud kitchens, printing, fresh produce trade, IoT hardware, and SaaS platforms — across India, Africa, the UAE, and beyond — Prateek has navigated the real challenges of building in emerging markets: regulatory hurdles, cross-border payments, hiring, cultural adaptation, and finding product-market fit on the ground.</p>
      <p><em>"Breaking Into Africa" distils these hard-won lessons into a practical, no-fluff guide for entrepreneurs looking to enter or expand across the African continent.</em></p>
      <div class="about-links">
        <div>🌍 prateek.africa</div>
        <div>📡 trackalways.com</div>
      </div>
    </div>
  </div>
</div>

</body>
</html>`;
}

function getPdfChapters() {
  const chapters = [
    {
      number: 'Chapter 1',
      title: 'Introduction — Why Africa, Why Now',
      sections: [
        {
          heading: 'The Opportunity of a Generation',
          body: `Africa is home to 54 countries, 1.4 billion people, and the world's fastest-growing middle class. By 2050, one in four people on Earth will be African. Yet for most global entrepreneurs, the continent remains a mystery — or worse, a caricature built from outdated headlines. This guide is designed to change that.`,
        },
        {
          heading: 'My Personal Story',
          body: `[CONTENT: Author's personal journey to Africa — first visit, moment of realization, early business mistakes and wins, what made them stay and build]`,
          isPlaceholder: true,
        },
        {
          heading: 'Why This Guide Is Different',
          body: `Most resources about doing business in Africa either speak in vague generalities or dive so deep into a single country that they miss the continental picture. This guide does both: it gives you a bird's-eye view of the continent's regions, then zooms into the countries where the opportunity is most accessible for foreign entrepreneurs and remote workers right now.`,
        },
        {
          callout: 'Africa is not a country. Treat each nation as its own market with its own laws, culture, language, and economic rhythm.',
        },
      ],
    },
    {
      number: 'Chapter 2',
      title: 'Africa by Region — The Business Map',
      sections: [
        {
          heading: 'East Africa',
          body: `East Africa — led by Kenya, Ethiopia, Rwanda, Tanzania, and Uganda — is arguably the continent's most startup-friendly region. Nairobi has earned the nickname "Silicon Savannah" for its density of tech hubs, accelerators, and mobile-first innovation. The region benefits from a relatively stable political environment, a growing English-speaking workforce, and the M-Pesa revolution that made East Africa a global leader in mobile payments.`,
        },
        {
          heading: 'West Africa',
          body: `West Africa is the continent's commercial engine. Nigeria alone has a GDP exceeding $440 billion and a population of over 220 million. Lagos is one of the world's fastest-growing megacities. Ghana, next door, offers a more stable regulatory environment and is increasingly attractive as a regional HQ for companies wanting West African exposure with lower operational risk.`,
        },
        {
          heading: 'Southern Africa',
          body: `South Africa remains the continent's most industrialised economy, with world-class infrastructure, a sophisticated financial system, and strong property rights. Cape Town and Johannesburg are magnets for remote workers and expats. However, energy infrastructure challenges (load-shedding) and high inequality require careful planning.`,
        },
        {
          heading: 'North Africa & Central Africa',
          body: `[CONTENT: Overview of North Africa (Morocco, Egypt) as business hubs and gateway markets; Central Africa (DRC, Cameroon) — resource wealth, infrastructure challenges, emerging opportunities]`,
          isPlaceholder: true,
        },
      ],
    },
    {
      number: 'Chapter 3',
      title: 'East Africa Deep Dive — Kenya Focus',
      sections: [
        {
          heading: 'Business Registration in Kenya',
          body: `Registering a company in Kenya is handled through the Business Registration Service (BRS) portal. A private limited company (Ltd) can be registered online in 1–3 business days for approximately KES 10,650 (~$80 USD). You will need a local registered address and at least one director. Foreign nationals can be sole directors. The process has been significantly streamlined since 2019.`,
        },
        {
          heading: 'Banking',
          body: `Kenya's banking sector is mature and competitive. Equity Bank, KCB, and NCBA are popular with SMEs and foreign businesses. Opening a business account typically requires: certificate of incorporation, KRA PIN certificate, board resolution, and ID/passport for all directors. M-Pesa for Business (Lipa na M-Pesa) is essential — it's how most Kenyan consumers and small businesses pay.`,
        },
        {
          heading: 'Visa & Work Permits',
          body: `[CONTENT: Kenya visa types — tourist, business, investor; work permit categories (G1–G9); Special Pass for interim work; costs, timelines, where to apply, common pitfalls]`,
          isPlaceholder: true,
        },
        {
          callout: `Kenya's KRA PIN (Tax Identification Number) is required for almost every formal business transaction — get it on day one.`,
          type: 'gold',
        },
        {
          heading: 'Cost of Living & Operations',
          body: `[CONTENT: Monthly budget breakdown for a foreign entrepreneur based in Nairobi — rent (Westlands vs Kilimani vs Karen), co-working spaces, staff salaries, transport, utilities, food]`,
          isPlaceholder: true,
        },
      ],
    },
    {
      number: 'Chapter 4',
      title: 'West Africa — Nigeria & Ghana Focus',
      sections: [
        {
          heading: 'Nigeria: Scale & Complexity',
          body: `Nigeria demands respect. It is the most populous Black nation on Earth, the largest economy in Africa, and home to an entrepreneurial culture that is arguably the continent's most dynamic. Lagos moves fast — deals are done on WhatsApp, relationships matter more than contracts, and execution speed separates winners from those still in planning mode.`,
        },
        {
          heading: 'Ghana: The Gateway Strategy',
          body: `Many multinational companies choose Ghana as their West African base precisely because of what it's not: it is not as complex to navigate as Nigeria, it has fewer currency controls, and it scores consistently higher on ease of doing business indices. Accra is clean, relatively safe, and has a growing class of educated, English-speaking professionals.`,
        },
        {
          heading: 'Registration, Banking & Forex',
          body: `[CONTENT: CAC registration in Nigeria; Ghana Investment Promotion Centre (GIPC) requirements for foreign businesses; minimum capital requirements; banking with Zenith, GTBank, Stanbic; forex challenges in Nigeria — parallel market, official rate, CBN regulations]`,
          isPlaceholder: true,
        },
      ],
    },
    {
      number: 'Chapter 5',
      title: 'Southern Africa — South Africa Focus',
      sections: [
        {
          heading: 'South Africa: The Continental Benchmark',
          body: `South Africa operates a first-world financial and legal infrastructure within an African context. The JSE (Johannesburg Stock Exchange) is the continent's largest by market cap. Property rights are well-protected. The rand (ZAR) is freely convertible. For entrepreneurs from Europe, North America, or Asia, South Africa often feels like the most "familiar" entry point into African business.`,
        },
        {
          heading: 'Registering a Company (CIPC)',
          body: `The Companies and Intellectual Property Commission (CIPC) manages company registration. A private company (Pty Ltd) can be registered online at cipc.co.za in 1–5 business days for as little as ZAR 175 (~$9 USD). Foreign nationals can be directors and shareholders without residency.`,
        },
        {
          heading: 'Load-Shedding & Operational Planning',
          body: `[CONTENT: South Africa's electricity crisis — what load-shedding stages mean, how to plan around it (inverters, generators, UPS systems), impact on productivity, which industries are most affected]`,
          isPlaceholder: true,
        },
      ],
    },
    {
      number: 'Chapter 6',
      title: 'Exporting TO Africa',
      sections: [
        {
          heading: 'What Sells in Africa',
          body: `The most successful exports to Africa tend to solve specific infrastructure gaps or meet aspirational consumer demand. Technology hardware (phones, laptops, solar equipment), FMCG goods, healthcare products, agricultural inputs, and educational materials consistently perform well. Luxury goods and premium brands are growing fast in South Africa, Kenya, and Nigeria as the middle class expands.`,
        },
        {
          heading: 'Finding Buyers & Distributors',
          body: `[CONTENT: Trade shows (Africa's Big Seven, AGOA Forum, AfricaCom); B2B platforms (Kompass Africa, Made-in-Africa); using LinkedIn for distributor outreach; chambers of commerce; the role of local agents]`,
          isPlaceholder: true,
        },
        {
          heading: 'Shipping, Customs & Payments',
          body: `[CONTENT: Incoterms for Africa (FOB vs CIF vs DDP); port clearance in Mombasa, Lagos, Durban; HS codes; import duties by country; getting paid — letters of credit, escrow, Flutterwave, Paystack]`,
          isPlaceholder: true,
        },
      ],
    },
    {
      number: 'Chapter 7',
      title: 'Importing FROM Africa',
      sections: [
        {
          heading: 'Africa\'s Export Strengths',
          body: `Africa is the world's leading source of cocoa (Ivory Coast, Ghana), coffee (Ethiopia, Kenya, Uganda), tea (Kenya), cashews (Tanzania, Mozambique), and a vast array of minerals including coltan, lithium, gold, platinum, and diamonds. Beyond raw materials, there is a growing ecosystem of artisanal goods, fashion, and creative products with strong global market appeal.`,
        },
        {
          heading: 'Sourcing Coffee & Tea',
          body: `Ethiopian and Kenyan coffee are among the world's most prized single-origin varieties. Sourcing directly from cooperatives or washing stations requires building relationships over time, but the margin improvement over buying through intermediaries is significant. Certifications to look for: Fair Trade, Rainforest Alliance, UTZ.`,
        },
        {
          heading: 'Documentation & Compliance',
          body: `[CONTENT: Phytosanitary certificates; certificates of origin; AGOA and GSP preferential tariff access; EU deforestation regulation (EUDR) impact on cocoa and coffee; FDA and customs requirements for US imports]`,
          isPlaceholder: true,
        },
      ],
    },
    {
      number: 'Chapter 8',
      title: 'Starting a Business Remotely vs. Relocating',
      sections: [
        {
          heading: 'The Remote-First Model',
          body: `It is entirely possible to register and operate an African business without relocating. Many entrepreneurs run Kenyan or South African entities from London, Dubai, or Singapore, visiting quarterly. This works best for service businesses, import/export, and digital products. The keys: a trusted local partner or employee on the ground, a reliable bank account, and clear digital workflows.`,
        },
        {
          heading: 'When Relocation Makes Sense',
          body: `[CONTENT: Industries that require physical presence; the advantage of being on the ground for relationship-building; visa pathways that support relocation; hybrid models — split your time]`,
          isPlaceholder: true,
        },
        {
          callout: `"The deals that don't happen are the ones where the founder was never in the room." — A common refrain among African-focused investors.`,
        },
      ],
    },
    {
      number: 'Chapter 9',
      title: 'Banking, Forex & Payments',
      sections: [
        {
          heading: 'M-Pesa & Mobile Money',
          body: `M-Pesa, launched by Safaricom in Kenya in 2007, is arguably the most important financial innovation of the 21st century in the developing world. Today it processes more than $300 billion in transactions annually across East Africa. For any business operating in Kenya, Tanzania, or Uganda, integrating M-Pesa is not optional — it is expected. The Daraja API allows developers to build M-Pesa payments into any web or mobile platform.`,
        },
        {
          heading: 'Pan-African Payment Platforms',
          body: `Flutterwave and Paystack (acquired by Stripe) have transformed cross-border payments in Africa. Both allow businesses to accept payments in local currencies across 30+ African countries, settle in USD or EUR, and integrate with international payment infrastructure. Chipper Cash is gaining ground for peer-to-peer and SME cross-border transfers.`,
        },
        {
          heading: 'SWIFT, Forex Controls & Crypto',
          body: `[CONTENT: SWIFT transfers to/from Africa — correspondent bank issues, costs; forex controls in Nigeria, Ethiopia, Zimbabwe; practical use of USDT/USDC as a settlement layer for cross-border trade; regulatory status of crypto in key markets]`,
          isPlaceholder: true,
        },
      ],
    },
    {
      number: 'Chapter 10',
      title: 'Your First 90 Days — Practical Relocation Guide',
      sections: [
        {
          heading: 'Days 1–30: Land, Observe, Connect',
          body: `Arrive without a fixed plan to execute. Your first month should be spent observing, meeting people, eating local, and understanding the rhythm of daily life. Join expat and entrepreneur groups (Internations, local Facebook groups, co-working spaces). Go to at least two industry or startup events. Don't sign any long-term leases or contracts yet.`,
        },
        {
          heading: 'Days 31–60: Set Up the Foundations',
          body: `This is when you formalize: register your company, open your bank account, sort your tax registration, find a reliable accountant familiar with your chosen country, secure medium-term accommodation, and hire your first local team member or assistant. Set up your communication tools — WhatsApp Business is non-negotiable in Africa.`,
        },
        {
          heading: 'Days 61–90: First Revenue or Partnership',
          body: `[CONTENT: Making your first sale, signing your first partnership, attending your first industry event as a participant not just an observer; how to pitch to African partners; the importance of showing up consistently over time]`,
          isPlaceholder: true,
        },
        {
          callout: `Africa rewards patience and presence. Show up, stay consistent, and the continent will open up to you in ways that no amount of remote research can replicate.`,
          type: 'gold',
        },
      ],
    },
  ];

  return chapters.map(ch => `
<div class="chapter">
  <div class="chapter-number">${ch.number}</div>
  <h2>${ch.title}</h2>
  <div class="chapter-rule"></div>
  ${ch.sections.map(s => {
    if (s.callout) {
      return `<div class="callout ${s.type === 'gold' ? 'gold' : ''}"><p>"${s.callout}"</p></div>`;
    }
    return `
      ${s.heading ? `<h3>${s.heading}</h3>` : ''}
      ${s.isPlaceholder
        ? `<div class="placeholder">[CONTENT: ${s.body.replace('[CONTENT: ', '').replace(']', '')}]</div>`
        : `<p>${s.body}</p>`}
    `;
  }).join('')}
</div>`).join('');
}

module.exports = { generateEbookPdf };
