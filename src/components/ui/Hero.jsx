import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../../config';

const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gray-50 rounded-l-full opacity-50 -z-10 transform translate-x-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 font-medium text-sm mb-6 border border-primary-100">
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
              Nueva Colección Disponible
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-dark tracking-tight mb-6 leading-tight">
              Descubre lo mejor en <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Calidad y Diseño</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Explora nuestro catálogo exclusivo de productos seleccionados cuidadosamente para brindarte la mejor experiencia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog" className="btn-primary group">
                Ver Catálogo
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Contactar Asesor
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-blue-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Colección Destacada"
              className="rounded-3xl shadow-2xl object-cover h-[500px] w-full"
            />
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 border border-gray-100"
            >
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xl">
                ★
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Calidad Premium</p>
                <p className="font-bold text-dark">Garantizada</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
