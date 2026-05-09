import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MessageCircle, ShoppingCart, ShieldCheck, Truck, ChevronRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteConfig } from '../config';
import { generateProductWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';
import { formatPrice } from '../utils/formatters';

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (response.ok) {
          const data = await response.json();
          const found = data.find(p => p.slug === slug || String(p.id) === slug);
          setProduct(found);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif text-dark mb-4">Pieza no encontrada</h2>
        <p className="text-gray-500 mb-8">Lo sentimos, esta joya ya no está disponible en nuestro catálogo.</p>
        <Link to="/catalog" className="bg-dark text-white px-8 py-3 rounded-full font-medium hover:bg-primary-900 transition-colors">Volver a la colección</Link>
      </div>
    );
  }

  const handleWhatsApp = () => {
    openWhatsApp(generateProductWhatsAppMessage(product), 'whatsapp_click_product_detail');
  };

  const isAvailable = product.status !== 'agotado';

  // Breadcrumbs Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": siteConfig.url },
      { "@type": "ListItem", "position": 2, "name": "Catálogo", "item": `${siteConfig.url}/catalog` },
      { "@type": "ListItem", "position": 3, "name": product.category || "Producto", "item": `${siteConfig.url}/catalog` },
      { "@type": "ListItem", "position": 4, "name": product.name, "item": `${siteConfig.url}/product/${product.slug}` }
    ]
  };

  return (
    <div className="bg-[#fcf9f8] min-h-screen py-10">
      <Helmet>
        <title>{product.name} | {siteConfig.siteName}</title>
        <meta name="description" content={product.description || `Compra ${product.name} en ${siteConfig.siteName}. Bisutería fina por WhatsApp.`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8 font-medium">
          <Link to="/" className="hover:text-dark">Inicio</Link>
          <ChevronRight size={14} className="mx-2 text-gray-300" />
          <Link to="/catalog" className="hover:text-dark">Colección</Link>
          <ChevronRight size={14} className="mx-2 text-gray-300" />
          <span className="text-dark truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-[2rem] p-4 lg:p-10 shadow-sm border border-[#f2e8e5]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

            {/* Imagen del Producto */}
            <motion.div
              className="relative aspect-[4/5] bg-[#fcf9f8] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img
                src={product.image}
                alt={product.name}
                fetchPriority="high"
                loading="eager"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=75';
                }}
              />
              {!isAvailable && (
                <div className="absolute top-4 left-4 bg-dark text-white text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-full">
                  Agotado temporalmente
                </div>
              )}
            </motion.div>

            {/* Detalles del Producto */}
            <motion.div className="flex flex-col" variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp} className="mb-2">
                <span className="text-xs uppercase tracking-widest text-gold font-bold bg-gold/10 px-3 py-1 rounded-full">
                  {product.category || 'Accesorios'}
                </span>
                {product.sku && <span className="text-xs text-gray-400 ml-3">SKU: {product.sku}</span>}
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-3xl lg:text-4xl font-serif font-bold text-dark mt-4 mb-4 leading-tight">
                {product.name}
              </motion.h1>

              <div className="flex items-end gap-3 mb-6 pb-6 border-b border-[#f2e8e5]">
                {product.isOffer && product.salePrice ? (
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-3xl font-bold text-accent">{formatPrice(product.salePrice)}</span>
                    <span className="text-xl text-gray-400 line-through mb-1">{formatPrice(product.price)}</span>
                  </div>
                ) : (
                  <div className="mb-4">
                  <span className="text-3xl font-bold text-dark">{formatPrice(product.price)}</span>
                  </div>
                )}</div>

              <div className="prose prose-sm sm:prose text-gray-600 mb-6">
                <p className="whitespace-pre-line leading-relaxed">
                  {product.description || "Una pieza delicada diseñada para resaltar tu estilo en cualquier ocasión. Consulta disponibilidad para más detalles."}
                </p>
              </div>

              {/* Atributos Adicionales */}
              {(() => {
                const category = product.category || '';
                const name = product.name || '';
                const desc = product.description || '';
                
                // Fallback de Material
                const materialFallback = (name.toLowerCase().includes('18k') || desc.toLowerCase().includes('18k')) 
                  ? 'Oro laminado 18K' 
                  : (category === 'Juegos' || category === 'Sets') 
                    ? 'Acabado de bisutería fina' 
                    : 'Acabado de bisutería fina';
                
                const displayMaterial = product.material || materialFallback;

                // Fallback de Recomendación
                let recommendationFallback = 'Uso diario o regalo especial';
                if (category.includes('Arete')) recommendationFallback = 'Uso diario o regalo especial';
                else if (category.includes('Anillo')) recommendationFallback = 'Perfecto para combinar o regalar';
                else if (['Collares', 'Cadenas Y Collar', 'Gargantillas'].includes(category)) recommendationFallback = 'Ideal para elevar looks diarios';
                else if (category.includes('Pulsera')) recommendationFallback = 'Perfecta para combinar en capas';
                else if (category.includes('Tobillera')) recommendationFallback = 'Ideal para looks frescos y delicados';
                else if (category.includes('Dije')) recommendationFallback = 'Perfecto para personalizar cadenas';
                else if (['Juegos', 'Sets'].includes(category)) recommendationFallback = 'Set coordinado para regalo o uso especial';

                const displayRecommendation = product.idealFor || recommendationFallback;

                return (
                  <div className="grid grid-cols-2 gap-4 mb-8 bg-[#fdf8f6] p-4 rounded-xl border border-[#f2e8e5]">
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Material / Acabado</span>
                      <span className="text-sm font-medium text-dark">{displayMaterial}</span>
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Recomendación</span>
                      <span className="text-sm font-medium text-dark">{displayRecommendation}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Trust Badges */}
              <div className="flex flex-col gap-3 mb-8 bg-[#fcf9f8] p-5 rounded-xl border border-[#f2e8e5]">
                <div className="flex items-center gap-3 text-sm text-dark font-medium">
                  <ShieldCheck size={20} className="text-green-600" />
                  Compra segura por WhatsApp
                </div>
                <div className="flex items-center gap-3 text-sm text-dark font-medium">
                  <Truck size={20} className="text-primary-500" />
                  Envíos a domicilio coordinados
                </div>
              </div>

              {/* Botones de Acción */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button
                  onClick={handleWhatsApp}
                  disabled={!isAvailable}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm lg:text-base transition-all shadow-md ${
                    isAvailable 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <MessageCircle size={20} />
                  {isAvailable ? 'Comprar por WhatsApp' : 'Consultar reposición'}
                </button>
                
                <button
                  onClick={() => addToCart(product)}
                  disabled={!isAvailable}
                  className={`sm:w-auto flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold transition-all border-2 ${
                    isAvailable
                      ? 'border-dark text-dark hover:bg-dark hover:text-white'
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span className="sm:hidden">Agregar al carrito</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
