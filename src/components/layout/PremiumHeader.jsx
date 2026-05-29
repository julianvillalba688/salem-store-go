import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AnimatedMobileMenu } from './AnimatedMobileMenu';

export const PremiumHeader = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 bg-salem-ivory/95 backdrop-blur-md ${isScrolled ? 'border-b border-salem-ink/5 shadow-sm' : ''}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 h-[72px] md:h-20 flex items-center justify-between">
          
          {/* Mobile Hamburger */}
          <button 
            className="lg:hidden relative z-[70] w-8 h-8 flex flex-col justify-center items-center text-salem-ink"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-px block transition-all duration-300 ${mobileMenuOpen ? 'bg-salem-ink rotate-45 translate-y-[1px]' : 'bg-current mb-1.5'}`}></span>
            <span className={`w-6 h-px block transition-all duration-300 ${mobileMenuOpen ? 'bg-salem-ink -rotate-45 -translate-y-[0px]' : 'bg-current'}`}></span>
          </button>

          {/* Desktop Left Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-sans text-xs tracking-wider uppercase text-salem-ink w-1/3">
            <Link to="/" className="hover:text-salem-gold transition-colors duration-300">
              Inicio
            </Link>
            <Link to="/catalog" className="hover:text-salem-gold transition-colors duration-300">
              Catálogo
            </Link>
          </nav>

          {/* Central Logo */}
          <div className="flex-1 flex justify-center w-1/3 relative z-[70]">
            <Link to="/" className="h-8 md:h-10 flex items-center justify-center">
              <img 
                src="/logo_salem_store.png" 
                alt="Salem Store" 
                className="h-full object-contain mix-blend-multiply" 
              />
            </Link>
          </div>

          {/* Desktop Right Nav */}
          <div className="hidden lg:flex items-center justify-end w-1/3">
             <a 
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-xs tracking-wider uppercase text-salem-ink hover:text-salem-gold transition-colors duration-300 group"
            >
              WhatsApp
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </motion.header>

      <AnimatedMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
