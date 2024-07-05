import logo from '../assets/logo.png';
// import './App.css';

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

function Pay() {
  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }


    const options = {
      key: 'rzp_test_f46yvGgKgeMnZH', // Enter the Key ID generated from the Dashboard
      amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Ecom Corp Pvt. Ltd.',
      description: 'Test Transaction',
      image: logo,
      order_id: "order_ORNC2iZUpws5NB", // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: 'http://localhost:5173/verify',
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <button onClick={displayRazorpay}>Order Now</button>
    </div>
  );
}

export default Pay;