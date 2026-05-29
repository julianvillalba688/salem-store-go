import React from 'react';
import { motion } from 'framer-motion';

export const ProductFilters = ({ categories, activeCategory, setActiveCategory, showOffersOnly, setShowOffersOnly }) => {
  return (
    <>
      <div className="mb-10">
        <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold mb-6">Categorías</h3>
        <ul className="flex flex-row lg:flex-col flex-wrap gap-x-6 gap-y-4 font-sans text-xs tracking-widest uppercase">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`transition-all duration-500 text-left relative group ${
                  activeCategory === cat 
                    ? 'text-salem-ink font-medium' 
                    : 'text-salem-muted hover:text-salem-ink'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.span 
                    layoutId="activeCategory"
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-salem-gold rounded-full hidden lg:block"
                  />
                )}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-salem-gold transition-all duration-300 group-hover:w-full lg:hidden"></span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold mb-6">Filtros</h3>
        <label className="flex items-center gap-3 cursor-pointer group font-sans text-xs tracking-widest uppercase text-salem-muted">
          <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${showOffersOnly ? 'bg-salem-gold border-salem-gold' : 'border-salem-muted group-hover:border-salem-ink'}`}>
            {showOffersOnly && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-white"><path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <input 
            type="checkbox" 
            checked={showOffersOnly}
            onChange={(e) => setShowOffersOnly(e.target.checked)}
            className="sr-only"
          />
          <span className="group-hover:text-salem-ink transition-colors duration-300">
            Solo Ofertas
          </span>
        </label>
      </div>
    </>
  );
};
