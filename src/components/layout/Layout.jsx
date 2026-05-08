import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { siteConfig } from '../../config';
import CartDrawer from '../cart/CartDrawer';
import WhatsAppButton from '../ui/WhatsAppButton';

export const Layout = () => {
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md w-full border-b border-[#f2e8e5]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-dark rounded-full flex items-center justify-center text-white font-serif italic text-2xl shadow-md">
                  {siteConfig.brandName.charAt(0)}
                </div>
                <span className="font-serif font-bold text-2xl tracking-wide text-dark">{siteConfig.brandName}</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-10">
              <Link to="/" className="text-gray-500 hover:text-primary-600 font-medium tracking-wide transition-colors">INICIO</Link>
              <Link to="/catalog" className="text-gray-500 hover:text-primary-600 font-medium tracking-wide transition-colors">COLECCIÓN</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-dark transition-colors"
                aria-label="Abrir carrito"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-accent rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 text-gray-600"
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
          <nav className="md:hidden bg-white border-t border-[#f2e8e5] absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link to="/" className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg">Inicio</Link>
              <Link to="/catalog" className="block px-3 py-4 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg">Colección Completa</Link>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full relative z-10">
        <Outlet />
      </main>

      {/* Footer Profesional */}
      <footer className="bg-white border-t border-[#f2e8e5] pt-16 pb-8 relative z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Columna 1: Marca */}
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
              <div className="flex gap-4">
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#fdf8f6] flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href={siteConfig.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#fdf8f6] flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              </div>
            </div>

            {/* Columna 2: Enlaces */}
            <div>
              <h4 className="font-serif font-bold text-dark mb-6">Explorar</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><Link to="/catalog" className="hover:text-primary-600 transition-colors">Colección Completa</Link></li>
                <li><Link to="/catalog" className="hover:text-primary-600 transition-colors">Lo Más Nuevo</Link></li>
              </ul>
            </div>

            {/* Columna 3: Atención al cliente */}
            <div>
              <h4 className="font-serif font-bold text-dark mb-6">Atención al Cliente</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button className="hover:text-primary-600 transition-colors text-left">Cómo Cuidar tu Bisutería</button></li>
                <li><button className="hover:text-primary-600 transition-colors text-left">Políticas de Envío</button></li>
                <li><button className="hover:text-primary-600 transition-colors text-left">Cambios y Devoluciones</button></li>
              </ul>
            </div>

            {/* Columna 4: Contacto directo */}
            <div>
              <h4 className="font-serif font-bold text-dark mb-6">Contacto</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-center gap-3">
                  <MessageCircle size={16} className="text-green-500" />
                  <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors font-medium">
                    WhatsApp: +{siteConfig.whatsappNumber}
                  </a>
                </li>
                <li className="text-gray-400 text-xs mt-2">
                  Horario de atención:<br/>Lunes a Sábado, 9:00am - 6:00pm
                </li>
              </ul>
            </div>

          </div>
          
          <div className="pt-8 border-t border-[#f2e8e5] text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">
              &copy; {new Date().getFullYear()} {siteConfig.siteName}. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 text-xs text-gray-400">
              <button className="hover:text-gray-600">Privacidad</button>
              <button className="hover:text-gray-600">Términos</button>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WhatsAppButton />
    </div>
  );
};
