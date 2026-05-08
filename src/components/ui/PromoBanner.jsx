import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const PromoBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-primary-50 border border-primary-100 rounded-2xl p-6 text-center shadow-delicate mb-8 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={64} className="text-primary-600" />
      </div>
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 bg-white text-primary-600 text-xs font-bold tracking-widest uppercase rounded-full mb-4 shadow-sm border border-primary-100">
          Nueva Colección
        </span>
        <h3 className="text-2xl font-serif font-bold text-dark mb-2">Primavera Éterea</h3>
        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
          Descubre piezas únicas bañadas en oro rosa y cristales finos.
        </p>
        <button className="bg-dark text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary-700 transition-colors w-full shadow-md">
          Ver Colección
        </button>
      </div>
    </motion.div>
  );
};

export default PromoBanner;
