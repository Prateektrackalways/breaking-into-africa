import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EbookPage from './pages/EbookPage';

function hasAccess() {
  return sessionStorage.getItem('ebook_access') === 'true';
}

function ProtectedRoute({ children }) {
  return hasAccess() ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
