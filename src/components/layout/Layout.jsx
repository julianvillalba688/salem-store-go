import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, MessageCircle, ShieldCheck, Truck, Heart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { siteConfig } from '../../config';
import CartDrawer from '../cart/CartDrawer';
import WhatsAppButton from '../ui/WhatsAppButton';

export const Layout = () => {
  const { cartCount, isCartOpen, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsMobileMenuOpen(false); window.scrollTo(0,0); }, [location]);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive:true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-white/96 backdrop-blur-md shadow-delicate border-b border-border-soft py-2' : 'bg-warm py-3'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="Lumina Accesorios - Inicio">
              <div className="w-9 h-9 bg-dark rounded-full flex items-center justify-center text-white font-serif italic text-lg shadow-sm group-hover:bg-gold transition-colors duration-300">
                {siteConfig.brandName.charAt(0)}
              </div>
              <div>
                <span className="font-serif font-bold text-xl tracking-wide text-dark leading-none">{siteConfig.brandName}</span>
                <p className="text-[9px] text-gold font-medium tracking-[0.15em] uppercase leading-none mt-0.5">Accesorios</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className={`text-xs font-semibold tracking-[0.12em] uppercase transition-colors ${location.pathname==='/' ? 'text-gold' : 'text-gray-500 hover:text-dark'}`}>Inicio</Link>
              <Link to="/catalog" className={`text-xs font-semibold tracking-[0.12em] uppercase transition-colors ${location.pathname==='/catalog' ? 'text-gold' : 'text-gray-500 hover:text-dark'}`}>Colección</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-dark hover:text-gold transition-colors rounded-xl hover:bg-warm min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Abrir carrito de compras">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 text-[9px] font-bold text-white bg-dark rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="md:hidden p-2.5 text-dark hover:bg-warm rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menú principal">
                {isMobileMenuOpen ? <X size={22}/> : <Menu size={22}/>}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border-soft shadow-soft absolute w-full">
            <div className="px-4 py-4 space-y-1">
              <Link to="/" className="flex items-center px-4 py-3 text-sm font-semibold text-gray-700 hover:text-gold hover:bg-warm rounded-xl transition-colors">Inicio</Link>
              <Link to="/catalog" className="flex items-center px-4 py-3 text-sm font-semibold text-gray-700 hover:text-gold hover:bg-warm rounded-xl transition-colors">Colección Completa</Link>
              <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-green-600 hover:bg-green-50 rounded-xl transition-colors">
                <MessageCircle size={16}/> Contactar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow w-full relative z-10"><Outlet /></main>

      {/* Pre-footer trust strip */}
      <div className="bg-dark py-5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {[
              { icon:<ShieldCheck size={15}/>, label:'Compras 100% Seguras' },
              { icon:<Truck size={15}/>, label:'Envíos a Domicilio' },
              { icon:<Heart size={15}/>, label:'Calidad Garantizada' },
              { icon:<Star size={15}/>, label:'+500 Clientas Felices' },
            ].map((item,i) => (
              <div key={i} className="flex items-center gap-2 text-white/60 text-xs font-medium">
                <span className="text-gold">{item.icon}</span>{item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark pt-14 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-gold rounded-full flex items-center justify-center text-white font-serif italic text-lg">
                  {siteConfig.brandName.charAt(0)}
                </div>
                <div>
                  <span className="font-serif font-bold text-xl tracking-wide text-white">{siteConfig.brandName}</span>
                  <p className="text-[9px] text-gold/70 font-medium tracking-[0.15em] uppercase mt-0.5">Accesorios</p>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
                Piezas exclusivas que resaltan tu belleza natural. Atención personalizada y envíos seguros. Tu estilo, nuestro arte.
              </p>
              <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola, me gustaría conocer sus productos.')}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/25 rounded-xl text-sm font-semibold hover:bg-[#25D366] hover:text-white transition-all duration-200">
                <MessageCircle size={16}/> Escríbenos ahora
              </a>
            </div>

            {/* Explorar */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Explorar</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li><Link to="/catalog" className="hover:text-gold transition-colors">Colección Completa</Link></li>
                <li><Link to="/catalog?category=Aretes" className="hover:text-gold transition-colors">Aretes</Link></li>
                <li><Link to="/catalog?category=Collares" className="hover:text-gold transition-colors">Collares</Link></li>
                <li><Link to="/catalog?category=Pulseras" className="hover:text-gold transition-colors">Pulseras</Link></li>
                <li><Link to="/catalog?category=Sets" className="hover:text-gold transition-colors">Sets y Conjuntos</Link></li>
              </ul>
            </div>

            {/* Servicio */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Servicio</h4>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="flex items-center gap-2">
                  <MessageCircle size={14} className="text-[#25D366]"/>
                  <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium text-white/70">
                    +{siteConfig.whatsappNumber}
                  </a>
                </li>
                <li className="text-white/35 text-xs">Lun–Sáb, 9:00am – 6:00pm</li>
                <li className="mt-2"><span className="hover:text-gold transition-colors cursor-default">Cuidados de Bisutería</span></li>
                <li><span className="hover:text-gold transition-colors cursor-default">Envíos y Entregas</span></li>
                <li><span className="hover:text-gold transition-colors cursor-default">Preguntas Frecuentes</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/25 text-xs">© {new Date().getFullYear()} {siteConfig.siteName}. Todos los derechos reservados.</p>
            <p className="text-white/20 text-xs italic font-serif">Tu estilo, nuestro arte.</p>
          </div>
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WhatsAppButton />
    </div>
  );
};
