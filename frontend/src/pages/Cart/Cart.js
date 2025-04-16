//import React, { useContext } from 'react';
import { useCart  } from "../../components/CartContext/CartContex";
const Cart = () => {
  const { cart, removeFromCart, updateCart } = useCart();

  const calculateTotal = () => {
    if (!Array.isArray(cart)) return 0;

    return cart.reduce((acc, item) => {
      const basePrice = item.pizza?.price || 0;
      const toppingsPrice = (Array.isArray(item.toppings) ? item.toppings : []).reduce(
        (sum, t) => sum + (t?.price || 0),
        0
      );
      return acc + ((basePrice + toppingsPrice) * (item.quantity || 0));
    }, 0);
  };
  const generateCartItemId = (pizzaId, toppingsInput) => {
    let toppings = [];
  
    if (Array.isArray(toppingsInput)) {
      toppings = toppingsInput;
    } else if (typeof toppingsInput === 'object' && toppingsInput !== null) {
      toppings = [toppingsInput];
    }
  
    const toppingsKey = toppings.map(t => t?.name || '').sort().join(',');
    return `${pizzaId}-${toppingsKey}`;
  };
  
  const handleUpdateQuantity = (pizza, toppings, newQuantity) => {
    const safeToppings = Array.isArray(toppings) ? toppings : [];

    if (newQuantity <= 0) {
      const id = generateCartItemId(pizza.id, safeToppings);
      removeFromCart(id);
    } else {
      updateCart(pizza, newQuantity, safeToppings);
    }

  
  };
  
  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length > 0 ? (
        cart.map((item, index) => {
          const pizza = item.pizza;
          const toppingsList = item.toppings || [];
          const quantity = item.quantity;

          const basePrice = pizza?.price || 0;
          const toppingsPrice = toppingsList.reduce((sum, t) => sum + (t?.price || 0), 0);
          const totalPrice = (basePrice + toppingsPrice) * quantity;

          return (
            <div
              key={item.id || index}
              style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
            >
              <h3>{pizza?.name || 'Unnamed Pizza'}:&#8377;{pizza?.price}</h3>

              <h4>Selected Toppings:</h4>
              {toppingsList.filter(Boolean).length > 0 ? (
                <ul>
                  {toppingsList
                    .filter(Boolean)
                    .map((topping, idx) => (
                      <li key={idx}>
                        {topping.tname || 'Unknown'} - &#8377;{topping.price ?? 0}
                      </li>
                    ))}
                </ul>
              ) : (
                <p>No toppings selected.</p>
              )}

              <p>
                <b>Quantity:</b>
                <button
                  onClick={() => handleUpdateQuantity(pizza, toppingsList, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                {quantity}
                <button onClick={() => handleUpdateQuantity(pizza, toppingsList, quantity + 1)}>
                  +
                </button>
              </p>

              <p>
                <b>Total for this item:</b> ₹{totalPrice}
              </p>

              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          );
        })
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3>Grand Total: ₹{calculateTotal()}</h3>
    </div>
  );
};

export default Cart;