import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SalemProductCard } from '../components/ui/SalemProductCard';
import { useCatalog } from '../hooks/useCatalog';

export const Catalog = () => {
  const { products, loading } = useCatalog();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['Todos', ...Array.from(cats)].filter(Boolean);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = activeCategory === 'Todos' || product.category === activeCategory;
      const matchOffer = !showOffersOnly || product.isOffer;
      // Ensure product has image to not break layout if data is dirty
      return matchCategory && matchOffer && product.image;
    });
  }, [products, activeCategory, showOffersOnly]);

  return (
    <div className="min-h-screen bg-salem-ivory pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-5xl text-salem-black mb-6"
          >
            Colección Salem
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm text-salem-muted font-light max-w-lg mx-auto"
          >
            Descubre piezas delicadas diseñadas para acompañarte en cada momento.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-y border-salem-gold/20 py-6">
          <div className="flex flex-wrap gap-6 font-sans text-[10px] tracking-[0.2em] uppercase">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors duration-500 pb-1 border-b ${
                  activeCategory === cat 
                    ? 'text-salem-black border-salem-black' 
                    : 'text-salem-muted border-transparent hover:text-salem-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 font-sans text-[10px] tracking-widest uppercase text-salem-black">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={showOffersOnly}
                onChange={(e) => setShowOffersOnly(e.target.checked)}
                className="w-4 h-4 accent-salem-gold cursor-pointer"
              />
              <span className="text-salem-muted group-hover:text-salem-black transition-colors duration-300">
                Solo Ofertas
              </span>
            </label>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="aspect-[3/4] bg-salem-beige/20 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SalemProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32 font-sans text-sm tracking-widest text-salem-muted font-light uppercase"
              >
                No se encontraron piezas para esta selección.
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
