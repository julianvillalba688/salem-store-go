import React from 'react';
import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, columnsView = '4', onClear, hasFiltersActive }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-[2rem] border border-border-soft shadow-sm">
        <div className="w-20 h-20 bg-warm rounded-full flex items-center justify-center mb-6">
          <SearchX size={32} className="text-gold" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-dark mb-3">No encontramos resultados</h3>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          No hay productos que coincidan con tu búsqueda o los filtros aplicados en este momento.
        </p>
        {(hasFiltersActive || onClear) && (
          <button 
            onClick={onClear}
            className="btn-outline"
          >
            Limpiar todos los filtros
          </button>
        )}
      </div>
    );
  }

  // Determinar clases de grid basado en la vista seleccionada
  let gridClass = "grid gap-4 md:gap-6 lg:gap-8 ";
  if (columnsView === '1') {
    gridClass += "grid-cols-1";
  } else if (columnsView === '2') {
    gridClass += "grid-cols-2";
  } else {
    // Por defecto 4 columnas en desktop, 2 en mobile
    gridClass += "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className={gridClass}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "100px" }}
    >
      {products.map(product => (
        <motion.div key={product.id} variants={item}>
          <ProductCard 
            product={product} 
            viewType={columnsView === '1' ? 'list' : 'grid'} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;
