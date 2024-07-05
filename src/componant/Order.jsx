import React, { useState } from 'react';
// import './SinglePage.css';

const SinglePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const  componentDyanamicTitle=()=> {
    document.title = "Ecom | Order";
  }
  componentDyanamicTitle();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Address:', address);
    console.log('Card Number:', cardNumber);
    console.log('Expiry Date:', expiryDate);
    console.log('CVV:', cvv);
    setOrderPlaced(true);
  };

  return (
    <div className="single-page">
      {!orderPlaced ? (
        <div className="checkout-section">
          <h1>Checkout</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV:</label>
              <input
                type="password"
                id="cvv"
                value={cvv}
                onChange={(e) => setCVV(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Place Order
            </button>
          </form>
        </div>
      ) : (
        <div className="order-placed-section">
          <h1>Order Placed</h1>
          <p>Thank you for your order!</p>
          <p>Your order will be processed shortly.</p>
          <p>Order ID: 12345</p>
          <button className="submit-btn" onClick={() => setOrderPlaced(false)}>
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default SinglePage;