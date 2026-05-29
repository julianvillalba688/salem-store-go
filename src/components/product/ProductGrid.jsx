import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardPremium } from './ProductCardPremium';

export const ProductGrid = ({ products, loading, columns = 3 }) => {
  const gridColsClass = columns === 4 
    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";

  if (loading) {
    return (
      <div className={`grid ${gridColsClass} gap-x-6 gap-y-12`}>
        {[...Array(columns * 2)].map((_, i) => (
          <div key={i} className="aspect-[4/5] bg-salem-cream animate-pulse rounded-sm"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-40 border border-salem-ink/5 bg-salem-cream/50 mt-10"
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
      className={`grid ${gridColsClass} gap-x-6 gap-y-12`}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ProductCardPremium product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
