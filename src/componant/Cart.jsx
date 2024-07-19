import React, { useEffect, useState } from 'react';
import ProductCard from '../elements/ProductCard';
import PaymentDetails from '../elements/PaymentDetails';
import { useDispatch } from 'react-redux';
// import { setCarts } from '../redux/CatalogSlice';
import {setCarts,setCartTotalAmt} from "../redux/CartSlice"
import axios from 'axios';

const Cart = () => {
  const [itemlist, setItemList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch();
  const auth = sessionStorage.getItem("auth");
  var cartID;
  useEffect(() => {
    document.title = "Ecom | Cart";
  }, []);

  useEffect(() => {
    dispatch(setCarts(cartList));
    dispatch(setCartTotalAmt(cartTotal));
  }, [dispatch, cartList,cartTotal]);

  const fetchProductsData = async () => {
    try {
      const response = await axios.get("http://localhost:10000/api/v1/cart", {
        headers: { Authorization: auth }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchProductsByID = async (productID) => {
    try {
      const response = await axios.get(`http://localhost:10000/api/v1/product/${productID}`, {
        headers: { Authorization: auth }
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
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
 
  useEffect(() => {
    const fetchDataAndValidate = async () => {
      try {
        const cartData = await fetchProductsData();
        const productsList = cartData.data[0].products;
        cartID = cartData.data[0];
        const tempCartList = [];

        for (let item of productsList) {
          let res = await fetchProductsByID(item.productID);
          tempCartList.push(res.data);
        }
        setCartList(tempCartList);
        setCartTotal(cartData.data[0].cartTotal);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndValidate();
  }, [auth]);

  const removeFromCart = (productID) => {
    RemoveItemFromCart(productID);
  }

  return (
    <div className='cart-main'>
      <div className='cart-cont-l'>
        {cartList.length === 0 ? (
          <div>No products available.</div>
        ) : (
          cartList.map((item, index) => (


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
      <div className='cart-cont-r'>
        <PaymentDetails cartTotal={cartTotal} />
      </div>
      {
        cartID
      }
    </div>
  );
};

export default Cart;
