import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Order_pizza from './pages/Order_pizza/Order_pizza'
import Build_ur_pizza from './pages/Build_ur_pizza/Build_ur_pizza'
import Copyrights from './components/Copyrights/Copyrights'
import { CartProvider } from './components/CartContext/CartContex'
import Cart from './pages/Cart/Cart'
const App = () => {
  return (
    <div className='app'>
     <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Order_pizza' element={<Order_pizza/>}/>
        <Route path='/Build_ur_pizza' element={<Build_ur_pizza/>}/>
        <Route path='/Cart' element={<Cart/>}/>
      </Routes>
      <Copyrights/>
      </Router>
    </div>
  )
}

export default App
