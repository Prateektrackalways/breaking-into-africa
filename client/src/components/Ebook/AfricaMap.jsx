import React, { useState } from 'react';

const REGIONS = [
  {
    id: 'east',
    label: 'East Africa',
    color: '#2d6b45',
    hoverColor: '#c9a84c',
    summary: 'Kenya, Ethiopia, Rwanda, Tanzania, Uganda · Tech hub "Silicon Savannah" · M-Pesa mobile payments · Fastest-growing startup ecosystem',
    // Approximate SVG path for East Africa region
    path: 'M 310 180 L 340 170 L 370 175 L 380 200 L 375 230 L 360 260 L 340 280 L 320 270 L 305 250 L 300 220 Z',
  },
  {
    id: 'west',
    label: 'West Africa',
    color: '#1a4a2e',
    hoverColor: '#c9a84c',
    summary: 'Nigeria, Ghana, Ivory Coast, Senegal · Largest economy (Nigeria $440B GDP) · Fastest-growing megacities · ECOWAS free trade zone',
    path: 'M 160 170 L 200 160 L 240 165 L 270 180 L 275 210 L 260 230 L 230 240 L 195 235 L 165 220 L 150 195 Z',
  },
  {
    id: 'south',
    label: 'Southern Africa',
    color: '#0d4a35',
    hoverColor: '#c9a84c',
    summary: 'South Africa, Botswana, Zambia, Zimbabwe, Mozambique · Most industrialised economy · World-class infrastructure · JSE largest stock exchange in Africa',
    path: 'M 270 310 L 310 300 L 340 310 L 350 340 L 345 380 L 320 410 L 295 415 L 265 390 L 255 355 L 260 325 Z',
  },
  {
    id: 'north',
    label: 'North Africa',
    color: '#3a6b52',
    hoverColor: '#c9a84c',
    summary: 'Morocco, Egypt, Tunisia, Algeria, Libya · Gateway to Europe & Middle East · Morocco: EU & US free trade agreements · Egypt: 105M population, e-commerce hub',
    path: 'M 160 80 L 220 70 L 300 75 L 360 80 L 370 130 L 340 150 L 280 155 L 220 150 L 165 140 L 150 110 Z',
  },
  {
    id: 'central',
    label: 'Central Africa',
    color: '#1a5a38',
    hoverColor: '#c9a84c',
    summary: 'DRC, Cameroon, Congo · Vast mineral wealth (coltan, lithium, cobalt) · Amazon-scale rainforest · Emerging opportunity for resource & agribusiness sectors',
    path: 'M 255 195 L 300 185 L 330 195 L 335 225 L 320 255 L 295 265 L 265 260 L 248 235 L 248 210 Z',
  },
];

export default function AfricaMap() {
  const [activeRegion, setActiveRegion] = useState(null);

  const active = REGIONS.find(r => r.id === activeRegion);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-2">
        <h3 className="text-xl font-bold text-forest">Africa by Region</h3>
        <p className="text-sm text-gray-500 mt-1">Hover or tap a region to see key facts</p>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* SVG Map */}
        <div className="flex-1 flex items-center justify-center p-4 min-h-[280px]">
          <svg
            viewBox="0 80 480 380"
            className="w-full max-w-xs"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' }}
          >
            {/* Continent outline */}
            <ellipse cx="255" cy="250" rx="180" ry="200" fill="#e8f0e8" stroke="#c9a84c" strokeWidth="1.5" />

            {/* Region shapes */}
            {REGIONS.map(region => (
              <path
                key={region.id}
                d={region.path}
                fill={activeRegion === region.id ? region.hoverColor : region.color}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setActiveRegion(region.id)}
                onMouseLeave={() => setActiveRegion(null)}
                onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                style={{ opacity: activeRegion && activeRegion !== region.id ? 0.6 : 1 }}
              />
            ))}

            {/* Region labels */}
            {REGIONS.map(region => {
              const bounds = getPathBounds(region.path);
              return (
                <text
                  key={region.id + '-label'}
                  x={bounds.cx}
                  y={bounds.cy}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="600"
                  fill="white"
                  className="pointer-events-none select-none"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {region.label.split(' ')[0]}
                </text>
              );
            })}
          </svg>
        </div>

        {/* Info panel */}
        <div className="lg:w-72 p-6 flex flex-col justify-center">
          {active ? (
            <div className="animate-fadeIn">
              <div className="inline-block bg-gold/15 text-gold text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                {active.label}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{active.summary}</p>
            </div>
          ) : (
            <div className="text-gray-400 text-sm text-center lg:text-left">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center mx-auto lg:mx-0 mb-3">
                <svg className="w-5 h-5 text-forest/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"/>
                </svg>
              </div>
              <p>Hover over a region on the map to see a summary</p>
              <div className="mt-4 space-y-2">
                {REGIONS.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setActiveRegion(r.id)}
                    className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-forest hover:bg-forest/5 transition"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper to estimate center of a path from its coordinate pairs
function getPathBounds(pathStr) {
  const nums = pathStr.match(/\d+\.?\d*/g)?.map(Number) || [];
  const xs = [], ys = [];
  for (let i = 0; i < nums.length - 1; i += 2) {
    xs.push(nums[i]);
    ys.push(nums[i + 1]);
  }
  return {
    cx: xs.reduce((a, b) => a + b, 0) / xs.length,
    cy: ys.reduce((a, b) => a + b, 0) / ys.length,
  };
}
