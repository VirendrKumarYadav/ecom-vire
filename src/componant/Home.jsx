import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='main-container'>
      <main className='shop-btn'>
        <h1>New Arrivals are Here!</h1>
        <p>The new arrivals have, well, newly arrived. Checkout the latest options from our summer small-batch release while they are still in stock!</p>
        <button onClick={() => { navigate("/catalog") }} >Shop Now!</button>
      </main>
    </div>

  )
}

export default Home