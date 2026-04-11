import React from 'react';

export default function Chapter({ chapter, isCompleted }) {
  return (
    <section id={chapter.id} className="py-12 border-b border-gray-200 last:border-0">
      {/* Chapter header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold tracking-widest uppercase text-gold">
            Chapter {chapter.number}
          </span>
          {isCompleted && (
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
              </svg>
              Read
            </span>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-forest leading-tight">{chapter.title}</h2>
        <div className="mt-3 w-12 h-1 bg-gold rounded" />
        {chapter.intro && (
          <p className="mt-5 text-lg text-gray-600 leading-relaxed border-l-4 border-gold/40 pl-4 italic">
            {chapter.intro}
          </p>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {chapter.sections.map((section, i) => (
          <SectionBlock key={i} section={section} />
        ))}
      </div>
    </section>
  );
}

function SectionBlock({ section }) {
  switch (section.type) {
    case 'callout':      return <Callout section={section} />;
    case 'stats':        return <StatsGrid section={section} />;
    case 'steps':        return <Steps section={section} />;
    case 'list':         return <IconList section={section} />;
    case 'table':        return <CompareTable section={section} />;
    case 'cards':        return <Cards section={section} />;
    case 'tip':          return <TipBox section={section} color="green" />;
    case 'warning':      return <TipBox section={section} color="amber" />;
    case 'highlight':    return <Highlight section={section} />;
    case 'placeholder':  return <Placeholder section={section} />;
    case 'map':          return <AfricaMap />;
    default:             return <TextSection section={section} />;
  }
}

/* ── Plain text section ── */
function TextSection({ section }) {
  return (
    <div>
      {section.heading && (
        <h3 className="text-xl font-bold text-forest mb-4 flex items-center gap-2">
          {section.icon && <span className="text-gold">{section.icon}</span>}
          {section.heading}
        </h3>
      )}
      {section.isPlaceholder ? (
        <Placeholder section={section} />
      ) : (
        <div className="space-y-4">
          {String(section.body).split('\n\n').map((para, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Callout quote ── */
function Callout({ section }) {
  const isGold = section.variant === 'gold';
  return (
    <div className={`rounded-xl p-6 my-2 ${isGold ? 'bg-amber-50 border-l-4 border-gold' : 'bg-green-50 border-l-4 border-forest'}`}>
      <div className="flex gap-3">
        <span className="text-2xl flex-shrink-0">{isGold ? '💡' : '📌'}</span>
        <p className={`text-base italic leading-relaxed font-medium ${isGold ? 'text-amber-900' : 'text-forest'}`}>
          "{section.body}"
        </p>
      </div>
    </div>
  );
}

/* ── Stat cards ── */
function StatsGrid({ section }) {
  return (
    <div>
      {section.heading && <h3 className="text-xl font-bold text-forest mb-5">{section.heading}</h3>}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {section.stats.map((s, i) => (
          <div key={i} className="bg-gradient-to-br from-forest to-forest-light rounded-xl p-4 text-white text-center shadow-md">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-extrabold text-gold">{s.value}</div>
            <div className="text-xs text-green-200 mt-1 leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Numbered steps ── */
function Steps({ section }) {
  return (
    <div>
      {section.heading && <h3 className="text-xl font-bold text-forest mb-5">{section.heading}</h3>}
      <div className="space-y-3">
        {section.steps.map((step, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-forest text-white font-bold text-sm flex items-center justify-center">
              {i + 1}
            </div>
            <div className="flex-1">
              {step.title && <div className="font-semibold text-forest mb-0.5">{step.title}</div>}
              <div className="text-sm text-gray-600 leading-relaxed">{step.body}</div>
            </div>
            {step.badge && (
              <div className="flex-shrink-0 text-xs bg-gold/15 text-gold-dark font-bold px-2 py-1 rounded-full self-start">
                {step.badge}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Icon bullet list ── */
function IconList({ section }) {
  return (
    <div>
      {section.heading && <h3 className="text-xl font-bold text-forest mb-4">{section.heading}</h3>}
      <div className="grid sm:grid-cols-2 gap-3">
        {section.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
            <span className="text-xl flex-shrink-0">{item.icon || '✅'}</span>
            <div>
              {item.title && <div className="font-semibold text-gray-800 text-sm">{item.title}</div>}
              <div className="text-sm text-gray-600 leading-relaxed">{item.body || item}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Comparison table ── */
function CompareTable({ section }) {
  return (
    <div>
      {section.heading && <h3 className="text-xl font-bold text-forest mb-4">{section.heading}</h3>}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-forest text-white">
              {section.headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-semibold text-forest' : 'text-gray-600'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Info cards grid ── */
function Cards({ section }) {
  const colors = [
    'from-green-600 to-green-800',
    'from-amber-600 to-amber-800',
    'from-emerald-600 to-emerald-800',
    'from-teal-600 to-teal-800',
    'from-lime-600 to-lime-800',
    'from-cyan-600 to-cyan-800',
  ];
  return (
    <div>
      {section.heading && <h3 className="text-xl font-bold text-forest mb-5">{section.heading}</h3>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.cards.map((card, i) => (
          <div key={i} className={`bg-gradient-to-br ${colors[i % colors.length]} rounded-xl p-5 text-white shadow-md`}>
            {card.icon && <div className="text-3xl mb-3">{card.icon}</div>}
            <div className="font-bold text-base mb-1">{card.title}</div>
            <div className="text-sm text-white/80 leading-relaxed">{card.body}</div>
            {card.badge && (
              <div className="mt-3 inline-block bg-white/20 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {card.badge}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Tip / Warning box ── */
function TipBox({ section, color }) {
  const styles = {
    green: { bg: 'bg-green-50', border: 'border-green-300', title: 'text-green-800', body: 'text-green-700', icon: '✅' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-300', title: 'text-amber-800', body: 'text-amber-700', icon: '⚠️' },
  };
  const s = styles[color] || styles.green;
  return (
    <div className={`${s.bg} border ${s.border} rounded-xl p-5`}>
      <div className="flex gap-3">
        <span className="text-xl flex-shrink-0">{section.icon || s.icon}</span>
        <div>
          {section.heading && <div className={`font-bold mb-1 ${s.title}`}>{section.heading}</div>}
          <p className={`text-sm leading-relaxed ${s.body}`}>{section.body}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Highlight banner ── */
function Highlight({ section }) {
  return (
    <div className="bg-gradient-to-r from-forest to-forest-light rounded-xl p-6 text-white">
      {section.heading && <div className="font-bold text-gold text-lg mb-2">{section.heading}</div>}
      <p className="text-green-100 leading-relaxed">{section.body}</p>
    </div>
  );
}

/* ── Placeholder ── */
function Placeholder({ section }) {
  return (
    <div className="bg-amber-50 border border-dashed border-gold rounded-xl p-5 text-amber-800">
      <div className="flex gap-3">
        <span className="text-xl flex-shrink-0">✏️</span>
        <div>
          <div className="font-semibold text-xs uppercase tracking-wide text-amber-600 mb-1">Content Coming Soon</div>
          <p className="text-sm leading-relaxed italic">{section.body}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Africa Regions Map ── */
function AfricaMap() {
  const regions = [
    { color: '#7b3fa0', label: 'North Africa',    countries: 'Egypt · Libya · Algeria · Morocco · Tunisia · Sudan' },
    { color: '#c9a84c', label: 'West Africa',     countries: 'Nigeria · Ghana · Ivory Coast · Senegal · Mali · Niger +' },
    { color: '#c0392b', label: 'Central Africa',  countries: 'DRC · Cameroon · Chad · C.A.R. · Gabon · Congo' },
    { color: '#2d6b45', label: 'East Africa',     countries: 'Kenya · Ethiopia · Tanzania · Uganda · Rwanda · Somalia +' },
    { color: '#1a5a8a', label: 'Southern Africa', countries: 'South Africa · Angola · Zambia · Zimbabwe · Namibia · Botswana' },
  ];
  return (
    <div>
      <h3 className="text-xl font-bold text-forest mb-5">Africa — Regional Business Map</h3>
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-[#eef2f7] shadow-sm">
        <svg viewBox="0 0 780 820" style={{ width: '100%', display: 'block', padding: 12 }}>
          <rect width="780" height="820" fill="transparent"/>
          {/* NORTH AFRICA – purple */}
          <polygon points="90,85 135,75 155,85 160,115 145,130 110,135 85,120 80,100" fill="#7b3fa0" stroke="white" strokeWidth="0.8"/>
          <text x="120" y="108" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Morocco</text>
          <polygon points="155,85 240,75 270,90 275,130 265,155 200,160 160,150 145,130 160,115" fill="#7b3fa0" stroke="white" strokeWidth="0.8"/>
          <text x="213" y="120" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Algeria</text>
          <polygon points="240,75 265,72 275,85 275,100 260,110 245,100 240,88" fill="#7b3fa0" stroke="white" strokeWidth="0.8"/>
          <text x="257" y="93" fontSize="5.5" fill="white" textAnchor="middle" fontFamily="Arial">Tunisia</text>
          <polygon points="265,72 340,68 365,80 370,120 355,155 300,160 275,130 275,100 275,85" fill="#7b3fa0" stroke="white" strokeWidth="0.8"/>
          <text x="318" y="112" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Libya</text>
          <polygon points="365,80 430,75 450,90 455,130 440,155 385,160 355,155 370,120" fill="#7b3fa0" stroke="white" strokeWidth="0.8"/>
          <text x="408" y="115" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Egypt</text>
          <polygon points="80,120 110,135 120,155 110,175 80,180 62,160 60,135" fill="#9b5abf" stroke="white" strokeWidth="0.8"/>
          <text x="90" y="153" fontSize="5" fill="white" textAnchor="middle" fontFamily="Arial">W.Sahara</text>
          <polygon points="440,155 480,145 510,155 515,195 505,230 470,245 440,240 420,215 415,185 430,160" fill="#7b3fa0" stroke="white" strokeWidth="0.8"/>
          <text x="465" y="195" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Sudan</text>
          {/* WEST AFRICA – gold */}
          <polygon points="62,160 110,175 120,155 130,175 125,210 90,225 60,220 50,190" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="88" y="193" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Mauritania</text>
          <polygon points="130,175 200,160 265,155 270,185 260,225 230,250 195,265 165,265 140,240 125,210" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="198" y="215" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Mali</text>
          <polygon points="265,155 355,155 370,175 365,215 345,235 310,245 270,240 260,225 270,185" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="315" y="200" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Niger</text>
          <polygon points="60,220 90,225 105,240 100,258 80,265 55,255 48,238" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="78" y="245" fontSize="5.5" fill="white" textAnchor="middle" fontFamily="Arial">Senegal</text>
          <polygon points="65,268 100,260 120,270 115,292 95,298 68,290" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="92" y="281" fontSize="5.5" fill="white" textAnchor="middle" fontFamily="Arial">Guinea</text>
          <polygon points="68,292 100,300 115,310 108,330 85,335 62,320 58,305" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="85" y="315" fontSize="5" fill="white" textAnchor="middle" fontFamily="Arial">S.Leone</text>
          <polygon points="115,270 165,265 185,275 188,300 175,320 148,328 118,315 115,295" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="150" y="298" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Ivory Coast</text>
          <polygon points="188,275 220,270 235,280 238,308 225,328 200,332 178,322 175,300" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="207" y="303" fontSize="6.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Ghana</text>
          <polygon points="238,278 260,275 268,285 265,310 255,325 240,328 235,310" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="252" y="303" fontSize="4.5" fill="white" textAnchor="middle" fontFamily="Arial">Togo/Benin</text>
          <polygon points="165,265 230,250 265,255 268,278 240,280 188,275 170,268" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="216" y="265" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Burkina Faso</text>
          <polygon points="268,255 345,248 370,258 375,290 365,325 335,345 300,348 270,335 258,308 262,278 268,265" fill="#c9a84c" stroke="white" strokeWidth="0.8"/>
          <text x="315" y="302" fontSize="9" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="700">Nigeria</text>
          {/* CENTRAL AFRICA – red */}
          <polygon points="345,248 385,240 400,255 405,285 390,310 365,325 345,310 338,285 342,262" fill="#c0392b" stroke="white" strokeWidth="0.8"/>
          <text x="372" y="284" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Cameroon</text>
          <polygon points="355,155 415,150 440,160 445,195 430,225 415,240 385,240 370,220 365,185 360,165" fill="#c0392b" stroke="white" strokeWidth="0.8"/>
          <text x="400" y="195" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Chad</text>
          <polygon points="405,255 440,248 480,252 490,275 480,298 450,308 415,305 400,285" fill="#c0392b" stroke="white" strokeWidth="0.8"/>
          <text x="445" y="278" fontSize="5.5" fill="white" textAnchor="middle" fontFamily="Arial">C.A.R.</text>
          <polygon points="390,312 425,308 445,318 448,345 432,360 405,362 385,345 382,325" fill="#c0392b" stroke="white" strokeWidth="0.8"/>
          <text x="415" y="338" fontSize="5" fill="white" textAnchor="middle" fontFamily="Arial">Gabon/Congo</text>
          <polygon points="450,308 495,300 530,310 545,335 548,375 535,405 510,420 475,425 448,415 430,390 425,360 448,345 448,320" fill="#c0392b" stroke="white" strokeWidth="0.8"/>
          <text x="490" y="365" fontSize="9" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="700">DR Congo</text>
          <polygon points="440,240 480,248 510,255 520,280 505,300 480,305 452,298 438,275 430,255" fill="#c0392b" stroke="white" strokeWidth="0.8"/>
          <text x="477" y="275" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">S. Sudan</text>
          {/* EAST AFRICA – green */}
          <polygon points="510,155 555,148 590,162 600,192 590,220 562,235 530,238 510,228 505,200 505,175" fill="#2d6b45" stroke="white" strokeWidth="0.8"/>
          <text x="550" y="193" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Ethiopia</text>
          <polygon points="510,148 555,140 565,152 555,162 510,162" fill="#2d6b45" stroke="white" strokeWidth="0.8"/>
          <text x="535" y="153" fontSize="5" fill="white" textAnchor="middle" fontFamily="Arial">Eritrea</text>
          <polygon points="562,235 595,220 625,205 645,228 640,265 618,300 595,310 570,298 555,270 555,248" fill="#2d6b45" stroke="white" strokeWidth="0.8"/>
          <text x="605" y="263" fontSize="7" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Somalia</text>
          <polygon points="520,285 548,278 560,290 558,315 540,328 518,325 510,308 512,292" fill="#2d6b45" stroke="white" strokeWidth="0.8"/>
          <text x="535" y="307" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Uganda</text>
          <polygon points="560,245 598,238 620,252 625,280 615,308 590,320 565,315 555,298 555,270" fill="#2d6b45" stroke="white" strokeWidth="0.8"/>
          <text x="590" y="282" fontSize="9" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="700">Kenya</text>
          <polygon points="548,318 565,314 570,328 560,340 545,338 542,325" fill="#2d6b45" stroke="white" strokeWidth="0.8"/>
          <text x="556" y="330" fontSize="4.5" fill="white" textAnchor="middle" fontFamily="Arial">Rwa/Bur</text>
          <polygon points="558,340 590,325 625,332 638,360 632,395 610,415 580,420 553,408 542,380 545,355" fill="#2d6b45" stroke="white" strokeWidth="0.8"/>
          <text x="590" y="378" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Tanzania</text>
          <polygon points="548,430 580,425 605,440 610,470 598,510 575,530 548,525 530,505 530,468 540,445" fill="#2d6b45" stroke="white" strokeWidth="0.8"/>
          <text x="572" y="480" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Mozambique</text>
          <polygon points="640,415 665,408 680,425 685,465 672,500 655,510 638,498 630,462 630,432" fill="#2d6b45" stroke="white" strokeWidth="0.8"/>
          <text x="657" y="460" fontSize="6.5" fill="white" textAnchor="middle" fontFamily="Arial">Madagascar</text>
          {/* SOUTHERN AFRICA – blue */}
          <polygon points="418,365 450,360 480,365 500,388 505,425 495,455 468,465 440,458 418,432 412,400 415,378" fill="#1a5a8a" stroke="white" strokeWidth="0.8"/>
          <text x="458" y="415" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Angola</text>
          <polygon points="505,422 535,415 548,428 545,460 530,478 505,485 478,478 468,458 480,435 500,428" fill="#1a5a8a" stroke="white" strokeWidth="0.8"/>
          <text x="508" y="452" fontSize="6.5" fill="white" textAnchor="middle" fontFamily="Arial">Zambia</text>
          <polygon points="530,480 555,475 572,488 570,512 552,525 530,522 515,508 515,490" fill="#1a5a8a" stroke="white" strokeWidth="0.8"/>
          <text x="543" y="503" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Zimbabwe</text>
          <polygon points="415,458 445,460 470,468 488,490 490,525 478,555 450,570 418,565 398,540 392,508 400,478" fill="#1a5a8a" stroke="white" strokeWidth="0.8"/>
          <text x="443" y="515" fontSize="6.5" fill="white" textAnchor="middle" fontFamily="Arial">Namibia</text>
          <polygon points="468,488 495,485 515,495 525,518 518,545 498,558 472,558 452,542 450,515 458,498" fill="#1a5a8a" stroke="white" strokeWidth="0.8"/>
          <text x="488" y="525" fontSize="6.5" fill="white" textAnchor="middle" fontFamily="Arial">Botswana</text>
          <polygon points="418,568 452,558 475,560 500,562 525,548 545,558 552,582 540,615 510,640 478,648 450,645 422,625 400,600 395,572" fill="#1a5a8a" stroke="white" strokeWidth="0.8"/>
          <text x="476" y="605" fontSize="9" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="700">South Africa</text>
          <polygon points="478,602 495,598 503,610 495,622 478,622 470,610" fill="#2d6b85" stroke="white" strokeWidth="0.8"/>
          <text x="487" y="613" fontSize="4" fill="white" textAnchor="middle" fontFamily="Arial">Lesotho</text>
          {/* Ocean & sea labels */}
          <text x="28" y="480" fontSize="8" fill="#7aa8c4" fontFamily="Arial" fontStyle="italic" transform="rotate(-80,28,480)">Atlantic Ocean</text>
          <text x="715" y="430" fontSize="8" fill="#7aa8c4" fontFamily="Arial" fontStyle="italic" transform="rotate(80,715,430)">Indian Ocean</text>
          <text x="390" y="48" fontSize="8.5" fill="#7aa8c4" fontFamily="Arial" fontStyle="italic" textAnchor="middle">Mediterranean Sea</text>
          {/* Legend */}
          <rect x="20" y="735" width="740" height="70" rx="10" fill="white" stroke="#ddd" strokeWidth="0.8"/>
          <text x="390" y="753" fontSize="9" fill="#666" textAnchor="middle" fontFamily="Arial" fontWeight="700" letterSpacing="2">REGIONS</text>
          <rect x="30" y="760" width="12" height="12" rx="2" fill="#7b3fa0"/>
          <text x="46" y="770" fontSize="8.5" fill="#444" fontFamily="Arial">North Africa</text>
          <rect x="145" y="760" width="12" height="12" rx="2" fill="#c9a84c"/>
          <text x="161" y="770" fontSize="8.5" fill="#444" fontFamily="Arial">West Africa</text>
          <rect x="260" y="760" width="12" height="12" rx="2" fill="#c0392b"/>
          <text x="276" y="770" fontSize="8.5" fill="#444" fontFamily="Arial">Central Africa</text>
          <rect x="380" y="760" width="12" height="12" rx="2" fill="#2d6b45"/>
          <text x="396" y="770" fontSize="8.5" fill="#444" fontFamily="Arial">East Africa</text>
          <rect x="488" y="760" width="12" height="12" rx="2" fill="#1a5a8a"/>
          <text x="504" y="770" fontSize="8.5" fill="#444" fontFamily="Arial">Southern Africa</text>
        </svg>
      </div>
      {/* Region legend cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-5">
        {regions.map(r => (
          <div key={r.label} className="rounded-xl p-3 border" style={{ background: `${r.color}10`, borderColor: `${r.color}30` }}>
            <div className="w-3 h-3 rounded-full mb-1.5" style={{ background: r.color }} />
            <div className="font-bold text-sm text-gray-800 mb-0.5">{r.label}</div>
            <div className="text-xs text-gray-500 leading-relaxed">{r.countries}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
