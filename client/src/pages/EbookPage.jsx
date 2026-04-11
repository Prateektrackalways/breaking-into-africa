import React, { useState, useEffect, useRef } from 'react';
import { chapters } from '../content/chapters';
import Sidebar from '../components/Ebook/Sidebar';
import ProgressBar from '../components/Ebook/ProgressBar';
import Chapter from '../components/Ebook/Chapter';
import AfricaMap from '../components/Ebook/AfricaMap';
import AboutAuthor from '../components/Ebook/AboutAuthor';
import { useScrollProgress, useCompletedChapters } from '../hooks/useProgress';

const API_BASE = (import.meta.env.VITE_API_URL || 'https://ebook-api-p981.onrender.com').replace(/\/api$/, '');

export default function EbookPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [downloading] = useState(false);
  const contentRef = useRef(null);
  const progress = useScrollProgress();
  const { completed, markComplete } = useCompletedChapters();
  const userName = sessionStorage.getItem('user_name') || 'Reader';
  const userEmail = sessionStorage.getItem('user_email') || '';

  // Intersection observer to track active chapter
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveChapter(id);
            markComplete(id);
          }
        });
      },
      { root: document.getElementById('ebook-content'), threshold: 0.3 }
    );

    chapters.forEach(ch => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function scrollToChapter(id) {
    const el = document.getElementById(id);
    const container = document.getElementById('ebook-content');
    if (el && container) {
      container.scrollTo({ top: el.offsetTop - 32, behavior: 'smooth' });
    }
    setSidebarOpen(false);
  }

  function handleDownload() {
    const emailParam = userEmail ? `?email=${encodeURIComponent(userEmail)}` : '';
    window.open(`${API_BASE}/api/pdf/download${emailParam}`, '_blank');
  }

  return (
    <div className="flex flex-col h-screen bg-cream overflow-hidden">
      {/* Progress bar */}
      <ProgressBar progress={progress} />

      {/* Top nav */}
      <header className="bg-forest text-white flex items-center justify-between px-4 sm:px-6 py-3 shadow-md z-30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-forest-light transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <div>
            <div className="font-bold text-sm sm:text-base leading-tight">Breaking Into Africa</div>
            <div className="text-gold text-xs hidden sm:block">by Prateek Jain</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:block text-green-200 text-sm">
            Welcome, {userName}
          </span>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                <span className="hidden sm:inline">Generating...</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V19a2 2 0 002 2h14a2 2 0 002-2v-2"/>
                </svg>
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          chapters={chapters}
          activeChapter={activeChapter}
          completed={completed}
          onSelect={scrollToChapter}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <main
          id="ebook-content"
          ref={contentRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 space-y-0">

            {/* Cover splash */}
            <div className="flex justify-center py-8 border-b border-gray-200 mb-4">
              <img
                src="/assets/cover_web.png"
                alt="Breaking Into Africa ebook cover by Prateek Jain"
                className="w-full max-w-xs rounded-sm"
                style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.25), 0 6px 15px rgba(0,0,0,0.15)', borderRadius: '4px' }}
              />
            </div>

            {chapters.map((chapter) => (
              <div key={chapter.id}>
                {chapter.id === 'regions' && (
                  <div className="mb-8"><AfricaMap /></div>
                )}
                <Chapter chapter={chapter} isCompleted={completed.includes(chapter.id)} />
              </div>
            ))}

            {/* About the Author — last section */}
            <AboutAuthor />
          </div>

          {/* Footer */}
          <footer className="bg-forest-dark text-green-200 py-10 text-center mt-10">
            <div className="max-w-2xl mx-auto px-4">
              <div className="font-bold text-white text-lg mb-1">Prateek Jain</div>
              <div className="text-gold text-sm mb-3">Co-Founder at Trackalways</div>
              <div className="text-green-300 text-sm italic mb-6">"Building Businesses Across Borders"</div>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white font-bold px-6 py-3 rounded-lg transition disabled:opacity-60"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V19a2 2 0 002 2h14a2 2 0 002-2v-2"/>
                </svg>
                Download Full PDF
              </button>
              <div className="text-green-400/50 text-xs mt-6">
                © {new Date().getFullYear()} Prateek Jain · prateek.africa
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
