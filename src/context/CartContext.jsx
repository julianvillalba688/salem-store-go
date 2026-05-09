import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateTotal } from '../utils/cart';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('whatsapp_cart');
      const parsed = savedCart ? JSON.parse(savedCart) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Error parsing cart from localStorage:', e);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('whatsapp_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    if (!product || (!product.id && !product.sku)) return;

    setCart((prevCart) => {
      const productId = product.id || product.sku;
      const existingProduct = prevCart.find((item) => (item.id || item.sku) === productId);
      
      if (existingProduct) {
        return prevCart.map((item) =>
          (item.id || item.sku) === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Normalize price to number
      const priceValue = typeof product.salePrice !== 'undefined' && product.salePrice !== null
        ? product.salePrice 
        : product.price;
      
      const normalizedPrice = typeof priceValue === 'string'
        ? Number(priceValue.replace(/[^\d.]/g, ""))
        : Number(priceValue);

      const newItem = {
        ...product,
        id: productId,
        price: isNaN(normalizedPrice) ? 0 : normalizedPrice,
        quantity
      };

      return [...prevCart, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => (item.id || item.sku) !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id || item.sku) === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = calculateTotal(cart);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        isCartOpen,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
