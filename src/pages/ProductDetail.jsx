import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SalemMagneticButton } from '../components/ui/SalemMagneticButton';
import { SalemReveal } from '../components/ui/SalemReveal';
import { useCatalog } from '../hooks/useCatalog';

export const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading } = useCatalog();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      const found = products.find(p => p.slug === id || p.id === id);
      setProduct(found);
    }
  }, [id, products, loading]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id && p.image)
      .slice(0, 4);
  }, [product, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-salem-ivory pt-32 px-6 flex justify-center">
        <div className="animate-pulse w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-16">
           <div className="aspect-[4/5] bg-salem-beige/20"></div>
           <div className="space-y-8 pt-12 lg:pl-12">
             <div className="h-4 w-32 bg-salem-beige/20"></div>
             <div className="h-16 w-3/4 bg-salem-beige/20"></div>
             <div className="h-8 w-40 bg-salem-beige/20"></div>
             <div className="h-40 w-full bg-salem-beige/20 mt-12"></div>
           </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-salem-ivory text-salem-ink px-6 text-center">
        <h1 className="font-serif text-5xl md:text-7xl mb-8">Pieza inaccesible</h1>
        <p className="font-sans text-salem-muted font-light max-w-md mx-auto mb-12">La pieza que buscas ya no se encuentra en nuestra colección actual.</p>
        <SalemMagneticButton href="/catalog" variant="outline">
          Volver a la Colección
        </SalemMagneticButton>
      </div>
    );
  }

  const finalPrice = product.salePrice ? product.salePrice : product.price;
  const whatsappMsg = `Hola, estoy interesada en el producto ${product.name} (SKU: ${product.sku || product.id}) de Salem Store.`;

  return (
    <div className="bg-salem-ivory min-h-screen pt-24 pb-32 selection:bg-salem-gold/20 selection:text-salem-ink">
      
      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-6 mb-8 mt-4 hidden md:block">
        <nav className="font-sans text-[9px] tracking-[0.3em] uppercase text-salem-muted flex gap-3">
          <Link to="/" className="hover:text-salem-ink transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-salem-ink transition-colors">Colección</Link>
          <span>/</span>
          <Link to={`/catalog?category=${product.category}`} className="hover:text-salem-ink transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-salem-ink">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Massive Sticky/Scrolling Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:sticky lg:top-32 w-full h-[60vh] lg:h-[80vh] bg-salem-beige/10"
        >
          {product.image && (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center"
            />
          )}
          {/* Subtle noise over image */}
           <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
          }}></div>
        </motion.div>

        {/* Product Info */}
        <div className="flex flex-col lg:pl-8 lg:pt-12 pb-32">
          <SalemReveal delay={0.2} blur={false}>
            <span className="inline-block font-sans text-[10px] tracking-[0.3em] uppercase text-salem-gold mb-6 border border-salem-gold/30 px-4 py-1.5 rounded-full">
              {product.category}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-salem-ink mb-8 leading-[1.1] tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-10 font-sans tracking-wide">
              {product.salePrice ? (
                <>
                  <span className="text-3xl text-salem-gold font-medium">${product.salePrice.toLocaleString()}</span>
                  <span className="text-salem-muted line-through text-lg mb-1">${product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-3xl text-salem-ink">${product.price.toLocaleString()}</span>
              )}
            </div>
          </SalemReveal>
          
          <SalemReveal delay={0.3} blur={false}>
            <div className="w-16 h-px bg-salem-gold mb-10"></div>
          </SalemReveal>

          <SalemReveal delay={0.4} blur={false}>
            <p className="font-sans text-sm md:text-base text-salem-muted font-light leading-relaxed mb-16 text-balance max-w-lg">
              {product.description || "Una pieza exquisita diseñada con minuciosos detalles. Creada para destacar tu estilo en cualquier ocasión, aportando un toque de elegancia atemporal."}
            </p>
          </SalemReveal>

          <SalemReveal delay={0.5} blur={false}>
            <div className="flex flex-col gap-8 mb-16 max-w-sm">
              <SalemMagneticButton 
                href={`https://wa.me/1234567890?text=${encodeURIComponent(whatsappMsg)}`}
                variant="primary"
                className="w-full"
              >
                Solicitar por WhatsApp
              </SalemMagneticButton>
            </div>
          </SalemReveal>

          <SalemReveal delay={0.6} blur={false}>
            <div className="border-t border-salem-ink/5 pt-10">
              <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-ink mb-6">Detalles Técnicos</h3>
              <ul className="flex flex-col gap-4 font-sans text-xs tracking-widest uppercase text-salem-muted font-light">
                <li className="flex items-center justify-between border-b border-salem-ink/5 pb-2">
                  <span>Disponibilidad</span>
                  <span className="text-salem-ink font-medium">{product.stock > 0 ? 'En Stock' : 'Agotado'}</span>
                </li>
                <li className="flex items-center justify-between border-b border-salem-ink/5 pb-2">
                  <span>SKU</span>
                  <span className="text-salem-ink font-medium">{product.sku || product.id}</span>
                </li>
              </ul>
            </div>
          </SalemReveal>
        </div>
      </div>

      {/* Lookbook / Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 border-t border-salem-gold/10 pt-32 px-6">
          <div className="max-w-[1600px] mx-auto">
            <SalemReveal className="text-center mb-20">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-salem-gold mb-6">Complementos</p>
              <h3 className="font-serif text-4xl md:text-5xl text-salem-ink">Piezas Similares</h3>
            </SalemReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {relatedProducts.map((p, idx) => (
                <SalemReveal key={p.id} delay={idx * 0.15} direction="up" blur={false}>
                  <Link to={`/product/${p.slug || p.id}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-salem-beige/10">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={p.name} />
                      <div className="absolute inset-0 border border-transparent group-hover:border-salem-gold/30 transition-colors duration-500 pointer-events-none"></div>
                    </div>
                    <div className="text-center px-4">
                      <h4 className="font-serif text-lg text-salem-ink group-hover:text-salem-gold transition-colors duration-300">{p.name}</h4>
                      <p className="font-sans text-xs tracking-widest text-salem-muted mt-2">${(p.salePrice || p.price).toLocaleString()}</p>
                    </div>
                  </Link>
                </SalemReveal>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
