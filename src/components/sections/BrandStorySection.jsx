import React from 'react';
import { RevealSection } from '../ui/RevealSection';
import { MagneticButton } from '../ui/MagneticButton';
import { ProductImage } from '../ui/ProductImage';

export const BrandStorySection = ({ products }) => {
  const p1 = products?.[0];

  return (
    <section className="py-24 md:py-32 px-6 bg-salem-cream border-t border-salem-ivory relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left: Strong Image Block */}
        <div className="order-2 md:order-1 relative">
          <RevealSection direction="up">
             <div className="aspect-[4/5] bg-salem-ivory p-2 shadow-premium border border-salem-ink/5">
                <ProductImage src={p1?.image} alt={p1?.name || 'Salem Store'} aspect="aspect-auto h-full w-full" />
             </div>
          </RevealSection>
        </div>

        {/* Right: Text */}
        <div className="order-1 md:order-2 flex flex-col items-start md:pl-10">
          <RevealSection>
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-salem-gold mb-4 block">Nuestra Filosofía</span>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] text-salem-ink tracking-tight mb-8">
              Elegancia para <br/>el día a día
            </h2>
          </RevealSection>
          <RevealSection delay={0.2}>
            <p className="font-sans text-salem-muted font-light leading-relaxed mb-6 text-base max-w-md">
              Creemos en el lujo accesible. Cada pieza en nuestra colección está seleccionada para contar una historia y acompañarte, elevando tu estilo diario con delicadeza.
            </p>
            <p className="font-sans text-salem-muted font-light leading-relaxed mb-10 text-base max-w-md">
              Desde sutiles detalles en oro laminado hasta perlas clásicas, buscamos que cada joya sea un reflejo de tu feminidad y fuerza.
            </p>
          </RevealSection>
          <RevealSection delay={0.3}>
            <MagneticButton href="/catalog" variant="primary" showArrow>
              Conocer la Colección
            </MagneticButton>
          </RevealSection>
        </div>
      </div>
    </section>
  );
};
