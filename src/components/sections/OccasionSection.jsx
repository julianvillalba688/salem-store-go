import React from 'react';
import { Link } from 'react-router-dom';
import { RevealSection } from '../ui/RevealSection';
import { ProductImage } from '../ui/ProductImage';

export const OccasionSection = ({ categoryCovers }) => {
  if (!categoryCovers || categoryCovers.length === 0) return null;

  // Select 4 key occasion categories
  const occasionMap = [
    { label: 'Elegancia Formal', match: 'Oro Laminado 18K' },
    { label: 'Estilo Diario', match: 'Pulseras' },
    { label: 'Regalos Especiales', match: 'Juegos' },
    { label: 'Accesorios', match: 'Aretes' },
  ];

  const occasions = occasionMap.map(occ => {
    const cover = categoryCovers.find(c => c.category === occ.match);
    return cover ? { ...occ, ...cover } : null;
  }).filter(Boolean);

  if (occasions.length === 0) return null;

  return (
    <section className="py-24 md:py-32 px-6 bg-salem-ivory border-t border-salem-cream">
      <div className="max-w-[1280px] mx-auto">
        <RevealSection className="mb-12 flex flex-col items-center text-center">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-salem-gold mb-4 block">Colecciones</span>
          <h2 className="font-serif text-3xl md:text-4xl text-salem-ink tracking-tight mb-4">Para cada ocasión</h2>
        </RevealSection>

        {/* 4 on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ, idx) => (
            <RevealSection key={occ.category} delay={idx * 0.1} direction="up" blur={false}>
              <Link 
                to={`/catalog?category=${encodeURIComponent(occ.category)}`}
                className="group block relative overflow-hidden bg-salem-cream"
              >
                <div className="relative">
                  <ProductImage 
                    src={occ.product.image} 
                    alt={occ.label} 
                    aspect="aspect-[4/5]" 
                    className="group-hover:scale-105 transition-transform duration-700 ease-out-strong" 
                  />
                  {/* Clean dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-salem-ink/80 via-salem-ink/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col items-center text-center translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out-strong">
                    <h3 className="font-serif text-lg md:text-xl text-white mb-2 leading-tight">{occ.label}</h3>
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/70">
                      Explorar colección
                    </span>
                  </div>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};
