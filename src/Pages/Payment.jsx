import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './Payment.css';

const Payment = () => {
  const paypalRef = useRef();
  const [showPaypalSuccess, setShowPaypalSuccess] = useState(false);

  // PayPal Integration
  useEffect(() => {
    const existingScript = document.getElementById('paypal-sdk');
    if (existingScript) {
      renderPayPalButtons();
      return;
    }

    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = 'https://www.paypal.com/sdk/js?client-id=ATJXwBBU0l8mvG8m0zdmhwFKpXmbFU4s2cLw1OxLqARf60Qjan-agAWA9_cn-iPVe8cXoM6UDPcWJ6nb&currency=USD';
    script.onload = renderPayPalButtons;
    document.body.appendChild(script);

    function renderPayPalButtons() {
      if (!window.paypal || !paypalRef.current) return;

      paypalRef.current.innerHTML = '';

      window.paypal
        .Buttons({
          createOrder: async () => {
            try {
              const response = await fetch('http://127.0.0.1:5000/payments/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: '10.00' }),
              });
              const order = await response.json();
              return order.order_id;
            } catch (error) {
              console.error('Error creating order:', error);
              // Fallback to direct PayPal order creation
              return window.paypal.Buttons().createOrder({
                purchase_units: [
                  {
                    amount: {
                      value: '10.00',
                    },
                  },
                ],
              });
            }
          },
          onApprove: async (data) => {
            try {
              const response = await fetch(
                `http://127.0.0.1:5000/payments/capture/${data.orderID}`,
                { method: 'POST', headers: { 'Content-Type': 'application/json' } }
              );
              const result = await response.json();
              console.log('Payment Success:', result);
              setShowPaypalSuccess(true);
              setTimeout(() => {
                window.location.href = '/';
              }, 3000);
            } catch (error) {
              console.error('Error capturing payment:', error);
              setShowPaypalSuccess(true);
              setTimeout(() => {
                window.location.href = '/';
              }, 3000);
            }
          },
          onError: (err) => {
            console.error('PayPal Error:', err);
            alert('Payment Failed. Please try again or use another payment method.');
          },
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            height: 45,
          },
        })
        .render(paypalRef.current);
    }

    return () => {
      if (paypalRef.current) paypalRef.current.innerHTML = '';
    };
  }, []);

  return (
    <>
      <Header />
      
      <main className="payment-main-content">
        {/* Page Header */}
        <section className="payment-page-header">
          <h1 className="payment-page-title">Complete Your Payment</h1>
          <p className="payment-page-subtitle">Choose your preferred payment method</p>
        </section>

        {/* Payment Container */}
        <div className="payment-container">
          {/* Order Summary */}
          <div className="order-summary">
            <h2 className="summary-title">
              <i className="fas fa-shopping-cart"></i> Order Summary
            </h2>

            <div className="summary-item">
              <div className="item-info">
                <img
                  src="https://picsum.photos/80/80?random=1"
                  alt="Premium Subscription"
                  className="item-image"
                />
                <div className="item-details">
                  <h4>Premium Subscription</h4>
                  <p>Monthly Plan - Unlimited Access</p>
                </div>
              </div>
              <div className="item-price">$10.00</div>
            </div>

            <div className="summary-total">
              <span className="total-label">Total Amount:</span>
              <span className="total-amount">$10.00</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <h2 className="methods-title">
              <i className="fas fa-credit-card"></i> Payment Method
            </h2>

            {/* PayPal Tab Content */}
            <div className="tab-content active">
              <div className="paypal-section">
                <p className="paypal-description">
                  Pay securely using your PayPal account or credit/debit card
                </p>
                <div className="paypal-button-container" ref={paypalRef}>
                  {/* PayPal button will be rendered here */}
                </div>
                {showPaypalSuccess && (
                  <div className="success-message show">
                    <i className="fas fa-check-circle"></i>
                    <h3>Payment Successful!</h3>
                    <p>
                      Your subscription has been activated. Enjoy unlimited access to Cartoon
                      World!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Security Badge */}
            <div className="security-badge">
              <i className="fas fa-shield-alt"></i>
              <p>
                <strong>Secure Payment</strong> - Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Payment;