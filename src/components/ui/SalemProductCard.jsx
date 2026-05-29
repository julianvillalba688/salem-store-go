import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const SalemProductCard = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col relative"
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-light aspect-[3/4] mb-6">
        {product.badge && (
          <span className="absolute top-4 left-4 z-10 bg-carbon text-white text-[10px] uppercase tracking-widest px-3 py-1 font-sans">
            {product.badge}
          </span>
        )}
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-carbon/0 group-hover:bg-carbon/5 transition-colors duration-500" />
      </Link>
      
      <div className="flex flex-col items-center text-center px-4">
        <span className="text-gray-editorial text-[10px] uppercase tracking-[0.2em] mb-2 font-sans">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-xl text-carbon mb-2 hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="font-sans text-sm text-carbon">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};
