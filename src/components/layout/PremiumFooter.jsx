import React from 'react';
import { Link } from 'react-router-dom';

export const PremiumFooter = () => {
  return (
    <footer className="bg-salem-ink text-white pt-20 pb-10 px-6 border-t border-salem-gold/10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        {/* Brand */}
        <div className="flex flex-col items-start">
          <Link to="/" className="mb-6 block">
            <img 
              src="/logo_salem_store.png" 
              alt="Salem Store" 
              className="h-10 object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>
          <p className="font-sans text-sm text-salem-beige/70 max-w-xs font-light leading-relaxed">
            La esencia de lo sutil. Joyería elegante diseñada para resaltar tu belleza en cada momento.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-start md:items-center">
          <div>
            <h4 className="font-serif text-lg mb-6">Navegación</h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-salem-beige/70">
              <li><Link to="/" className="hover:text-salem-gold transition-colors">Inicio</Link></li>
              <li><Link to="/catalog" className="hover:text-salem-gold transition-colors">Colección Completa</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-start md:items-end">
          <div>
            <h4 className="font-serif text-lg mb-6">Contacto</h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-salem-beige/70">
              <li>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-salem-gold transition-colors">
                  Atención vía WhatsApp
                </a>
              </li>
              <li>
                <a href="https://instagram.com/salem_store" target="_blank" rel="noopener noreferrer" className="hover:text-salem-gold transition-colors">
                  Síguenos en Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-xs text-salem-beige/40">
          © {new Date().getFullYear()} Salem Store. Todos los derechos reservados.
        </p>
        <p className="font-sans text-[10px] tracking-widest uppercase text-salem-beige/30">
          Diseñado con elegancia
        </p>
      </div>
    </footer>
  );
};
