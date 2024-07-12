import React, { useEffect, useState } from 'react';
import TimelineBar from './TimelineBar';
import {useNavigate} from "react-router-dom"
import "../../css/new-order.css"
import ProductCard from '../../elements/ProductCard';
import { useSelector } from 'react-redux';
import Payment_table from '../../elements/Payment_table';

const NewOrder = () => {
const navigate=useNavigate();
const cartItems=useSelector(state=>state.cart.carts)
const cartTotalAmt=useSelector(state=>state.cart.cartTotal)
const  componentDyanamicTitle=()=> {
  document.title = "Ecom | New-Order-Page";
}
componentDyanamicTitle();

useEffect(()=>{
  console.log(cartItems,cartTotalAmt);
  
})
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
            <p>{cartItems.length}</p>

          </div>

        </div>
        <Payment_table cartTotal={cartTotalAmt}/>
      </form>

      <div>
      {cartItems.length === 0 ? (
          <div>No products available.</div>
        ) : (
          cartItems.map((item, index) => (


            <ProductCard
              key={index}
              id={item._id}
              img={item.Image}
              amount={item.price}
              title={item.title}
              type={item.type}
              removeFromCart={removeFromCart}
            />
          ))
        )}

      </div>
    </div>
    </div>
  );
};

export default NewOrder;
