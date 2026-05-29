import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const SalemProductCard = ({ product }) => {
  const finalPrice = product.salePrice ? product.salePrice : product.price;
  
  return (
    <div className="group flex flex-col relative w-full h-full">
      <Link to={`/product/${product.slug || product.id}`} className="block relative overflow-hidden bg-salem-beige/10 aspect-[3/4] mb-6 rounded-sm">
        
        {/* Animated Gold Border Reveal on Hover */}
        <div className="absolute inset-0 border border-salem-gold opacity-0 scale-95 group-hover:opacity-20 group-hover:scale-100 transition-all duration-700 ease-[0.16,1,0.3,1] z-30 pointer-events-none"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isOffer && (
            <span className="bg-salem-gold text-white text-[9px] uppercase tracking-widest px-3 py-1 font-sans">
              Oferta
            </span>
          )}
          {product.isNew && (
            <span className="bg-salem-ink text-white text-[9px] uppercase tracking-widest px-3 py-1 font-sans">
              Nuevo
            </span>
          )}
        </div>
        
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-[1.05]"
          loading="lazy"
        />
        
        {/* Premium Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-salem-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
        
        {/* Quick View Text */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
          <span className="font-sans text-[9px] tracking-widest uppercase text-white border-b border-white pb-1">
            Ver detalle
          </span>
        </div>
      </Link>
      
      <div className="flex flex-col items-center text-center px-4 mt-auto">
        <span className="text-salem-muted text-[9px] uppercase tracking-[0.2em] mb-2 font-sans transition-colors duration-300 group-hover:text-salem-gold">
          {product.category}
        </span>
        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="font-serif text-lg text-salem-ink mb-2 transition-colors duration-300 group-hover:text-salem-gold">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3 font-sans text-xs tracking-wider">
          {product.salePrice ? (
            <>
              <span className="text-salem-gold font-medium">${product.salePrice.toLocaleString()}</span>
              <span className="text-salem-muted line-through opacity-60">${product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-salem-ink">${product.price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};
