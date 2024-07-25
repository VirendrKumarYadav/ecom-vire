import axios from 'axios';
import logo from '../assets/logo.png';



function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}



const createOrder = async () => {
  try {
    var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

    instance.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2"
      }
    })
    return instance;

  } catch (error) {
    console.error('Error creating order:', error);
  };
};

function Pay({totalAmount,orderDetails,setPayStatus,orderid}) {

  // let order = createOrder();

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }


    const options = {
      // key: 'rzp_test_f46yvGgKgeMnZH', // Enter the Key ID generated from the Dashboard
      key: 'rzp_test_yoPptvw6dEHh0e',
      amount: totalAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Ecom Corp Pvt. Ltd.',
      description: 'Test Transaction for order',
      image: logo,
      order_id: orderid,
      // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: 'http://localhost:5173/review-order',
      prefill: {
        name: orderDetails.name,
        email: "vy.y@example.com",
        contact: "9000090000",

      },
      notes: {

        address: "address",

      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setPayStatus(true);
  }

  return (
    <div className="App">
      <button onClick={displayRazorpay}>Pay Now</button>
    </div>
  );
}

export default Pay;