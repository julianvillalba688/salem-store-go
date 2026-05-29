import React from 'react';
import { HeroEditorial } from '../components/sections/HeroEditorial';
import { CategoryShowcase } from '../components/sections/CategoryShowcase';
import { BrandStorySection } from '../components/sections/BrandStorySection';
import { LookbookSection } from '../components/sections/LookbookSection';
import { OccasionSection } from '../components/sections/OccasionSection';
import { BenefitsSection } from '../components/sections/BenefitsSection';
import { RevealSection } from '../components/ui/RevealSection';
import { ProductGrid } from '../components/product/ProductGrid';
import { FloatingWhatsApp } from '../components/action/FloatingWhatsApp';
import { useCatalog } from '../hooks/useCatalog';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { loading, getHighValue, getOffers, getCategoryCovers } = useCatalog();
  
  const featuredProducts = getHighValue(3); // 3 for a clean 3-col grid
  const lookbookProducts = getOffers().slice(0, 6);
  const brandStoryProducts = getHighValue(8).slice(-2);
  const categoryCovers = getCategoryCovers();

  return (
    <div className="w-full bg-salem-ivory">
      <FloatingWhatsApp />
      
      {/* 1. Cinematic Hero */}
      <HeroEditorial />
      
      {/* 2. Category strip */}
      <CategoryShowcase categoryCovers={categoryCovers} />

      {/* 3. Featured Collection — clean 3-col grid on ivory */}
      <section className="py-24 md:py-32 px-6 bg-salem-ivory relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left">
            <RevealSection>
              <h2 className="font-serif text-3xl md:text-4xl text-salem-ink tracking-tight">
                Selección Premium
              </h2>
            </RevealSection>
            <RevealSection delay={0.1}>
              <Link to="/catalog" className="inline-flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase text-salem-ink hover:text-salem-gold transition-colors pb-1 border-b border-salem-ink/20 hover:border-salem-gold">
                Ver todo <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </RevealSection>
          </div>
          
          <ProductGrid products={featuredProducts} loading={loading} columns={3} />
        </div>
      </section>
      
      {/* 4. Occasions */}
      <OccasionSection categoryCovers={categoryCovers} />

      {/* 5. Brand Story */}
      <BrandStorySection products={brandStoryProducts} />

      {/* 6. Lookbook */}
      <LookbookSection products={lookbookProducts} />

      {/* 7. Benefits */}
      <BenefitsSection />
    </div>
  );
};
