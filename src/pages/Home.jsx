import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SalemButton } from '../components/ui/SalemButton';
import { SalemProductCard } from '../components/ui/SalemProductCard';
import { catalogData, categories } from '../utils/mockData';

export const Home = () => {
  const featuredProducts = catalogData.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-cream">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=2000&auto=format&fit=crop" 
            alt="Salem Store Jewelry" 
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/20 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-carbon mb-6"
          >
            Detalles que marcan la diferencia
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-6xl md:text-8xl text-carbon mb-8 leading-tight tracking-tight"
          >
            Salem Store
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-sans text-sm md:text-base text-gray-editorial max-w-lg mx-auto mb-12 font-light leading-relaxed"
          >
            Accesorios elegantes para resaltar tu esencia, tu estilo y tu feminidad.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <SalemButton href="/catalog" variant="primary">Explorar Colección</SalemButton>
            <SalemButton href="https://wa.me/1234567890" variant="outline">Asesoría Personalizada</SalemButton>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-32 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl text-carbon mb-4">Para cada momento</h2>
            <div className="w-12 h-px bg-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.filter(c => c !== 'Todos' && c !== 'Sets').map((category, index) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer relative aspect-[4/5] overflow-hidden bg-gray-light"
              >
                <div className="absolute inset-0 bg-carbon/10 group-hover:bg-carbon/30 transition-colors duration-500 z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="font-serif text-2xl text-white tracking-wide group-hover:scale-110 transition-transform duration-700">{category}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className="font-serif text-4xl text-carbon mb-4">Piezas Destacadas</h2>
              <div className="w-12 h-px bg-gold"></div>
            </div>
            <Link to="/catalog" className="font-sans text-xs tracking-[0.2em] uppercase text-gold hover:text-carbon transition-colors mt-6 md:mt-0 pb-1 border-b border-gold/30">
              Ver Todo
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {featuredProducts.map((product) => (
              <SalemProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Editorial Essence */}
      <section className="py-32 px-6 bg-carbon text-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[3/4] relative"
          >
             <img 
              src="https://images.unsplash.com/photo-1515562141207-7a8efc8cb025?q=80&w=1000&auto=format&fit=crop" 
              alt="La esencia Salem" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
            <div className="absolute inset-0 border border-gold/30 -translate-x-4 -translate-y-4"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-5xl mb-8 leading-tight text-white">La esencia<br/>Salem</h2>
            <p className="font-sans text-gray-400 font-light leading-relaxed mb-8 max-w-md">
              Cada pieza está diseñada para contar una historia. Creemos en el lujo accesible, en los detalles mínimos que transforman un atuendo y en la belleza de lo sutil.
            </p>
            <SalemButton href="/catalog" variant="outline" className="border-gold/50 text-gold hover:bg-gold hover:text-white">
              Nuestra Historia
            </SalemButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
