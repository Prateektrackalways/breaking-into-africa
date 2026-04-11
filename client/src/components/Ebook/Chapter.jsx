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
