import React, { useEffect, useState } from 'react'
import ProductCard from '../elements/ProductCard'
import PaymentDetails from '../elements/PaymentDetails'
import { useDispatch, useSelector } from 'react-redux'
import { setCarts } from '../redux/CatalogSlice'
import axios from 'axios'

const Cart = () => {
  
  const [cartlist,setCartList]=useState([]);
  const dispatch = useDispatch();
  // const selector=useSelector();
 let auth=sessionStorage.getItem("auth");
  const  componentDyanamicTitle=()=> {
    document.title = "Ecom | Cart";
  }
  componentDyanamicTitle();
  const products = {

    img: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    title: "Mens Casual Premium Slim Fit T-Shirts (x1)",
    type: "Men's clothing",
    prize: "$233"
  }

  useEffect(() => {
    dispatch(setCarts(products))

  }, [])
  const removeFromCart = () => {

  }
  const fetchProductsData=async ()=>{
    try {
      const response =  await axios.get("http://localhost:10000/api/v1/cart",{
        headers:{
           Authorization:auth
        }
      }).then(data=>data);
      return  response.data;
    } catch (error) {
      console.log(error);
     }
    
  }
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const productData = await fetchProductsData();
        setCartList(productData)
        console.log(productData);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchData();
  
  },[])



  return (
    <div className='cart-main'>
      <div className='cart-cont-l'>

        <ProductCard img={products.img} amount={products.prize} title={products.title} type={products.type} removeFromCart={removeFromCart} />
        <ProductCard img={products.img} amount={products.prize} title={products.title} type={products.type} />
        <ProductCard img={products.img} amount={products.prize} title={products.title} type={products.type} />

      </div>

      <div className='cart-cont-r'>
        <PaymentDetails />
      </div>
    </div>
  )
}

export default Cart