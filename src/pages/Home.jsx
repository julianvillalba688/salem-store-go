import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SalemMagneticButton } from '../components/ui/SalemMagneticButton';
import { SalemProductCard } from '../components/ui/SalemProductCard';
import { SalemReveal } from '../components/ui/SalemReveal';
import { SalemGoldDivider } from '../components/ui/SalemGoldDivider';
import { useCatalog } from '../hooks/useCatalog';

export const Home = () => {
  const { products, loading } = useCatalog();
  
  const featuredProducts = products.filter(p => p.image).slice(0, 4);
  const lookbookProducts = products.filter(p => p.image).slice(4, 7);

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 800], [1, 0]);

  return (
    <div className="w-full bg-salem-ivory">
      {/* 1. Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-salem-ink">
        <motion.div style={{ y: yHero, opacity: opacityHero }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=2000&auto=format&fit=crop" 
            alt="Salem Store Jewelry" 
            className="w-full h-full object-cover opacity-40 mix-blend-screen"
          />
          {/* Subtle noise */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
          }}></div>
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-salem-gold/5 blur-3xl rounded-full mix-blend-screen"></div>
            <img src="/logo_salem_store.png" alt="Salem Store" className="h-32 md:h-48 object-contain mx-auto invert brightness-0 saturate-100 relative z-10" style={{ filter: 'brightness(0) invert(1)' }} />
          </motion.div>

          <SalemReveal delay={0.3}>
            <p className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-salem-gold mb-8">
              Detalles que marcan la diferencia
            </p>
          </SalemReveal>

          <SalemReveal delay={0.5}>
            <p className="font-sans text-sm md:text-base text-salem-beige/80 max-w-xl mx-auto mb-16 font-light leading-relaxed text-balance">
              Accesorios elegantes para resaltar tu esencia, tu estilo y tu feminidad. Descubre nuestra curaduría exclusiva.
            </p>
          </SalemReveal>

          <SalemReveal delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <SalemMagneticButton href="/catalog" variant="secondary">
                Explorar Colección
              </SalemMagneticButton>
              <a href="https://wa.me/1234567890" className="font-sans text-[10px] tracking-widest uppercase text-white hover:text-salem-gold transition-colors duration-300 border-b border-white hover:border-salem-gold pb-1">
                Pedir por WhatsApp
              </a>
            </div>
          </SalemReveal>
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
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-salem-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. Brand Essence (Asymmetric layout) */}
      <section className="py-32 md:py-48 px-6 bg-salem-ivory relative overflow-hidden">
        {/* Floating background logo mark */}
        <img src="/logo_salem_icon.png" className="absolute -left-32 top-1/4 h-[800px] opacity-[0.02] -rotate-12 pointer-events-none mix-blend-multiply" alt="" />
        
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          <div className="md:col-span-5 md:col-start-2">
            <SalemReveal>
              <h2 className="font-serif text-5xl md:text-7xl leading-[1.1] text-salem-ink tracking-tight text-balance mb-8">
                La esencia<br/>de lo sutil
              </h2>
            </SalemReveal>
            <SalemReveal delay={0.2}>
              <SalemGoldDivider className="mb-10 w-24" />
            </SalemReveal>
            <SalemReveal delay={0.3}>
              <p className="font-sans text-salem-muted font-light leading-relaxed mb-10 text-lg md:text-xl">
                Creemos en el lujo accesible. Cada pieza está diseñada para contar una historia y acompañarte, elevando tu estilo diario con delicadeza.
              </p>
            </SalemReveal>
            <SalemReveal delay={0.4}>
              <SalemMagneticButton href="/catalog" variant="outline">
                Conocer la marca
              </SalemMagneticButton>
            </SalemReveal>
          </div>
          
          <div className="md:col-span-5 md:col-start-8 relative">
            <SalemReveal direction="left" blur={false}>
              <div className="aspect-[4/5] relative overflow-hidden bg-salem-beige/20">
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a8efc8cb025?q=80&w=1000&auto=format&fit=crop" 
                  alt="La esencia Salem" 
                  className="w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </SalemReveal>
            {/* Offset decorative image */}
            <SalemReveal direction="up" blur={false} delay={0.3} className="absolute -bottom-16 -left-16 w-1/2 aspect-square z-10 hidden md:block">
              <img 
                 src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop" 
                 alt="Detalle Joyería" 
                 className="w-full h-full object-cover border-4 border-salem-ivory shadow-premium"
              />
            </SalemReveal>
          </div>
        </div>
      </section>

      {/* 3. Featured Collection (Horizontal Scroll feel, Dark Mode) */}
      <section className="py-32 md:py-40 px-6 bg-salem-ink text-salem-ivory relative overflow-hidden clip-diagonal">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 relative z-10">
            <div className="max-w-2xl">
              <SalemReveal>
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">Selección<br/><span className="text-salem-gold">Premium</span></h2>
              </SalemReveal>
              <SalemReveal delay={0.2}>
                <p className="font-sans text-salem-beige/60 font-light max-w-md">Nuestras piezas más destacadas, elaboradas con precisión y diseñadas para deslumbrar.</p>
              </SalemReveal>
            </div>
            <SalemReveal direction="left" delay={0.4}>
              <Link to="/catalog" className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold hover:text-white transition-colors duration-300 mt-10 md:mt-0 pb-2 border-b border-salem-gold/30 hover:border-white inline-block">
                Ver Colección Completa
              </Link>
            </SalemReveal>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-[3/4] bg-salem-black/50 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {featuredProducts.map((product, index) => (
                <SalemReveal key={product.id} delay={index * 0.15} direction="up" blur={false}>
                  {/* Reuse ProductCard but force dark mode context via CSS override classes if needed, or it handles itself well enough */}
                  <div className="bg-salem-black text-white [&_h3]:text-white [&_div>span:last-child]:text-white">
                     <SalemProductCard product={product} />
                  </div>
                </SalemReveal>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* 4. Lookbook Asymmetric Grid */}
      <section className="py-32 md:py-48 px-6 bg-salem-ivory">
        <div className="max-w-[1400px] mx-auto">
          <SalemReveal className="text-center mb-24">
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-salem-gold mb-6">Inspiración</p>
            <h2 className="font-serif text-4xl md:text-6xl text-salem-ink">Lookbook Salem</h2>
          </SalemReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            {/* Big Feature */}
            <div className="md:col-span-7">
              {lookbookProducts[0] && (
                <SalemReveal direction="up" blur={false}>
                  <Link to={`/product/${lookbookProducts[0].slug || lookbookProducts[0].id}`} className="block relative group overflow-hidden bg-salem-beige/20 aspect-[4/5] md:aspect-[16/10]">
                    <img src={lookbookProducts[0].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-salem-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                       <span className="bg-salem-ivory text-salem-ink px-8 py-3 text-[10px] tracking-widest uppercase font-sans">Ver pieza</span>
                    </div>
                  </Link>
                </SalemReveal>
              )}
            </div>
            
            {/* Double Stack */}
            <div className="md:col-span-5 flex flex-col gap-6 md:gap-10">
               {lookbookProducts.slice(1, 3).map((product, idx) => (
                  <SalemReveal key={product.id} direction="up" delay={0.2 * (idx+1)} blur={false} className="h-full">
                    <Link to={`/product/${product.slug || product.id}`} className="block relative group overflow-hidden bg-salem-beige/20 h-full aspect-[4/5] md:aspect-auto">
                      <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute bottom-6 left-6 z-10">
                        <span className="bg-salem-ivory text-salem-ink px-4 py-2 text-[9px] tracking-widest uppercase font-sans shadow-premium">
                          {product.name}
                        </span>
                      </div>
                    </Link>
                  </SalemReveal>
               ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
