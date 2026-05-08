import React, { useState, useEffect, useMemo } from 'react';
import { Filter, LayoutGrid, Rows3, Columns4, Search, X, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ProductGrid from '../components/catalog/ProductGrid';
import ProductFilters from '../components/catalog/ProductFilters';
import PromoBanner from '../components/ui/PromoBanner';
import { siteConfig } from '../config';
import { normalizeText } from '../utils/formatters';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  // UI State
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [columnsView, setColumnsView] = useState(() => {
    return localStorage.getItem('catalog_columns') || '4';
  });
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Save columns preference
  useEffect(() => {
    localStorage.setItem('catalog_columns', columnsView);
  }, [columnsView]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(16);
  }, [searchTerm, activeCategory, sortBy, minPrice, maxPrice]);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter (Normalized)
    if (searchTerm) {
      const query = normalizeText(searchTerm);
      result = result.filter(p => 
        normalizeText(p.name).includes(query) || 
        (p.description && normalizeText(p.description).includes(query)) ||
        normalizeText(p.sku).includes(query) ||
        (p.category && normalizeText(p.category).includes(query))
      );
    }

    // Category filter
    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory);
    }

    // Price Filter
    if (minPrice !== '') {
      result = result.filter(p => (p.salePrice || p.price) >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      result = result.filter(p => (p.salePrice || p.price) <= parseFloat(maxPrice));
    }

    // Sort - creating a copy to not mutate
    const sortedResult = [...result];
    sortedResult.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-high': return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'newest': return (b.isNew === true ? 1 : 0) - (a.isNew === true ? 1 : 0);
        case 'featured': 
        default:
          return (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0);
      }
    });

    return sortedResult;
  }, [products, searchTerm, activeCategory, sortBy, minPrice, maxPrice]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 16);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setActiveCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('featured');
    setVisibleCount(16);
  };

  return (
    <div className="bg-[#fcf9f8] min-h-screen pt-10 pb-24">
      <Helmet>
        <title>Catálogo Completo | {siteConfig.siteName}</title>
        <meta name="description" content="Explora nuestro catálogo de bisutería y accesorios. Encuentra aretes, collares, pulseras y sets exclusivos." />
      </Helmet>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 border-b border-[#eaddd7] pb-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-dark mb-2">Colección Exclusiva</h1>
            <p className="text-primary-600 font-medium tracking-wide">
              Mostrando {visibleProducts.length} de {filteredProducts.length} piezas
            </p>
          </div>
          
          {/* Desktop Column Selector (hidden on mobile) */}
          <div className="hidden lg:flex items-center bg-white border border-[#eaddd7] rounded-xl p-1 shadow-sm">
            <button 
              onClick={() => setColumnsView('2')}
              className={`p-2 rounded-lg transition-colors ${columnsView === '2' ? 'bg-primary-100 text-primary-700' : 'text-gray-400 hover:text-dark'}`}
              aria-label="Vista de 2 columnas"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setColumnsView('4')}
              className={`p-2 rounded-lg transition-colors ${columnsView === '4' ? 'bg-primary-100 text-primary-700' : 'text-gray-400 hover:text-dark'}`}
              aria-label="Vista de 4 columnas"
            >
              <Columns4 size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Search & Filters Bar (hidden on desktop) */}
        <div className="lg:hidden flex flex-col gap-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar joyas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#eaddd7] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm text-gray-800"
            />
            <Search className="absolute left-3 top-3.5 text-primary-400" size={20} />
          </div>

          <div className="flex items-center justify-between gap-3">
             <button 
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#eaddd7] text-dark rounded-xl font-medium shadow-sm hover:bg-gray-50 relative min-h-[44px]"
                aria-label="Abrir filtros"
              >
                <Filter size={18} className="text-primary-500" />
                Filtros
                {(activeCategory || minPrice || maxPrice || sortBy !== 'featured') && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full shadow-sm"></span>
                )}
              </button>

             {/* Mobile Column Selector */}
              <div className="flex items-center bg-white border border-[#eaddd7] rounded-xl p-1 shadow-sm min-h-[44px]">
                <button 
                  onClick={() => setColumnsView('1')}
                  className={`p-2 rounded-lg transition-colors ${columnsView === '1' ? 'bg-primary-100 text-primary-700' : 'text-gray-400 hover:text-dark'}`}
                  aria-label="Vista de 1 columna"
                >
                  <Rows3 size={20} />
                </button>
                <button 
                  onClick={() => setColumnsView('2')}
                  className={`p-2 rounded-lg transition-colors ${columnsView === '2' ? 'bg-primary-100 text-primary-700' : 'text-gray-400 hover:text-dark'}`}
                  aria-label="Vista de 2 columnas"
                >
                  <LayoutGrid size={20} />
                </button>
              </div>
          </div>
          
          {(searchTerm || activeCategory || minPrice || maxPrice || sortBy !== 'featured') && (
            <button 
              onClick={handleClearFilters}
              className="text-primary-600 text-sm font-bold flex items-center justify-center gap-2 py-2 hover:bg-primary-50 rounded-xl transition-colors"
            >
              Limpiar todos los filtros
            </button>
          )}
        </div>

        {/* Mobile Filter Drawer — always mounted, shown via isMobileFiltersOpen */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtros">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            {/* Drawer Panel */}
            <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#fcf9f8] shadow-2xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-6 pb-4 border-b border-[#eaddd7] flex-shrink-0">
                <h2 className="text-2xl font-serif font-bold text-dark">Filtros</h2>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 text-primary-500 hover:bg-primary-50 rounded-full transition-colors"
                  aria-label="Cerrar filtros"
                >
                  <X size={24} />
                </button>
              </div>
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Search */}
                <div>
                  <h3 className="font-serif text-lg mb-3 text-dark font-semibold">Buscar</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar joyas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eaddd7] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm"
                    />
                    <Search className="absolute left-3 top-3 text-primary-400" size={18} />
                  </div>
                </div>
                {/* Category */}
                <div>
                  <h3 className="font-serif text-lg mb-3 text-dark font-semibold">Categoría</h3>
                  <div className="relative">
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 bg-white border border-[#eaddd7] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm text-gray-700"
                    >
                      <option value="">Todas las categorías</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-primary-400 pointer-events-none" size={18} />
                  </div>
                </div>
                {/* Price Range */}
                <div>
                  <h3 className="font-serif text-lg mb-3 text-dark font-semibold">Rango de Precio</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full pl-7 pr-2 py-2.5 bg-white border border-[#eaddd7] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm text-sm"
                      />
                    </div>
                    <span className="text-gray-400">–</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full pl-7 pr-2 py-2.5 bg-white border border-[#eaddd7] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm text-sm"
                      />
                    </div>
                  </div>
                </div>
                {/* Sort */}
                <div>
                  <h3 className="font-serif text-lg mb-3 text-dark font-semibold">Ordenar por</h3>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 bg-white border border-[#eaddd7] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm text-gray-700"
                    >
                      <option value="featured">Destacados</option>
                      <option value="newest">Más recientes</option>
                      <option value="price-low">Precio: Menor a Mayor</option>
                      <option value="price-high">Precio: Mayor a Menor</option>
                      <option value="name-asc">Nombre: A - Z</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-primary-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>
              {/* Footer Buttons */}
              <div className="p-6 pt-4 border-t border-[#eaddd7] flex-shrink-0 space-y-3">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-dark text-white py-3.5 rounded-xl font-bold hover:bg-primary-900 transition-colors shadow-md min-h-[44px]"
                >
                  Ver {filteredProducts.length} productos
                </button>
                <button
                  onClick={() => { handleClearFilters(); setIsMobileFiltersOpen(false); }}
                  className="w-full py-3 text-primary-600 font-medium hover:bg-primary-50 rounded-xl transition-colors border border-primary-200 min-h-[44px]"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          
          {/* Left Sidebar: Filters + Promo — Desktop only */}
          <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            <ProductFilters 
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              isMobileFiltersOpen={false}
              setIsMobileFiltersOpen={setIsMobileFiltersOpen}
              onClear={handleClearFilters}
            />
            <div className="sticky top-[500px]">
              <PromoBanner />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              <>
                <ProductGrid 
                  products={visibleProducts} 
                  columnsView={columnsView} 
                  onClear={handleClearFilters}
                  hasFiltersActive={searchTerm || activeCategory || minPrice || maxPrice || sortBy !== 'featured'}
                />
                
                {hasMore && (
                  <div className="mt-12 flex justify-center">
                    <button 
                      onClick={loadMore}
                      className="px-8 py-3 bg-white border-2 border-primary-200 text-primary-800 font-bold rounded-full hover:bg-primary-50 transition-colors shadow-sm"
                    >
                      Cargar más productos
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Catalog;
