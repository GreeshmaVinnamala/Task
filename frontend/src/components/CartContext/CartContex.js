import React from 'react'

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  const generateCartItemId = (pizzaId, toppingsInput) => {
    const toppings = Array.isArray(toppingsInput) ? toppingsInput : [];
    const toppingNames = toppings.map(t => t?.name || "").sort().join("-");
    return `${pizzaId}-${toppingNames}`;
  };

  const addToCart = (pizza, toppingsInput) => {
    const id = generateCartItemId(pizza.id, toppingsInput);

    const newItem = {
      id,
      pizza,
      toppings: Array.isArray(toppingsInput) ? toppingsInput : [toppingsInput],
      quantity: 1,
    };

    setCart(prev => [...prev, newItem]);
  };
  
  const updateCart = (pizza, quantity, toppings = []) => {
    const id = generateCartItemId(pizza.id, toppings);
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const removeFromCart = (pizzaId) => {
    setCart((prev) => prev.filter((item) => item.id !== pizzaId));
  };
  const getQuantity = (pizzaId, toppings = []) => {
    const id = generateCartItemId(pizzaId, toppings);
    const item = cart.find(item => item.id === id);
    return item? item.quantity : 0;
  };
  return (
    <CartContext.Provider value={{ cart,generateCartItemId,setCart, addToCart, updateCart, removeFromCart,getQuantity,selectedPizza,setSelectedPizza}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;