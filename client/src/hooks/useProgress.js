import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const main = document.getElementById('ebook-content');
    if (!main) return;

    function handleScroll() {
      const scrollTop = main.scrollTop;
      const scrollHeight = main.scrollHeight - main.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    }

    main.addEventListener('scroll', handleScroll, { passive: true });
    return () => main.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

export function useCompletedChapters() {
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('completed_chapters') || '[]');
    } catch {
      return [];
    }
  });

  function markComplete(chapterId) {
    setCompleted(prev => {
      if (prev.includes(chapterId)) return prev;
      const next = [...prev, chapterId];
      sessionStorage.setItem('completed_chapters', JSON.stringify(next));
      return next;
    });
  }

  return { completed, markComplete };
}
