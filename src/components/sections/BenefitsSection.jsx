import React from 'react';
import { RevealSection } from '../ui/RevealSection';

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Calidad Premium",
      desc: "Materiales seleccionados meticulosamente para garantizar durabilidad y brillo eterno."
    },
    {
      title: "Diseño Exclusivo",
      desc: "Cada pieza refleja una estética cuidada, moderna y sofisticada para la mujer actual."
    },
    {
      title: "Atención Personalizada",
      desc: "Asesoramiento directo vía WhatsApp para que encuentres la joya perfecta."
    }
  ];

  return (
    <section className="py-24 bg-salem-ink text-salem-ivory px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
        }}></div>
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-10">
        {benefits.map((benefit, idx) => (
          <RevealSection key={idx} delay={idx * 0.2} direction="up">
            <h3 className="font-serif text-2xl text-salem-gold mb-4">{benefit.title}</h3>
            <p className="font-sans text-sm text-salem-beige/70 font-light leading-relaxed max-w-xs mx-auto text-balance">
              {benefit.desc}
            </p>
          </RevealSection>
        ))}
      </div>
    </section>
  );
};
