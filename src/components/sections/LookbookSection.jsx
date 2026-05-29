import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RevealSection } from '../ui/RevealSection';
import { ProductImage } from '../ui/ProductImage';

export const LookbookSection = ({ products }) => {
  if (!products || products.length < 3) return null;
  
  const containerRef = useRef(null);

  return (
    <section className="py-28 md:py-40 px-6 bg-salem-ink text-salem-ivory overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <RevealSection className="mb-16">
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-salem-gold mb-4">Selección curada</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight">Lookbook</h2>
        </RevealSection>

        {/* Horizontal scroll gallery — different layout from featured grid */}
        <div ref={containerRef} className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory -mx-6 px-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.23, 1, 0.32, 1] }}
              className="flex-shrink-0 snap-start"
              style={{ width: idx === 0 ? 'min(500px, 75vw)' : 'min(320px, 65vw)' }}
            >
              <Link to={`/product/${product.slug || product.id}`} className="group block relative overflow-hidden">
                <ProductImage 
                  src={product.image} 
                  alt={product.name}
                  aspect={idx === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'}
                  className="group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-salem-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400" style={{ transitionTimingFunction: 'var(--ease-out-strong)' }}>
                  <p className="font-serif text-sm text-white mb-1">{product.name}</p>
                  <span className="font-sans text-[8px] tracking-widest uppercase text-salem-gold">{product.category}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
