import React from 'react';

export default function ProgressBar({ progress }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <div
        id="progress-bar"
        className="h-full bg-gold"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}
