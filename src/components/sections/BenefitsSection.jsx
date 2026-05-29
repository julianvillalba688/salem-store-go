import React from 'react';
import { RevealSection } from '../ui/RevealSection';
import { GoldDivider } from '../ui/GoldDivider';
import { Heart, Shield, MessageCircle } from 'lucide-react';

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Diseño Exclusivo",
      desc: "Cada pieza refleja una estética cuidada, moderna y sofisticada."
    },
    {
      icon: Shield,
      title: "Calidad Garantizada",
      desc: "Materiales seleccionados para durabilidad y brillo permanente."
    },
    {
      icon: MessageCircle,
      title: "Atención Directa",
      desc: "Asesoramiento personalizado vía WhatsApp para encontrar tu pieza ideal."
    }
  ];

  return (
    <section className="py-28 md:py-36 px-6 bg-salem-ivory border-t border-salem-ink/5">
      <div className="max-w-[1200px] mx-auto">
        <RevealSection className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-salem-ink tracking-tight mb-4">¿Por qué Salem?</h2>
          <GoldDivider className="mx-auto w-16" />
        </RevealSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {benefits.map((benefit, idx) => (
            <RevealSection key={idx} delay={idx * 0.08} direction="up">
              <div className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-salem-gold/[0.07] flex items-center justify-center mb-6 group-hover:bg-salem-gold/[0.15] transition-colors duration-500">
                  <benefit.icon size={20} strokeWidth={1.2} className="text-salem-gold" />
                </div>
                <h3 className="font-serif text-xl text-salem-ink mb-3">{benefit.title}</h3>
                <p className="font-sans text-sm text-salem-muted font-light leading-relaxed max-w-xs text-balance">
                  {benefit.desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};
