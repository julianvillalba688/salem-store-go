import React from 'react';
import { motion } from 'framer-motion';
import { HeroEditorial } from '../components/sections/HeroEditorial';
import { BrandStorySection } from '../components/sections/BrandStorySection';
import { LookbookSection } from '../components/sections/LookbookSection';
import { OccasionSection } from '../components/sections/OccasionSection';
import { BenefitsSection } from '../components/sections/BenefitsSection';
import { RevealSection } from '../components/ui/RevealSection';
import { ProductGrid } from '../components/product/ProductGrid';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useCatalog } from '../hooks/useCatalog';
import { FloatingWhatsApp } from '../components/action/FloatingWhatsApp';

export const Home = () => {
  const { products, loading } = useCatalog();
  
  const validProducts = products.filter(p => p.image);
  const featuredProducts = validProducts.slice(0, 4);
  const lookbookProducts = validProducts.slice(4, 7);
  const storyProducts = validProducts.slice(7, 9);
  
  // Use a stunning product for the hero bg
  const heroProduct = validProducts.length > 0 ? validProducts[validProducts.length - 1] : null;

  return (
    <div className="w-full bg-salem-ivory">
      <FloatingWhatsApp />
      
      <HeroEditorial heroProduct={heroProduct} />
      
      <BrandStorySection product1={storyProducts[0]} product2={storyProducts[1]} />

      {/* Featured Collection (Dark Mode) */}
      <section className="py-32 md:py-40 px-6 bg-salem-ink text-salem-ivory relative overflow-hidden clip-diagonal">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div className="max-w-2xl">
              <RevealSection>
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">Selección<br/><span className="text-salem-gold">Premium</span></h2>
              </RevealSection>
              <RevealSection delay={0.2}>
                <p className="font-sans text-salem-beige/60 font-light max-w-md">Nuestras piezas más destacadas, elaboradas con precisión y diseñadas para deslumbrar.</p>
              </RevealSection>
            </div>
            <RevealSection direction="left" delay={0.4}>
              <MagneticButton href="/catalog" variant="outline" className="border-salem-gold text-salem-gold mt-10 md:mt-0 hover:text-salem-ink">
                Colección Completa
              </MagneticButton>
            </RevealSection>
          </div>
          
          <div className="bg-salem-black text-white [&_h3]:text-white [&_div>span:last-child]:text-white">
            <ProductGrid products={featuredProducts} loading={loading} />
          </div>
        </div>
      </section>
      
      <LookbookSection lookbookProducts={lookbookProducts} />
      
      <OccasionSection />
      
      <BenefitsSection />
    </div>
  );
};
