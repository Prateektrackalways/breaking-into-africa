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
  await page.setViewport({ width: 1240, height: 1754 });
  const html = buildPdfHtml();
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `<div style="font-size:8px;color:#aaa;width:100%;text-align:center;font-family:Arial,sans-serif;padding:0 16mm;box-sizing:border-box;">
      prateek.africa &nbsp;·&nbsp; Breaking Into Africa &nbsp;·&nbsp; Page <span class="pageNumber"></span> of <span class="totalPages"></span>
    </div>`,
    timeout: 120000,
  });

  await browser.close();
  return pdfBuffer;
}

// ─────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',Arial,'Noto Color Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif;color:#222;background:#fff;font-size:13px;line-height:1.7;}
.stat-icon,.card-icon,.step-icon,.callout-icon,.tip-icon,.list-icon{font-family:'Noto Color Emoji','Segoe UI Emoji','Apple Color Emoji',sans-serif;}

/* Cover */
.cover{width:210mm;height:297mm;page-break-after:always;margin:-18mm -16mm;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#0d1f13;}
.cover img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block;}

/* TOC */
.toc{page-break-after:always;padding-bottom:20px;}
.toc-title{font-size:26px;font-weight:800;color:#1a4a2e;border-bottom:3px solid #c9a84c;padding-bottom:10px;margin-bottom:24px;}
.toc-item{display:flex;align-items:center;padding:8px 0;border-bottom:1px dotted #ddd;}
.toc-num{color:#c9a84c;font-weight:700;min-width:90px;font-size:12px;}
.toc-name{flex:1;font-size:13px;color:#333;}

/* Chapter header */
.ch-wrap{page-break-before:always;padding-bottom:8px;}
.ch-label{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;font-weight:700;margin-bottom:6px;}
.ch-title{font-size:24px;font-weight:800;color:#1a4a2e;line-height:1.25;margin-bottom:6px;}
.ch-rule{width:40px;height:3px;background:#c9a84c;margin-bottom:20px;border-radius:2px;}
.ch-intro{font-size:14px;font-style:italic;color:#555;border-left:3px solid rgba(201,168,76,0.4);padding-left:12px;margin-bottom:20px;}

/* Text section */
.sec-heading{font-size:15px;font-weight:700;color:#1a4a2e;margin:18px 0 8px;}
.sec-body{color:#444;line-height:1.8;margin-bottom:10px;}

/* Stats grid */
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:14px 0;}
.stat-card{background:linear-gradient(135deg,#1a4a2e,#2d6b45);border-radius:10px;padding:14px 10px;text-align:center;color:#fff;}
.stat-icon{font-size:18px;margin-bottom:4px;}
.stat-val{font-size:20px;font-weight:800;color:#c9a84c;line-height:1;}
.stat-lbl{font-size:9px;color:#a8d5b5;margin-top:4px;line-height:1.3;}

/* Steps */
.steps-wrap{margin:14px 0;}
.step-item{display:flex;gap:12px;margin-bottom:10px;background:#fff;border:1px solid #e8e4d9;border-radius:8px;padding:10px 12px;align-items:flex-start;}
.step-num{flex-shrink:0;width:28px;height:28px;border-radius:50%;background:#1a4a2e;color:#fff;font-weight:700;font-size:12px;display:flex;align-items:center;justify-content:center;}
.step-body{flex:1;}
.step-title{font-weight:700;color:#1a4a2e;font-size:12px;margin-bottom:2px;}
.step-text{font-size:11px;color:#666;line-height:1.6;}
.step-badge{flex-shrink:0;background:#fdf8ec;border:1px solid #c9a84c;color:#a88630;font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;align-self:flex-start;white-space:nowrap;}

/* Table */
.tbl-wrap{margin:14px 0;border-radius:8px;overflow:hidden;border:1px solid #ddd;}
table{width:100%;border-collapse:collapse;}
thead tr{background:#1a4a2e;}
th{color:#fff;padding:8px 10px;text-align:left;font-size:11px;font-weight:600;}
td{padding:7px 10px;font-size:11px;color:#444;}
tr:nth-child(even) td{background:#f9f7f3;}
tr:nth-child(odd) td{background:#fff;}
td:first-child{font-weight:600;color:#1a4a2e;}

/* Cards grid */
.cards-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:14px 0;}
.card-item{border-radius:10px;padding:14px;color:#fff;}
.card-icon{font-size:20px;margin-bottom:6px;}
.card-title{font-weight:700;font-size:12px;margin-bottom:4px;}
.card-body{font-size:10px;line-height:1.5;opacity:0.85;}
.card-badge{display:inline-block;background:rgba(255,255,255,0.2);font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;margin-top:6px;}

/* Callout */
.callout-green{background:#f0f7f2;border-left:4px solid #1a4a2e;border-radius:0 8px 8px 0;padding:12px 14px;margin:14px 0;display:flex;gap:10px;align-items:flex-start;}
.callout-gold{background:#fdf8ec;border-left:4px solid #c9a84c;border-radius:0 8px 8px 0;padding:12px 14px;margin:14px 0;display:flex;gap:10px;align-items:flex-start;}
.callout-text{font-size:12px;font-style:italic;line-height:1.7;color:#2a4a35;}
.callout-gold .callout-text{color:#6b4c10;}

/* Tip / Warning */
.tip-box{border-radius:8px;padding:12px 14px;margin:14px 0;display:flex;gap:10px;align-items:flex-start;}
.tip-green{background:#f0faf2;border:1px solid #86efac;}
.tip-amber{background:#fffbeb;border:1px solid #fcd34d;}
.tip-heading{font-weight:700;font-size:11px;margin-bottom:3px;}
.tip-green .tip-heading{color:#166534;}
.tip-amber .tip-heading{color:#92400e;}
.tip-body{font-size:11px;line-height:1.6;color:#444;}

/* Highlight banner */
.highlight{background:linear-gradient(135deg,#1a4a2e,#2d6b45);border-radius:10px;padding:16px 18px;margin:14px 0;color:#fff;}
.highlight-heading{color:#c9a84c;font-weight:700;font-size:13px;margin-bottom:6px;}
.highlight-body{font-size:12px;color:#d4edda;line-height:1.7;}

/* Icon list */
.list-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:14px 0;}
.list-item{display:flex;gap:8px;background:#fff;border:1px solid #e8e4d9;border-radius:8px;padding:8px 10px;align-items:flex-start;}
.list-icon{font-size:14px;flex-shrink:0;}
.list-title{font-weight:600;color:#1a4a2e;font-size:11px;margin-bottom:2px;}
.list-text{font-size:10px;color:#666;line-height:1.5;}

/* Placeholder */
.placeholder{background:#fffbeb;border:1px dashed #c9a84c;border-radius:8px;padding:12px 14px;margin:14px 0;display:flex;gap:10px;}
.placeholder-text{font-size:11px;font-style:italic;color:#92400e;line-height:1.6;}
.placeholder-lbl{font-size:9px;font-weight:700;text-transform:uppercase;color:#b45309;letter-spacing:0.5px;margin-bottom:4px;}

/* About author */
.about{page-break-before:always;background:#fffaf0;padding:40px;}
.about-label{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;font-weight:700;margin-bottom:16px;}
.about-flex{display:flex;gap:24px;align-items:flex-start;}
.about-photo{width:140px;height:140px;object-fit:cover;border-radius:10px;flex-shrink:0;}
.about h2{font-size:22px;font-weight:800;color:#1a4a2e;margin-bottom:2px;}
.about-role{color:#c9a84c;font-weight:600;font-size:12px;margin-bottom:12px;}
.about p{font-size:12px;line-height:1.8;color:#444;margin-bottom:10px;}
.about-links{font-size:11px;color:#1a4a2e;margin-top:12px;}
.about-links div{margin-bottom:3px;}
`;

// ─────────────────────────────────────────────
// AFRICA MAP SVG
// ─────────────────────────────────────────────
const AFRICA_MAP_SVG = `
<div style="margin:14px 0 20px;">
  <div style="font-size:14px;font-weight:700;color:#1a4a2e;margin-bottom:10px;">Africa — Regional Business Map</div>
  <svg viewBox="0 0 780 820" style="width:100%;max-width:680px;display:block;margin:0 auto;background:#eef2f7;border-radius:10px;border:1px solid #dde3ec;">
    <!-- NORTH AFRICA -->
    <polygon points="90,85 135,75 155,85 160,115 145,130 110,135 85,120 80,100" fill="#7b3fa0" stroke="white" stroke-width="0.8"/>
    <text x="120" y="108" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Morocco</text>
    <polygon points="155,85 240,75 270,90 275,130 265,155 200,160 160,150 145,130 160,115" fill="#7b3fa0" stroke="white" stroke-width="0.8"/>
    <text x="213" y="120" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Algeria</text>
    <polygon points="240,75 265,72 275,85 275,100 260,110 245,100 240,88" fill="#7b3fa0" stroke="white" stroke-width="0.8"/>
    <text x="257" y="93" font-size="5.5" fill="white" text-anchor="middle" font-family="Arial">Tunisia</text>
    <polygon points="265,72 340,68 365,80 370,120 355,155 300,160 275,130 275,100 275,85" fill="#7b3fa0" stroke="white" stroke-width="0.8"/>
    <text x="318" y="112" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Libya</text>
    <polygon points="365,80 430,75 450,90 455,130 440,155 385,160 355,155 370,120" fill="#7b3fa0" stroke="white" stroke-width="0.8"/>
    <text x="408" y="115" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Egypt</text>
    <polygon points="80,120 110,135 120,155 110,175 80,180 62,160 60,135" fill="#9b5abf" stroke="white" stroke-width="0.8"/>
    <text x="90" y="153" font-size="5" fill="white" text-anchor="middle" font-family="Arial">W.Sahara</text>
    <polygon points="440,155 480,145 510,155 515,195 505,230 470,245 440,240 420,215 415,185 430,160" fill="#7b3fa0" stroke="white" stroke-width="0.8"/>
    <text x="465" y="195" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Sudan</text>
    <!-- WEST AFRICA -->
    <polygon points="62,160 110,175 120,155 130,175 125,210 90,225 60,220 50,190" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="88" y="193" font-size="6" fill="white" text-anchor="middle" font-family="Arial">Mauritania</text>
    <polygon points="130,175 200,160 265,155 270,185 260,225 230,250 195,265 165,265 140,240 125,210" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="198" y="215" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Mali</text>
    <polygon points="265,155 355,155 370,175 365,215 345,235 310,245 270,240 260,225 270,185" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="315" y="200" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Niger</text>
    <polygon points="60,220 90,225 105,240 100,258 80,265 55,255 48,238" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="78" y="245" font-size="5.5" fill="white" text-anchor="middle" font-family="Arial">Senegal</text>
    <polygon points="65,268 100,260 120,270 115,292 95,298 68,290" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="92" y="281" font-size="5.5" fill="white" text-anchor="middle" font-family="Arial">Guinea</text>
    <polygon points="68,292 100,300 115,310 108,330 85,335 62,320 58,305" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="85" y="315" font-size="5" fill="white" text-anchor="middle" font-family="Arial">S.Leone</text>
    <polygon points="115,270 165,265 185,275 188,300 175,320 148,328 118,315 115,295" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="150" y="298" font-size="6" fill="white" text-anchor="middle" font-family="Arial">Ivory Coast</text>
    <polygon points="188,275 220,270 235,280 238,308 225,328 200,332 178,322 175,300" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="207" y="303" font-size="6.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Ghana</text>
    <polygon points="238,278 260,275 268,285 265,310 255,325 240,328 235,310" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="252" y="303" font-size="4.5" fill="white" text-anchor="middle" font-family="Arial">Togo/Benin</text>
    <polygon points="165,265 230,250 265,255 268,278 240,280 188,275 170,268" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="216" y="265" font-size="6" fill="white" text-anchor="middle" font-family="Arial">Burkina Faso</text>
    <polygon points="268,255 345,248 370,258 375,290 365,325 335,345 300,348 270,335 258,308 262,278 268,265" fill="#c9a84c" stroke="white" stroke-width="0.8"/>
    <text x="315" y="302" font-size="9" fill="white" text-anchor="middle" font-family="Arial" font-weight="700">Nigeria</text>
    <!-- CENTRAL AFRICA -->
    <polygon points="345,248 385,240 400,255 405,285 390,310 365,325 345,310 338,285 342,262" fill="#c0392b" stroke="white" stroke-width="0.8"/>
    <text x="372" y="284" font-size="6" fill="white" text-anchor="middle" font-family="Arial">Cameroon</text>
    <polygon points="355,155 415,150 440,160 445,195 430,225 415,240 385,240 370,220 365,185 360,165" fill="#c0392b" stroke="white" stroke-width="0.8"/>
    <text x="400" y="195" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Chad</text>
    <polygon points="405,255 440,248 480,252 490,275 480,298 450,308 415,305 400,285" fill="#c0392b" stroke="white" stroke-width="0.8"/>
    <text x="445" y="278" font-size="5.5" fill="white" text-anchor="middle" font-family="Arial">C.A.R.</text>
    <polygon points="390,312 425,308 445,318 448,345 432,360 405,362 385,345 382,325" fill="#c0392b" stroke="white" stroke-width="0.8"/>
    <text x="415" y="338" font-size="5" fill="white" text-anchor="middle" font-family="Arial">Gabon/Congo</text>
    <polygon points="450,308 495,300 530,310 545,335 548,375 535,405 510,420 475,425 448,415 430,390 425,360 448,345 448,320" fill="#c0392b" stroke="white" stroke-width="0.8"/>
    <text x="490" y="365" font-size="9" fill="white" text-anchor="middle" font-family="Arial" font-weight="700">DR Congo</text>
    <polygon points="440,240 480,248 510,255 520,280 505,300 480,305 452,298 438,275 430,255" fill="#c0392b" stroke="white" stroke-width="0.8"/>
    <text x="477" y="275" font-size="6" fill="white" text-anchor="middle" font-family="Arial">S. Sudan</text>
    <!-- EAST AFRICA -->
    <polygon points="510,155 555,148 590,162 600,192 590,220 562,235 530,238 510,228 505,200 505,175" fill="#2d6b45" stroke="white" stroke-width="0.8"/>
    <text x="550" y="193" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Ethiopia</text>
    <polygon points="510,148 555,140 565,152 555,162 510,162" fill="#2d6b45" stroke="white" stroke-width="0.8"/>
    <text x="535" y="153" font-size="5" fill="white" text-anchor="middle" font-family="Arial">Eritrea</text>
    <polygon points="562,235 595,220 625,205 645,228 640,265 618,300 595,310 570,298 555,270 555,248" fill="#2d6b45" stroke="white" stroke-width="0.8"/>
    <text x="605" y="263" font-size="7" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Somalia</text>
    <polygon points="520,285 548,278 560,290 558,315 540,328 518,325 510,308 512,292" fill="#2d6b45" stroke="white" stroke-width="0.8"/>
    <text x="535" y="307" font-size="6" fill="white" text-anchor="middle" font-family="Arial">Uganda</text>
    <polygon points="560,245 598,238 620,252 625,280 615,308 590,320 565,315 555,298 555,270" fill="#2d6b45" stroke="white" stroke-width="0.8"/>
    <text x="590" y="282" font-size="9" fill="white" text-anchor="middle" font-family="Arial" font-weight="700">Kenya</text>
    <polygon points="548,318 565,314 570,328 560,340 545,338 542,325" fill="#2d6b45" stroke="white" stroke-width="0.8"/>
    <text x="556" y="330" font-size="4.5" fill="white" text-anchor="middle" font-family="Arial">Rwa/Bur</text>
    <polygon points="558,340 590,325 625,332 638,360 632,395 610,415 580,420 553,408 542,380 545,355" fill="#2d6b45" stroke="white" stroke-width="0.8"/>
    <text x="590" y="378" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Tanzania</text>
    <polygon points="548,430 580,425 605,440 610,470 598,510 575,530 548,525 530,505 530,468 540,445" fill="#2d6b45" stroke="white" stroke-width="0.8"/>
    <text x="572" y="480" font-size="6" fill="white" text-anchor="middle" font-family="Arial">Mozambique</text>
    <polygon points="640,415 665,408 680,425 685,465 672,500 655,510 638,498 630,462 630,432" fill="#2d6b45" stroke="white" stroke-width="0.8"/>
    <text x="657" y="460" font-size="6.5" fill="white" text-anchor="middle" font-family="Arial">Madagascar</text>
    <!-- SOUTHERN AFRICA -->
    <polygon points="418,365 450,360 480,365 500,388 505,425 495,455 468,465 440,458 418,432 412,400 415,378" fill="#1a5a8a" stroke="white" stroke-width="0.8"/>
    <text x="458" y="415" font-size="7.5" fill="white" text-anchor="middle" font-family="Arial" font-weight="600">Angola</text>
    <polygon points="505,422 535,415 548,428 545,460 530,478 505,485 478,478 468,458 480,435 500,428" fill="#1a5a8a" stroke="white" stroke-width="0.8"/>
    <text x="508" y="452" font-size="6.5" fill="white" text-anchor="middle" font-family="Arial">Zambia</text>
    <polygon points="530,480 555,475 572,488 570,512 552,525 530,522 515,508 515,490" fill="#1a5a8a" stroke="white" stroke-width="0.8"/>
    <text x="543" y="503" font-size="6" fill="white" text-anchor="middle" font-family="Arial">Zimbabwe</text>
    <polygon points="415,458 445,460 470,468 488,490 490,525 478,555 450,570 418,565 398,540 392,508 400,478" fill="#1a5a8a" stroke="white" stroke-width="0.8"/>
    <text x="443" y="515" font-size="6.5" fill="white" text-anchor="middle" font-family="Arial">Namibia</text>
    <polygon points="468,488 495,485 515,495 525,518 518,545 498,558 472,558 452,542 450,515 458,498" fill="#1a5a8a" stroke="white" stroke-width="0.8"/>
    <text x="488" y="525" font-size="6.5" fill="white" text-anchor="middle" font-family="Arial">Botswana</text>
    <polygon points="418,568 452,558 475,560 500,562 525,548 545,558 552,582 540,615 510,640 478,648 450,645 422,625 400,600 395,572" fill="#1a5a8a" stroke="white" stroke-width="0.8"/>
    <text x="476" y="605" font-size="9" fill="white" text-anchor="middle" font-family="Arial" font-weight="700">South Africa</text>
    <polygon points="478,602 495,598 503,610 495,622 478,622 470,610" fill="#2d6b85" stroke="white" stroke-width="0.8"/>
    <text x="487" y="613" font-size="4" fill="white" text-anchor="middle" font-family="Arial">Lesotho</text>
    <!-- Ocean labels -->
    <text x="28" y="480" font-size="8" fill="#7aa8c4" font-family="Arial" font-style="italic" transform="rotate(-80,28,480)">Atlantic Ocean</text>
    <text x="715" y="430" font-size="8" fill="#7aa8c4" font-family="Arial" font-style="italic" transform="rotate(80,715,430)">Indian Ocean</text>
    <text x="390" y="48" font-size="8.5" fill="#7aa8c4" font-family="Arial" font-style="italic" text-anchor="middle">Mediterranean Sea</text>
    <!-- Legend -->
    <rect x="20" y="735" width="740" height="70" rx="10" fill="white" stroke="#ddd" stroke-width="0.8"/>
    <text x="390" y="753" font-size="9" fill="#555" text-anchor="middle" font-family="Arial" font-weight="700" letter-spacing="2">REGIONS</text>
    <rect x="30" y="760" width="12" height="12" rx="2" fill="#7b3fa0"/>
    <text x="46" y="770" font-size="8.5" fill="#444" font-family="Arial">North Africa</text>
    <rect x="145" y="760" width="12" height="12" rx="2" fill="#c9a84c"/>
    <text x="161" y="770" font-size="8.5" fill="#444" font-family="Arial">West Africa</text>
    <rect x="260" y="760" width="12" height="12" rx="2" fill="#c0392b"/>
    <text x="276" y="770" font-size="8.5" fill="#444" font-family="Arial">Central Africa</text>
    <rect x="380" y="760" width="12" height="12" rx="2" fill="#2d6b45"/>
    <text x="396" y="770" font-size="8.5" fill="#444" font-family="Arial">East Africa</text>
    <rect x="490" y="760" width="12" height="12" rx="2" fill="#1a5a8a"/>
    <text x="506" y="770" font-size="8.5" fill="#444" font-family="Arial">Southern Africa</text>
  </svg>
</div>`;

// ─────────────────────────────────────────────
// SECTION RENDERERS
// ─────────────────────────────────────────────
function renderSection(s, chId) {
  const t = s.type || (s.callout ? 'callout' : 'text');
  switch (t) {
    case 'stats':     return renderStats(s);
    case 'steps':     return renderSteps(s);
    case 'table':     return renderTable(s);
    case 'cards':     return renderCards(s);
    case 'callout':   return renderCallout(s);
    case 'tip':       return renderTip(s, 'green');
    case 'warning':   return renderTip(s, 'amber');
    case 'highlight': return renderHighlight(s);
    case 'list':      return renderList(s);
    case 'placeholder': return renderPlaceholder(s);
    default:          return renderText(s);
  }
}

function renderText(s) {
  if (!s.body && !s.heading) return '';
  const body = s.isPlaceholder ? renderPlaceholder(s) : `<p class="sec-body">${s.body.replace(/\n\n/g, '</p><p class="sec-body">')}</p>`;
  return `${s.heading ? `<div class="sec-heading">${s.heading}</div>` : ''}${body}`;
}

function renderStats(s) {
  const cards = (s.stats || []).map(st => `
    <div class="stat-card">
      <div class="stat-icon">${st.icon}</div>
      <div class="stat-val">${st.value}</div>
      <div class="stat-lbl">${st.label}</div>
    </div>`).join('');
  return `${s.heading ? `<div class="sec-heading">${s.heading}</div>` : ''}<div class="stats-grid">${cards}</div>`;
}

function renderSteps(s) {
  const steps = (s.steps || []).map((st, i) => `
    <div class="step-item">
      <div class="step-num">${i + 1}</div>
      <div class="step-body">
        ${st.title ? `<div class="step-title">${st.title}</div>` : ''}
        <div class="step-text">${st.body}</div>
      </div>
      ${st.badge ? `<div class="step-badge">${st.badge}</div>` : ''}
    </div>`).join('');
  return `${s.heading ? `<div class="sec-heading">${s.heading}</div>` : ''}<div class="steps-wrap">${steps}</div>`;
}

function renderTable(s) {
  const headers = (s.headers || []).map(h => `<th>${h}</th>`).join('');
  const rows = (s.rows || []).map(row =>
    `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
  ).join('');
  return `${s.heading ? `<div class="sec-heading">${s.heading}</div>` : ''}
    <div class="tbl-wrap"><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>`;
}

const CARD_GRADIENTS = [
  'linear-gradient(135deg,#1a4a2e,#2d6b45)',
  'linear-gradient(135deg,#92400e,#b45309)',
  'linear-gradient(135deg,#065f46,#047857)',
  'linear-gradient(135deg,#1e3a5f,#2563eb)',
  'linear-gradient(135deg,#4c1d95,#7c3aed)',
  'linear-gradient(135deg,#7f1d1d,#b91c1c)',
];

function renderCards(s) {
  const cards = (s.cards || []).map((c, i) => `
    <div class="card-item" style="background:${CARD_GRADIENTS[i % CARD_GRADIENTS.length]};">
      ${c.icon ? `<div class="card-icon">${c.icon}</div>` : ''}
      <div class="card-title">${c.title}</div>
      <div class="card-body">${c.body}</div>
      ${c.badge ? `<div class="card-badge">${c.badge}</div>` : ''}
    </div>`).join('');
  return `${s.heading ? `<div class="sec-heading">${s.heading}</div>` : ''}<div class="cards-grid">${cards}</div>`;
}

function renderCallout(s) {
  const isGold = s.variant === 'gold';
  const cls = isGold ? 'callout-gold' : 'callout-green';
  const icon = isGold ? '💡' : '📌';
  return `<div class="${cls}">
    <span class="callout-icon" style="font-size:16px;flex-shrink:0;">${s.icon || icon}</span>
    <p class="callout-text">"${s.body || s.callout}"</p>
  </div>`;
}

function renderTip(s, color) {
  const cls = color === 'amber' ? 'tip-amber' : 'tip-green';
  const icon = color === 'amber' ? '⚠️' : '✅';
  return `<div class="tip-box ${cls}">
    <span class="callout-icon" style="font-size:16px;flex-shrink:0;">${s.icon || icon}</span>
    <div>
      ${s.heading ? `<div class="tip-heading">${s.heading}</div>` : ''}
      <div class="tip-body">${s.body}</div>
    </div>
  </div>`;
}

function renderHighlight(s) {
  return `<div class="highlight">
    ${s.heading ? `<div class="highlight-heading">${s.heading}</div>` : ''}
    <div class="highlight-body">${s.body}</div>
  </div>`;
}

function renderList(s) {
  const items = (s.items || []).map(item => {
    const title = item.title || '';
    const body = item.body || (typeof item === 'string' ? item : '');
    return `<div class="list-item">
      <span class="list-icon">${item.icon || '✅'}</span>
      <div>
        ${title ? `<div class="list-title">${title}</div>` : ''}
        <div class="list-text">${body}</div>
      </div>
    </div>`;
  }).join('');
  return `${s.heading ? `<div class="sec-heading">${s.heading}</div>` : ''}<div class="list-grid">${items}</div>`;
}

function renderPlaceholder(s) {
  const body = (s.body || '').replace('[CONTENT: ', '').replace(/\]$/, '');
  return `<div class="placeholder">
    <span class="callout-icon" style="font-size:16px;flex-shrink:0;">&#9998;</span>
    <div>
      <div class="placeholder-lbl">Content Coming Soon</div>
      <div class="placeholder-text">${body}</div>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────
// CHAPTER DATA (mirrors chapters.js)
// ─────────────────────────────────────────────
const CHAPTERS = [
  {
    id: 'intro', number: 1, title: 'Introduction — Why Africa, Why Now',
    intro: 'Africa is not the future. It is the present — and the entrepreneurs who understand this earliest will build the most enduring businesses of the 21st century.',
    sections: [
      { type:'stats', heading:'Africa by the Numbers', stats:[{icon:'🌍',value:'1.4B',label:'Population'},{icon:'📈',value:'$3.4T',label:'Combined GDP'},{icon:'👶',value:'19',label:'Median Age'},{icon:'📱',value:'615M',label:'Mobile Users'}]},
      { type:'text', heading:'The Opportunity of a Generation', body:'Africa is home to 54 countries, 1.4 billion people, and the world\'s fastest-growing middle class. By 2050, one in four people on Earth will be African. Yet for most global entrepreneurs, the continent remains a mystery — or worse, a caricature built from outdated headlines.\n\nOver the past decade, Africa has attracted record levels of foreign direct investment. Venture capital flowing into African startups went from near-zero in 2010 to over $6 billion in 2022. Mobile internet penetration is surging. Africa has the youngest median age of any continent — a demographic dividend that will shape global economics for the next century.'},
      { type:'cards', heading:'Why Entrepreneurs Are Moving Fast', cards:[
        {icon:'🚀',title:'Fastest-Growing Middle Class',body:'Over 350 million Africans have entered the middle class in two decades — creating massive demand for products and services.',badge:'Opportunity'},
        {icon:'📲',title:'Mobile-First Economy',body:'Africa skipped desktop internet and went straight to mobile. Over 615M smartphone users and growing at 10% annually.',badge:'Tech'},
        {icon:'🏗️',title:'Infrastructure Boom',body:'$170B invested annually in roads, ports, energy and fibre. The continent is building at a pace the world hasn\'t seen since post-war Europe.',badge:'Growth'},
        {icon:'🤝',title:'AfCFTA Trade Zone',body:'The African Continental Free Trade Area creates a single market of 1.4B people — the largest free trade zone by participating countries.',badge:'Trade'},
      ]},
      { type:'placeholder', heading:'My Personal Story', body:'Author\'s personal journey to Africa — first visit, moment of realisation, early business mistakes and wins, what made them stay and build.'},
      { type:'callout', variant:'green', body:'Africa is not a country. Treat each of the 54 nations as its own distinct market with unique laws, culture, language, and economic rhythm.'},
    ],
  },
  {
    id: 'regions', number: 2, title: 'Africa by Region — The Business Map',
    intro: 'Africa\'s five regions each have distinct economic personalities, business cultures, and entry points.',
    sections: [
      { type:'cards', heading:'The Five Regions at a Glance', cards:[
        {icon:'🇰🇪',title:'East Africa',body:'Kenya, Ethiopia, Rwanda, Tanzania, Uganda. The "Silicon Savannah." Mobile-first, startup-friendly.',badge:'★ Best for Tech'},
        {icon:'🇳🇬',title:'West Africa',body:'Nigeria, Ghana, Ivory Coast, Senegal. Largest economy. Most dynamic entrepreneurial culture.',badge:'★ Best for Scale'},
        {icon:'🇿🇦',title:'Southern Africa',body:'South Africa, Botswana, Zambia. Most industrialised. World-class infrastructure.',badge:'★ Best for Base'},
        {icon:'🇲🇦',title:'North Africa',body:'Morocco, Egypt, Tunisia. Gateway to Europe and Middle East. Free trade agreements.',badge:'★ Best for Export'},
        {icon:'🇨🇩',title:'Central Africa',body:'DRC, Cameroon, Congo. Vast mineral wealth. Emerging agribusiness and resource sectors.',badge:'Frontier'},
      ]},
      { type:'text', heading:'', body:'The map above shows Africa\'s five business regions, each colour-coded. East Africa (green) leads in tech and fintech. West Africa (gold) dominates commerce and consumer goods. Southern Africa (blue) offers the most sophisticated financial infrastructure. North Africa (purple) is the gateway to European and Middle Eastern markets. Central Africa (red) holds vast untapped resource wealth.'},
      { type:'table', heading:'Quick Regional Comparison', headers:['Region','Ease of Entry','Market Size','Language','Best Sector'],
        rows:[['East Africa','⭐⭐⭐⭐⭐','Medium','English','Tech & Fintech'],['West Africa','⭐⭐⭐','Large','English/French','FMCG & Commerce'],['Southern Africa','⭐⭐⭐⭐','Medium','English','Finance & Tourism'],['North Africa','⭐⭐⭐⭐','Large','Arabic/French','Export & Manufacturing'],['Central Africa','⭐⭐','Small','French','Resources & Agri']]},
      { type:'callout', variant:'gold', body:'For first-time Africa entrepreneurs, East Africa (Kenya) or Ghana offer the lowest barriers, the most English-speaking support networks, and the strongest startup ecosystems to plug into.'},
    ],
  },
  {
    id: 'east-africa', number: 3, title: 'East Africa Deep Dive — Kenya Focus',
    intro: 'Kenya is the continent\'s most accessible market for foreign entrepreneurs.',
    sections: [
      { type:'stats', heading:'Kenya at a Glance', stats:[{icon:'👥',value:'55M',label:'Population'},{icon:'💵',value:'$118B',label:'GDP'},{icon:'📱',value:'97%',label:'Mobile Penetration'},{icon:'🏢',value:'1–3',label:'Days to Register'}]},
      { type:'steps', heading:'How to Register a Company in Kenya',
        steps:[{title:'Create BRS Account',body:'Go to brs.go.ke and create an account using your passport.',badge:'Day 1'},{title:'Reserve Company Name',body:'Search and reserve your preferred name. Cost: KES 150 (~$1).',badge:'Day 1'},{title:'File Incorporation Documents',body:'Submit memorandum and articles of association. Foreign nationals can be sole directors.',badge:'Day 1–2'},{title:'Pay Registration Fee',body:'KES 10,650 (~$80 USD). Pay via M-Pesa or card on the portal.',badge:'$80'},{title:'Receive Certificate',body:'Certificate of Incorporation issued digitally in 1–3 business days.',badge:'Day 2–4'},{title:'Get KRA PIN',body:'Register for your Tax Identification Number at itax.kra.go.ke.',badge:'Day 4–5'}]},
      { type:'table', heading:'Kenya Business Setup Costs', headers:['Item','Cost (USD)','Timeline','Where'],
        rows:[['Company Registration','~$80','1–3 days','brs.go.ke'],['KRA PIN (Tax Number)','Free','1 day','itax.kra.go.ke'],['Business Bank Account','Free–$50','3–7 days','Equity / KCB / NCBA'],['Work Permit (Class G)','$2,000+','4–12 weeks','immigration.go.ke'],['Registered Office Address','$50–200/mo','Immediate','Virtual office providers']]},
      { type:'warning', icon:'⚠️', heading:'KRA PIN is Non-Negotiable', body:'Kenya\'s KRA PIN is required for almost every formal business transaction — bank account, lease, hiring staff. Get it on day one at itax.kra.go.ke.'},
      { type:'tip', icon:'🏦', heading:'Open Equity Bank First', body:'Equity Bank is the most foreigner-friendly bank in Kenya for new businesses. They have dedicated SME relationship managers.'},
      { type:'placeholder', heading:'Visa & Work Permits', body:'Kenya visa types, work permit categories (Class G), Special Pass for interim work, costs, timelines, common pitfalls.'},
    ],
  },
  {
    id: 'west-africa', number: 4, title: 'West Africa — Nigeria & Ghana Focus',
    intro: 'West Africa is where the deals are biggest, the energy is highest, and the learning curve is steepest.',
    sections: [
      { type:'stats', heading:'West Africa by the Numbers', stats:[{icon:'🇳🇬',value:'$440B',label:'Nigeria GDP'},{icon:'👥',value:'220M',label:'Nigeria Population'},{icon:'🇬🇭',value:'$77B',label:'Ghana GDP'},{icon:'🏙️',value:'15M+',label:'Lagos Metro'}]},
      { type:'text', heading:'Nigeria: Scale & Complexity', body:'Nigeria demands respect. It is the most populous Black nation on Earth, the largest economy in Africa, and home to an entrepreneurial culture that is arguably the continent\'s most dynamic. Lagos moves fast — deals are done on WhatsApp, relationships matter more than contracts, and execution speed separates winners.\n\nThe regulatory environment is more complex than Kenya or Ghana, and forex controls have historically been a challenge. But the market size — 220 million people, a vast diaspora, an entertainment industry with global reach — makes navigating that complexity worthwhile.'},
      { type:'text', heading:'Ghana: The Gateway Strategy', body:'Many multinationals choose Ghana as their West African base because it is not as complex as Nigeria, has fewer currency controls, and scores higher on ease of doing business. Accra is clean, relatively safe, and has a growing class of educated English-speaking professionals.'},
      { type:'table', heading:'Nigeria vs Ghana — Side by Side', headers:['Factor','Nigeria 🇳🇬','Ghana 🇬🇭'],
        rows:[['Market Size','220M people','33M people'],['GDP','$440B','$77B'],['Company Registration','CAC — 1–2 weeks','GIPC — 3–5 days'],['Forex Controls','Complex (CBN)','More flexible'],['Best For','Scale & consumer','Regional HQ']]},
      { type:'callout', variant:'green', body:'In Nigeria and Ghana, business is deeply relational. Never skip the relationship phase. Show up, be consistent, and the doors will open.'},
      { type:'list', heading:'Surviving & Thriving in Lagos', items:[
        {icon:'📱',title:'WhatsApp is your CRM',body:'Every deal and follow-up happens on WhatsApp. Set up WhatsApp Business immediately.'},
        {icon:'🚗',title:'Budget for Traffic',body:'Lagos traffic is legendary. Budget 2–3x more time than maps suggest for every meeting.'},
        {icon:'⚡',title:'Backup Power Essential',body:'Generator or UPS from day one. National grid supply is unreliable in most of Lagos.'},
        {icon:'🏢',title:'Get a Lagos Address',body:'Victoria Island or Lekki Phase 1 are the business districts. A VI address signals you\'re serious.'},
      ]},
    ],
  },
  {
    id: 'south-africa', number: 5, title: 'Southern Africa — South Africa Focus',
    intro: 'South Africa offers Africa\'s most sophisticated business infrastructure.',
    sections: [
      { type:'stats', heading:'South Africa at a Glance', stats:[{icon:'💰',value:'$405B',label:'GDP'},{icon:'👥',value:'62M',label:'Population'},{icon:'🏦',value:'#1',label:'Largest Stock Exchange'},{icon:'⚡',value:'Stage 1–8',label:'Load-Shedding Stages'}]},
      { type:'steps', heading:'Register a Company (CIPC) — 5 Steps',
        steps:[{title:'Create CIPC Account',body:'Go to cipc.co.za and register. Takes 10 minutes.',badge:'Free'},{title:'Name Reservation',body:'Reserve your company name. Cost: ZAR 50 (~$2.80).',badge:'$2.80'},{title:'Submit MOI',body:'File your Memorandum of Incorporation using the standard CoR15.1A template.',badge:'Day 2–3'},{title:'Pay Registration Fee',body:'ZAR 125 (~$7) for a private company (Pty Ltd). Paid online.',badge:'$7'},{title:'Receive CoR',body:'Certificate of Incorporation issued in 1–5 business days.',badge:'1–5 days'}]},
      { type:'table', heading:'Load-Shedding Stages Explained', headers:['Stage','Hours Off/Day','Solution'],
        rows:[['Stage 1–2','2–4 hours','UPS for computers'],['Stage 3–4','4–8 hours','Inverter system'],['Stage 5–6','8–12 hours','Generator essential'],['Stage 7–8','12–14 hours','Full off-grid setup']]},
      { type:'highlight', heading:'💡 South Africa\'s Biggest Hidden Cost', body:'Load-shedding (scheduled power cuts) can run 4–12 hours per day. Budget ZAR 5,000–30,000 upfront for a UPS or inverter. This is not optional — it\'s the cost of doing business.'},
    ],
  },
  {
    id: 'exporting', number: 6, title: 'Exporting TO Africa',
    intro: 'Africa imports over $600B in goods annually. Here\'s how to find your slice.',
    sections: [
      { type:'stats', heading:'The Export Opportunity', stats:[{icon:'📦',value:'$600B',label:'Annual Imports'},{icon:'📱',value:'#1',label:'Tech Hardware Demand'},{icon:'🌱',value:'65%',label:'Arable Land Unused'},{icon:'🏥',value:'$259B',label:'Healthcare by 2030'}]},
      { type:'cards', heading:'What Sells Best in Africa', cards:[
        {icon:'📱',title:'Technology & Electronics',body:'Smartphones, laptops, solar equipment, CCTV. Demand is insatiable and supply chains are weak.',badge:'🔥 High Demand'},
        {icon:'🌾',title:'Agricultural Inputs',body:'Seeds, fertiliser, irrigation, agri-tech. Africa has 65% of the world\'s uncultivated arable land.',badge:'🔥 High Demand'},
        {icon:'💊',title:'Healthcare Products',body:'Pharmaceuticals, medical devices, diagnostics. $259B market projected by 2030.',badge:'📈 Growing'},
        {icon:'🧴',title:'FMCG & Consumer Goods',body:'Branded food, personal care, household goods. Growing middle class is brand-conscious.',badge:'📈 Growing'},
      ]},
      { type:'table', heading:'Key African Ports & Clearance Reality', headers:['Port','Country','Official','Real-World','Tips'],
        rows:[['Mombasa','Kenya','3–5 days','5–14 days','Use KRA-licensed agent'],['Apapa/Lagos','Nigeria','5–7 days','2–6 weeks','Budget for demurrage'],['Durban','South Africa','2–3 days','3–7 days','Most efficient port'],['Tema','Ghana','3–5 days','5–10 days','Improving via GCNET']]},
      { type:'warning', icon:'⚠️', heading:'Budget for Customs Delays', body:'A container cleared in 3 days in theory can sit for 3 weeks in practice — especially at Apapa (Lagos). Always build buffer into shipment timelines.'},
    ],
  },
  {
    id: 'importing', number: 7, title: 'Importing FROM Africa',
    intro: 'Africa produces some of the world\'s finest raw materials and agricultural products.',
    sections: [
      { type:'stats', heading:'Africa\'s Export Strengths', stats:[{icon:'☕',value:'#1',label:'Coffee (Eth/Kenya)'},{icon:'🍫',value:'70%',label:'World Cocoa'},{icon:'🫖',value:'30%',label:'Global Black Tea'},{icon:'💎',value:'$40B+',label:'Mineral Exports'}]},
      { type:'cards', heading:'Top Import Opportunities', cards:[
        {icon:'☕',title:'Specialty Coffee',body:'Ethiopian Yirgacheffe, Kenyan AA. World\'s most prized single-origin coffees. Direct trade margins are exceptional.',badge:'High Margin'},
        {icon:'🍫',title:'Cocoa & Chocolate',body:'Ivory Coast and Ghana produce 70% of world cocoa. Direct sourcing beats commodity exchange pricing.',badge:'Scale'},
        {icon:'🫖',title:'Premium Tea',body:'Kenya produces 30% of global black tea. Strong demand in UK, Middle East and Asia.',badge:'Volume'},
        {icon:'🌿',title:'Botanical Extracts',body:'Shea butter, rooibos, baobab oil. High demand in cosmetics and health food.',badge:'Niche'},
      ]},
      { type:'table', heading:'Certifications That Drive Premium Pricing', headers:['Certification','Premium Added','Best For'],
        rows:[['Fair Trade (FLO)','+15–25%','Coffee, cocoa, tea'],['Organic (USDA/EU)','+20–40%','All food products'],['Rainforest Alliance','+10–20%','Coffee, cocoa'],['SCA Specialty (80+)','+30–100%','Specialty coffee']]},
      { type:'callout', variant:'gold', body:'The biggest margin improvement in African commodity importing is eliminating one supply chain layer. Buying directly from a cooperative adds 15–30% to your gross margin.'},
    ],
  },
  {
    id: 'remote-vs-relocate', number: 8, title: 'Starting a Business Remotely vs. Relocating',
    intro: 'You don\'t have to move to Africa to build there. But you should understand the trade-offs.',
    sections: [
      { type:'table', heading:'Remote vs. Relocated — The Full Comparison', headers:['Factor','Running Remotely','Being On The Ground'],
        rows:[['Deal Speed','Slow — email/Zoom lag','Fast — in the room'],['Relationship Building','Possible but limited','Far superior'],['Market Intelligence','Second-hand','Real-time'],['Operational Cost','Lower','Higher'],['Best For','Services, digital, import/export','Retail, hospitality, manufacturing']]},
      { type:'text', heading:'The Remote-First Model', body:'It is entirely possible to register and operate an African business without relocating. Many entrepreneurs run Kenyan or South African entities from London, Dubai, or Singapore, visiting quarterly. This works best for service businesses, import/export, and digital products.\n\nThe keys: a trusted local partner on the ground, reliable bank account with online access, clear digital workflows, and a local accountant.'},
      { type:'list', heading:'Making Remote Work — The Non-Negotiables', items:[
        {icon:'👤',title:'One Trusted Person On The Ground',body:'An operations manager or EA who can be your eyes and ears. Your most important hire.'},
        {icon:'🏦',title:'Reliable Bank Account',body:'Equity Bank Kenya and FNB South Africa both offer strong online digital banking.'},
        {icon:'📱',title:'WhatsApp Business',body:'Set up a business profile with your local number before you leave.'},
        {icon:'🗓️',title:'Quarterly Visits Minimum',body:'Relationships decay fast when you disappear. Presence = trust.'},
      ]},
      { type:'callout', variant:'green', body:'"The deals that don\'t happen are the ones where the founder was never in the room." — A common refrain among Africa-focused investors.'},
    ],
  },
  {
    id: 'banking', number: 9, title: 'Banking, Forex & Payments',
    intro: 'Moving money in Africa used to be the #1 barrier. In 2024, the options are better than ever.',
    sections: [
      { type:'stats', heading:'Africa\'s Payment Revolution', stats:[{icon:'📱',value:'$300B',label:'M-Pesa Transactions'},{icon:'🌍',value:'30+',label:'Countries on Flutterwave'},{icon:'💸',value:'$100B+',label:'Diaspora Remittances'},{icon:'🚀',value:'$6B',label:'Fintech VC (2022)'}]},
      { type:'text', heading:'M-Pesa & Mobile Money', body:'M-Pesa, launched in Kenya in 2007, processes more than $300 billion in transactions annually across East Africa. For any business operating in Kenya, Tanzania, or Uganda, integrating M-Pesa is not optional — it is expected.\n\nThe Daraja API allows developers to build M-Pesa payments into any web or mobile platform.'},
      { type:'cards', heading:'Payment Platforms by Use Case', cards:[
        {icon:'🦋',title:'Flutterwave',body:'Accept payments in 30+ African currencies. Settle in USD/EUR.',badge:'Pan-African'},
        {icon:'💳',title:'Paystack',body:'Acquired by Stripe. Best-in-class checkout for Nigeria and Ghana.',badge:'Nigeria/Ghana'},
        {icon:'📲',title:'M-Pesa (Daraja)',body:'Dominant in East Africa. Essential for any Kenya-based business.',badge:'East Africa'},
        {icon:'🐦',title:'Chipper Cash',body:'Cross-border transfers between 6 African countries. Low fees.',badge:'Cross-Border'},
      ]},
      { type:'table', heading:'Cross-Border Payment Options', headers:['Platform','Fee','Settlement Time','Best For'],
        rows:[['SWIFT','$25–50 flat','3–7 days','Large transfers $10K+'],['Wise Business','0.5–2%','1–3 days','EU/US to Africa'],['Flutterwave','1.4%','Same day','Africa to Africa'],['USDT/USDC','Gas fees','Minutes','Crypto settlement']]},
      { type:'tip', icon:'💡', heading:'The Stablecoin Strategy', body:'Many Africa-based entrepreneurs use USDT or USDC as a settlement layer for cross-border trade — especially between countries with forex controls like Nigeria or Ethiopia.'},
    ],
  },
  {
    id: '90-days', number: 10, title: 'Your First 90 Days — Practical Relocation Guide',
    intro: 'The first 90 days in Africa will teach you more than three years of research.',
    sections: [
      { type:'stats', heading:'Your 90-Day Targets', stats:[{icon:'🤝',value:'50+',label:'New Connections'},{icon:'🏢',value:'1',label:'Company Registered'},{icon:'🏦',value:'1',label:'Bank Account Open'},{icon:'💰',value:'1',label:'Revenue or Partnership'}]},
      { type:'steps', heading:'Days 1–30: Land, Observe, Connect',
        steps:[{title:'Arrive with an Open Mind',body:'Spend week 1 observing, eating local, understanding the daily rhythm. Don\'t try to execute immediately.',badge:'Week 1'},{title:'Find a Co-Working Space',body:'Join a co-working space in the first week. Fastest path to meeting entrepreneurs and getting local intel.',badge:'Week 1'},{title:'Download the Essentials',body:'Bolt (rides), local banking app, WhatsApp Business, local news app. Get a local SIM with data.',badge:'Day 1'},{title:'Attend 2+ Events',body:'Find startup meetups, chamber of commerce events. Internations.org is good for expat networks.',badge:'Week 2–3'}]},
      { type:'steps', heading:'Days 31–60: Build the Foundation',
        steps:[{title:'Register Your Company',body:'File online. Budget 1–5 business days depending on the country.',badge:'Week 5'},{title:'Open Your Bank Account',body:'Bring all documents: incorporation cert, tax number, passport, board resolution.',badge:'Week 5–6'},{title:'Hire Your First Local Person',body:'An operations assistant or BD person. This single hire multiplies your effectiveness 5x.',badge:'Week 6–7'},{title:'Find a Local Accountant',body:'Ask for referrals from your co-working network. Interview 2–3 before choosing.',badge:'Week 6'}]},
      { type:'list', heading:'Pre-Departure Checklist', items:[
        {icon:'🛂',title:'Valid Visa or eVisa',body:'Apply minimum 2 weeks before travel. Many African countries offer eVisas online.'},
        {icon:'🏥',title:'Travel Insurance',body:'Get coverage with medical evacuation included. AXA, Allianz, or SafetyWing.'},
        {icon:'💉',title:'Vaccinations',body:'Yellow fever (required), typhoid, hepatitis A/B, malaria prophylaxis where relevant.'},
        {icon:'💵',title:'USD Cash ($500+)',body:'Always carry USD as backup. Accepted informally in most African countries.'},
        {icon:'📋',title:'Document Copies',body:'Scan everything to Google Drive. Bring originals and 5 colour copies of each document.'},
        {icon:'📱',title:'Unlocked Phone',body:'Ensure your phone is unlocked for local SIMs. Buy at the airport on arrival.'},
      ]},
      { type:'callout', variant:'gold', body:'Africa rewards patience and presence. Show up, stay consistent, and the continent will open up to you in ways that no amount of remote research can replicate.'},
      { type:'highlight', heading:'🚀 Your Africa Journey Starts Now', body:'You\'ve read the guide. You know the regions, the registration processes, the payment tools, the cultural nuances. The only thing left is to book the flight.'},
    ],
  },
];

// ─────────────────────────────────────────────
// BUILD PDF HTML
// ─────────────────────────────────────────────
function buildPdfHtml() {
  const chaptersHtml = CHAPTERS.map(ch => {
    const sections = ch.sections.map(s => renderSection(s, ch.id)).join('');
    const mapHtml = ch.id === 'regions' ? AFRICA_MAP_SVG : '';
    return `
<div class="ch-wrap">
  <div class="ch-label">Chapter ${ch.number}</div>
  <div class="ch-title">${ch.title}</div>
  <div class="ch-rule"></div>
  ${ch.intro ? `<div class="ch-intro">${ch.intro}</div>` : ''}
  ${mapHtml}
  ${sections}
</div>`;
  }).join('');

  const tocRows = CHAPTERS.map(ch =>
    `<div class="toc-item">
      <span class="toc-num">Chapter ${ch.number}</span>
      <span class="toc-name">${ch.title}</span>
    </div>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>${STYLES}</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <img src="https://guide.prateek.africa/assets/cover_hires.jpg" alt="Breaking Into Africa by Prateek Jain"/>
</div>

<!-- TABLE OF CONTENTS -->
<div class="toc">
  <div class="toc-title">Table of Contents</div>
  ${tocRows}
</div>

<!-- CHAPTERS -->
${chaptersHtml}

<!-- ABOUT THE AUTHOR -->
<div class="about">
  <div class="about-label">About the Author</div>
  <div class="about-flex">
    <img class="about-photo" src="https://guide.prateek.africa/assets/author_portrait_square.jpg" alt="Prateek Jain"/>
    <div>
      <h2>Prateek Jain</h2>
      <div class="about-role">Co-Founder at Trackalways · Nairobi, Kenya</div>
      <p>Prateek Jain is an entrepreneur, builder, and cross-border operator based in Nairobi, Kenya. Originally from Bhopal, India, he moved to East Africa to build businesses at the intersection of technology, logistics, and services.</p>
      <p>He is the Director and co-owner of <strong>Trackalways Ltd.</strong>, a GPS tracking and telematics company operating across Kenya and Uganda, and also runs <strong>Anasa Living</strong> (serviced apartments in Nairobi).</p>
      <p>With experience spanning cloud kitchens, printing, fresh produce trade, IoT hardware, and SaaS platforms — across India, Africa, the UAE, and beyond — Prateek has navigated the real challenges of building in emerging markets.</p>
      <p><em>"Breaking Into Africa" distils these hard-won lessons into a practical, no-fluff guide for entrepreneurs looking to enter or expand across the African continent.</em></p>
      <div class="about-links">
        <div>🌍 prateek.africa</div>
        <div>📡 trackalwaysafrica.com</div>
      </div>
    </div>
  </div>
</div>

</body>
</html>`;
}

module.exports = { generateEbookPdf };
