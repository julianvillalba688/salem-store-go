import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';

export const SalemHeader = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isScrolled ? 'bg-salem-cream/90 backdrop-blur-md border-b border-salem-gold/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <button 
            className="md:hidden text-salem-black"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          <nav className="hidden md:flex items-center gap-8 font-sans text-xs tracking-[0.15em] uppercase text-salem-black">
            <Link to="/" className="hover:text-salem-gold transition-colors duration-300">Inicio</Link>
            <Link to="/catalog" className="hover:text-salem-gold transition-colors duration-300">Catálogo</Link>
          </nav>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 h-10 md:h-12 flex items-center justify-center">
            <img src="/logo_salem_store.png" alt="Salem Store Logo" className="h-full object-contain" />
          </Link>

          <div className="flex items-center gap-6">
            <a 
              href="https://wa.me/1234567890?text=Hola,%20quisiera%20asesoría%20sobre%20las%20joyas."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase border border-salem-gold/50 px-4 py-2 hover:bg-salem-gold hover:text-white transition-all duration-500 text-salem-black"
            >
              <MessageCircle size={14} />
              <span>Contacto</span>
            </a>
            <button className="text-salem-black md:hidden">
              <MessageCircle size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-salem-cream flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-8 right-6 text-salem-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={28} strokeWidth={1} />
            </button>
            <img src="/logo_salem_icon.png" alt="Salem Store Icon" className="h-16 mb-12 opacity-80" />
            <nav className="flex flex-col items-center gap-8 font-serif text-3xl text-salem-black">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
              <Link to="/catalog" onClick={() => setMobileMenuOpen(false)}>Catálogo</Link>
              <a 
                href="https://wa.me/1234567890" 
                className="text-salem-gold mt-8 font-sans text-sm tracking-[0.2em] uppercase"
              >
                Pedir por WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
