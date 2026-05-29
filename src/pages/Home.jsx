import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SalemButton } from '../components/ui/SalemButton';
import { SalemProductCard } from '../components/ui/SalemProductCard';
import { useCatalog } from '../hooks/useCatalog';

export const Home = () => {
  const { products, loading } = useCatalog();
  
  // Use products with images, prefer featured or just take first 4
  const featuredProducts = products.filter(p => p.image).slice(0, 4);
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean).slice(0, 4);

  return (
    <div className="w-full bg-salem-cream">
      {/* Editorial Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-salem-ivory">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=2000&auto=format&fit=crop" 
            alt="Salem Store Jewelry" 
            className="w-full h-full object-cover opacity-[0.65] mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-salem-cream via-salem-cream/10 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-salem-black mb-8"
          >
            Detalles que marcan la diferencia
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
             <img src="/logo_salem_store.png" alt="Salem Store" className="h-24 md:h-32 object-contain mx-auto" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm md:text-base text-salem-muted max-w-lg mx-auto mb-12 font-light leading-relaxed"
          >
            Accesorios elegantes para resaltar tu esencia, tu estilo y tu feminidad.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <SalemButton href="/catalog" variant="primary">Explorar Colección</SalemButton>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 px-6 bg-salem-ivory">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-salem-black mb-6">Para cada momento</h2>
            <div className="w-12 h-px bg-salem-gold mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.map((category, index) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer relative aspect-[3/4] overflow-hidden bg-salem-beige/30"
              >
                <div className="absolute inset-0 bg-salem-black/5 group-hover:bg-salem-black/20 transition-colors duration-700 z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="font-serif text-2xl md:text-3xl text-salem-black tracking-wide group-hover:scale-105 transition-transform duration-700">{category}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6 bg-salem-cream">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-salem-black mb-6">Colección Destacada</h2>
              <div className="w-12 h-px bg-salem-gold"></div>
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/catalog" className="font-sans text-[10px] tracking-[0.2em] uppercase text-salem-gold hover:text-salem-black transition-colors duration-300 mt-6 md:mt-0 pb-1 border-b border-salem-gold/30">
                Ver todo
              </Link>
            </motion.div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-[3/4] bg-salem-beige/20 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
              {featuredProducts.map((product) => (
                <SalemProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Editorial Essence */}
      <section className="py-32 px-6 bg-salem-black text-salem-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-[3/4] md:aspect-[4/5] relative"
          >
             <img 
              src="https://images.unsplash.com/photo-1515562141207-7a8efc8cb025?q=80&w=1000&auto=format&fit=crop" 
              alt="La esencia Salem" 
              className="w-full h-full object-cover grayscale opacity-70"
            />
            <div className="absolute inset-0 border border-salem-gold/20 -translate-x-4 -translate-y-4"></div>
            <img src="/logo_salem_icon.png" className="absolute bottom-8 right-8 h-12 invert brightness-0 saturate-100 opacity-50" style={{ filter: 'brightness(0) invert(1)' }} alt="Salem" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:pl-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight text-white">La esencia<br/><span className="text-salem-gold">Salem</span></h2>
            <div className="w-12 h-px bg-salem-gold/50 mb-8"></div>
            <p className="font-sans text-salem-beige font-light leading-relaxed mb-10 max-w-md">
              Cada pieza está diseñada para contar una historia. Creemos en el lujo accesible, en los detalles mínimos que transforman un atuendo y en la belleza de lo sutil.
            </p>
            <SalemButton href="/catalog" variant="outline" className="border-salem-gold/50 text-salem-gold hover:bg-salem-gold hover:text-white">
              Descubrir
            </SalemButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
