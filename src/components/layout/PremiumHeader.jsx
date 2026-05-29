import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { AnimatedMobileMenu } from './AnimatedMobileMenu';

export const PremiumHeader = () => {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const isHome = location.pathname === '/';

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const headerBg = isScrolled || !isHome 
    ? 'bg-salem-ivory/90 backdrop-blur-xl border-b border-salem-gold/10' 
    : 'bg-transparent';
    
  const textColor = isScrolled || !isHome ? 'text-salem-ink' : 'text-salem-ivory';

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-colors duration-700 ${headerBg}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          
          {/* Mobile Hamburger */}
          <button 
            className={`lg:hidden relative z-[70] w-8 h-8 flex flex-col justify-center items-center ${mobileMenuOpen ? 'text-salem-ink' : textColor} transition-colors duration-500`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px block transition-all duration-300 ${mobileMenuOpen ? 'bg-salem-ink rotate-45 translate-y-[1px]' : 'bg-current mb-1.5'}`}></span>
            <span className={`w-6 h-px block transition-all duration-300 ${mobileMenuOpen ? 'bg-salem-ink -rotate-45 -translate-y-[0px]' : 'bg-current'}`}></span>
          </button>

          {/* Desktop Left Nav */}
          <nav className={`hidden lg:flex items-center gap-10 font-sans text-[10px] tracking-[0.2em] uppercase ${textColor} transition-colors duration-500 w-1/3`}>
            <Link to="/" className="hover:text-salem-gold transition-colors duration-300 relative group overflow-hidden">
              <span className="block group-hover:-translate-y-full transition-transform duration-500">Inicio</span>
              <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-500 text-salem-gold">Inicio</span>
            </Link>
            <Link to="/catalog" className="hover:text-salem-gold transition-colors duration-300 relative group overflow-hidden">
              <span className="block group-hover:-translate-y-full transition-transform duration-500">Catálogo</span>
              <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-500 text-salem-gold">Catálogo</span>
            </Link>
          </nav>

          {/* Central Logo */}
          <div className="flex-1 flex justify-center w-1/3 relative z-[70] pointer-events-none">
            <Link to="/" className="h-10 lg:h-12 flex items-center justify-center pointer-events-auto">
              <img 
                src="/logo_salem_store.png" 
                alt="Salem Store" 
                className={`h-full object-contain transition-all duration-700 ${!isScrolled && isHome && !mobileMenuOpen ? 'invert brightness-0 saturate-100' : ''}`} 
                style={!isScrolled && isHome && !mobileMenuOpen ? { filter: 'brightness(0) invert(1)' } : {}}
              />
            </Link>
          </div>

          {/* Desktop Right Nav */}
          <div className="hidden lg:flex items-center justify-end gap-6 w-1/3">
             <a 
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-500 group overflow-hidden ${textColor}`}
            >
              <span className="relative flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-salem-gold rounded-full group-hover:scale-150 transition-transform duration-300"></span>
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </motion.header>

      <AnimatedMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
