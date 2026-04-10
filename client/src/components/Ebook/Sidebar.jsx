import React from 'react';

export default function Sidebar({ chapters, activeChapter, completed, onSelect, isOpen, onClose }) {
  const completedCount = completed.length;
  const totalCount = chapters.length;

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-72 bg-forest-dark text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:h-full overflow-hidden
      `}
    >
      {/* Sidebar header */}
      <div className="px-5 py-5 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="text-gold font-bold text-xs uppercase tracking-widest">Contents</div>
          <button
            className="lg:hidden text-white/60 hover:text-white"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        {/* Progress summary */}
        <div>
          <div className="flex justify-between text-xs text-green-300 mb-1.5">
            <span>Progress</span>
            <span>{completedCount}/{totalCount} chapters</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chapter list */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {chapters.map(chapter => {
          const isActive = activeChapter === chapter.id;
          const isDone = completed.includes(chapter.id);
          return (
            <button
              key={chapter.id}
              onClick={() => onSelect(chapter.id)}
              className={`
                w-full text-left flex items-start gap-3 px-3 py-3 rounded-lg mb-1 transition-all
                ${isActive
                  ? 'bg-gold/20 border border-gold/30 text-white'
                  : 'text-green-200 hover:bg-white/5 hover:text-white border border-transparent'}
              `}
            >
              <div className={`
                flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5
                ${isDone
                  ? 'bg-gold text-white'
                  : isActive
                    ? 'bg-gold/30 text-gold border border-gold/50'
                    : 'bg-white/10 text-green-300'}
              `}>
                {isDone ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                  </svg>
                ) : (
                  chapter.number
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-green-400 mb-0.5">Chapter {chapter.number}</div>
                <div className={`text-sm leading-tight ${isActive ? 'font-semibold text-white' : ''}`}>
                  {chapter.shortTitle}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Sidebar footer */}
      <div className="px-4 py-4 border-t border-white/10 flex-shrink-0">
        <div className="text-xs text-green-400 text-center">
          <div className="font-semibold text-white text-sm">Prateek Jain</div>
          <div className="text-gold">Co-Founder at Trackalways</div>
        </div>
      </div>
    </aside>
  );
}
