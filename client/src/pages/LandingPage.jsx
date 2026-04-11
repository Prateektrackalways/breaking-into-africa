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

          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <svg viewBox="0 0 780 820" style={{ width: '100%', maxWidth: 760, display: 'block', margin: '0 auto', padding: '16px' }}>
              <rect width="780" height="820" fill="transparent"/>

              {/* NORTH AFRICA */}
              <polygon points="90,85 135,75 155,85 160,115 145,130 110,135 85,120 80,100" fill="#7b3fa0" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="120" y="108" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Morocco</text>
              <polygon points="155,85 240,75 270,90 275,130 265,155 200,160 160,150 145,130 160,115" fill="#7b3fa0" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="213" y="120" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Algeria</text>
              <polygon points="240,75 265,72 275,85 275,100 260,110 245,100 240,88" fill="#7b3fa0" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="257" y="93" fontSize="5.5" fill="white" textAnchor="middle" fontFamily="Arial">Tunisia</text>
              <polygon points="265,72 340,68 365,80 370,120 355,155 300,160 275,130 275,100 275,85" fill="#7b3fa0" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="318" y="112" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Libya</text>
              <polygon points="365,80 430,75 450,90 455,130 440,155 385,160 355,155 370,120" fill="#7b3fa0" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="408" y="115" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Egypt</text>
              <polygon points="80,120 110,135 120,155 110,175 80,180 62,160 60,135" fill="#9b5abf" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="90" y="153" fontSize="5" fill="white" textAnchor="middle" fontFamily="Arial">W.Sahara</text>
              <polygon points="440,155 480,145 510,155 515,195 505,230 470,245 440,240 420,215 415,185 430,160" fill="#7b3fa0" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="465" y="195" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Sudan</text>

              {/* WEST AFRICA */}
              <polygon points="62,160 110,175 120,155 130,175 125,210 90,225 60,220 50,190" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="88" y="193" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Mauritania</text>
              <polygon points="130,175 200,160 265,155 270,185 260,225 230,250 195,265 165,265 140,240 125,210" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="198" y="215" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Mali</text>
              <polygon points="265,155 355,155 370,175 365,215 345,235 310,245 270,240 260,225 270,185" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="315" y="200" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Niger</text>
              <polygon points="60,220 90,225 105,240 100,258 80,265 55,255 48,238" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="78" y="245" fontSize="5.5" fill="white" textAnchor="middle" fontFamily="Arial">Senegal</text>
              <polygon points="65,268 100,260 120,270 115,292 95,298 68,290" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="92" y="281" fontSize="5.5" fill="white" textAnchor="middle" fontFamily="Arial">Guinea</text>
              <polygon points="68,292 100,300 115,310 108,330 85,335 62,320 58,305" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="85" y="315" fontSize="5" fill="white" textAnchor="middle" fontFamily="Arial">S.Leone</text>
              <polygon points="115,270 165,265 185,275 188,300 175,320 148,328 118,315 115,295" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="150" y="298" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Ivory Coast</text>
              <polygon points="188,275 220,270 235,280 238,308 225,328 200,332 178,322 175,300" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="207" y="303" fontSize="6.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Ghana</text>
              <polygon points="238,278 260,275 268,285 265,310 255,325 240,328 235,310" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="252" y="303" fontSize="4.5" fill="white" textAnchor="middle" fontFamily="Arial">Togo/Benin</text>
              <polygon points="165,265 230,250 265,255 268,278 240,280 188,275 170,268" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="216" y="265" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Burkina Faso</text>
              <polygon points="268,255 345,248 370,258 375,290 365,325 335,345 300,348 270,335 258,308 262,278 268,265" fill="#c9a84c" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="315" y="302" fontSize="8" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="700">Nigeria</text>

              {/* CENTRAL AFRICA */}
              <polygon points="345,248 385,240 400,255 405,285 390,310 365,325 345,310 338,285 342,262" fill="#c0392b" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="372" y="284" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Cameroon</text>
              <polygon points="355,155 415,150 440,160 445,195 430,225 415,240 385,240 370,220 365,185 360,165" fill="#c0392b" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="400" y="195" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Chad</text>
              <polygon points="405,255 440,248 480,252 490,275 480,298 450,308 415,305 400,285" fill="#c0392b" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="445" y="278" fontSize="5.5" fill="white" textAnchor="middle" fontFamily="Arial">C.A.R.</text>
              <polygon points="390,312 425,308 445,318 448,345 432,360 405,362 385,345 382,325" fill="#c0392b" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="415" y="338" fontSize="5" fill="white" textAnchor="middle" fontFamily="Arial">Gabon/Congo</text>
              <polygon points="450,308 495,300 530,310 545,335 548,375 535,405 510,420 475,425 448,415 430,390 425,360 448,345 448,320" fill="#c0392b" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="490" y="365" fontSize="8" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="700">DR Congo</text>
              <polygon points="440,240 480,248 510,255 520,280 505,300 480,305 452,298 438,275 430,255" fill="#c0392b" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="477" y="275" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">S. Sudan</text>

              {/* EAST AFRICA */}
              <polygon points="510,155 555,148 590,162 600,192 590,220 562,235 530,238 510,228 505,200 505,175" fill="#2d6b45" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="550" y="193" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Ethiopia</text>
              <polygon points="510,148 555,140 565,152 555,162 510,162" fill="#2d6b45" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="535" y="153" fontSize="5" fill="white" textAnchor="middle" fontFamily="Arial">Eritrea</text>
              <polygon points="562,235 595,220 625,205 645,228 640,265 618,300 595,310 570,298 555,270 555,248" fill="#2d6b45" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="605" y="263" fontSize="7" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Somalia</text>
              <polygon points="520,285 548,278 560,290 558,315 540,328 518,325 510,308 512,292" fill="#2d6b45" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="535" y="307" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Uganda</text>
              <polygon points="560,245 598,238 620,252 625,280 615,308 590,320 565,315 555,298 555,270" fill="#2d6b45" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="590" y="282" fontSize="8" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="700">Kenya</text>
              <polygon points="548,318 565,314 570,328 560,340 545,338 542,325" fill="#2d6b45" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="556" y="330" fontSize="4.5" fill="white" textAnchor="middle" fontFamily="Arial">Rwa/Bur</text>
              <polygon points="558,340 590,325 625,332 638,360 632,395 610,415 580,420 553,408 542,380 545,355" fill="#2d6b45" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="590" y="378" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Tanzania</text>
              <polygon points="548,430 580,425 605,440 610,470 598,510 575,530 548,525 530,505 530,468 540,445" fill="#2d6b45" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="572" y="480" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Mozambique</text>
              <polygon points="640,415 665,408 680,425 685,465 672,500 655,510 638,498 630,462 630,432" fill="#2d6b45" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="657" y="460" fontSize="6.5" fill="white" textAnchor="middle" fontFamily="Arial">Madagascar</text>

              {/* SOUTHERN AFRICA */}
              <polygon points="418,365 450,360 480,365 500,388 505,425 495,455 468,465 440,458 418,432 412,400 415,378" fill="#1a5a8a" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="458" y="415" fontSize="7.5" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="600">Angola</text>
              <polygon points="505,422 535,415 548,428 545,460 530,478 505,485 478,478 468,458 480,435 500,428" fill="#1a5a8a" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="508" y="452" fontSize="6.5" fill="white" textAnchor="middle" fontFamily="Arial">Zambia</text>
              <polygon points="530,480 555,475 572,488 570,512 552,525 530,522 515,508 515,490" fill="#1a5a8a" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="543" y="503" fontSize="6" fill="white" textAnchor="middle" fontFamily="Arial">Zimbabwe</text>
              <polygon points="415,458 445,460 470,468 488,490 490,525 478,555 450,570 418,565 398,540 392,508 400,478" fill="#1a5a8a" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="443" y="515" fontSize="6.5" fill="white" textAnchor="middle" fontFamily="Arial">Namibia</text>
              <polygon points="468,488 495,485 515,495 525,518 518,545 498,558 472,558 452,542 450,515 458,498" fill="#1a5a8a" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="488" y="525" fontSize="6.5" fill="white" textAnchor="middle" fontFamily="Arial">Botswana</text>
              <polygon points="418,568 452,558 475,560 500,562 525,548 545,558 552,582 540,615 510,640 478,648 450,645 422,625 400,600 395,572" fill="#1a5a8a" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="476" y="605" fontSize="8" fill="white" textAnchor="middle" fontFamily="Arial" fontWeight="700">South Africa</text>
              <polygon points="478,602 495,598 503,610 495,622 478,622 470,610" fill="#2d6b85" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7"/>
              <text x="487" y="613" fontSize="4" fill="white" textAnchor="middle" fontFamily="Arial">Lesotho</text>

              {/* LEGEND */}
              <rect x="20" y="735" width="740" height="70" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
              <text x="390" y="753" fontSize="9" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontFamily="Arial" fontWeight="700" letterSpacing="2">REGIONS</text>
              <rect x="30" y="760" width="12" height="12" rx="2" fill="#7b3fa0"/>
              <text x="46" y="770" fontSize="8.5" fill="rgba(255,255,255,0.75)" fontFamily="Arial">North Africa</text>
              <rect x="140" y="760" width="12" height="12" rx="2" fill="#c9a84c"/>
              <text x="156" y="770" fontSize="8.5" fill="rgba(255,255,255,0.75)" fontFamily="Arial">West Africa</text>
              <rect x="255" y="760" width="12" height="12" rx="2" fill="#c0392b"/>
              <text x="271" y="770" fontSize="8.5" fill="rgba(255,255,255,0.75)" fontFamily="Arial">Central Africa</text>
              <rect x="375" y="760" width="12" height="12" rx="2" fill="#2d6b45"/>
              <text x="391" y="770" fontSize="8.5" fill="rgba(255,255,255,0.75)" fontFamily="Arial">East Africa</text>
              <rect x="480" y="760" width="12" height="12" rx="2" fill="#1a5a8a"/>
              <text x="496" y="770" fontSize="8.5" fill="rgba(255,255,255,0.75)" fontFamily="Arial">Southern Africa</text>

              {/* Ocean labels */}
              <text x="28" y="480" fontSize="8" fill="rgba(100,180,220,0.5)" fontFamily="Arial" fontStyle="italic" transform="rotate(-80,28,480)">Atlantic Ocean</text>
              <text x="715" y="430" fontSize="8" fill="rgba(100,180,220,0.5)" fontFamily="Arial" fontStyle="italic" transform="rotate(80,715,430)">Indian Ocean</text>
              <text x="390" y="48" fontSize="8.5" fill="rgba(100,180,220,0.5)" fontFamily="Arial" fontStyle="italic" textAnchor="middle">Mediterranean Sea</text>
            </svg>
          </div>

          {/* Region cards row */}
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
