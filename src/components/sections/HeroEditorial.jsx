import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { RevealSection } from '../ui/RevealSection';
import { useCatalog } from '../../hooks/useCatalog';
import { ProductImage } from '../ui/ProductImage';

export const HeroEditorial = () => {
  const { getHighValue } = useCatalog();
  // Grab a strong image for the hero right column
  const heroProducts = getHighValue(1);
  const heroProduct = heroProducts.length > 0 ? heroProducts[0] : null;

  return (
    <section className="relative min-h-[100dvh] flex items-center bg-salem-cream overflow-hidden pt-20">
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left: Content */}
        <div className="flex flex-col items-start pt-12 lg:pt-0 z-10">
          <RevealSection delay={0.1}>
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-salem-gold mb-6 block">
              Nueva Colección
            </span>
          </RevealSection>
          
          <RevealSection delay={0.3}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[80px] leading-[1.05] text-salem-ink tracking-tight mb-8">
              La esencia <br className="hidden md:block" />
              <span className="italic text-salem-gold">de lo sutil</span>
            </h1>
          </RevealSection>

          <RevealSection delay={0.5}>
            <p className="font-sans text-sm md:text-base text-salem-muted max-w-md font-light leading-relaxed mb-10 text-balance">
              Joyería elegante y femenina diseñada para resaltar tu estilo en cada momento. Piezas atemporales con un nivel de detalle excepcional.
            </p>
          </RevealSection>

          <RevealSection delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto">
              <MagneticButton href="/catalog" variant="primary" showArrow className="w-full sm:w-auto">
                Ver Catálogo
              </MagneticButton>
              <MagneticButton href="https://wa.me/1234567890" variant="outline" className="w-full sm:w-auto border-salem-ink/20 text-salem-ink">
                Pedir por WhatsApp
              </MagneticButton>
            </div>
          </RevealSection>
        </div>

        {/* Right: Image Composition */}
        <div className="relative w-full h-[50vh] lg:h-[80vh] flex items-center justify-center">
          <RevealSection delay={0.4} className="w-full h-full relative" direction="left">
             <div className="absolute inset-0 bg-salem-ivory rounded-tl-full rounded-tr-[100px] rounded-br-[100px] rounded-bl-sm overflow-hidden p-2 shadow-premium">
                <div className="w-full h-full rounded-tl-full rounded-tr-[100px] rounded-br-[100px] rounded-bl-sm overflow-hidden">
                  <ProductImage 
                    src={heroProduct?.image} 
                    alt="Colección Salem Store"
                    aspect="aspect-auto h-full w-full" 
                    className="scale-105 hover:scale-110 transition-transform duration-[2s] ease-out-strong"
                  />
                </div>
             </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
};
