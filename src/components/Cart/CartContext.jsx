import React, { createContext, useState, useContext } from 'react';

// Crear el contexto para el carrito
const CartContext = createContext();

// Hook personalizado para acceder al contexto del carrito
export const useCart = () => useContext(CartContext);

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.find((item) => item.id === product.id);
      if (productExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 10) } // Aumenta la cantidad
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }]; // Añade un nuevo producto con cantidad 1
      }
    });
  };

  // Actualizar cantidad de un producto en el carrito
  const updateCartQuantity = (productId, increment) => {
    setCart((prevCart) => {
      return prevCart.map((product) => {
        if (product.id === productId) {
          const newQuantity = increment
            ? Math.min(product.quantity + 1, 10) // Incrementa en 1 hasta el máximo de 10
            : Math.max(product.quantity - 1, 1); // Decrementa en 1 hasta el mínimo de 1
          return { ...product, quantity: newQuantity };
        }
        return product;
      });
    });
  };

  // Eliminar todas las unidades de un producto
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  // Vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
