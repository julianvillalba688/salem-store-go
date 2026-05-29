import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RevealSection } from '../components/ui/RevealSection';
import { ProductGrid } from '../components/product/ProductGrid';
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
    <div className="min-h-screen bg-salem-ivory pt-32 pb-32">
      <FloatingWhatsApp />
      
      {/* Hero Header */}
      <section className="px-6 mb-12 text-center">
        <div className="max-w-[1280px] mx-auto">
          <RevealSection>
            <h1 className="font-serif text-4xl md:text-5xl text-salem-ink tracking-tight mb-4">La Colección</h1>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-salem-muted">
              {filteredProducts.length} pieza{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </RevealSection>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Clean Filter Bar */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-12 pb-6 border-b border-salem-ink/5">
          
          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar flex-shrink-0 max-w-full lg:max-w-[50%]">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 font-sans text-[10px] tracking-widest uppercase whitespace-nowrap transition-all duration-200 border-b-2 ${
                  activeCategory === cat 
                    ? 'border-salem-ink text-salem-ink font-medium' 
                    : 'border-transparent text-salem-muted hover:text-salem-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Search */}
            <div className="relative w-full sm:w-48">
              <input
                type="text"
                placeholder="Buscar pieza..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-salem-ink/20 py-1.5 pr-8 font-sans text-xs text-salem-ink placeholder:text-salem-muted/50 focus:border-salem-ink focus:outline-none transition-colors duration-300"
              />
              <svg className="absolute right-0 top-1/2 -translate-y-1/2 text-salem-ink/40" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none font-sans text-[10px] tracking-widest uppercase text-salem-ink focus:outline-none cursor-pointer"
            >
              <option value="default">Destacados</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid - 4 Columns */}
        <ProductGrid products={visibleProducts} loading={loading} columns={4} />

        {/* Clean Centered Load More */}
        {!loading && hasMore && (
          <div className="flex justify-center mt-20">
            <button
              onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
              className="px-12 py-3.5 bg-salem-ink text-white font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-salem-gold transition-colors duration-300"
            >
              Cargar más
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
