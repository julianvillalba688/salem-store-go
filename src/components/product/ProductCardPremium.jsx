import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProductImage } from '../ui/ProductImage';

export const ProductCardPremium = ({ product }) => {
  const whatsappMsg = `Hola, me interesa: ${product.name} (${product.sku || product.id})`;

  return (
    <div className="group flex flex-col relative w-full h-full">
      {/* Outer shell (High-End Double-Bezel) */}
      <div className="relative p-1 bg-salem-beige/5 rounded-sm border border-salem-ink/[0.03] group-hover:border-salem-gold/20 transition-colors duration-700 mb-5" style={{ transitionTimingFunction: 'var(--ease-out-strong)' }}>
        {/* Inner core */}
        <Link to={`/product/${product.slug || product.id}`} className="block relative overflow-hidden">
          
          {/* Badges */}
          <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
            {product.isOffer && (
              <span className="bg-salem-gold text-white text-[8px] uppercase tracking-[0.15em] px-2.5 py-1 font-sans font-medium">
                Oferta
              </span>
            )}
            {product.isNew && (
              <span className="bg-salem-ink text-white text-[8px] uppercase tracking-[0.15em] px-2.5 py-1 font-sans font-medium">
                Nuevo
              </span>
            )}
          </div>
          
          <div className="group-hover:scale-[1.03] transition-transform duration-700" style={{ transitionTimingFunction: 'var(--ease-out-strong)' }}>
            <ProductImage src={product.image} alt={product.name} />
          </div>
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-salem-ink/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
          
          {/* Quick actions on hover */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400" style={{ transitionTimingFunction: 'var(--ease-out-strong)' }}>
            <span className="font-sans text-[8px] tracking-[0.15em] uppercase text-white bg-salem-ink/70 backdrop-blur-sm px-4 py-2">
              Ver detalle
            </span>
          </div>
        </Link>
      </div>
      
      {/* Product info */}
      <div className="flex flex-col items-start px-1 mt-auto">
        <span className="text-salem-muted text-[8px] uppercase tracking-[0.2em] mb-1.5 font-sans">
          {product.category}
        </span>
        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="font-serif text-base text-salem-ink mb-2 group-hover:text-salem-gold transition-colors duration-300 leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 font-sans text-xs tracking-wider">
            {product.salePrice ? (
              <>
                <span className="text-salem-gold font-medium">${product.salePrice.toLocaleString()}</span>
                <span className="text-salem-muted line-through text-[10px]">${product.price.toLocaleString()}</span>
              </>
            ) : (
              <span className="text-salem-ink">${product.price.toLocaleString()}</span>
            )}
          </div>
          <a
            href={`https://wa.me/1234567890?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-salem-gold/10 flex items-center justify-center hover:bg-salem-gold hover:text-white text-salem-gold transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Pedir por WhatsApp"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
};
