import React from 'react';
import './Navbar.css';
import { images } from '../../images/images';
import { Link } from 'react-router-dom';
//import Header from '../../components/Header/Header';
import { useCart } from '../CartContext/CartContex';

const Navbar = () => {
  const { cart } = useCart();
  const totalCount = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

   return (
    <div className='navbar'>
        <h1 calssName='name'>Pizzeria</h1>
        <img src={images.PizzeriaLogo} alt='' className='logo'></img>
        <ul className='menu'>
          <Link to='/Home' className='home'>Home</Link>
          <Link to='/Order_pizza' className='order_pizza'>Order Pizza</Link>
          <Link to='/Build_ur_pizza' className='build_ur_pizza'>Build Ur Pizza</Link>
        </ul>
       <Link to ='/Cart' className='cartButton'>&#x1F6D2;shopping cart({totalCount})</Link>
    </div>
  )
}

export default Navbar
