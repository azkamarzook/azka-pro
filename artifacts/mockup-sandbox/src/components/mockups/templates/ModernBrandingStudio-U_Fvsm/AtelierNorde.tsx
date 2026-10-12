import './fonts.css';
import React from "react";

export default function AtelierNorde() {
  return (
    <div className="w-full h-full bg-[#F5F3EC] text-[#1a1918] font-['Inter'] flex flex-col relative overflow-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-50 mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-[#e8e4db] pointer-events-none" />
      <div className="absolute right-12 top-0 bottom-0 w-px bg-[#e8e4db] pointer-events-none" />

      {/* Header */}
      <header className="relative flex justify-between items-center px-12 py-8 border-b border-[#e8e4db] z-10">
        <div className="text-xl font-['Playfair_Display'] font-semibold tracking-wide">
          ATELIER NORDE
        </div>
        <nav className="flex space-x-14 text-xs uppercase tracking-[0.15em] text-[#5c564d]">
          <a href="#" className="hover:text-[#1a1918] transition-colors">
            Work
          </a>
          <a href="#" className="hover:text-[#1a1918] transition-colors">
            Studio
          </a>
          <a href="#" className="hover:text-[#1a1918] transition-colors">
            Journal
          </a>
          <a href="#" className="hover:text-[#1a1918] transition-colors">
            Contact
          </a>
        </nav>
        <button className="px-7 py-3.5 border border-[#1a1918] text-xs uppercase tracking-[0.15em] hover:bg-[#1a1918] hover:text-[#F5F3EC] transition-all duration-300">
          Start a project
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center relative z-10 px-12">
        <div className="pl-12">
          <div className="mb-10 uppercase tracking-[0.25em] text-[#7a7367] text-[10px] flex items-center gap-4">
            <div className="w-8 h-px bg-[#7a7367]" />
            Strategic Branding & Design
          </div>

          <h1 className="font-['Playfair_Display'] text-[115px] leading-[1.05] tracking-tight max-w-[1000px] text-[#1a1918]">
            Brand systems, <br />
            <span className="text-[#8b7d6b] font-light">
              crafted
            </span>{" "}
            with care.
          </h1>
        </div>

        {/* Footer / Services */}
        <div className="absolute bottom-0 left-12 right-12 border-t border-[#e8e4db]">
          <div className="grid grid-cols-4 h-[200px]">
            <div className="p-8 border-r border-[#e8e4db] flex flex-col justify-between group hover:bg-[#efece3] transition-colors cursor-pointer">
              <h3 className="uppercase tracking-[0.2em] text-[10px] text-[#7a7367]">
                01.
              </h3>
              <p className="font-['Playfair_Display'] text-2xl group-hover:italic transition-all">
                Art Direction
              </p>
            </div>
            <div className="p-8 border-r border-[#e8e4db] flex flex-col justify-between group hover:bg-[#efece3] transition-colors cursor-pointer">
              <h3 className="uppercase tracking-[0.2em] text-[10px] text-[#7a7367]">
                02.
              </h3>
              <p className="font-['Playfair_Display'] text-2xl group-hover:italic transition-all">
                Visual Identity
              </p>
            </div>
            <div className="p-8 border-r border-[#e8e4db] flex flex-col justify-between group hover:bg-[#efece3] transition-colors cursor-pointer">
              <h3 className="uppercase tracking-[0.2em] text-[10px] text-[#7a7367]">
                03.
              </h3>
              <p className="font-['Playfair_Display'] text-2xl group-hover:italic transition-all">
                Digital Experience
              </p>
            </div>
            <div className="p-8 flex items-center justify-center group cursor-pointer">
              <div className="w-20 h-20 border border-[#1a1918] rounded-full flex items-center justify-center group-hover:bg-[#1a1918] group-hover:text-[#F5F3EC] transition-all duration-500">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
                >
                  <line x1="5" y1="19" x2="19" y2="5"></line>
                  <polyline points="9 5 19 5 19 15"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative monogram */}
      <div className="absolute top-40 right-24 opacity-10 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="99" stroke="#1a1918" strokeWidth="1"/>
          <path d="M70 130L100 70L130 130" stroke="#1a1918" strokeWidth="1"/>
          <path d="M85 100H115" stroke="#1a1918" strokeWidth="1"/>
          <path d="M100 70V130" stroke="#1a1918" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  );
}
