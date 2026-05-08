import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { siteConfig } from '../../config';
import { generateProductWhatsAppMessage, openWhatsApp } from '../../utils/whatsapp';
import clsx from 'clsx';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const message = generateProductWhatsAppMessage(product);
    openWhatsApp(message);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block h-full">
      <div className="bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-delicate transition-all duration-300 border border-[#f2e8e5] h-full flex flex-col relative group-hover:-translate-y-1">
        
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary-100 text-primary-800 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm border border-primary-200">
              Nuevo
            </span>
          )}
          {product.isOffer && (
            <span className="bg-accent text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm">
              Oferta
            </span>
          )}
          {product.status === 'agotado' && (
            <span className="bg-gray-100 text-gray-500 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              Agotado
            </span>
          )}
        </div>

        {/* Image */}
        <div className="aspect-[4/5] relative overflow-hidden bg-gray-50">
          <img
            src={product.image || 'https://via.placeholder.com/400x500'}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x500?text=Imagen+No+Disponible';
            }}
          />
          
          {/* Quick Actions overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.status === 'agotado'}
              className="bg-white text-dark p-3 rounded-full hover:bg-dark hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Agregar al carrito"
            >
              <ShoppingCart size={20} />
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
              title="Consultar por WhatsApp"
            >
              <MessageCircle size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="text-[11px] uppercase tracking-widest text-primary-500 mb-2 font-medium">{product.category}</div>
          <h3 className="font-serif text-lg text-dark mb-2 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-4">
              {product.isOffer && product.salePrice ? (
                <>
                  <span className="text-xl font-bold text-red-600">
                    {siteConfig.currencySymbol}{product.salePrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {siteConfig.currencySymbol}{product.price}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  {siteConfig.currencySymbol}{product.price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
