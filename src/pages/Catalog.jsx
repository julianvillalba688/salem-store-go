import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealSection } from '../components/ui/RevealSection';
import { GoldDivider } from '../components/ui/GoldDivider';
import { ProductCardPremium } from '../components/product/ProductCardPremium';
import { FloatingWhatsApp } from '../components/action/FloatingWhatsApp';
import { useCatalog } from '../hooks/useCatalog';

const ITEMS_PER_PAGE = 24;

export const Catalog = () => {
  const { products, loading, categories } = useCatalog();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'Todos';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== activeCategory) setActiveCategory(cat);
  }, [searchParams]);

  // Reset visible count on filter change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, showOffersOnly, searchQuery, sortBy]);

  const allCategories = useMemo(() => ['Todos', ...categories], [categories]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchCategory = activeCategory === 'Todos' || product.category === activeCategory;
      const matchOffer = !showOffersOnly || product.isOffer;
      const matchSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchOffer && matchSearch;
    });

    // Sort
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)); break;
      case 'price-desc': result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    return result;
  }, [products, activeCategory, showOffersOnly, searchQuery, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <div className="min-h-screen bg-salem-ivory pt-28 pb-32">
      <FloatingWhatsApp />
      
      {/* Hero */}
      <section className="px-6 mb-12">
        <div className="max-w-[1600px] mx-auto">
          <RevealSection>
            <h1 className="font-serif text-4xl md:text-6xl text-salem-ink tracking-tight mb-4">La Colección</h1>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div className="flex items-center gap-4">
              <GoldDivider className="w-12" />
              <p className="font-sans text-sm text-salem-muted font-light">
                {filteredProducts.length} pieza{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6">
        {/* Filters bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 pb-8 border-b border-salem-ink/5">
          {/* Search */}
          <div className="relative flex-grow max-w-sm">
            <input
              type="text"
              placeholder="Buscar pieza..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-salem-ink/10 py-2.5 pr-10 font-sans text-sm text-salem-ink placeholder:text-salem-muted/50 focus:border-salem-gold focus:outline-none transition-colors duration-300"
            />
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 text-salem-muted/40" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
          
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar flex-shrink-0">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-sans text-[9px] tracking-[0.15em] uppercase whitespace-nowrap border transition-all duration-200 pressable ${
                  activeCategory === cat 
                    ? 'bg-salem-ink text-white border-salem-ink' 
                    : 'border-salem-ink/10 text-salem-muted hover:border-salem-ink/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + offers toggle */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-salem-ink/10 rounded-full px-4 py-1.5 font-sans text-[9px] tracking-[0.1em] uppercase text-salem-muted focus:outline-none focus:border-salem-gold cursor-pointer"
            >
              <option value="default">Destacados</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="name">Nombre A-Z</option>
            </select>
            
            <button
              onClick={() => setShowOffersOnly(!showOffersOnly)}
              className={`px-4 py-1.5 rounded-full font-sans text-[9px] tracking-[0.15em] uppercase border transition-all duration-200 pressable ${
                showOffersOnly 
                  ? 'bg-salem-gold text-white border-salem-gold' 
                  : 'border-salem-ink/10 text-salem-muted hover:border-salem-gold/30'
              }`}
            >
              Ofertas
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-salem-beige/15 rounded-sm mb-4" />
                <div className="h-2 w-16 bg-salem-beige/15 mb-2" />
                <div className="h-3 w-24 bg-salem-beige/15 mb-2" />
                <div className="h-2 w-12 bg-salem-beige/15" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-serif text-2xl text-salem-ink mb-3">Sin resultados</p>
            <p className="font-sans text-sm text-salem-muted font-light">Intenta con otra búsqueda o categoría.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: (idx % ITEMS_PER_PAGE) * 0.03, ease: [0.23, 1, 0.32, 1] }}
                    layout
                  >
                    <ProductCardPremium product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-20">
                <button
                  onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
                  className="px-10 py-3 border border-salem-ink/15 rounded-full font-sans text-[10px] tracking-[0.15em] uppercase text-salem-ink hover:border-salem-gold hover:text-salem-gold transition-all duration-300 pressable"
                >
                  Cargar más ({filteredProducts.length - visibleCount} restantes)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
