import React, { useEffect, useState } from 'react'

const Payment_table = ({ cartTotal }) => {
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);


  const setPaymentDataVal = () => {
    setSubTotal(cartTotal);
    let taxCal = (cartTotal * 5) / 100
    setTax(taxCal)
    subTotal <= 200 ? setShippingCharge(40) : setShippingCharge(0)
  }
  useEffect(() => {
    setPaymentDataVal();

  }, [])
  return (
    <>
      <div className='pay-details-cont'>
        <div className="pay-detail">
          <label htmlFor="sub-total">Sub-total</label>
          <p>{cartTotal}</p>
        </div>
        <div className="pay-detail">
          <label htmlFor="quantity">Taxes</label>
          <p>{tax.toFixed(2)}</p>
        </div>
        <div className="pay-detail">
          <label htmlFor="quantity">Total</label>
          <p>${(shippingCharge+subTotal+tax).toFixed(2)}</p>
        </div>
        <button className="order-button" type="submit">Review Order</button>
      </div>


    </>
  )
}

export default Payment_table