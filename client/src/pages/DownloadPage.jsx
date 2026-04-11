import React, { useState } from 'react';

const API_BASE = (import.meta.env.VITE_API_URL || 'https://ebook-api-p981.onrender.com').replace(/\/api$/, '');
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || 'https://guide.prateek.africa';

export default function DownloadPage() {
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [errorMsg, setErrorMsg] = useState('');

  const hasAccess = sessionStorage.getItem('ebook_access') === 'true';

  function handleDownload() {
    setStatus('done');
    window.open(`${API_BASE}/api/pdf/download`, '_blank');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0d1f13',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: "'Inter', Arial, sans-serif",
      }}
    >
      {/* Book Cover */}
      <div
        style={{
          marginBottom: '36px',
          filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.7))',
        }}
      >
        <img
          src="/assets/cover_web.png"
          alt="Breaking Into Africa — Prateek Jain"
          style={{
            width: '220px',
            borderRadius: '6px',
            display: 'block',
          }}
        />
      </div>

      {/* Title */}
      <h1
        style={{
          color: '#faf8f3',
          fontSize: '28px',
          fontWeight: 800,
          margin: '0 0 8px',
          textAlign: 'center',
          letterSpacing: '-0.5px',
        }}
      >
        Your Copy is Ready
      </h1>

      {/* Subtitle */}
      <p
        style={{
          color: '#c9a84c',
          fontSize: '15px',
          fontWeight: 600,
          margin: '0 0 36px',
          textAlign: 'center',
        }}
      >
        Breaking Into Africa — by Prateek Jain
      </p>

      {/* Action area */}
      <div style={{ textAlign: 'center', maxWidth: '420px', width: '100%' }}>
        {status === 'idle' && (
          <button
            onClick={handleDownload}
            style={{
              background: '#c9a84c',
              color: '#0d1f13',
              border: 'none',
              borderRadius: '10px',
              padding: '18px 48px',
              fontSize: '17px',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.3px',
              boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
              transition: 'transform 0.15s, box-shadow 0.15s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,168,76,0.55)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,168,76,0.4)';
            }}
          >
            <span>⬇️</span> Download Your PDF
          </button>
        )}

        {status === 'loading' && (
          <div>
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '4px solid rgba(201,168,76,0.3)',
                borderTop: '4px solid #c9a84c',
                borderRadius: '50%',
                animation: 'spin 0.9s linear infinite',
                margin: '0 auto 20px',
              }}
            />
            <p style={{ color: '#a8d5b5', fontSize: '15px', margin: 0 }}>
              Generating your PDF… this takes about 20 seconds
            </p>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {status === 'done' && (
          <div>
            <div
              style={{
                background: 'rgba(26,74,46,0.5)',
                border: '1px solid #2d6b45',
                borderRadius: '12px',
                padding: '24px 28px',
                marginBottom: '24px',
              }}
            >
              <p style={{ color: '#a8d5b5', fontSize: '16px', margin: '0 0 12px', fontWeight: 600 }}>
                ✅ Download started! Check your downloads folder.
              </p>
              <p style={{ color: '#7aab8a', fontSize: '14px', margin: 0 }}>
                The file is named{' '}
                <span style={{ color: '#c9a84c', fontWeight: 600 }}>
                  Breaking-Into-Africa-by-Prateek-Jain.pdf
                </span>
              </p>
            </div>
            {hasAccess ? (
              <a
                href="/ebook"
                style={{
                  color: '#c9a84c',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  borderBottom: '1px solid rgba(201,168,76,0.4)',
                  paddingBottom: '2px',
                }}
              >
                📖 Read the interactive version online →
              </a>
            ) : (
              <a
                href="/"
                style={{
                  color: '#c9a84c',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  borderBottom: '1px solid rgba(201,168,76,0.4)',
                  paddingBottom: '2px',
                }}
              >
                🌍 Back to guide.prateek.africa →
              </a>
            )}
          </div>
        )}

        {status === 'error' && (
          <div>
            <div
              style={{
                background: 'rgba(180,40,40,0.18)',
                border: '1px solid rgba(220,80,80,0.4)',
                borderRadius: '12px',
                padding: '20px 24px',
                marginBottom: '20px',
              }}
            >
              <p style={{ color: '#f8a0a0', fontSize: '15px', margin: '0 0 6px', fontWeight: 600 }}>
                Something went wrong — we're sorry!
              </p>
              <p style={{ color: '#d07070', fontSize: '13px', margin: 0 }}>
                {errorMsg || 'The PDF could not be generated right now. Please try again.'}
              </p>
            </div>
            <button
              onClick={handleDownload}
              style={{
                background: '#c9a84c',
                color: '#0d1f13',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 36px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ↺ Try Again
            </button>
          </div>
        )}
      </div>

      {/* Divider */}
      <div
        style={{
          width: '280px',
          height: '1px',
          background: 'rgba(255,255,255,0.1)',
          margin: '48px 0 32px',
        }}
      />

      {/* Author credit */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <img
          src="/assets/author_portrait_square.jpg"
          alt="Prateek Jain"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid rgba(201,168,76,0.4)',
          }}
        />
        <div>
          <div style={{ color: '#faf8f3', fontSize: '14px', fontWeight: 700 }}>Prateek Jain</div>
          <div style={{ color: '#7aab8a', fontSize: '12px' }}>
            Co-Founder at Trackalways · Nairobi, Kenya
          </div>
        </div>
      </div>
    </div>
  );
}
