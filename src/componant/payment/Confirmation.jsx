import React, { useRef } from 'react'
import TimelineBar from './TimelineBar'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import LoadCartData from '../../elements/LoadCartData';

const Conformation = () => {


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
  const downloadPdf = (pdfData) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([pdfData], { type: "application/pdf" })
    );
    link.download = "order-confirmation.pdf";
    link.click();
    document.body.removeChild(link);
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

  const shippingMethod = 'Standard Shipping';
  const supportEmail = 'support@example.com';

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
                  <td>Order ID:</td>
                  <td>
                    <strong>{orderDetails.orderId}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Order Date:</td>
                  <td>
                    <strong>{orderDetails.orderDate}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Total Amount:</td>
                  <td>
                    <strong>${orderDetails.totalAmount}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="product-details">
            <h2>Products Ordered</h2>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <strong>{product.title}</strong> - Qty: {product.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div className="shipping-details">
            <h2>Shipping Information</h2>
            <p>
              <strong>Shipping Address:</strong>
              <br />
              {shippingAddress.name}
              <br />
              {shippingAddress.address1}
              <br />
              {shippingAddress.address2}
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
            <div className='confirm-btn'><button className="order-button" onClick={handleDownloadPdf}>Download Recipt.</button></div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Conformation