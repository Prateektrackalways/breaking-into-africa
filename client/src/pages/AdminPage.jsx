import React, { useState, useEffect, useCallback } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://ebook-api-p981.onrender.com';

// ── Colour tokens ──────────────────────────────────────────────
const C = {
  bg: '#0d1f13',
  green: '#1a4a2e',
  greenLight: '#2d6b45',
  gold: '#c9a84c',
  cream: '#faf8f3',
  muted: '#7aab8a',
  border: 'rgba(255,255,255,0.08)',
};

// ── Helpers ────────────────────────────────────────────────────
function authHeader(password) {
  return { Authorization: `Bearer ${password}` };
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function isToday(iso) {
  if (!iso) return false;
  const d = new Date(iso);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
}

// ── Sub-components ─────────────────────────────────────────────

function StatCard({ label, value, icon }) {
  return (
    <div style={{
      background: C.green,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: '20px 24px',
      flex: 1,
      minWidth: 140,
    }}>
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ color: C.gold, fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ color: C.cream, fontSize: 13, marginTop: 6, opacity: 0.85 }}>{label}</div>
    </div>
  );
}

// ── Login screen ───────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/leads/admin`, {
        headers: authHeader(pw),
      });
      if (res.status === 401) {
        setErr('Incorrect password. Please try again.');
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error('Server error');
      sessionStorage.setItem('admin_password', pw);
      onLogin(pw);
    } catch (e) {
      setErr('Could not connect to server. Please check your connection.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', Arial, sans-serif",
    }}>
      <div style={{
        background: C.green,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: '40px 44px',
        width: '100%',
        maxWidth: 380,
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🌍</div>
          <h1 style={{ color: C.cream, fontSize: 22, fontWeight: 800, margin: '0 0 4px' }}>
            Admin Access
          </h1>
          <p style={{ color: C.muted, fontSize: 13, margin: 0 }}>
            Breaking Into Africa — Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ color: C.muted, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
            Password
          </label>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Enter admin password"
            required
            style={{
              display: 'block',
              width: '100%',
              marginTop: 8,
              marginBottom: 16,
              padding: '12px 14px',
              background: 'rgba(0,0,0,0.25)',
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              color: C.cream,
              fontSize: 15,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {err && (
            <p style={{ color: '#f87171', fontSize: 13, margin: '0 0 14px' }}>{err}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: C.gold,
              color: C.bg,
              border: 'none',
              borderRadius: 8,
              padding: '13px',
              fontSize: 15,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Dashboard Tab ──────────────────────────────────────────────

function DashboardTab({ password }) {
  const [leads, setLeads] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/leads/admin`, { headers: authHeader(password) }).then(r => r.json()),
      fetch(`${API_BASE}/api/analytics/stats`, { headers: authHeader(password) }).then(r => r.json()),
    ]).then(([leadsData, analyticsData]) => {
      setLeads(Array.isArray(leadsData) ? leadsData : []);
      setAnalytics(analyticsData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [password]);

  if (loading) return <div style={{ color: C.muted, padding: 40 }}>Loading…</div>;

  const totalLeads = leads?.length || 0;
  const todayLeads = leads?.filter(l => isToday(l.created_at)).length || 0;
  const downloads = leads?.filter(l => l.has_downloaded).length || 0;
  const todayViews = analytics?.today_pageviews || 0;

  return (
    <div>
      <h2 style={{ color: C.cream, fontSize: 20, fontWeight: 700, margin: '0 0 24px' }}>
        Overview
      </h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        <StatCard label="Total Leads" value={totalLeads} icon="👥" />
        <StatCard label="Today's Signups" value={todayLeads} icon="📅" />
        <StatCard label="PDF Downloads" value={downloads} icon="⬇️" />
        <StatCard label="Page Views Today" value={todayViews} icon="👁️" />
      </div>

      <h3 style={{ color: C.muted, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 14px' }}>
        Recent Signups
      </h3>
      <div style={{
        background: C.green,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        {leads && leads.slice(0, 8).map((lead, i) => (
          <div key={lead.id} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 18px',
            borderBottom: i < 7 ? `1px solid ${C.border}` : 'none',
            gap: 14,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: C.greenLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: C.gold, fontWeight: 700, fontSize: 13, flexShrink: 0,
            }}>
              {lead.first_name?.[0]?.toUpperCase() || '?'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: C.cream, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {lead.first_name} · {lead.email}
              </div>
              <div style={{ color: C.muted, fontSize: 12 }}>{lead.country} · {fmtDate(lead.created_at)}</div>
            </div>
            {lead.has_downloaded && (
              <span style={{ color: C.gold, fontSize: 12, flexShrink: 0 }}>⬇️ Downloaded</span>
            )}
          </div>
        ))}
        {(!leads || leads.length === 0) && (
          <div style={{ color: C.muted, padding: '20px 18px', fontSize: 14 }}>No leads yet.</div>
        )}
      </div>
    </div>
  );
}

// ── Leads Tab ─────────────────────────────────────────────────

function LeadsTab({ password }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/leads/admin`, { headers: authHeader(password) })
      .then(r => r.json())
      .then(data => { setLeads(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [password]);

  function handleExport() {
    const url = `${API_BASE}/api/leads/admin?format=csv`;
    fetch(url, { headers: authHeader(password) })
      .then(r => r.blob())
      .then(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'leads.csv';
        a.click();
      });
  }

  const filtered = leads.filter(l => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (l.first_name || '').toLowerCase().includes(q) ||
      (l.email || '').toLowerCase().includes(q) ||
      (l.country || '').toLowerCase().includes(q) ||
      (l.interest || '').toLowerCase().includes(q);
  });

  if (loading) return <div style={{ color: C.muted, padding: 40 }}>Loading…</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ color: C.cream, fontSize: 20, fontWeight: 700, margin: 0 }}>
          Leads <span style={{ color: C.muted, fontSize: 15, fontWeight: 400 }}>({filtered.length})</span>
        </h2>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search name, email, country…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '9px 14px',
              background: 'rgba(0,0,0,0.2)',
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              color: C.cream,
              fontSize: 13,
              outline: 'none',
              width: 240,
            }}
          />
          <button
            onClick={handleExport}
            style={{
              background: C.gold,
              color: C.bg,
              border: 'none',
              borderRadius: 8,
              padding: '9px 18px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            ⬇ Export CSV
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.green }}>
              {['#', 'Name', 'Email', 'Country', 'Phone', 'Interest', 'Signed Up', 'Downloaded'].map(h => (
                <th key={h} style={{
                  color: C.muted,
                  fontWeight: 600,
                  textAlign: 'left',
                  padding: '10px 14px',
                  whiteSpace: 'nowrap',
                  letterSpacing: 0.5,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  borderBottom: `1px solid ${C.border}`,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead, i) => (
              <tr
                key={lead.id}
                style={{
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                  transition: 'background 0.1s',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(201,168,76,0.07)'}
                onMouseOut={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'}
              >
                <td style={{ color: C.muted, padding: '10px 14px', borderBottom: `1px solid ${C.border}` }}>{i + 1}</td>
                <td style={{ color: C.cream, padding: '10px 14px', borderBottom: `1px solid ${C.border}`, fontWeight: 600, whiteSpace: 'nowrap' }}>{lead.first_name}</td>
                <td style={{ color: C.muted, padding: '10px 14px', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{lead.email}</td>
                <td style={{ color: C.cream, padding: '10px 14px', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{lead.country}</td>
                <td style={{ color: C.muted, padding: '10px 14px', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{lead.phone || '—'}</td>
                <td style={{ color: C.muted, padding: '10px 14px', borderBottom: `1px solid ${C.border}`, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.interest || '—'}</td>
                <td style={{ color: C.muted, padding: '10px 14px', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{fmtDate(lead.created_at)}</td>
                <td style={{ padding: '10px 14px', borderBottom: `1px solid ${C.border}`, textAlign: 'center' }}>
                  {lead.has_downloaded
                    ? <span style={{ color: C.gold, fontWeight: 600 }}>✓</span>
                    : <span style={{ color: C.muted, opacity: 0.4 }}>—</span>}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} style={{ color: C.muted, padding: '24px 14px', textAlign: 'center' }}>
                  No leads match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Analytics Tab ─────────────────────────────────────────────

function AnalyticsTab({ password }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/analytics/stats`, { headers: authHeader(password) })
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [password]);

  if (loading) return <div style={{ color: C.muted, padding: 40 }}>Loading…</div>;

  const total = stats?.total_pageviews || 0;
  const todayViews = stats?.today_pageviews || 0;
  const paths = stats?.views_by_path || [];
  const uniquePaths = paths.length;

  return (
    <div>
      <h2 style={{ color: C.cream, fontSize: 20, fontWeight: 700, margin: '0 0 24px' }}>Analytics</h2>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        <StatCard label="Total Page Views" value={total} icon="👁️" />
        <StatCard label="Views Today" value={todayViews} icon="📅" />
        <StatCard label="Unique Paths" value={uniquePaths} icon="🔗" />
      </div>

      {/* Views by path table */}
      <h3 style={{ color: C.muted, fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', margin: '0 0 14px' }}>
        Page Views by Path
        <span style={{ color: C.muted, opacity: 0.6, fontSize: 11, fontWeight: 400, marginLeft: 8 }}>
          — tracked by built-in counter
        </span>
      </h3>
      <div style={{
        background: C.green,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 36,
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['Path', 'Views', '% of Total'].map(h => (
                <th key={h} style={{
                  color: C.muted, fontWeight: 600, textAlign: 'left',
                  padding: '10px 18px', fontSize: 12, textTransform: 'uppercase',
                  letterSpacing: 0.5, borderBottom: `1px solid ${C.border}`,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paths.map((row, i) => {
              const pct = total > 0 ? ((row.count / total) * 100).toFixed(1) : '0.0';
              return (
                <tr key={i}
                  style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  <td style={{ color: C.cream, padding: '10px 18px', borderBottom: `1px solid ${C.border}`, fontFamily: 'monospace', fontSize: 13 }}>{row.path}</td>
                  <td style={{ color: C.gold, padding: '10px 18px', borderBottom: `1px solid ${C.border}`, fontWeight: 700 }}>{row.count}</td>
                  <td style={{ color: C.muted, padding: '10px 18px', borderBottom: `1px solid ${C.border}` }}>{pct}%</td>
                </tr>
              );
            })}
            {paths.length === 0 && (
              <tr>
                <td colSpan={3} style={{ color: C.muted, padding: '20px 18px' }}>No page views recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Google Analytics section */}
      <div style={{
        background: C.green,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '24px 28px',
      }}>
        <h3 style={{ color: C.cream, fontSize: 16, fontWeight: 700, margin: '0 0 10px' }}>
          Connect Google Analytics
        </h3>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75, margin: '0 0 16px' }}>
          To get detailed analytics including visitor demographics, bounce rate, and traffic sources, connect Google Analytics 4:
        </p>
        <ol style={{ color: C.muted, fontSize: 14, lineHeight: 1.9, margin: '0 0 20px', paddingLeft: 20 }}>
          <li>Go to <strong style={{ color: C.cream }}>analytics.google.com</strong> → Create property</li>
          <li>Get your Measurement ID <strong style={{ color: C.cream }}>(G-XXXXXXXXXX)</strong></li>
          <li>Add it to your Render environment variables as <code style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 4, padding: '1px 6px', color: C.gold }}>VITE_GA_MEASUREMENT_ID</code></li>
          <li>Your GA dashboard: <strong style={{ color: C.cream }}>analytics.google.com</strong></li>
        </ol>
        <a
          href="https://analytics.google.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: C.gold,
            color: C.bg,
            padding: '10px 24px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Open Google Analytics →
        </a>
      </div>
    </div>
  );
}

// ── Main Admin Page ────────────────────────────────────────────

export default function AdminPage() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('admin_password') || '');
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [checking, setChecking] = useState(!!sessionStorage.getItem('admin_password'));

  // Auto-verify stored password on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('admin_password');
    if (!stored) { setChecking(false); return; }
    fetch(`${API_BASE}/api/leads/admin`, { headers: authHeader(stored) })
      .then(r => {
        if (r.ok) { setPassword(stored); setAuthed(true); }
        else sessionStorage.removeItem('admin_password');
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  function handleLogin(pw) {
    setPassword(pw);
    setAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_password');
    setPassword('');
    setAuthed(false);
  }

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', Arial, sans-serif" }}>
        <div style={{ color: C.muted }}>Checking session…</div>
      </div>
    );
  }

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'leads', label: 'Leads', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: "'Inter', Arial, sans-serif",
      background: '#f4f6f4',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        background: C.bg,
        display: 'flex',
        flexDirection: 'column',
        padding: '28px 0',
        flexShrink: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 10,
      }}>
        <div style={{ padding: '0 20px 28px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ color: C.gold, fontSize: 22, marginBottom: 6 }}>🌍</div>
          <div style={{ color: C.cream, fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>Breaking Into Africa</div>
          <div style={{ color: C.muted, fontSize: 11 }}>Admin Panel</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: 'none',
                background: activeTab === item.id ? C.green : 'transparent',
                color: activeTab === item.id ? C.cream : C.muted,
                fontSize: 14,
                fontWeight: activeTab === item.id ? 600 : 400,
                cursor: 'pointer',
                marginBottom: 4,
                textAlign: 'left',
                transition: 'background 0.15s',
              }}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px 12px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '9px',
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: 'transparent',
              color: C.muted,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: 220, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top header */}
        <header style={{
          background: '#fff',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 5,
        }}>
          <h1 style={{ color: C.bg, fontSize: 18, fontWeight: 700, margin: 0 }}>
            Breaking Into Africa — Admin
          </h1>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: `1px solid #e5e7eb`,
              borderRadius: 7,
              padding: '7px 14px',
              fontSize: 13,
              color: '#6b7280',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </header>

        {/* Tab content */}
        <main style={{ flex: 1, padding: '32px', background: '#f4f6f4' }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: '28px 32px',
            border: '1px solid #e5e7eb',
          }}>
            {activeTab === 'dashboard' && <DashboardTab password={password} />}
            {activeTab === 'leads' && <LeadsTab password={password} />}
            {activeTab === 'analytics' && <AnalyticsTab password={password} />}
          </div>
        </main>
      </div>
    </div>
  );
}
