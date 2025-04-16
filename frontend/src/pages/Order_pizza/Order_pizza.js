import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext ,{useCart} from "../../components/CartContext/CartContex";

import './Order_pizza.css';

const Order_pizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const { cart,addToCart, getQuantity, updateCart, removeFromCart, generateCartItemId } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
   useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };
    getPizzas();
  }, []);
  const goToToppings = (pizza) => {
    navigate("/Build_ur_pizza", { state: { pizza } });
  };
  

  return (
    <div className="pizza_list">
      {pizzas.map((pizza) => {
        const inCart = getQuantity(pizza.id);
        const id = generateCartItemId(pizza);
        return (
          <div key={pizza._id} className="pizza_list_items">
            <div>
              <h2 className="pizzaname">{pizza.name}</h2>
              <h3>
                <span
                  className={pizza.type === "veg" ? "veg-icon" : "nonveg-icon"}
                  title={pizza.type === "veg" ? "Veg" : "Non-Veg"}
                ></span>
              </h3>
              <p className="price">&#8377;{pizza.price}</p>
            </div>

            <div>
              <p className="pizzadetails">{pizza.description}</p>
              <p className="pizza_i"><b>Ingredients:</b> {pizza.ingredients.join(', ')}</p>
              <p className="toppings"><b>Toppings:</b> {pizza.topping.join(', ')}</p>
            </div>

            <div>
              <p className="pizzaimage"><img src={pizza.image} alt={pizza.name} /></p>

              {inCart === 0 ?(
                <button className='cart' onClick={() => addToCart(pizza)}>Add</button>
              ) : (
                <div className="quantity-controls">
                  <button onClick={() => updateCart(pizza, getQuantity(pizza.id)-1)}>-</button>
                  <span>{getQuantity(pizza.id)}</span>
                  <button onClick={() =>updateCart(pizza, getQuantity(pizza.id)+1)}>+</button>
                </div>
                
              )}
              <button className='addtopings'
                onClick={() => goToToppings(pizza)} 
              >
                Customize Pizza
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Order_pizza;
