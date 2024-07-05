import React, { useState } from 'react'
import "../../css/new-order.css"
import TimelineBar from './TimelineBar';
import ProductCard from '../../elements/ProductCard';
import { useNavigate } from 'react-router-dom';

const ReviewOrder = () => {
  const navigate=useNavigate();
  const products = {

    img: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    title: "Mens Casual Premium Slim Fit T-Shirts (x1)",
    type: "Men's clothing",
    prize: "$233"
  }
  const removeFromCart = () => {

  }
  const [orderDetails, setOrderDetails] = useState({
    customerName: 'Virendra krishnvanshi',
    address: 'abc, 123, ajju 229937',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:');
    // Add logic to handle order submission (e.g., API call)
    navigate("/order-confirmation")
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  return (
    <div className='payment-container'>
    <div className="review-order-container">

      <h1>Review Order</h1>
      <TimelineBar currentStep="review-order" />
      <form onSubmit={handleSubmit}>

        <div className='review-order-form'>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <p
              type="text"
              id="customerName"
              name="customerName"
             
            >{orderDetails.customerName}</p>

          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <p
              type="text"
              id="address"
              name="address"
           
           >{orderDetails.address}</p> 
          </div>

          

        </div>
        <div className='pay-details-cont'>
          <div className="pay-detail">
            <label htmlFor="sub-total">Sub-total</label>
            <p>{123}$</p>
          </div>
          <div className="pay-detail">
            <label htmlFor="quantity">Taxes</label>
            <p>{12}$</p>
          </div>
          <div className="pay-detail">
            <label htmlFor="quantity">Total</label>
            <p>{123}$</p>
          </div>
          <button className="order-button" type="submit">Confirm Order</button>
        </div>


      </form>

      <div>
        <ProductCard img={products.img} amount={products.prize} title={products.title} type={products.type} removeFromCart={removeFromCart} />
        <ProductCard img={products.img} amount={products.prize} title={products.title} type={products.type} removeFromCart={removeFromCart} />

      </div>
    </div>
    </div>
  )
}

export default ReviewOrder