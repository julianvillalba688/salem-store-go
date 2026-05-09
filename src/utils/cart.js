// utils/cart.js

export const calculateSubtotal = (price, quantity) => {
  return price * quantity;
};

export const calculateTotal = (cart) => {
  if (!Array.isArray(cart)) return 0;
  return cart.reduce((total, item) => {
    const price = typeof item.price === 'string' 
      ? Number(item.price.replace(/[^\d.]/g, "")) 
      : Number(item.price);
    const qty = Number(item.quantity) || 0;
    
    if (isNaN(price)) return total;
    return total + (price * qty);
  }, 0);
};
