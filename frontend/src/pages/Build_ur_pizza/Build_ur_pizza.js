// src/pages/Build_ur_pizza/BuildUrPizza.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../components/CartContext/CartContex';

const BuildUrPizza = () => {
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const basePizza = location.state?.pizza;
  const basePrice = basePizza?.price || 0;
  

  useEffect(() => {
    fetch('http://localhost:5000/api/toppings')
      .then(res => res.json())
      .then(data => setToppings(data))
      .catch(err => console.error('Error fetching toppings:', err));
  }, []);
  if (!basePizza) {
    return <div>Error: No pizza selected.</div>;
  }
  const toggleTopping = (topping) => {
    const exists = selectedToppings.find(t => t._id === topping._id);
    if (exists) {
      setSelectedToppings(prev => prev.filter(t => t._id !== topping._id));
    } else {
      setSelectedToppings(prev => [...prev, topping]);
    }
  };

  const getTotal = () => {
    const toppingTotal = selectedToppings.reduce((acc, cur) => acc + cur.price, 0);
    return basePrice + toppingTotal;
  };

  const handleBuild = () => {
    const customPizza = {
      id: Date.now(), 
      name: `${basePizza.name} (Custom)`,
      price: basePrice,
      topping: selectedToppings.map(t => t.name),
      ingredients: basePizza.ingredients,
      image: basePizza.image,
      description: basePizza.description,
      type: basePizza.type
    };
  
    const cartItem = {
      pizza: customPizza,
      quantity: 1,
      toppings: selectedToppings
    };
  
    addToCart(cartItem.pizza,cartItem.toppings);
    navigate('/cart');
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Customize Your Pizza: {basePizza.name}</h2>
      <h4>Base Price: ₹{basePrice}</h4>

      <table className='table'>
        <thead>
          <tr>
            <th className='head'>Image</th>
            <th className='head'>Topping</th>
            <th className='head'>Price</th>
            <th className='head'>Select</th>
          </tr>
        </thead>
        <tbody>
          {toppings.map(t => (
            <tr key={t._id}>
              <td className='td'>
                <img
                  src={t.image}
                  alt={t.tname}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                />
              </td>
              <td className='td'>{t.tname}</td>
              <td className='td'>₹{t.price}</td>
              <td className='td'>
                <input
                  type="checkbox"
                  onChange={() => toggleTopping(t)}
                  checked={!!selectedToppings.find(st => st._id === t._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', fontSize: '18px' }}>
        <strong>Total Cost: ₹{getTotal()}</strong>
      </div>

      <button
        onClick={handleBuild}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#ff6600',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Build Ur Pizza
      </button>
    </div>
  );
};

export default BuildUrPizza;
