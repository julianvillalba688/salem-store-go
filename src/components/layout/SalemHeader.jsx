import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
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
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isScrolled ? 'bg-cream/90 backdrop-blur-md border-b border-gold/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <button 
            className="md:hidden text-carbon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>

          <nav className="hidden md:flex items-center gap-8 font-sans text-xs tracking-[0.15em] uppercase text-carbon">
            <Link to="/" className="hover:text-gold transition-colors">Inicio</Link>
            <Link to="/catalog" className="hover:text-gold transition-colors">Colección</Link>
          </nav>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-3xl tracking-tight text-carbon">Salem Store</h1>
          </Link>

          <div className="flex items-center gap-6">
            <a 
              href="https://wa.me/1234567890?text=Hola,%20quisiera%20asesoría%20sobre%20las%20joyas."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase border border-gold/50 px-4 py-2 hover:bg-gold hover:text-white transition-all text-carbon"
            >
              <MessageCircle size={14} />
              <span>Asesoría</span>
            </a>
            <button className="text-carbon md:hidden">
              <MessageCircle size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-cream flex flex-col items-center justify-center">
          <button 
            className="absolute top-8 right-6 text-carbon"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={28} strokeWidth={1} />
          </button>
          <nav className="flex flex-col items-center gap-8 font-serif text-3xl text-carbon">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
            <Link to="/catalog" onClick={() => setMobileMenuOpen(false)}>Colección</Link>
            <a 
              href="https://wa.me/1234567890" 
              className="text-gold mt-4 font-sans text-sm tracking-[0.2em] uppercase"
            >
              Pedir por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </>
  );
};
