import React, { useState, useMemo } from 'react';
import { RevealSection } from '../components/ui/RevealSection';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductSearch } from '../components/product/ProductSearch';
import { useCatalog } from '../hooks/useCatalog';
import { FloatingWhatsApp } from '../components/action/FloatingWhatsApp';

export const Catalog = () => {
  const { products, loading } = useCatalog();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['Todos', ...Array.from(cats)].filter(Boolean);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = activeCategory === 'Todos' || product.category === activeCategory;
      const matchOffer = !showOffersOnly || product.isOffer;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchOffer && matchSearch;
    });
  }, [products, activeCategory, showOffersOnly, searchQuery]);

  return (
    <div className="min-h-screen bg-salem-ivory pt-32 pb-32">
      <FloatingWhatsApp />
      
      {/* Hero Catalog */}
      <section className="px-6 mb-20">
        <div className="max-w-[1600px] mx-auto">
          <RevealSection>
            <h1 className="font-serif text-5xl md:text-7xl text-salem-ink tracking-tight mb-6">La Colección</h1>
          </RevealSection>
          <RevealSection delay={0.2}>
            <p className="font-sans text-sm md:text-base text-salem-muted font-light max-w-xl text-balance">
              Explora nuestra selección completa. Piezas delicadas diseñadas para acompañarte en cada momento, elevando tu estilo con sutileza y elegancia.
            </p>
          </RevealSection>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Sticky Sidebar Filters */}
        <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit z-20 bg-salem-ivory/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none py-4 lg:py-0 border-b border-salem-gold/10 lg:border-none mb-8 lg:mb-0">
          <RevealSection delay={0.3} direction="right">
            <div className="flex flex-col gap-10">
              <ProductSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <ProductFilters 
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                showOffersOnly={showOffersOnly}
                setShowOffersOnly={setShowOffersOnly}
              />
            </div>
          </RevealSection>
        </aside>

        {/* Grid */}
        <main className="lg:col-span-9">
          <ProductGrid products={filteredProducts} loading={loading} />
        </main>
      </div>
    </div>
  );
};
