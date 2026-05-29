import React from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from '../ui/ProductImage';

export const ProductCardPremium = ({ product }) => {
  const whatsappMsg = `Hola, me interesa: ${product.name} (${product.sku || product.id})`;

  return (
    <div className="group flex flex-col relative w-full h-full">
      <Link to={`/product/${product.slug || product.id}`} className="block relative overflow-hidden bg-salem-cream mb-4">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {product.isOffer && (
            <span className="bg-salem-gold text-white text-[9px] uppercase tracking-wider px-2 py-0.5 font-sans">
              Oferta
            </span>
          )}
          {product.isNew && (
            <span className="bg-salem-ink text-white text-[9px] uppercase tracking-wider px-2 py-0.5 font-sans">
              Nuevo
            </span>
          )}
        </div>
        
        <div className="group-hover:scale-105 transition-transform duration-700 ease-out-strong">
          {/* Always enforce 4:5 aspect ratio on the card image */}
          <ProductImage src={product.image} alt={product.name} aspect="aspect-[4/5]" />
        </div>
        
        {/* Quick actions on hover */}
        <div className="absolute inset-0 bg-salem-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
          <span className="font-sans text-[10px] tracking-widest uppercase text-white bg-salem-ink px-6 py-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
            Ver detalle
          </span>
        </div>
      </Link>
      
      {/* Product info */}
      <div className="flex flex-col items-center text-center px-2 mt-auto">
        <span className="text-salem-muted text-[10px] uppercase tracking-widest mb-2 font-sans">
          {product.category}
        </span>
        <Link to={`/product/${product.slug || product.id}`}>
          <h3 className="font-serif text-lg text-salem-ink mb-2 group-hover:text-salem-gold transition-colors duration-300 leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-3 font-sans text-sm tracking-wide w-full mb-3">
          {product.salePrice ? (
            <>
              <span className="text-salem-gold font-medium">${product.salePrice.toLocaleString()}</span>
              <span className="text-salem-muted line-through text-xs">${product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-salem-ink">${product.price.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};
