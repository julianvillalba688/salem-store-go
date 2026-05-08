import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../../config';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../cart/CartDrawer';
import WhatsAppButton from '../ui/WhatsAppButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-40 glass-effect w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-dark transition-colors"
              aria-label="Carrito de compras"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-green-500 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-dark focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full glass-effect shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              to="/"
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-dark hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/catalog"
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-dark hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-dark font-bold text-lg">
                {siteConfig.brandName.charAt(0)}
              </div>
              <span className="font-bold text-xl">{siteConfig.brandName}</span>
            </div>
            <p className="text-gray-400 mb-6">
              Descubre nuestra selección de productos premium. Calidad y diseño a tu alcance.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">Catálogo</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4 text-gray-400">
              <li>{siteConfig.address}</li>
              <li>{siteConfig.businessHours}</li>
              <li>WhatsApp: +{siteConfig.whatsappNumber}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {siteConfig.siteName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
};
