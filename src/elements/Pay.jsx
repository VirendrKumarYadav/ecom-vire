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
    const response = await axios.post("http://localhost:10000/api/v1/order/create-order",
      {
        amount: 1000,
        currency: 'INR',
        receipt: 'receipt#1',
        notes: {
          name: "virendra",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        }
      }
    );
    return response.data;



  } catch (error) {
    console.error('Error creating order:', error);
  };
};

function Pay(prop) {

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
      amount: 1000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Ecom Corp Pvt. Ltd.',
      description: 'Test Transaction for order',
      image: logo,
      order_id: "order_OZCgNjJe89XX6j",
      // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: 'http://localhost:5173/review-order',
      prefill: {
        name: "Virendra",
        email: "gaurav.kumar@example.com",
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
    prop.setPayStatus(true);
  }

  return (
    <div className="App">
      <button onClick={displayRazorpay}>Pay Now</button>
    </div>
  );
}

export default Pay;