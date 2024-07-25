import React, { useEffect, useState } from 'react';
import TimelineBar from './TimelineBar';
import { useNavigate } from "react-router-dom";
import "../../css/new-order.css";
import ProductCard from '../../elements/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import Payment_table from '../../elements/Payment_table';
import { setCarts, setCartTotalAmt, setOrderCrateID, setPayDetails } from '../../redux/CartSlice';
import axios from 'axios';

const NewOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const auth = sessionStorage.getItem("auth");


  const componentDyanamicTitle = () => {
    document.title = "Ecom | New-Order-Page";
  };

  /****  Fetch API Data  *****/
  const fetchProductsData = async (auth) => {
    try {
      const response = await axios.get("http://localhost:10000/api/v1/cart", {
        headers: { Authorization: auth }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductsByID = async (productID, auth) => {
    try {
      const response = await axios.get(`http://localhost:10000/api/v1/product/${productID}`, {
        headers: { Authorization: auth }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDataAndValidate = async () => {
      try {
        const cartData = await fetchProductsData(auth);
        const productsList = cartData.data[0].products;
        const tempCartList = [];

        for (let item of productsList) {
          let res = await fetchProductsByID(item.productID, auth);
          tempCartList.push(res);
        }
        setCartList(tempCartList);
        setCartTotal(cartData.data[0].cartTotal);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndValidate();
    setOrderDetails(prevState => ({
      ...prevState,
      quantity: cartList.length,
    }));
  }, [auth]);

  componentDyanamicTitle();

  const RemoveItemFromCart = async (productID) => {
    try {
      const response = await axios.delete(`http://localhost:10000/api/v1/cart/${productID}?cartID=668b78bc071bfbfd4fd47fce`, {
        headers: { Authorization: auth }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = (productID) => {
    RemoveItemFromCart(productID);
  };

  // -------create the order -------------

  const createOrderD = async () => {

    try {
      const response = await axios.post("http://localhost:10000/api/v1/order/create-order",
        {
          amount: (cartTotal + (cartTotal * 5) / 100).toFixed(0),
          currency: 'INR',
          receipt: 'receipt#1',
          notes: {
            name: orderDetails.customerName,
            email: orderDetails.email,
            contact: orderDetails.contact,
            address:orderDetails.address
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
    };
  };
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    address: '',
    contact: '',
    email: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
    dispatch(setPayDetails(orderDetails));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', orderDetails);
    sessionStorage.setItem("order-details", JSON.stringify(orderDetails));

    try {
      const createOrder = createOrderD();
      const orderid = createOrder.id
      dispatch(setOrderCrateID(orderid));
    } catch (error) {
      console.log(error);

    }
    navigate("/review-order");
  };

  return (
    <>
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={orderDetails.contact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={orderDetails.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
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
                <label htmlFor="quantity">No. of Products</label>
                <p>{cartList.length}</p>
              </div>
            </div>
            <Payment_table cartTotal={cartTotal} orderDetails={orderDetails} />
          </form>
          <div>
            {cartList.length === 0 ? (
              <div>No products available.</div>
            ) : (
              cartList.map((item, index) => (
                <ProductCard
                  key={index}
                  id={item.data._id}
                  img={item.data.Image}
                  amount={item.data.price}
                  title={item.data.title}
                  type={item.data.type}
                  removeFromCart={removeFromCart}
                  removeBtn={true}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewOrder;
