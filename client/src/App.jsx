import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EbookPage from './pages/EbookPage';
import DownloadPage from './pages/DownloadPage';
import AdminPage from './pages/AdminPage';

const API_BASE = (import.meta.env.VITE_API_URL || 'https://ebook-api-p981.onrender.com').replace(/\/api$/, '');

function hasAccess() {
  return sessionStorage.getItem('ebook_access') === 'true';
}

function ProtectedRoute({ children }) {
  return hasAccess() ? children : <Navigate to="/" replace />;
}

function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    fetch(`${API_BASE}/api/analytics/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: location.pathname,
        referrer: document.referrer || null,
      }),
    }).catch(() => {
      // Silent fail — analytics should never break the app
    });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <PageTracker />
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/ebook"
        element={
          <ProtectedRoute>
            <EbookPage />
          </ProtectedRoute>
        }
      />
      <Route path="/download" element={<DownloadPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
