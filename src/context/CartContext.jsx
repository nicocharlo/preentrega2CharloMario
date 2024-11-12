import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const añadirAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito];
    const index = nuevoCarrito.findIndex(item => item.id === producto.id);
    
    if (index !== -1) {
      nuevoCarrito[index].quantity += 1;
    } else {
      nuevoCarrito.push({ ...producto, quantity: 1 });
    }
    
    setCarrito(nuevoCarrito);
  };

  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== productoId);
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const pagarCarrito = () => {
    setCarrito([]);
    alert("Pago realizado con éxito. El carrito ha sido vaciado.");
  };

  return (
    <CartContext.Provider value={{ carrito, añadirAlCarrito, eliminarDelCarrito, vaciarCarrito, pagarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};
