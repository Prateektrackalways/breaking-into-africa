import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountrySelect from '../components/LeadCapture/CountrySelect';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export default function LandingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ first_name: '', email: '', country: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.first_name || !form.email || !form.country) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      sessionStorage.setItem('ebook_access', 'true');
      sessionStorage.setItem('user_name', form.first_name);
      sessionStorage.setItem('user_email', form.email);
      navigate('/ebook');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative bg-forest-dark overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c9a84c" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 text-gold text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                <span>FREE GUIDE</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Breaking Into{' '}
                <span className="text-gold">Africa</span>
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                The Complete Guide to Living, Working &amp; Building Business Across the Continent
              </p>

              <div className="space-y-3 mb-10">
                {[
                  '10 chapters covering every major African region',
                  'Step-by-step company registration & banking guides',
                  'Exporting, importing & payment strategies',
                  'Practical 90-day relocation roadmap',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-green-100">
                    <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>

              {/* Author credit (desktop) */}
              <div className="hidden lg:flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/30 border-2 border-gold flex items-center justify-center text-gold font-bold text-xl">
                  PJ
                </div>
                <div>
                  <div className="text-white font-semibold">Prateek Jain</div>
                  <div className="text-gold text-sm">Co-Founder at Trackalways</div>
                  <div className="text-green-200 text-xs italic mt-0.5">Building Businesses Across Borders</div>
                </div>
              </div>
            </div>

            {/* Right: Form card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-forest mb-2">Get Free Access</h2>
              <p className="text-gray-500 text-sm mb-6">Instant access — no credit card required. PDF download included.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="Your first name"
                    className="input-field"
                    value={form.first_name}
                    onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="input-field"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <CountrySelect
                    value={form.country}
                    onChange={val => setForm(f => ({ ...f, country: val }))}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      <span>Getting access...</span>
                    </>
                  ) : (
                    'Get Free Access →'
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-4">
                No spam. Unsubscribe anytime. Your data is safe.
              </p>

              {/* Mobile author */}
              <div className="lg:hidden flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-forest/10 border border-forest/20 flex items-center justify-center text-forest font-bold text-sm">
                  PJ
                </div>
                <div>
                  <div className="text-forest font-semibold text-sm">Prateek Jain</div>
                  <div className="text-gold text-xs">Co-Founder at Trackalways · Building Businesses Across Borders</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '54', label: 'African Countries Covered' },
              { num: '10', label: 'In-Depth Chapters' },
              { num: '5', label: 'Regional Deep Dives' },
              { num: '90', label: 'Day Action Plan' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-forest">{stat.num}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest">What's Inside</h2>
          <p className="text-gray-500 mt-2">A practical, field-tested guide — not theory</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Regional Business Maps', desc: 'Understand East, West, South, North & Central Africa as distinct markets with unique opportunities.' },
            { title: 'Company Registration', desc: 'Step-by-step guides for Kenya, Nigeria, Ghana, and South Africa — costs, timelines, pitfalls.' },
            { title: 'Banking & Payments', desc: 'M-Pesa, Flutterwave, SWIFT, forex controls, and how to move money across borders.' },
            { title: 'Export & Import Playbooks', desc: 'What sells in Africa, how to find buyers, customs, shipping, and getting paid.' },
            { title: 'Remote vs. Relocating', desc: 'How to run an African business from anywhere — and when you need to be on the ground.' },
            { title: '90-Day Relocation Guide', desc: 'A week-by-week practical plan for your first three months on the continent.' },
          ].map(card => (
            <div key={card.title} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-1 bg-gold rounded mb-4"></div>
              <h3 className="font-bold text-forest text-lg mb-2">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-dark text-green-200 py-8 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="font-semibold text-white mb-1">Prateek Jain</div>
          <div className="text-gold text-xs mb-4">Co-Founder at Trackalways · Building Businesses Across Borders</div>
          <div className="text-green-400/60 text-xs">
            © {new Date().getFullYear()} Prateek Jain · prateek.africa
          </div>
        </div>
      </footer>
    </div>
  );
}
