import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const SalemFooter = () => {
  return (
    <footer className="relative bg-salem-ink text-salem-ivory pt-32 pb-12 px-6 lg:px-12 overflow-hidden clip-diagonal z-10 -mt-10">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
      }}></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-32">
          <div className="lg:col-span-2">
            <img src="/logo_salem_icon.png" alt="Salem Store" className="h-16 mb-8 opacity-90 invert brightness-0 saturate-100" style={{ filter: 'brightness(0) invert(1)' }} />
            <p className="font-sans text-sm text-salem-nude font-light max-w-sm leading-relaxed text-balance">
              Detalles que marcan la diferencia. 
              Accesorios elegantes para resaltar tu esencia, tu estilo y tu feminidad.
            </p>
          </div>
          
          <div>
            <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold mb-8">Navegación</h3>
            <ul className="space-y-4 font-sans text-xs tracking-widest uppercase text-salem-beige/70">
              <li><Link to="/" className="hover:text-salem-gold transition-colors duration-300">Inicio</Link></li>
              <li><Link to="/catalog" className="hover:text-salem-gold transition-colors duration-300">Catálogo</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold mb-8">Atención</h3>
            <ul className="space-y-4 font-sans text-xs tracking-widest uppercase text-salem-beige/70">
              <li>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-salem-gold transition-colors duration-300 relative inline-block group">
                  <span className="relative z-10">WhatsApp</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-salem-gold transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-salem-gold transition-colors duration-300 relative inline-block group">
                  <span className="relative z-10">Instagram</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-salem-gold transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Huge Typographic Footer Finish */}
        <div className="w-full border-t border-white/5 pt-16 flex flex-col items-center">
           <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[12vw] leading-none text-center text-white/5 tracking-tighter w-full overflow-hidden whitespace-nowrap"
          >
            SALEM STORE
          </motion.h2>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] font-sans text-salem-muted tracking-widest uppercase mt-8">
            <p>&copy; {new Date().getFullYear()} Salem Store.</p>
            <p className="mt-4 md:mt-0">Diseñado con elegancia.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
