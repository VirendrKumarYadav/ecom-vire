import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCarts, setCartTotalAmt } from '../redux/CartSlice';
import axios from 'axios';

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

export const LoadCartData = () => {
  const [itemlist, setItemList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch();
  const auth = sessionStorage.getItem("auth"); // Ensure auth is retrieved properly

  useEffect(() => {
    dispatch(setCarts(cartList));
    dispatch(setCartTotalAmt(cartTotal));
  }, [dispatch, cartList, cartTotal]);

  useEffect(() => {
    const fetchDataAndValidate = async () => {
      try {
        const cartData = await fetchProductsData(auth);
        const productsList = cartData.data[0].products;
        const cartID = cartData.data[0]; // Assuming cartID is used somewhere else

        const tempCartList = [];

        for (let item of productsList) {
          let res = await fetchProductsByID(item.productID, auth);
          tempCartList.push(res);
        }
        setItemList(productsList);
        setCartList(tempCartList);
        setCartTotal(cartData.data[0].cartTotal);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndValidate();
  }, [auth]);

};

// export default LoadCartData;
