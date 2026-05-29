import React from 'react';
import { Link } from 'react-router-dom';
import { RevealSection } from '../ui/RevealSection';
import { ProductImage } from '../ui/ProductImage';

export const OccasionSection = ({ categoryCovers }) => {
  if (!categoryCovers || categoryCovers.length === 0) return null;

  // Select 4 key occasion categories
  const occasionMap = [
    { label: 'Elegancia Formal', match: 'Oro Laminado 18K', icon: '✦' },
    { label: 'Estilo Diario', match: 'Pulseras', icon: '○' },
    { label: 'Regalos Especiales', match: 'Juegos', icon: '◇' },
    { label: 'Accesorios', match: 'Aretes', icon: '△' },
  ];

  const occasions = occasionMap.map(occ => {
    const cover = categoryCovers.find(c => c.category === occ.match);
    return cover ? { ...occ, ...cover } : null;
  }).filter(Boolean);

  if (occasions.length === 0) return null;

  return (
    <section className="py-28 md:py-40 px-6 bg-salem-ivory">
      <div className="max-w-[1400px] mx-auto">
        <RevealSection className="mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-salem-ink tracking-tight mb-4">Para cada ocasión</h2>
          <p className="font-sans text-sm text-salem-muted font-light max-w-md">
            Piezas pensadas para acompañarte en cada momento.
          </p>
        </RevealSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {occasions.map((occ, idx) => (
            <RevealSection key={occ.category} delay={idx * 0.08} direction="up" blur={false}>
              <Link 
                to={`/catalog?category=${encodeURIComponent(occ.category)}`}
                className="group block relative overflow-hidden"
              >
                <div className="relative">
                  <ProductImage 
                    src={occ.product.image} 
                    alt={occ.label} 
                    aspect="aspect-[3/4]" 
                    className="group-hover:scale-105 transition-transform duration-700" 
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-salem-ink/70 via-salem-ink/20 to-transparent z-10" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20">
                    <span className="text-salem-gold text-lg mb-1 block">{occ.icon}</span>
                    <h3 className="font-serif text-base md:text-lg text-white mb-1 leading-tight">{occ.label}</h3>
                    <span className="font-sans text-[9px] tracking-widest uppercase text-white/60">
                      {occ.count} piezas
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
