import React, { useEffect, useRef, useState } from 'react'
import TimelineBar from './TimelineBar'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import ProductCard from '../../elements/ProductCard';
// import LoadCartData from '../../elements/LoadCartData';

const Conformation = () => {
  const [orderdata, setOrderData] = useState({});
  let orderdetails = JSON.parse(sessionStorage.getItem("order-details"));
  let order=JSON.parse(sessionStorage.getItem('orders'))
  const [cartList, setCartList] = useState([]);
  const auth = sessionStorage.getItem("auth");


  const confirmationContainerRef = useRef(null);

  const downloadPdf1 = () => {
    const element = confirmationContainerRef.current;
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('order-confirmation.pdf');
    });
  };

  const componentDyanamicTitle = () => {
    document.title = "Ecom | Confirmation-Order-Page";
  }
  componentDyanamicTitle();
  const handlePrint = () => {
    window.print();
  };
  // const downloadPdf = (pdfData) => {
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(
  //     new Blob([pdfData], { type: "application/pdf" })
  //   );
  //   link.download = "order-confirmation.pdf";
  //   link.click();
  //   document.body.removeChild(link);
  // };
  const getOrderDetails = async ( email) => {
    try {
      const response = await axios.get(`http://localhost:10000/api/v1/order/order-all/${email}`, 

      )
      return response;
    } catch (error) {
      console.error('Error getting order:', error);
    };
  };

  const handleDownloadPdf = () => {

    downloadPdf1();
    // convertHtmlToPdf();
  };


  const orderDetails = {
    orderId: '12345',
    orderDate: '2023-06-29',
    totalAmount: 99.99,
  };

  const products = [
    { id: 1, title: 'Product A', quantity: 1 },
    { id: 2, title: 'Product B', quantity: 2 },
  ];

  const shippingAddress = {
    name: 'John Doe',
    address1: '123 Main St',
    address2: 'Apt 456',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    country: 'USA',
  };
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
  
  }, [auth]);

const removeFromCart=()=>{
  
}

  const shippingMethod = 'Standard Shipping';
  const supportEmail = 'support@example.com';
  const handleSubmit = async () => {
   
    try {
        const orders = await getOrderDetails("yy686811@gmail.com");
        setOrderData(orders.data);
        sessionStorage.setItem('orders', JSON.stringify(orders.data));
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
};
  useEffect(() => {

    handleSubmit();
    console.log(orderdata)
  }, [])
  return (
    <div className='payment-container'>
      {/* <LoadCartData/> */}
      <div className="review-order-container" ref={confirmationContainerRef}>

        <h1>Order Confirmation</h1>
        <TimelineBar currentStep="order-confirmation" />
        <div className='confirm-btn'><button className="order-button" onClick={handleDownloadPdf}>Download Recipt.</button></div>

        <div className="confirmation-container">
          <div className="confirmation-header">
            <h1>Order Confirmed</h1>
            <p>Thank you for your purchase!</p>
          </div>

          <div className="order-details">
            <h2>Order Details</h2>
            <table>
              <tbody>
              <tr>
                  <td>Customer Name:</td>
                  <td>
                    <strong>{order.orderDetails.name}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Order ID:</td>
                  <td>
                    <strong>{order.orderid}</strong>
                  </td>
                </tr>
                
                <tr>
                  <td>Total Amount:</td>
                  <td>
                    <strong>${order.amount}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="product-details">
            <h2>Products Ordered</h2>
            <ul>
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
            </ul>
          </div>

          <div className="shipping-details">
            <h2>Shipping Information</h2>
            <p>
              <strong>Shipping Address:</strong>
              <br />
              {orderdetails.customerName}
              <br />
              {orderdetails.address}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
              <br />
              {shippingAddress.country}
            </p>
            <p>
              <strong>Shipping Method:</strong> {shippingMethod}
            </p>
          </div>

          <div className="next-steps">
            <h2>Next Steps</h2>
            <p>
              Your order is now being processed and will be shipped soon. You will
              receive a tracking number via email once your order has been shipped.
            </p>
            <p>
              If you have any questions or concerns, please don't hesitate to contact
              our customer support team at{' '}
              <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
            </p>

          </div>

        </div>
        <div className='confirm-btn'><button className="order-button" onClick={handleDownloadPdf}>Download Recipt.</button></div>

      </div>
    </div>
  )
}

export default Conformation