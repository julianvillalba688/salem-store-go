import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { RevealSection } from '../ui/RevealSection';
import { AnimatedSparkles } from '../ui/AnimatedSparkles';

export const HeroEditorial = ({ heroProduct }) => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 800], [1, 0]);

  // Use the provided real product image or a fallback from data if valid
  const bgImage = heroProduct?.image || '';

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-salem-ink">
      <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
        {bgImage && (
          <img 
            src={bgImage} 
            alt="Salem Store Collection" 
            className="w-full h-full object-cover opacity-30 mix-blend-screen scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-salem-ink via-salem-ink/60 to-transparent"></div>
        {/* Subtle noise */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
        }}></div>
      </motion.div>

      <AnimatedSparkles count={8} className="z-0 mix-blend-screen opacity-50" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-salem-gold/10 blur-3xl rounded-full mix-blend-screen pointer-events-none"></div>
          <img src="/logo_salem_store.png" alt="Salem Store" className="h-32 md:h-56 object-contain mx-auto invert brightness-0 saturate-100 relative z-10" style={{ filter: 'brightness(0) invert(1)' }} />
        </motion.div>

        <RevealSection delay={0.4}>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-salem-gold mb-8">
            Detalles que marcan la diferencia
          </p>
        </RevealSection>

        <RevealSection delay={0.6}>
          <p className="font-sans text-sm md:text-base text-salem-beige max-w-xl mx-auto mb-16 font-light leading-relaxed text-balance">
            Accesorios elegantes para resaltar tu esencia, tu estilo y tu feminidad. 
          </p>
        </RevealSection>

        <RevealSection delay={0.8}>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <MagneticButton href="/catalog" variant="secondary">
              Explorar Colección
            </MagneticButton>
            <a href="https://wa.me/1234567890" className="font-sans text-[10px] tracking-widest uppercase text-white hover:text-salem-gold transition-colors duration-300 border-b border-white/30 hover:border-salem-gold pb-1 relative group">
              Pedir por WhatsApp
              <span className="absolute bottom-0 left-0 w-0 h-px bg-salem-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </RevealSection>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-sans text-[8px] tracking-[0.3em] uppercase text-salem-gold/70">Scroll</span>
        <div className="w-px h-16 bg-salem-gold/20 overflow-hidden relative">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-salem-gold"
          />
        </div>
      </motion.div>
    </section>
  );
};
