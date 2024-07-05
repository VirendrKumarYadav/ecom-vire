import React, { useEffect, useState } from 'react';
import Card from '../elements/Card';
import { Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {setProducts} from "../redux/CatalogSlice"
import axios from 'axios';


const Catalog = () => {
  const dispatch=useDispatch();
  const [productlist,setProductList]=useState([]);
  let auth=useSelector((state)=>state.loginAuth.setLoginAuth)

  auth=sessionStorage.getItem("auth");
    // console.log(auth);
    const fetchProductsData=async ()=>{
      try {
        const response =  await axios.get("http://localhost:10000/api/v1/products",{
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
      // console.log(productData);
      setProductList(productData)
      dispatch(setProducts(productData))
    } catch (error) {
      console.log(error);
    }
  };
  
  fetchData();

 

},[])


  return (
    <div className='catalog-container'>
      <label className='catalog-label'>
        <h1>Catelog</h1>
      </label>
      <div className='catalog-card-container'>

      {productlist.length === 0 ? (
        <div>No products available.</div>
      ) : (
        productlist.map((product, index) => (
        // console.log(product)
          <Link key={index} to={`products/${product._id}` }>
           
            <Card name={product.title} img={product.Image} price={product.price} />
          </Link>
        ))
      )}


      </div>
    </div>
  );
};

export default Catalog;