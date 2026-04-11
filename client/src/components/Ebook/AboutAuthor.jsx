import React from 'react';

export default function AboutAuthor() {
  return (
    <section id="about-author" className="py-16 border-t-4 border-gold/30 bg-[#faf8f0] -mx-4 sm:-mx-8 px-4 sm:px-8 mt-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-xs font-bold uppercase tracking-widest text-gold mb-6">About the Author</div>

        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <img
            src="/assets/author_portrait_square.jpg"
            alt="Prateek Jain — Author of Breaking Into Africa"
            className="w-44 h-44 rounded-xl object-cover shadow-lg border-2 border-gold/20 flex-shrink-0 mx-auto sm:mx-0"
          />
          <div>
            <h2 className="text-2xl font-extrabold text-forest mb-1">Prateek Jain</h2>
            <div className="text-gold text-sm font-semibold mb-4">Co-Founder at Trackalways · Nairobi, Kenya</div>

            <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
              <p>
                Prateek Jain is an entrepreneur, builder, and cross-border operator based in Nairobi, Kenya. Originally from Bhopal, India, he moved to East Africa to build businesses at the intersection of technology, logistics, and services.
              </p>
              <p>
                He is the Director and co-owner of <strong>Trackalways Ltd.</strong>, a GPS tracking and telematics company operating across Kenya and Uganda, and runs <strong>Anasa Living</strong> (serviced apartments in Nairobi) and <strong>Code Crumble</strong> (web development and SaaS tools).
              </p>
              <p>
                With experience spanning cloud kitchens, printing, fresh produce trade, IoT hardware, and SaaS platforms — across India, Africa, the UAE, and beyond — Prateek has navigated the real challenges of building in emerging markets: regulatory hurdles, cross-border payments, hiring, cultural adaptation, and finding product-market fit on the ground.
              </p>
              <p className="italic text-gray-500">
                "Breaking Into Africa" distils these hard-won lessons into a practical, no-fluff guide for entrepreneurs looking to enter or expand across the African continent.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { label: '🌍 prateek.africa', href: 'https://prateek.africa' },
                { label: '📡 trackalways.com', href: 'https://trackalways.com' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-forest border border-forest/30 px-3 py-1.5 rounded-full hover:bg-forest hover:text-white transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
