import React from 'react';
import { motion } from 'framer-motion';
import { RevealSection } from '../ui/RevealSection';

export const OccasionSection = () => {
  return (
    <section className="py-24 bg-salem-ivory px-6 border-y border-salem-ink/5">
      <div className="max-w-[1200px] mx-auto text-center">
        <RevealSection>
          <p className="font-serif text-3xl md:text-5xl text-salem-ink tracking-tight mb-8">
            "La elegancia es la única belleza que nunca se desvanece."
          </p>
          <p className="font-sans text-[10px] tracking-widest uppercase text-salem-muted">
            Audrey Hepburn
          </p>
        </RevealSection>
      </div>
    </section>
  );
};
