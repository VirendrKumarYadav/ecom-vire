import React, { useEffect, useState } from 'react'
import Pay from './Pay'
import { useNavigate } from "react-router-dom"

const PaymentDetails = (prop) => {
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const navigate = useNavigate();
  const navigateToOrder = () => {
    navigate("/new-order")
  }
  const setPaymentDataVal = () => {
    setSubTotal(prop.cartTotal);
    let taxCal = (prop.cartTotal * 5) / 100
  
    setTax(taxCal)
    subTotal <= 200 ? setShippingCharge(40) : setShippingCharge(0)

  }



  useEffect(() => {
    setPaymentDataVal();

  }, [prop])




  return (
    <div className='payment-details-main'>
      <div className='payment-details-cont'>
        <h2>Order Summary</h2>
        <div className='pay-li'><h4>Subtotal</h4><span>{subTotal}</span></div>
        <div className='pay-li'><h4>Shipping</h4><span>{shippingCharge >= 200 ? { shippingCharge } : "FREE"}</span></div>
        <div className='pay-li'><h4>Tax</h4><span>{tax.toFixed(2)}</span></div>
        <hr></hr>
        <div className='pay-li'><h4>Total</h4><span>${(tax + subTotal + shippingCharge).toFixed(2)}</span></div>
      </div>
      <Pay />
      <button onClick={navigateToOrder}>Checkout</button>
    </div>
  )
}

export default PaymentDetails