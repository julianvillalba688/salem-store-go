import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SalemButton } from '../components/ui/SalemButton';
import { catalogData } from '../utils/mockData';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = catalogData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <h1 className="font-serif text-3xl">Producto no encontrado</h1>
      </div>
    );
  }

  const relatedProducts = catalogData.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-cream min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="font-sans text-[10px] tracking-widest uppercase text-gray-editorial mb-12 flex gap-2">
          <Link to="/" className="hover:text-carbon transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-carbon transition-colors">Colección</Link>
          <span>/</span>
          <span className="text-carbon">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] bg-gray-light"
          >
            {product.badge && (
              <span className="absolute top-6 left-6 z-10 bg-carbon text-white text-[10px] uppercase tracking-widest px-4 py-2 font-sans">
                {product.badge}
              </span>
            )}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-gold mb-4">
              {product.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-carbon mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="font-sans text-2xl text-carbon mb-8 font-light">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="w-12 h-px bg-gold/30 mb-8"></div>

            <p className="font-sans text-gray-editorial font-light leading-relaxed mb-12">
              {product.description}
            </p>

            <div className="flex flex-col gap-6 font-sans text-sm tracking-wider uppercase mb-12">
              <div className="flex items-center gap-4">
                <span className="text-carbon w-24">Material:</span>
                <span className="text-gray-editorial font-light">Oro de 18k / Plata 925</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-carbon w-24">Ocasión:</span>
                <span className="text-gray-editorial font-light">{product.occasion}</span>
              </div>
            </div>

            <SalemButton 
              href={`https://wa.me/1234567890?text=${encodeURIComponent(product.whatsappMessage)}`}
              variant="primary"
              className="w-full sm:w-auto"
            >
              Pedir por WhatsApp
            </SalemButton>

            <div className="mt-12 flex items-center gap-4 text-xs font-sans text-gray-editorial">
              <span>✓ Atención Personalizada</span>
              <span>✓ Envío Seguro</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
