import React from 'react';

export default function Chapter({ chapter, isCompleted }) {
  return (
    <section
      id={chapter.id}
      className="py-12 border-b border-gray-200 last:border-0"
    >
      {/* Chapter header */}
      <div className="mb-8">
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
        <h2 className="text-2xl sm:text-3xl font-extrabold text-forest leading-tight">
          {chapter.title}
        </h2>
        <div className="mt-3 w-12 h-1 bg-gold rounded" />
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {chapter.sections.map((section, i) => (
          <SectionBlock key={i} section={section} />
        ))}
      </div>
    </section>
  );
}

function SectionBlock({ section }) {
  if (section.callout) {
    return (
      <div className={section.type === 'gold' ? 'callout-gold' : 'callout-green'}>
        <p className="text-sm sm:text-base italic leading-relaxed">
          "{section.callout}"
        </p>
      </div>
    );
  }

  return (
    <div>
      {section.heading && (
        <h3 className="text-lg sm:text-xl font-bold text-forest mb-3">
          {section.heading}
        </h3>
      )}
      {section.isPlaceholder ? (
        <div className="placeholder-block">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            <div>
              <div className="font-semibold text-amber-700 text-xs uppercase tracking-wide mb-1">Content Coming Soon</div>
              <p>{section.body}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed">
          {section.body.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
