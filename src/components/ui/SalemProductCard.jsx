import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const SalemProductCard = ({ product }) => {
  const finalPrice = product.salePrice ? product.salePrice : product.price;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col relative w-full"
    >
      <Link to={`/product/${product.slug || product.id}`} className="block relative overflow-hidden bg-salem-ivory aspect-[3/4] mb-6">
        <div className="absolute inset-0 border border-transparent group-hover:border-salem-gold/20 transition-colors duration-700 z-20 pointer-events-none"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isOffer && (
            <span className="bg-salem-gold text-white text-[9px] uppercase tracking-widest px-3 py-1 font-sans">
              Oferta
            </span>
          )}
          {product.isNew && (
            <span className="bg-salem-black text-white text-[9px] uppercase tracking-widest px-3 py-1 font-sans">
              Nuevo
            </span>
          )}
        </div>
        
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-salem-black/0 group-hover:bg-salem-black/[0.03] transition-colors duration-500 z-10" />
      </Link>
      
      <div className="flex flex-col items-center text-center px-4">
        <span className="text-salem-muted text-[9px] uppercase tracking-[0.2em] mb-2 font-sans">
          {product.category}
        </span>
        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="font-serif text-lg text-salem-black mb-2 hover:text-salem-gold transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3 font-sans text-sm">
          {product.salePrice ? (
            <>
              <span className="text-salem-gold font-medium">${product.salePrice.toLocaleString()}</span>
              <span className="text-salem-muted line-through text-xs">${product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-salem-black">${product.price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
