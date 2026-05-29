import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RevealSection } from '../components/ui/RevealSection';
import { ProductGrid } from '../components/product/ProductGrid';
import { FloatingWhatsApp } from '../components/action/FloatingWhatsApp';
import { ProductImage } from '../components/ui/ProductImage';
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
        <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
           <div className="aspect-[4/5] bg-salem-cream"></div>
           <div className="space-y-6 pt-8">
             <div className="h-4 w-24 bg-salem-cream"></div>
             <div className="h-12 w-3/4 bg-salem-cream"></div>
             <div className="h-6 w-32 bg-salem-cream"></div>
             <div className="h-24 w-full bg-salem-cream mt-8"></div>
           </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-salem-ivory text-salem-ink px-6 text-center">
        <h1 className="font-serif text-4xl mb-6">Pieza inaccesible</h1>
        <p className="font-sans text-sm text-salem-muted font-light max-w-sm mx-auto mb-8">
          La pieza que buscas ya no se encuentra disponible en este momento.
        </p>
        <Link to="/catalog" className="px-8 py-3 bg-salem-ink text-white font-sans text-[10px] tracking-widest uppercase hover:bg-salem-gold transition-colors">
          Volver a la Colección
        </Link>
      </div>
    );
  }

  const whatsappNumber = "1234567890";
  const whatsappMsg = `Hola, estoy interesada en la pieza ${product.name} (SKU: ${product.sku || product.id}).`;

  return (
    <div className="bg-salem-ivory min-h-screen pt-24 pb-32">
      <FloatingWhatsApp />
      
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-6 py-6 border-b border-salem-ink/5 mb-10">
        <nav className="font-sans text-[10px] tracking-widest uppercase text-salem-muted flex gap-2">
          <Link to="/" className="hover:text-salem-ink transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-salem-ink transition-colors">Catálogo</Link>
          <span>/</span>
          <Link to={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-salem-ink transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-salem-ink truncate">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Area (50/50 Split) */}
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left: Image (Sticky) */}
        <div className="relative lg:sticky lg:top-32 w-full bg-salem-cream">
          <ProductImage 
            src={product.image} 
            alt={product.name}
            aspect="aspect-[4/5] w-full"
          />
        </div>

        {/* Right: Info Panel */}
        <div className="flex flex-col lg:py-10">
          <RevealSection blur={false}>
            <span className="inline-block font-sans text-[10px] tracking-widest uppercase text-salem-gold mb-4">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-salem-ink mb-6 leading-[1.1] tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-8 font-sans">
              {product.salePrice ? (
                <>
                  <span className="text-2xl text-salem-gold font-medium">${product.salePrice.toLocaleString()}</span>
                  <span className="text-salem-muted line-through text-lg mb-0.5">${product.price.toLocaleString()}</span>
                </>
              ) : (
                <span className="text-2xl text-salem-ink">${product.price.toLocaleString()}</span>
              )}
            </div>
            
            <div className="w-full h-px bg-salem-ink/10 mb-8"></div>
          </RevealSection>

          <RevealSection delay={0.1} blur={false}>
            <p className="font-sans text-sm text-salem-muted font-light leading-relaxed mb-10 max-w-md text-balance">
              {product.description || "Una pieza exquisita diseñada con minuciosos detalles. Creada para destacar tu estilo en cualquier ocasión, aportando un toque de elegancia atemporal."}
            </p>
          </RevealSection>

          <RevealSection delay={0.2} blur={false}>
            <div className="flex flex-col gap-4 mb-12">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-salem-ink text-white py-4 font-sans text-xs tracking-widest uppercase hover:bg-salem-gold transition-colors duration-300"
              >
                Comprar vía WhatsApp
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </RevealSection>

          <RevealSection delay={0.3} blur={false}>
            <div className="border border-salem-ink/10 p-6 bg-salem-cream/30">
              <h3 className="font-sans text-[10px] tracking-widest uppercase text-salem-ink mb-4 font-medium">Especificaciones</h3>
              <ul className="flex flex-col gap-3 font-sans text-xs text-salem-muted font-light">
                <li className="flex justify-between">
                  <span>Disponibilidad:</span>
                  <span className="text-salem-ink">{product.stock > 0 ? 'En Stock' : 'Agotado'}</span>
                </li>
                <li className="flex justify-between">
                  <span>SKU:</span>
                  <span className="text-salem-ink">{product.sku || product.id}</span>
                </li>
              </ul>
            </div>
          </RevealSection>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 border-t border-salem-ink/5 pt-20 px-6">
          <div className="max-w-[1400px] mx-auto">
            <RevealSection className="mb-12 text-center">
              <h3 className="font-serif text-3xl text-salem-ink">También te podría gustar</h3>
            </RevealSection>
            
            <ProductGrid products={relatedProducts} loading={loading} columns={4} />
          </div>
        </div>
      )}
    </div>
  );
};
