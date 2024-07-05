import React, { useEffect, useState } from 'react'
import ProductCard from '../elements/ProductCard'
import PaymentDetails from '../elements/PaymentDetails'
import { useDispatch, useSelector } from 'react-redux'
import { setCarts } from '../redux/CatalogSlice'

const Cart = () => {
  const [product, setProducts] = useState(3);
  const dispatch = useDispatch();
  // const selector=useSelector();
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