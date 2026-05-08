import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/ui/Hero';
import ProductGrid from '../components/catalog/ProductGrid';
import { ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de products.json
    const loadProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (response.ok) {
          const data = await response.json();
          // Mostrar solo destacados o los primeros 8
          const featured = data.filter(p => p.featured).slice(0, 8);
          setProducts(featured.length > 0 ? featured : data.slice(0, 8));
        } else {
          // Datos de prueba fallback
          setProducts([
            { sku: '1', name: 'Auriculares Premium', price: 120, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', slug: 'auriculares', category: 'Electrónica', isNew: true },
            { sku: '2', name: 'Reloj Minimalista', price: 85, salePrice: 70, isOffer: true, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', slug: 'reloj', category: 'Accesorios' },
            { sku: '3', name: 'Cámara Vintage', price: 250, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80', slug: 'camara', category: 'Fotografía' },
            { sku: '4', name: 'Gafas de Sol', price: 45, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80', slug: 'gafas', category: 'Accesorios' },
          ]);
        }
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <Hero />

      {/* Quienes Somos Section */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-600/20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Quiénes Somos</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Somos un equipo apasionado por ofrecer productos de la más alta calidad con un diseño excepcional. Nuestra misión es facilitarte el acceso a artículos premium con un servicio de atención personalizada directo a tu WhatsApp, sin complicaciones ni procesos de pago engorrosos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 text-center"
            >
              <div className="w-16 h-16 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calidad Garantizada</h3>
              <p className="text-gray-400">Seleccionamos rigurosamente cada artículo de nuestro catálogo.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 text-center"
            >
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Envíos Seguros</h3>
              <p className="text-gray-400">Coordinamos la entrega de forma directa y confiable.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 text-center"
            >
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Atención Rápida</h3>
              <p className="text-gray-400">Atención personalizada y al instante vía WhatsApp.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-2">Productos Destacados</h2>
              <p className="text-gray-600">Lo mejor de nuestra colección, seleccionado para ti.</p>
            </div>
            <Link to="/catalog" className="hidden sm:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors">
              Ver todo <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}

          <div className="mt-12 text-center sm:hidden">
            <Link to="/catalog" className="btn-outline w-full">
              Ver todo el catálogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
