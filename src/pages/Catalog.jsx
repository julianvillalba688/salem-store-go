import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SalemProductCard } from '../components/ui/SalemProductCard';
import { SalemReveal } from '../components/ui/SalemReveal';
import { useCatalog } from '../hooks/useCatalog';

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
      return matchCategory && matchOffer && matchSearch && product.image;
    });
  }, [products, activeCategory, showOffersOnly, searchQuery]);

  return (
    <div className="min-h-screen bg-salem-ivory pt-32 pb-32">
      {/* Hero Catalog */}
      <section className="px-6 mb-20">
        <div className="max-w-[1600px] mx-auto">
          <SalemReveal>
            <h1 className="font-serif text-5xl md:text-7xl text-salem-ink tracking-tight mb-6">La Colección</h1>
          </SalemReveal>
          <SalemReveal delay={0.2}>
            <p className="font-sans text-sm md:text-base text-salem-muted font-light max-w-xl text-balance">
              Explora nuestra selección completa. Piezas delicadas diseñadas para acompañarte en cada momento, elevando tu estilo con sutileza y elegancia.
            </p>
          </SalemReveal>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Sticky Sidebar Filters */}
        <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit z-20 bg-salem-ivory/80 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none py-4 lg:py-0 border-b border-salem-gold/10 lg:border-none mb-8 lg:mb-0">
          <SalemReveal delay={0.3} direction="right">
            <div className="flex flex-col gap-10">
              
              {/* Search */}
              <div>
                <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold mb-6">Buscar</h3>
                <input 
                  type="text" 
                  placeholder="Nombre de la pieza..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-salem-ink/20 pb-2 text-sm font-sans text-salem-ink placeholder:text-salem-muted focus:outline-none focus:border-salem-gold transition-colors"
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold mb-6">Categorías</h3>
                <ul className="flex flex-row lg:flex-col flex-wrap gap-x-6 gap-y-4 font-sans text-xs tracking-widest uppercase">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`transition-all duration-500 text-left relative group ${
                          activeCategory === cat 
                            ? 'text-salem-ink font-medium' 
                            : 'text-salem-muted hover:text-salem-ink'
                        }`}
                      >
                        {cat}
                        {activeCategory === cat && (
                          <motion.span 
                            layoutId="activeCategory"
                            className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-salem-gold rounded-full hidden lg:block"
                          />
                        )}
                        <span className="absolute left-0 -bottom-1 w-0 h-px bg-salem-gold transition-all duration-300 group-hover:w-full lg:hidden"></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Refinements */}
              <div>
                <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold mb-6">Filtros</h3>
                <label className="flex items-center gap-3 cursor-pointer group font-sans text-xs tracking-widest uppercase text-salem-muted">
                  <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${showOffersOnly ? 'bg-salem-gold border-salem-gold' : 'border-salem-muted group-hover:border-salem-ink'}`}>
                    {showOffersOnly && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-white"><path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <input 
                    type="checkbox" 
                    checked={showOffersOnly}
                    onChange={(e) => setShowOffersOnly(e.target.checked)}
                    className="sr-only"
                  />
                  <span className="group-hover:text-salem-ink transition-colors duration-300">
                    Solo Ofertas
                  </span>
                </label>
              </div>
            </div>
          </SalemReveal>
        </aside>

        {/* Grid */}
        <main className="lg:col-span-9">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-16">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-[3/4] bg-salem-beige/20 animate-pulse rounded-sm"></div>
              ))}
            </div>
          ) : (
            <>
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-16"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <SalemProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredProducts.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-40 border border-salem-gold/10 bg-salem-ivory/50 mt-10"
                >
                  <p className="font-serif text-2xl text-salem-ink mb-4">Sin resultados</p>
                  <p className="font-sans text-xs tracking-widest text-salem-muted uppercase">
                    Intenta con otra búsqueda o categoría.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
