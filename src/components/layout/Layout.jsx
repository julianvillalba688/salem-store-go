import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { siteConfig } from '../../config';
import CartDrawer from '../cart/CartDrawer';
import WhatsAppButton from '../ui/WhatsAppButton';

export const Layout = () => {
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header Scroll-aware */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border-soft py-2' : 'bg-warm py-4'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-md group-hover:bg-gold transition-colors">
                  {siteConfig.brandName.charAt(0)}
                </div>
                <span className="font-serif font-bold text-2xl tracking-wide text-dark">{siteConfig.brandName}</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-10">
              <Link to="/" className={`font-medium tracking-wide transition-colors ${location.pathname === '/' ? 'text-gold' : 'text-gray-500 hover:text-dark'}`}>INICIO</Link>
              <Link to="/catalog" className={`font-medium tracking-wide transition-colors ${location.pathname === '/catalog' ? 'text-gold' : 'text-gray-500 hover:text-dark'}`}>COLECCIÓN</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-dark hover:text-gold transition-colors"
                aria-label="Abrir carrito"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-dark rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                className="md:hidden p-2 text-dark"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menú principal"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-border-soft absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link to="/" className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-gold hover:bg-warm rounded-lg">Inicio</Link>
              <Link to="/catalog" className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-gold hover:bg-warm rounded-lg">Colección Completa</Link>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-grow w-full relative z-10">
        <Outlet />
      </main>

      {/* Franja de Confianza Pre-Footer */}
      <div className="bg-gold/5 border-y border-gold/10 py-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-sm text-dark font-medium">
          <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-gold" /> Compras 100% Seguras</div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gold/30" />
          <div className="flex items-center gap-2"><MessageCircle size={18} className="text-gold" /> Atención Personalizada</div>
        </div>
      </div>

      <footer className="bg-white pt-16 pb-8 relative z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-dark rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-md">
                  {siteConfig.brandName.charAt(0)}
                </div>
                <span className="font-serif font-bold text-xl tracking-wide text-dark">{siteConfig.siteName}</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Piezas exclusivas que resaltan tu belleza natural. Atención personalizada y envíos seguros a domicilio.
              </p>
            </div>

            <div>
              <h4 className="font-serif font-bold text-dark mb-6 text-lg">Explorar</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/catalog" className="hover:text-gold transition-colors">Colección Completa</Link></li>
                <li><Link to="/catalog?category=aretes" className="hover:text-gold transition-colors">Aretes</Link></li>
                <li><Link to="/catalog?category=collares" className="hover:text-gold transition-colors">Collares</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-dark mb-6 text-lg">Servicio</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><span className="hover:text-gold transition-colors cursor-pointer">Cuidados de Bisutería</span></li>
                <li><span className="hover:text-gold transition-colors cursor-pointer">Envíos y Entregas</span></li>
                <li><span className="hover:text-gold transition-colors cursor-pointer">Preguntas Frecuentes</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-dark mb-6 text-lg">Contacto</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-green-500" />
                  <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium text-dark">
                    +{siteConfig.whatsappNumber}
                  </a>
                </li>
                <li className="text-gray-400 text-xs mt-2">
                  Lunes a Sábado, 9:00am - 6:00pm
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border-soft flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">
              &copy; {new Date().getFullYear()} {siteConfig.siteName}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WhatsAppButton />
    </div>
  );
};
