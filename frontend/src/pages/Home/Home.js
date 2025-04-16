import React from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import { images } from '../../images/images';

const Home = () => {
  return (
    <div>
      <Header/>
      <div className='home_page'>
              <div className='column1'>
                <img src={images.home1} alt='' className='home1'></img>
              </div> 
              <div className='total_ingre'> 
                <h3 className='ingredients'>Ingredients</h3>
                <p className='ingredients_p'>We're ruthless about goodness. We have no qualms about tearing up a day-old lettuce leaf (straight from the farm), or steaming a baby (carrot). Cut. Cut. Chop. Chop. Steam. Steam. Stir Stir. While they're still young and fresh - that's our motto. It makes the kitchen a better place.</p>
              </div>
              <div>
                <h3 className='chef'>Our chefs</h3>
                <p className='chefdata'>They make sauces sing and salads dance. They create magic with skill, knowledge, passion, and stirring spoons (among other things). They make goodness so good, it doesn't know what to do with itself. We do though. We send it to you.</p>
              </div>
              <div>
                <img src={images.home2} alt='' className='home2'/>
              </div>
              <div>
                <img src={images.home3} alt='' className='home3'/>
              </div>
              <div>
                <h3 className='minutes'>45 minutes delivery </h3>
              </div>
      </div>
    </div>
  )
}

export default Home
