import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SalemButton } from '../components/ui/SalemButton';
import { useCatalog } from '../hooks/useCatalog';

export const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading } = useCatalog();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      // Allow finding by slug or id
      const found = products.find(p => p.slug === id || p.id === id);
      setProduct(found);
    }
  }, [id, products, loading]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id && p.image)
      .slice(0, 3);
  }, [product, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-salem-cream pt-32 px-6 flex justify-center">
        <div className="animate-pulse w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-16">
           <div className="aspect-[3/4] bg-salem-beige/30"></div>
           <div className="space-y-6 pt-12">
             <div className="h-4 w-24 bg-salem-beige/30"></div>
             <div className="h-12 w-3/4 bg-salem-beige/30"></div>
             <div className="h-8 w-32 bg-salem-beige/30"></div>
             <div className="h-32 w-full bg-salem-beige/30 mt-12"></div>
           </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-salem-cream text-salem-black">
        <h1 className="font-serif text-3xl mb-6">Pieza no encontrada</h1>
        <Link to="/catalog" className="text-salem-gold hover:text-salem-black transition-colors font-sans text-xs tracking-widest uppercase border-b border-salem-gold pb-1">
          Volver a la colección
        </Link>
      </div>
    );
  }

  const finalPrice = product.salePrice ? product.salePrice : product.price;
  const whatsappMsg = `Hola, estoy interesada en el producto ${product.name} (SKU: ${product.sku || product.id}) de Salem Store.`;

  return (
    <div className="bg-salem-cream min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="font-sans text-[10px] tracking-widest uppercase text-salem-muted mb-12 flex gap-2">
          <Link to="/" className="hover:text-salem-black transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-salem-black transition-colors">Colección</Link>
          <span>/</span>
          <span className="text-salem-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] bg-salem-ivory"
          >
             <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
              {product.isOffer && (
                <span className="bg-salem-gold text-white text-[10px] uppercase tracking-widest px-4 py-2 font-sans">
                  Oferta
                </span>
              )}
              {product.isNew && (
                <span className="bg-salem-black text-white text-[10px] uppercase tracking-widest px-4 py-2 font-sans">
                  Nuevo
                </span>
              )}
            </div>
            {product.image && (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sticky top-32"
          >
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold mb-4">
              {product.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-salem-black mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8 font-sans">
              {product.salePrice ? (
                <>
                  <span className="text-2xl text-salem-gold font-medium">${product.salePrice.toLocaleString()}</span>
                  <span className="text-salem-muted line-through text-sm">${product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-2xl text-salem-black">${product.price.toLocaleString()}</span>
              )}
            </div>
            
            <div className="w-12 h-px bg-salem-gold/30 mb-8"></div>

            <p className="font-sans text-sm text-salem-muted font-light leading-relaxed mb-12">
              {product.description || "Pieza elegante diseñada con detalles meticulosos para acompañar tus mejores momentos."}
            </p>

            <div className="flex flex-col gap-6 font-sans text-[10px] tracking-widest uppercase mb-12">
              <div className="flex items-center gap-4">
                <span className="text-salem-black w-24">Estado:</span>
                <span className="text-salem-muted font-light">{product.status || 'Disponible'}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-salem-black w-24">SKU:</span>
                <span className="text-salem-muted font-light">{product.sku || product.id}</span>
              </div>
            </div>

            <SalemButton 
              href={`https://wa.me/1234567890?text=${encodeURIComponent(whatsappMsg)}`}
              variant="primary"
              className="w-full sm:w-auto"
            >
              Pedir por WhatsApp
            </SalemButton>

            <div className="mt-12 pt-8 border-t border-salem-black/5 flex flex-col gap-4 text-[10px] font-sans tracking-widest uppercase text-salem-muted">
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-salem-gold rounded-full"></div>
                Atención Personalizada
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 bg-salem-gold rounded-full"></div>
                Envíos Seguros
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-40 border-t border-salem-gold/10 pt-20">
            <h3 className="font-serif text-3xl text-salem-black mb-12 text-center">Te podría interesar</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map(p => (
                <div key={p.id} className="scale-95 hover:scale-100 transition-transform duration-500">
                  <Link to={`/product/${p.slug || p.id}`} className="block relative aspect-[3/4] overflow-hidden mb-4">
                    <img src={p.image} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={p.name} />
                  </Link>
                  <div className="text-center">
                    <h4 className="font-serif text-lg text-salem-black hover:text-salem-gold transition-colors">{p.name}</h4>
                    <p className="font-sans text-xs text-salem-muted mt-2">${(p.salePrice || p.price).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
