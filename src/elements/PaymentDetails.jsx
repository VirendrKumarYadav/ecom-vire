import React from 'react'
import Pay from './Pay'
import {useNavigate }  from "react-router-dom"

const PaymentDetails = () => {
const navigate=useNavigate();
  const navigateToOrder=()=>{
    navigate("/new-order")
  }
  return (
    <div className='payment-details-main'>
      <div className='payment-details-cont'>
        <h2>Order Summary</h2>
        <div className='pay-li'><h4>Subtotal</h4><span>$788</span></div>
        <div className='pay-li'><h4>Shipping</h4><span>$5</span></div>
        <div className='pay-li'><h4>Tax</h4><span>$5</span></div>
           <hr></hr>
           <div className='pay-li'><h4>Total</h4><span>$800</span></div>
      </div>
      <Pay/>
      <button onClick={navigateToOrder}>Checkout</button>
    </div>
  )
}

export default PaymentDetails