import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardPremium } from './ProductCardPremium';

export const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-16">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="aspect-[3/4] bg-salem-beige/20 animate-pulse rounded-sm"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-40 border border-salem-gold/10 bg-salem-ivory/50 mt-10"
      >
        <p className="font-serif text-2xl text-salem-ink mb-4">Sin resultados</p>
        <p className="font-sans text-xs tracking-widest text-salem-muted uppercase">
          Intenta con otra búsqueda o categoría.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-16"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCardPremium product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
