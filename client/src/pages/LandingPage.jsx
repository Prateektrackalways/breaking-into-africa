import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const COUNTRY_CODES = [
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+256', country: 'Uganda', flag: '🇺🇬' },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
  { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
  { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+1', country: 'US/Canada', flag: '🇺🇸' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+212', country: 'Morocco', flag: '🇲🇦' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+260', country: 'Zambia', flag: '🇿🇲' },
  { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
  { code: '+254', country: 'Other', flag: '🌍' },
];

const INTEREST_OPTIONS = [
  { value: '', label: 'Select your interest...' },
  { value: 'start_business', label: 'Start a full-time business in Africa' },
  { value: 'import', label: 'Import from Africa' },
  { value: 'export', label: 'Export to Africa' },
  { value: 'remote', label: 'Remote business in Africa' },
  { value: 'invest', label: 'Invest in African markets' },
  { value: 'exploring', label: 'Just exploring / learning' },
];

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria',
  'Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia',
  'Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia',
  'Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo (Brazzaville)',
  'Congo (DRC)','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica',
  'Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia',
  'Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea',
  'Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel',
  'Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos',
  'Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi',
  'Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova',
  'Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands',
  'New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau',
  'Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda',
  'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','São Tomé and Príncipe',
  'Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands',
  'Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland',
  'Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia',
  'Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States',
  'Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    email: '',
    country: '',
    phone_code: '+254',
    phone_number: '',
    interest: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.first_name || !form.email || !form.country || !form.interest) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    const phone = form.phone_number ? `${form.phone_code}${form.phone_number}` : '';
    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.first_name,
          email: form.email,
          country: form.country,
          phone,
          interest: form.interest,
        }),
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
    <div className="min-h-screen bg-[#0b1a10] text-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-screen flex items-center">

        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-green-900/20 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-900/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          {/* Dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#c9a84c"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>
        </div>

        <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 xl:gap-16 items-center">

            {/* ── LEFT: Copy + Form ── */}
            <div className="max-w-[560px] w-full">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/35 text-[#c9a84c] text-[11px] font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-[0.12em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
                Free Digital Download
              </div>

              {/* Headline */}
              <h1 className="text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] font-extrabold leading-[1.1] tracking-tight mb-4">
                Breaking Into{' '}
                <span style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #c9a84c 100%)' }}>
                  Africa
                </span>
              </h1>
              <p className="text-green-200 text-lg font-medium leading-snug mb-1">
                The Complete Guide to Living, Working &amp; Building Business Across the Continent
              </p>
              <p className="text-green-500 text-sm italic mb-8">
                From Bhopal to Nairobi — Real Lessons from an Entrepreneur Who Made the Leap
              </p>

              {/* What's inside */}
              <div className="space-y-2.5 mb-8">
                {[
                  '10 chapters covering every major African region',
                  'Step-by-step company registration & banking guides',
                  'Export, import & cross-border payment strategies',
                  '90-day practical relocation action plan',
                  'Field-tested — not theory from a think-tank',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3 text-green-100/90 text-[13.5px]">
                    <div className="mt-0.5 w-4.5 h-4.5 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/40 flex items-center justify-center flex-shrink-0" style={{ width: 18, height: 18 }}>
                      <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                        <path d="M2 5l2 2 4-4" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {/* Author row */}
              <div className="flex items-center gap-3 mb-8 pb-7 border-b border-white/10">
                <img
                  src="/assets/author_portrait_square.jpg"
                  alt="Prateek Jain"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#c9a84c]/40 flex-shrink-0"
                />
                <div>
                  <div className="text-white font-semibold text-sm leading-tight">Prateek Jain</div>
                  <div className="text-[#c9a84c] text-xs">Co-Founder at Trackalways · Nairobi, Kenya</div>
                </div>
              </div>

              {/* ── FORM ── */}
              <form onSubmit={handleSubmit} className="space-y-3.5">

                {/* Name + Email side by side on wider screens */}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      placeholder="First name"
                      className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c]/50 transition text-sm"
                      value={form.first_name}
                      onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-white/8 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c]/50 transition text-sm"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1.5">Phone Number <span className="text-white/30 normal-case font-normal">(optional)</span></label>
                  <div className="flex gap-2">
                    <select
                      value={form.phone_code}
                      onChange={e => setForm(f => ({ ...f, phone_code: e.target.value }))}
                      className="border border-white/15 rounded-lg px-2 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c]/50 transition text-sm w-[110px] flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code + c.country} value={c.code} style={{ background: '#0b1a10', color: '#fff' }}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      placeholder="712 345 678"
                      className="flex-1 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c]/50 transition text-sm"
                      value={form.phone_number}
                      onChange={e => setForm(f => ({ ...f, phone_number: e.target.value.replace(/\D/g, '') }))}
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    />
                  </div>
                </div>

                {/* Country + Interest side by side */}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1.5">Your Country *</label>
                    <select
                      value={form.country}
                      onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                      className="w-full border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c]/50 transition text-sm"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    >
                      <option value="" style={{ background: '#0b1a10' }}>Select country</option>
                      {COUNTRIES.map(c => (
                        <option key={c} value={c} style={{ background: '#0b1a10', color: '#fff' }}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1.5">Your Interest *</label>
                    <select
                      value={form.interest}
                      onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                      className="w-full border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/40 focus:border-[#c9a84c]/50 transition text-sm"
                      style={{ background: 'rgba(255,255,255,0.06)' }}
                    >
                      {INTEREST_OPTIONS.map(o => (
                        <option key={o.value} value={o.value} style={{ background: '#0b1a10', color: '#fff' }}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-bold py-4 rounded-xl transition-all duration-200 shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-[15px] mt-1"
                  style={{
                    background: loading ? '#8a7030' : 'linear-gradient(135deg, #c9a84c 0%, #e8c060 50%, #c9a84c 100%)',
                    color: '#0b1a10',
                    boxShadow: loading ? 'none' : '0 4px 24px rgba(201,168,76,0.35)',
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Getting your access...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Get Free Instant Access
                      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </button>

                <p className="text-center text-[11px] text-green-500/50 pt-0.5">
                  Free forever. No spam. No credit card required.
                </p>
              </form>
            </div>

            {/* ── RIGHT: Book Cover ── */}
            <div className="flex justify-center lg:justify-end order-first lg:order-last">
              <div className="relative">
                {/* Glow behind the book */}
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.25) 0%, transparent 70%)',
                    transform: 'scale(1.15)',
                    filter: 'blur(24px)',
                  }}
                />
                <img
                  src="/assets/cover_web.png"
                  alt="Breaking Into Africa ebook cover by Prateek Jain"
                  style={{
                    width: '100%',
                    maxWidth: 460,
                    minWidth: 280,
                    borderRadius: 6,
                    boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 12px 30px rgba(0,0,0,0.4), 8px 0 20px rgba(0,0,0,0.25), -2px 0 8px rgba(201,168,76,0.1)',
                    display: 'block',
                    position: 'relative',
                  }}
                />
                {/* Spine highlight */}
                <div
                  className="absolute top-0 left-0 h-full pointer-events-none"
                  style={{ width: 10, background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)', borderRadius: '6px 0 0 6px' }}
                />
                {/* Page edge on right */}
                <div
                  className="absolute top-[3px] bottom-[3px] right-[-4px] pointer-events-none"
                  style={{ width: 6, background: 'linear-gradient(to right, #d4b866, #f5e08a, #d4b866)', borderRadius: '0 2px 2px 0', opacity: 0.7 }}
                />

                {/* Floating tag */}
                <div
                  className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e8c060)', color: '#0b1a10', boxShadow: '0 4px 12px rgba(201,168,76,0.4)' }}
                >
                  Free PDF
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: '#081210', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '54', label: 'African Countries Covered' },
              { num: '10', label: 'In-Depth Chapters' },
              { num: '5', label: 'Regional Deep Dives' },
              { num: '90', label: 'Day Action Plan Included' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-[2.2rem] font-extrabold" style={{ color: '#c9a84c' }}>{stat.num}</div>
                <div className="text-[11px] text-green-400/70 mt-1 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-[#c9a84c] bg-[#c9a84c]/10 border border-[#c9a84c]/25 px-4 py-1.5 rounded-full mb-4">
            Inside the Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Everything You Need to Enter Africa</h2>
          <p className="text-green-400/70 mt-3 text-sm">Practical, field-tested knowledge — not theory from a think-tank</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: '🗺️', title: 'Regional Business Maps', desc: 'East, West, South, North & Central Africa as distinct markets with unique opportunities and entry strategies.' },
            { icon: '🏢', title: 'Company Registration', desc: 'Step-by-step guides for Kenya, Nigeria, Ghana, and South Africa — costs, timelines, and pitfalls to avoid.' },
            { icon: '💳', title: 'Banking & Payments', desc: 'M-Pesa, Flutterwave, SWIFT, forex controls, and how to move money across African borders.' },
            { icon: '📦', title: 'Export & Import Playbooks', desc: 'What sells in Africa, how to find buyers, customs realities, shipping, and getting paid safely.' },
            { icon: '🌍', title: 'Remote vs. Relocating', desc: 'How to run an African business from anywhere — and when you need to be physically on the ground.' },
            { icon: '🚀', title: '90-Day Relocation Guide', desc: 'A week-by-week practical plan for your first three months building on the continent.' },
          ].map(card => (
            <div
              key={card.title}
              className="rounded-xl p-6 transition-all duration-200 hover:scale-[1.02]"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.background = 'rgba(201,168,76,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-white mb-2">{card.title}</h3>
              <p className="text-green-300/60 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AFRICA MAP ── */}
      <section style={{ background: '#081210', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-20">
          <div className="text-center mb-10">
            <div className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] text-[#c9a84c] bg-[#c9a84c]/10 border border-[#c9a84c]/25 px-4 py-1.5 rounded-full mb-4">
              Regional Overview
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Africa's 5 Business Regions</h2>
            <p className="text-green-400/70 mt-3 text-sm max-w-xl mx-auto">Each region has its own regulations, opportunities, languages and market dynamics. The guide covers them all.</p>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <img
              src="/assets/africa_map.jpg"
              alt="Africa Regional Business Map — 5 regions: North, West, Central, East, Southern"
              style={{ width: '100%', display: 'block', objectFit: 'contain', background: '#fff' }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
            {[
              { color: '#7b3fa0', label: 'North Africa', countries: 'Egypt, Libya, Algeria, Morocco, Tunisia, Sudan' },
              { color: '#c9a84c', label: 'West Africa', countries: 'Nigeria, Ghana, Ivory Coast, Senegal, Mali, Niger +more' },
              { color: '#c0392b', label: 'Central Africa', countries: 'DRC, Cameroon, Chad, C.A.R., Gabon, Congo' },
              { color: '#2d6b45', label: 'East Africa', countries: 'Kenya, Ethiopia, Tanzania, Uganda, Somalia, Rwanda +more' },
              { color: '#1a5a8a', label: 'Southern Africa', countries: 'South Africa, Angola, Zambia, Zimbabwe, Namibia, Botswana' },
            ].map(r => (
              <div key={r.label} className="rounded-xl p-4" style={{ background: `${r.color}18`, border: `1px solid ${r.color}40` }}>
                <div className="w-3 h-3 rounded-full mb-2" style={{ background: r.color }} />
                <div className="text-white font-bold text-sm mb-1">{r.label}</div>
                <div className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{r.countries}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT AUTHOR ── */}
      <section style={{ background: '#081210', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 max-w-[760px]">
            <img
              src="/assets/author_portrait_square.jpg"
              alt="Prateek Jain — Author of Breaking Into Africa"
              className="w-28 h-28 rounded-xl object-cover flex-shrink-0"
              style={{ border: '2px solid rgba(201,168,76,0.3)' }}
            />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#c9a84c] mb-2">About the Author</div>
              <h3 className="text-white text-2xl font-bold mb-3">Prateek Jain</h3>
              <p className="text-green-200/70 text-sm leading-relaxed mb-4">
                Entrepreneur, builder, and cross-border operator based in Nairobi, Kenya. Originally from Bhopal, India, Prateek moved to East Africa to build businesses at the intersection of technology, logistics, and services. Co-Founder of Trackalways Ltd. — a GPS tracking and telematics company operating across Kenya and Uganda.
              </p>
              <p className="text-green-400/50 text-sm italic border-l-2 border-[#c9a84c]/30 pl-4">
                "Breaking Into Africa distils years of hard-won lessons into a practical, no-fluff guide for entrepreneurs looking to enter or expand across the African continent."
              </p>
              <div className="flex gap-4 mt-5">
                <a href="https://prateek.africa" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] text-xs hover:underline">prateek.africa ↗</a>
                <a href="https://trackalwaysafrica.com" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] text-xs hover:underline">trackalwaysafrica.com ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#050e07', borderTop: '1px solid rgba(255,255,255,0.05)' }} className="py-8 text-center">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="font-semibold text-white/60 text-sm mb-1">Prateek Jain</div>
          <div className="text-[#c9a84c]/50 text-xs mb-4">Co-Founder at Trackalways · Building Businesses Across Borders</div>
          <div className="text-green-500/30 text-xs">© {new Date().getFullYear()} Prateek Jain · prateek.africa · trackalwaysafrica.com</div>
        </div>
      </footer>
    </div>
  );
}
