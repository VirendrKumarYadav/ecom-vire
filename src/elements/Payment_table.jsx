import React, { useEffect, useRef, useState } from 'react'
import Pay from './Pay';

const Payment_table = ({ cartTotal, orderDetails }) => {

  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [payStatus, setPayStatus] = useState(false);
  const [totalAmt, setTotalAmt] = useState(0);


  const setPaymentDataVal = () => {
    setSubTotal(cartTotal);
    let taxCal = (cartTotal * 5) / 100
    setTax(taxCal)
    cartTotal <= 200 ? setShippingCharge(40) : setShippingCharge(0)
    setTotalAmt(shippingCharge + tax + cartTotal)
  }
  useEffect(() => {
    setPaymentDataVal();
  }, [cartTotal])


  return (
    <>
      <div className='pay-details-cont'>
        <div className="pay-detail">
          <label htmlFor="sub-total">Sub-total</label>
          <p>{cartTotal}</p>
        </div>
        <div className="pay-detail">
          <label htmlFor="quantity">Shipping</label>
          <p>{shippingCharge >= 200 ? { shippingCharge } : "FREE"}</p>
        </div>
        <div className="pay-detail">
          <label htmlFor="quantity">Taxes</label>
          <p>{tax.toFixed(2)}</p>
        </div>

        <div className="pay-detail">
          <label htmlFor="quantity">Total</label>
          <p>${totalAmt.toFixed(0)}</p>
        </div>

        <button className="order-button" type="submit" >Review Order</button>
        

      </div>


    </>
  )
}

export default Payment_table