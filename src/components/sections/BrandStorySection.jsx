import React from 'react';
import { RevealSection } from '../ui/RevealSection';
import { GoldDivider } from '../ui/GoldDivider';
import { MagneticButton } from '../ui/MagneticButton';
import { ProductImage } from '../ui/ProductImage';

export const BrandStorySection = ({ products }) => {
  const p1 = products?.[0];
  const p2 = products?.[1];

  return (
    <section className="py-32 md:py-44 px-6 bg-salem-ivory relative overflow-hidden">
      <img src="/logo_salem_icon.png" className="absolute -left-32 top-1/4 h-[600px] opacity-[0.02] -rotate-12 pointer-events-none" alt="" />
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center relative z-10">
        <div className="md:col-span-5 md:col-start-2">
          <RevealSection>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] text-salem-ink tracking-tight text-balance mb-8">
              La esencia<br/>de lo sutil
            </h2>
          </RevealSection>
          <RevealSection delay={0.1}>
            <GoldDivider className="mb-8 w-20" />
          </RevealSection>
          <RevealSection delay={0.2}>
            <p className="font-sans text-salem-muted font-light leading-relaxed mb-10 text-base md:text-lg max-w-md">
              Creemos en el lujo accesible. Cada pieza está diseñada para contar una historia y acompañarte, elevando tu estilo diario con delicadeza.
            </p>
          </RevealSection>
          <RevealSection delay={0.3}>
            <MagneticButton href="/catalog" variant="outline" showArrow>
              Ver Catálogo
            </MagneticButton>
          </RevealSection>
        </div>
        
        <div className="md:col-span-5 md:col-start-8 relative mt-8 md:mt-0">
          <RevealSection direction="left" blur={false}>
            <div className="group cursor-pointer">
              <ProductImage src={p1?.image} alt={p1?.name || 'Salem Store'} aspect="aspect-[4/5]" className="grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-[1.03]" />
            </div>
          </RevealSection>
          {p2 && (
            <RevealSection direction="up" blur={false} delay={0.2} className="absolute -bottom-12 -left-12 w-2/5 z-10 hidden md:block">
              <div className="border-4 border-salem-ivory shadow-premium overflow-hidden group">
                <ProductImage src={p2.image} alt={p2.name} aspect="aspect-square" className="group-hover:scale-110 transition-transform duration-1000" />
              </div>
            </RevealSection>
          )}
        </div>
      </div>
    </section>
  );
};
