import React from 'react';
import { HeroEditorial } from '../components/sections/HeroEditorial';
import { CategoryShowcase } from '../components/sections/CategoryShowcase';
import { BrandStorySection } from '../components/sections/BrandStorySection';
import { LookbookSection } from '../components/sections/LookbookSection';
import { OccasionSection } from '../components/sections/OccasionSection';
import { BenefitsSection } from '../components/sections/BenefitsSection';
import { RevealSection } from '../components/ui/RevealSection';
import { GoldDivider } from '../components/ui/GoldDivider';
import { ProductGrid } from '../components/product/ProductGrid';
import { MagneticButton } from '../components/ui/MagneticButton';
import { FloatingWhatsApp } from '../components/action/FloatingWhatsApp';
import { useCatalog } from '../hooks/useCatalog';

export const Home = () => {
  const { products, loading, getHighValue, getOffers, getCategoryCovers } = useCatalog();
  
  // Intentional curation — not random slicing
  const featuredProducts = getHighValue(4);
  const lookbookProducts = getOffers().slice(0, 6);
  const brandStoryProducts = getHighValue(8).slice(-2); // 2 aspirational products
  const categoryCovers = getCategoryCovers();

  return (
    <div className="w-full bg-salem-ivory">
      <FloatingWhatsApp />
      
      {/* 1. Cinematic Hero */}
      <HeroEditorial />
      
      {/* 2. Category strip */}
      <CategoryShowcase categoryCovers={categoryCovers} />

      {/* 3. Featured Collection — dark section */}
      <section className="py-28 md:py-40 px-6 bg-salem-ink relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <RevealSection>
              <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight">
                Selección<br/><span className="text-salem-gold">Premium</span>
              </h2>
            </RevealSection>
            <RevealSection delay={0.15}>
              <MagneticButton href="/catalog" variant="outline" className="border-salem-gold/30 text-salem-gold hover:border-salem-gold" showArrow>
                Colección Completa
              </MagneticButton>
            </RevealSection>
          </div>
          
          <div className="[&_h3]:text-white [&_span]:text-white/70 [&_.text-salem-ink]:text-white">
            <ProductGrid products={featuredProducts} loading={loading} />
          </div>
        </div>
      </section>
      
      {/* 4. Brand Story — ivory section */}
      <BrandStorySection products={brandStoryProducts} />

      {/* 5. Occasions — ivory section with real category cards */}
      <OccasionSection categoryCovers={categoryCovers} />

      {/* 6. Lookbook — dark horizontal scroll gallery */}
      <LookbookSection products={lookbookProducts} />

      {/* 7. Benefits — ivory section */}
      <BenefitsSection />

      {/* 8. Quote CTA */}
      <section className="py-24 md:py-32 px-6 bg-salem-ivory border-t border-salem-ink/5">
        <div className="max-w-[900px] mx-auto text-center">
          <RevealSection>
            <p className="font-serif text-2xl md:text-4xl text-salem-ink tracking-tight leading-snug mb-4 text-balance">
              "La elegancia es la única belleza que nunca se desvanece."
            </p>
            <span className="font-sans text-[9px] tracking-widest uppercase text-salem-muted">Audrey Hepburn</span>
          </RevealSection>
        </div>
      </section>
    </div>
  );
};
