import React, { useState, useEffect, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ProductGrid from '../components/catalog/ProductGrid';
import ProductFilters from '../components/catalog/ProductFilters';
import PromoBanner from '../components/ui/PromoBanner';
import { siteConfig } from '../config';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

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

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) || 
        (p.description && p.description.toLowerCase().includes(lowerSearch)) ||
        p.sku.toLowerCase().includes(lowerSearch)
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

    // Sort
    result.sort((a, b) => {
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

    return result;
  }, [products, searchTerm, activeCategory, sortBy, minPrice, maxPrice]);

  return (
    <div className="bg-[#fcf9f8] min-h-screen pt-10 pb-24">
      <Helmet>
        <title>Colección Completa | {siteConfig.siteName}</title>
        <meta name="description" content="Explora nuestro catálogo de bisutería y accesorios. Encuentra aretes, collares, pulseras y sets exclusivos." />
      </Helmet>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-[#eaddd7] pb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-dark mb-2">Colección Exclusiva</h1>
            <p className="text-primary-600 font-medium tracking-wide">Mostrando {filteredProducts.length} piezas</p>
          </div>
          
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#eaddd7] text-dark rounded-xl font-medium shadow-sm"
          >
            <Filter size={20} className="text-primary-500" />
            Filtros
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          
          {/* Left Sidebar: Filters + Promo */}
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
              isMobileFiltersOpen={isMobileFiltersOpen}
              setIsMobileFiltersOpen={setIsMobileFiltersOpen}
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
              <ProductGrid products={filteredProducts} />
            )}
          </div>

          {/* Right Sidebar Promo (optional, shown only on extra large screens) */}
          <div className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-24">
               <div className="rounded-2xl overflow-hidden shadow-delicate relative group">
                 <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80" alt="Promo" className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent flex flex-col justify-end p-6">
                    <h4 className="text-white font-serif text-xl mb-2">Colección Nupcial</h4>
                    <p className="text-white/80 text-sm">Piezas perfectas para ese día especial.</p>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Catalog;
