import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, MessageCircle, ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { generateProductWhatsAppMessage, openWhatsApp } from '../utils/whatsapp';
import { siteConfig } from '../config';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch('/data/products.json');
        let foundProduct = null;
        if (response.ok) {
          const data = await response.json();
          foundProduct = data.find(p => p.slug === slug);
        } else {
          // Fallback
          const dummyData = [
            { sku: '1', name: 'Auriculares Premium', description: 'Experimenta un sonido envolvente de alta calidad. Diseño ergonómico, batería de larga duración y cancelación de ruido activa.', price: 120, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', gallery: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'], slug: 'auriculares', category: 'Electrónica', stock: 10, status: 'disponible' }
          ];
          foundProduct = dummyData.find(p => p.slug === slug) || dummyData[0];
        }
        
        if (foundProduct) {
          setProduct(foundProduct);
          setMainImage(foundProduct.image);
        }
      } catch (error) {
        console.error('Error cargando producto:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Producto no encontrado</h2>
        <p className="text-gray-500 mb-8">El producto que buscas no existe o ha sido eliminado.</p>
        <Link to="/catalog" className="btn-primary">Volver al catálogo</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWhatsApp = () => {
    const message = generateProductWhatsAppMessage(product);
    openWhatsApp(message);
  };

  const isOutOfStock = product.status === 'agotado';

  return (
    <div className="bg-white min-h-screen pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/catalog" className="inline-flex items-center gap-2 text-gray-500 hover:text-dark font-medium mb-8 transition-colors">
          <ArrowLeft size={20} />
          Volver al catálogo
        </Link>

        <div className="bg-white rounded-3xl p-6 lg:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12">
          
          {/* Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar py-2 lg:w-24 flex-shrink-0">
              {product.image && (
                <button
                  onClick={() => setMainImage(product.image)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${mainImage === product.image ? 'border-primary-500 shadow-md' : 'border-transparent hover:border-gray-200 opacity-70 hover:opacity-100'}`}
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </button>
              )}
              {product.gallery && product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${mainImage === img ? 'border-primary-500 shadow-md' : 'border-transparent hover:border-gray-200 opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            <motion.div 
              key={mainImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 bg-gray-50 rounded-2xl overflow-hidden aspect-square lg:aspect-[4/5] relative"
            >
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover object-center" />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">NUEVO</span>
              )}
            </motion.div>
          </div>

          {/* Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-medium text-primary-600 tracking-wider uppercase">{product.category}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-dark mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-baseline gap-2">
                {product.isOffer && product.salePrice ? (
                  <>
                    <span className="text-3xl font-bold text-red-600">{siteConfig.currencySymbol}{product.salePrice}</span>
                    <span className="text-xl text-gray-400 line-through">{siteConfig.currencySymbol}{product.price}</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">{siteConfig.currencySymbol}{product.price}</span>
                )}
              </div>
              <div className="h-6 w-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>

            <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-2xl">
              <div className="flex items-center gap-3 text-gray-700">
                <Check className="text-green-500" size={20} />
                <span>Estado: <strong className={isOutOfStock ? 'text-red-500' : 'text-green-600'}>
                  {isOutOfStock ? 'Agotado' : 'Disponible'}
                </strong></span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <ShieldCheck className="text-blue-500" size={20} />
                <span>Compra segura, coordinación directa por WhatsApp</span>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100 space-y-4">
              <div className="flex gap-4 mb-4">
                <div className="w-1/3 border border-gray-200 rounded-xl flex items-center justify-between p-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    -
                  </button>
                  <span className="font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-2/3 btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={22} />
                  Agregar al Carrito
                </button>
              </div>

              <button 
                onClick={handleWhatsApp}
                className="w-full btn-whatsapp text-lg"
              >
                <MessageCircle size={22} />
                Consultar por WhatsApp
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
