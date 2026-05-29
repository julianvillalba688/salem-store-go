import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SalemProductCard } from '../components/ui/SalemProductCard';
import { catalogData, categories, occasions } from '../utils/mockData';

export const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeOccasion, setActiveOccasion] = useState('Todas');
  
  const filteredProducts = catalogData.filter(product => {
    const matchCategory = activeCategory === 'Todos' || product.category === activeCategory;
    const matchOccasion = activeOccasion === 'Todas' || product.occasion === activeOccasion;
    return matchCategory && matchOccasion;
  });

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl text-carbon mb-6"
          >
            Colección Salem
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-sans text-gray-editorial font-light max-w-lg mx-auto"
          >
            Descubre piezas delicadas diseñadas para acompañarte en cada momento.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 border-y border-gold/20 py-6">
          <div className="flex flex-wrap gap-6 font-sans text-xs tracking-widest uppercase">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors duration-300 pb-1 border-b ${
                  activeCategory === cat 
                    ? 'text-carbon border-carbon' 
                    : 'text-gray-editorial border-transparent hover:text-carbon'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4 items-center font-sans text-xs tracking-widest uppercase text-carbon">
            <span className="text-gray-editorial">Ocasión:</span>
            <select 
              value={activeOccasion}
              onChange={(e) => setActiveOccasion(e.target.value)}
              className="bg-transparent border-none outline-none cursor-pointer hover:text-gold transition-colors appearance-none"
            >
              <option value="Todas">Todas</option>
              {occasions.map(occ => (
                <option key={occ} value={occ}>{occ}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <SalemProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 font-sans text-gray-editorial font-light">
            No se encontraron piezas para esta selección.
          </div>
        )}
      </div>
    </div>
  );
};
