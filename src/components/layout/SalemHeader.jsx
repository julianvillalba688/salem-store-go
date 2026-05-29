import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { SalemMagneticButton } from '../ui/SalemMagneticButton';

export const SalemHeader = () => {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Home hero is usually dark/image based, so we want the header to be transparent until scroll
  const isHome = location.pathname === '/';

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 200) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const headerBg = isScrolled || !isHome 
    ? 'bg-salem-ivory/90 backdrop-blur-xl border-b border-salem-gold/10' 
    : 'bg-transparent';
    
  const textColor = isScrolled || !isHome ? 'text-salem-ink' : 'text-white';

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-700 ${headerBg}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          
          <button 
            className={`lg:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center ${mobileMenuOpen ? 'text-salem-ink' : textColor} transition-colors duration-500`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[1px] block transition-all duration-300 ${mobileMenuOpen ? 'bg-salem-ink rotate-45 translate-y-[1px]' : 'bg-current mb-1.5'}`}></span>
            <span className={`w-6 h-[1px] block transition-all duration-300 ${mobileMenuOpen ? 'bg-salem-ink -rotate-45 -translate-y-[0px]' : 'bg-current'}`}></span>
          </button>

          <nav className={`hidden lg:flex items-center gap-10 font-sans text-[10px] tracking-[0.2em] uppercase ${textColor} transition-colors duration-500`}>
            <Link to="/" className="hover:text-salem-gold transition-colors duration-300 relative group overflow-hidden">
              <span className="block group-hover:-translate-y-full transition-transform duration-500">Inicio</span>
              <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-500 text-salem-gold">Inicio</span>
            </Link>
            <Link to="/catalog" className="hover:text-salem-gold transition-colors duration-300 relative group overflow-hidden">
              <span className="block group-hover:-translate-y-full transition-transform duration-500">Catálogo</span>
              <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-500 text-salem-gold">Catálogo</span>
            </Link>
          </nav>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 h-10 lg:h-12 flex items-center justify-center z-50">
            <img 
              src="/logo_salem_store.png" 
              alt="Salem Store" 
              className={`h-full object-contain transition-all duration-700 ${!isScrolled && isHome && !mobileMenuOpen ? 'invert brightness-0 saturate-100' : ''}`} 
              style={!isScrolled && isHome && !mobileMenuOpen ? { filter: 'brightness(0) invert(1)' } : {}}
            />
          </Link>

          <div className="flex items-center gap-6">
             <a 
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden lg:flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase transition-all duration-500 group overflow-hidden ${textColor}`}
            >
              <span className="relative flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-salem-gold rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-salem-ivory flex flex-col items-center justify-center"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
            }}></div>
            <img src="/logo_salem_icon.png" alt="Salem" className="h-20 mb-16 opacity-10 absolute bottom-10 right-10" />
            
            <nav className="flex flex-col items-center gap-8 font-serif text-4xl text-salem-ink z-10">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-salem-gold transition-colors">Inicio</Link>
              <Link to="/catalog" onClick={() => setMobileMenuOpen(false)} className="hover:text-salem-gold transition-colors">Colección</Link>
            </nav>

            <div className="absolute bottom-20 z-10 flex flex-col items-center">
              <SalemMagneticButton href="https://wa.me/1234567890" variant="outline" className="border-salem-gold/30">
                Contactar por WhatsApp
              </SalemMagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
