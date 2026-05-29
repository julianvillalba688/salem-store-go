import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { RevealSection } from '../ui/RevealSection';
import { AnimatedSparkles } from '../ui/AnimatedSparkles';

export const HeroEditorial = () => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-salem-ink">
      <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
        {/* Pure dark gradient — no random product image */}
        <div className="absolute inset-0 bg-gradient-to-br from-salem-ink via-salem-black to-salem-ink" />
        {/* Radial gold accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-salem-gold/[0.04] rounded-full blur-3xl pointer-events-none" />
        {/* Noise */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")'
        }} />
      </motion.div>

      <AnimatedSparkles count={6} className="z-[1] mix-blend-screen opacity-40" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Logo — sole visual anchor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10 relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-salem-gold/[0.06] blur-3xl rounded-full pointer-events-none" />
          <img src="/logo_salem_store.png" alt="Salem Store" className="h-24 md:h-44 object-contain mx-auto relative z-10" style={{ filter: 'brightness(0) invert(1)' }} />
        </motion.div>

        <RevealSection delay={0.3}>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-salem-gold mb-6">
            Detalles que marcan la diferencia
          </p>
        </RevealSection>

        <RevealSection delay={0.5}>
          <p className="font-sans text-sm md:text-base text-salem-beige/80 max-w-lg mx-auto mb-12 font-light leading-relaxed text-balance">
            Accesorios elegantes para resaltar tu esencia, tu estilo y tu feminidad.
          </p>
        </RevealSection>

        <RevealSection delay={0.7}>
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <MagneticButton href="/catalog" variant="secondary" showArrow>
              Explorar Colección
            </MagneticButton>
            <MagneticButton href="https://wa.me/1234567890" variant="ghost" className="text-salem-beige/70 hover:text-salem-gold">
              Pedir por WhatsApp
            </MagneticButton>
          </div>
        </RevealSection>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[7px] tracking-[0.3em] uppercase text-salem-gold/50">Scroll</span>
        <div className="w-px h-12 bg-salem-gold/15 overflow-hidden relative">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/3 bg-salem-gold/60"
          />
        </div>
      </motion.div>
    </section>
  );
};
