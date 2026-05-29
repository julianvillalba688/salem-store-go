import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RevealSection } from '../ui/RevealSection';
import { ProductImage } from '../ui/ProductImage';

export const LookbookSection = ({ products }) => {
  if (!products || products.length < 3) return null;
  
  const containerRef = useRef(null);

  return (
    <section className="py-24 md:py-32 px-6 bg-salem-cream overflow-hidden border-t border-salem-ivory">
      <div className="max-w-[1400px] mx-auto">
        <RevealSection className="mb-12 flex flex-col items-center text-center">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-salem-gold mb-4 block">Inspiración</span>
          <h2 className="font-serif text-3xl md:text-4xl text-salem-ink tracking-tight mb-4">Lookbook</h2>
        </RevealSection>

        {/* Clean horizontal gallery with consistent sizes */}
        <div ref={containerRef} className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-8 snap-x snap-mandatory -mx-6 px-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="flex-shrink-0 snap-start w-[280px] md:w-[320px]"
            >
              <Link to={`/product/${product.slug || product.id}`} className="group block relative overflow-hidden bg-salem-ivory">
                <ProductImage 
                  src={product.image} 
                  alt={product.name}
                  aspect="aspect-[4/5]"
                  className="group-hover:scale-105 transition-transform duration-700 ease-out-strong"
                />
                <div className="absolute inset-0 bg-salem-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white border border-white/50 px-6 py-2.5 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    Ver pieza
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
