import React, { useState } from 'react';
import TimelineBar from './TimelineBar';
import {useNavigate} from "react-router-dom"
import "../../css/new-order.css"
import ProductCard from '../../elements/ProductCard';

const NewOrder = () => {
const navigate=useNavigate();

const  componentDyanamicTitle=()=> {
  document.title = "Ecom | New-Order-Page";
}
componentDyanamicTitle();


  const products = {

    img: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    title: "Mens Casual Premium Slim Fit T-Shirts (x1)",
    type: "Men's clothing",
    prize: "$233"
  }
  const removeFromCart = () => {

  }
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    address: '',
    product: '',
    quantity: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', orderDetails);
    navigate("/review-order");
    // Add logic to handle order submission (e.g., API call)
  };

  return (
    <div className='payment-container'>
    <div className="new-order-container">

      <h1>New Order</h1>
      <TimelineBar currentStep="new-order" />
      <form onSubmit={handleSubmit}>

        <div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={orderDetails.customerName}
              onChange={handleChange}
              contentEditable='true'
              required
            />

          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              type="text"
              id="address"
              name="address"
              value={orderDetails.address}
              onChange={handleChange}
              required
              cols={60}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">No. of Product</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={orderDetails.quantity}
              onChange={handleChange}
              min="1"
              required
            />

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
          <button className="order-button" type="submit">Review Order</button>
        </div>


      </form>

      <div>
        <ProductCard img={products.img} amount={products.prize} title={products.title} type={products.type} removeFromCart={removeFromCart} />
        <ProductCard img={products.img} amount={products.prize} title={products.title} type={products.type} removeFromCart={removeFromCart} />


      </div>
    </div>
    </div>
  );
};

export default NewOrder;
