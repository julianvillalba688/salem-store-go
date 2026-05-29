import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RevealSection } from '../ui/RevealSection';

export const LookbookSection = ({ lookbookProducts }) => {
  if (!lookbookProducts || lookbookProducts.length < 3) return null;

  return (
    <section className="py-32 md:py-48 px-6 bg-salem-ivory">
      <div className="max-w-[1400px] mx-auto">
        <RevealSection className="text-center mb-24">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-salem-gold mb-6">Inspiración</p>
          <h2 className="font-serif text-4xl md:text-6xl text-salem-ink">Lookbook Salem</h2>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          {/* Big Feature */}
          <div className="md:col-span-7">
            <RevealSection direction="up" blur={false}>
              <Link to={`/product/${lookbookProducts[0].slug || lookbookProducts[0].id}`} className="block relative group overflow-hidden bg-salem-beige/20 aspect-[4/5] md:aspect-[16/10]">
                {lookbookProducts[0].image && (
                  <img src={lookbookProducts[0].image} alt={lookbookProducts[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                )}
                <div className="absolute inset-0 bg-salem-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <span className="bg-salem-ivory text-salem-ink px-8 py-3 text-[10px] tracking-widest uppercase font-sans">Ver pieza</span>
                </div>
              </Link>
            </RevealSection>
          </div>
          
          {/* Double Stack */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-10">
             {lookbookProducts.slice(1, 3).map((product, idx) => (
                <RevealSection key={product.id} direction="up" delay={0.2 * (idx+1)} blur={false} className="h-full">
                  <Link to={`/product/${product.slug || product.id}`} className="block relative group overflow-hidden bg-salem-beige/20 h-full aspect-[4/5] md:aspect-auto">
                    {product.image && (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    )}
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="bg-salem-ivory text-salem-ink px-4 py-2 text-[9px] tracking-widest uppercase font-sans shadow-premium">
                        {product.name}
                      </span>
                    </div>
                  </Link>
                </RevealSection>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};
