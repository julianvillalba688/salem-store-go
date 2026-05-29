import React from 'react';
import { Link } from 'react-router-dom';

export const SalemFooter = () => {
  return (
    <footer className="bg-carbon text-cream py-20 px-6 border-t border-gold/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        <div className="md:col-span-2">
          <h2 className="font-serif text-3xl mb-6 tracking-tight text-white">Salem Store</h2>
          <p className="font-sans text-sm text-gray-400 font-light max-w-sm leading-relaxed">
            Accesorios elegantes para resaltar tu esencia, tu estilo y tu feminidad. 
            Detalles que marcan la diferencia.
          </p>
        </div>
        
        <div>
          <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-6">Navegación</h3>
          <ul className="space-y-4 font-sans text-sm text-gray-300 font-light">
            <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
            <li><Link to="/catalog" className="hover:text-white transition-colors">Colección Completa</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-6">Contacto</h3>
          <ul className="space-y-4 font-sans text-sm text-gray-300 font-light">
            <li>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-gray-500 tracking-wider">
        <p>&copy; {new Date().getFullYear()} Salem Store. Todos los derechos reservados.</p>
        <p className="mt-4 md:mt-0">Diseñado con elegancia.</p>
      </div>
    </footer>
  );
};
