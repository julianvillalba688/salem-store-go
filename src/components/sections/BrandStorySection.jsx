import React from 'react';
import { motion } from 'framer-motion';
import { RevealSection } from '../ui/RevealSection';
import { GoldDivider } from '../ui/GoldDivider';
import { MagneticButton } from '../ui/MagneticButton';

export const BrandStorySection = ({ product1, product2 }) => {
  return (
    <section className="py-32 md:py-48 px-6 bg-salem-ivory relative overflow-hidden">
      {/* Floating background logo mark */}
      <img src="/logo_salem_icon.png" className="absolute -left-32 top-1/4 h-[800px] opacity-[0.03] -rotate-12 pointer-events-none mix-blend-multiply" alt="" />
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center relative z-10">
        <div className="md:col-span-5 md:col-start-2">
          <RevealSection>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.1] text-salem-ink tracking-tight text-balance mb-8">
              La esencia<br/>de lo sutil
            </h2>
          </RevealSection>
          <RevealSection delay={0.2}>
            <GoldDivider className="mb-10 w-24" />
          </RevealSection>
          <RevealSection delay={0.3}>
            <p className="font-sans text-salem-muted font-light leading-relaxed mb-10 text-lg md:text-xl">
              Creemos en el lujo accesible. Cada pieza está diseñada para contar una historia y acompañarte, elevando tu estilo diario con delicadeza. No hacemos solo accesorios, creamos identidad.
            </p>
          </RevealSection>
          <RevealSection delay={0.4}>
            <MagneticButton href="/catalog" variant="outline">
              Ver Catálogo
            </MagneticButton>
          </RevealSection>
        </div>
        
        <div className="md:col-span-5 md:col-start-8 relative mt-16 md:mt-0">
          <RevealSection direction="left" blur={false}>
            <div className="aspect-[4/5] relative overflow-hidden bg-salem-beige/20 group">
              {product1?.image && (
                <img 
                  src={product1.image} 
                  alt="Esencia" 
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-1000"
                />
              )}
              <div className="absolute inset-0 border border-salem-gold/0 group-hover:border-salem-gold/30 transition-colors duration-700 m-4 pointer-events-none"></div>
            </div>
          </RevealSection>
          {/* Offset decorative image */}
          <RevealSection direction="up" blur={false} delay={0.3} className="absolute -bottom-16 -left-16 w-1/2 aspect-square z-10 hidden md:block group">
            <div className="w-full h-full relative overflow-hidden bg-salem-beige/20 shadow-premium border-4 border-salem-ivory">
              {product2?.image && (
                <img 
                  src={product2.image} 
                  alt="Detalle" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              )}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
};
