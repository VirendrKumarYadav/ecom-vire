import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ViewCards = () => {
    let products = useSelector((state) => state.catalog.setProducts)
    const [productlist, setProductList] = useState({});

    const navigate = useNavigate();
    let { id } = useParams();

    let auth = sessionStorage.getItem("auth");

    const fetchProductsData = async () => {
        try {
            const response = await axios.get("http://localhost:10000/api/v1/product/"+id, {
                headers: {
                    Authorization: auth
                }
            }).then(data => data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await fetchProductsData();
                
                setProductList(productData.data)
              
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
        // console.log(productlist);
    }, [])



    return (
        <div className='view-card-main'>
            <div className='sub-main'>
                <div className='view-img-cont'>
                    <img alt='_blank' src={productlist.Image}></img>
                </div>
                <div className='view-content'>
                    <div className='view-card-name'>
                        <span>men's clothing</span>
                        <p>{productlist.title}</p>
                    </div>
                    <div className='desc'>{productlist.description}</div>
                    <div className='view-card-prize'> ${productlist.price}</div>
                    <button className='add-to-Cart' onClick={() => { navigate("/cart") }}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ViewCards