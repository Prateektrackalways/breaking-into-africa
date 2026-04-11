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
    <div className="min-h-screen bg-[#0d1f13]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%"><defs><pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#c9a84c"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots)"/></svg>
        </div>

        <div className="relative max-w-[1100px] mx-auto px-4 sm:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Book cover */}
            <div className="flex justify-center lg:justify-end order-first lg:order-last">
              <div className="relative">
                <img
                  src="/assets/cover_web.png"
                  alt="Breaking Into Africa ebook cover by Prateek Jain"
                  className="w-full max-w-[360px] sm:max-w-[420px] rounded-sm"
                  style={{
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 8px 20px rgba(0,0,0,0.3), 6px 0 15px rgba(0,0,0,0.2)',
                    borderRadius: '4px',
                  }}
                />
                {/* Spine effect */}
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-black/30 to-transparent rounded-l-sm pointer-events-none" />
              </div>
            </div>

            {/* Copy + form */}
            <div className="order-last lg:order-first">
              <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 text-gold text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                Free Download
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
                Breaking Into <span className="text-gold">Africa</span>
              </h1>
              <p className="text-green-200 text-lg mb-1 font-medium">A Practical Guide for Entrepreneurs</p>
              <p className="text-green-400 text-sm italic mb-8">From Bhopal to Nairobi — Lessons in Building Across Borders</p>

              {/* What's inside bullets */}
              <div className="space-y-2.5 mb-8">
                {[
                  '10 chapters covering every major African region',
                  'Step-by-step company registration & banking guides',
                  'Export, import & cross-border payment strategies',
                  '90-day practical relocation action plan',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-green-100 text-sm">
                    <div className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
                <img
                  src="/assets/author_portrait_square.jpg"
                  alt="Prateek Jain"
                  className="w-12 h-12 rounded-full object-cover border-2 border-gold/40"
                />
                <div>
                  <div className="text-white font-semibold text-sm">Prateek Jain</div>
                  <div className="text-gold text-xs">Co-Founder at Trackalways · Nairobi, Kenya</div>
                </div>
              </div>

              {/* ── FORM ── */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-green-300 uppercase tracking-wide mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition text-sm"
                    value={form.first_name}
                    onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-green-300 uppercase tracking-wide mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition text-sm"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-green-300 uppercase tracking-wide mb-1.5">Phone Number</label>
                  <div className="flex gap-2">
                    <select
                      value={form.phone_code}
                      onChange={e => setForm(f => ({ ...f, phone_code: e.target.value }))}
                      className="bg-white/10 border border-white/20 rounded-lg px-2 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition text-sm w-32 flex-shrink-0"
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code + c.country} value={c.code} className="bg-[#0d1f13] text-white">
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      placeholder="712 345 678"
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition text-sm"
                      value={form.phone_number}
                      onChange={e => setForm(f => ({ ...f, phone_number: e.target.value.replace(/\D/g, '') }))}
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-semibold text-green-300 uppercase tracking-wide mb-1.5">Your Country *</label>
                  <select
                    value={form.country}
                    onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition text-sm"
                  >
                    <option value="" className="bg-[#0d1f13]">Select your country</option>
                    {COUNTRIES.map(c => (
                      <option key={c} value={c} className="bg-[#0d1f13] text-white">{c}</option>
                    ))}
                  </select>
                </div>

                {/* Interest */}
                <div>
                  <label className="block text-xs font-semibold text-green-300 uppercase tracking-wide mb-1.5">What best describes your interest? *</label>
                  <select
                    value={form.interest}
                    onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition text-sm"
                  >
                    {INTEREST_OPTIONS.map(o => (
                      <option key={o.value} value={o.value} className="bg-[#0d1f13] text-white">{o.label}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-gold/20 hover:shadow-xl active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Getting your access...
                    </span>
                  ) : 'Get Free Access →'}
                </button>

                <p className="text-center text-xs text-green-400/60">
                  No spam. Unsubscribe anytime. Instant access — no credit card.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0a1a0f] border-y border-white/5">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '54', label: 'African Countries Covered' },
              { num: '10', label: 'In-Depth Chapters' },
              { num: '5', label: 'Regional Deep Dives' },
              { num: '90', label: 'Day Action Plan' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-gold">{stat.num}</div>
                <div className="text-xs text-green-400 mt-1 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">What's Inside the Guide</h2>
          <p className="text-green-400 mt-2 text-sm">Practical, field-tested — not theory from a think-tank</p>
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
            <div key={card.title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 hover:border-gold/20 transition-all">
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-white mb-2">{card.title}</h3>
              <p className="text-green-300/70 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT AUTHOR ── */}
      <section className="bg-[#0a1a0f] border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <img
              src="/assets/author_portrait_square.jpg"
              alt="Prateek Jain — Author of Breaking Into Africa"
              className="w-32 h-32 rounded-xl object-cover border-2 border-gold/30 flex-shrink-0"
            />
            <div>
              <div className="text-gold text-xs font-bold uppercase tracking-widest mb-2">About the Author</div>
              <h3 className="text-white text-2xl font-bold mb-3">Prateek Jain</h3>
              <p className="text-green-200/80 text-sm leading-relaxed mb-4">
                Entrepreneur, builder, and cross-border operator based in Nairobi, Kenya. Originally from Bhopal, India, Prateek moved to East Africa to build businesses at the intersection of technology, logistics, and services. Co-Founder of Trackalways Ltd. — a GPS tracking and telematics company operating across Kenya and Uganda.
              </p>
              <p className="text-green-300/60 text-sm italic">
                "Breaking Into Africa distils years of hard-won lessons into a practical, no-fluff guide for entrepreneurs looking to enter or expand across the African continent."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#060f08] text-green-400/50 py-8 text-center text-xs border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="font-semibold text-white/70 mb-1">Prateek Jain</div>
          <div className="text-gold/60 mb-4">Co-Founder at Trackalways · Building Businesses Across Borders</div>
          <div>© {new Date().getFullYear()} Prateek Jain · prateek.africa · trackalways.com</div>
        </div>
      </footer>
    </div>
  );
}
