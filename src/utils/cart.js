// utils/cart.js

export const calculateSubtotal = (price, quantity) => {
  return price * quantity;
};

export const calculateTotal = (cart) => {
  return cart.reduce((total, item) => {
    return total + calculateSubtotal(item.price, item.quantity);
  }, 0);
};
