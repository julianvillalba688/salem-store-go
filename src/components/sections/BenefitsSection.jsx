import React from 'react';
import { RevealSection } from '../ui/RevealSection';
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
    <section className="py-16 md:py-24 px-6 bg-salem-ivory border-t border-salem-cream">
      <div className="max-w-[1000px] mx-auto">
        <RevealSection className="text-center mb-12">
          <h2 className="font-serif text-3xl text-salem-ink tracking-tight mb-2">¿Por qué Salem?</h2>
        </RevealSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {benefits.map((benefit, idx) => (
            <RevealSection key={idx} delay={idx * 0.1} direction="up">
              <div className="flex flex-col items-center text-center">
                <benefit.icon size={24} strokeWidth={1.5} className="text-salem-gold mb-4" />
                <h3 className="font-serif text-lg text-salem-ink mb-2">{benefit.title}</h3>
                <p className="font-sans text-xs text-salem-muted font-light leading-relaxed max-w-[250px] text-balance">
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
