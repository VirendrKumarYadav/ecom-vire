import React, { useEffect, useState } from 'react'
import "../../css/new-order.css"
import TimelineBar from './TimelineBar';
import ProductCard from '../../elements/ProductCard';
import { useNavigate } from 'react-router-dom';
import Pay from '../../elements/Pay';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import LoadCartData from '../../elements/LoadCartData';

const ReviewOrder = () => {
  const navigate = useNavigate();
  const [payStatus, setPayStatus] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const payDetails = useSelector((state) => state.cart.payDetails)
  const orderid = useSelector((state) => state.cart.orderID)
  const componentDyanamicTitle = () => {
    document.title = "Ecom | Review-Order";
  }
  componentDyanamicTitle();
  const auth = sessionStorage.getItem("auth");
  const products = {

    img: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    title: "Mens Casual Premium Slim Fit T-Shirts (x1)",
    type: "Men's clothing",
    prize: "$233"
  }
  /****  Fetch API Data  *****/
  const fetchProductsData = async () => {
    try {
      const response = await axios.get("http://localhost:10000/api/v1/cart", {
       
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
        const cartData = await fetchProductsData();
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

  }, []);

  const removeFromCart = () => {

  }

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
  useEffect(() => {
    console.log(payDetails, cartTotal, cartList);

  }, [])
  return (
    <div className='payment-container'>
      {/* <LoadCartData /> */}
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

              >{payDetails.customerName}</p>

            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <p
                type="text"
                id="address"
                name="address"

              >{payDetails.address}</p>
            </div>


          </div>
          <div className='pay-details-cont'>
            <div className="pay-detail">
              <label htmlFor="sub-total">Sub-total</label>
              <p>{cartTotal.toFixed(2)}</p>
            </div>
            <div className="pay-detail">
              <label htmlFor="quantity">Taxes</label>
              <p>{((cartTotal * 5) / 100).toFixed(2)}</p>
            </div>
            <div className="pay-detail">
              <label htmlFor="quantity">Total</label>
              <p>{(cartTotal + (cartTotal * 5) / 100).toFixed(1)}</p>
            </div>
            <button className="order-button" type="submit">Confirm Order</button>
          </div>

        </form>
        <div className="form-group">
          <label htmlFor="pay">Payment Status</label>
          <p
            type="text"
            id="pay"
            name="pay"

          >{payStatus == true ? "Paid" : <Pay totalAmount={cartTotal} orderDetails={payDetails} setPayStatus={setPayStatus} orderid={orderid} />}</p>

        </div>
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
                  removeBtn={false}
                />
              ))
            )}
    
        </div>
      </div>
    </div>
  )
}

export default ReviewOrder