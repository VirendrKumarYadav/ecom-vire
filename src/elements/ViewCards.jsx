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
            const response = await axios.get("http://localhost:10000/api/v1/product/" + id, {
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

    }, [])

    const addItemToCart = async (productID, cartID) => {
        try {
          const response = await axios.patch(`http://localhost:10000/api/v1/cart?cartid=${cartID}`, {
            productID: productID,
            quantity: 1
          }, {
            headers: {
              'Content-Type': 'application/json',  
            }
          });
          return response.data;
        } catch (error) {
          console.error('Error adding item to cart:', error);
        }
      };
      
     

  
    const addToTheCart = (productId) => {
        const cartID = '668b78bc071bfbfd4fd47fce';

        addItemToCart(productId, cartID)
        .then(data => {
            console.log('Item added to cart:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
          
    }



    return (
        <div className='view-card-main'>
            <div className='sub-main'>
                <div className='view-img-cont'>
                    <img alt='_blank' src={productlist.Image}></img>
                </div>
                <div className='view-content'>
                    <div className='view-card-name'>
                        <span>{productlist.category}</span>
                        {/* <em>{productlist.brand}</em> */}
                        <p>{productlist.title}</p>
                    </div>
                    <div className='desc'>{productlist.description}</div>
                    <div className='view-card-prize'> ${productlist.price}</div>
                    <button className='add-to-Cart' onClick={() => {
                        // navigate("/cart")
                        addToTheCart(productlist._id)
                    }}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ViewCards