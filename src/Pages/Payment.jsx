import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Payment.css";
import { useParams } from "react-router-dom";

const Payment = () => {
  const paypalRef = useRef(null);
  const { id } = useParams();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaypalSuccess, setShowPaypalSuccess] = useState(false);

  /* ---------------- FETCH PLAN DETAILS FIRST ---------------- */
  useEffect(() => {
    if (!id) return;

    const fetchPlanDetails = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL + "/plans/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Jwttoken")}`,
          },
          body: JSON.stringify({
            Program_ID: id,
          }),
        });

        const data = await res.json();

        // YOUR API RETURNS ARRAY INSIDE content
        if (data.status && data.content?.length > 0) {
          setPlan(data.content[0]);
        }
      } catch (err) {
        console.error("Failed to fetch plan details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [id]);

  /* ---------------- PAYPAL INTEGRATION ---------------- */
  useEffect(() => {
    if (!plan) return;

    const loadPaypal = () => {
      if (!window.paypal || !paypalRef.current) return;

      paypalRef.current.innerHTML = "";

      window.paypal
        .Buttons({
          createOrder: async () => {
            const res = await fetch(import.meta.env.VITE_API_URL + "/payments/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Jwttoken")}`,
              },
              body: JSON.stringify({
                amount: plan.Price,
                Program_ID: plan.Program_ID,
              }),
            });

            const data = await res.json();
            return data.order_id;
          },

          onApprove: async (data) => {
            await fetch(
              `${import.meta.env.VITE_API_URL}/payments/capture/${data.orderID}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("Jwttoken")}`,
                },
              }
            );

            setShowPaypalSuccess(true);
            setTimeout(() => (window.location.href = "/"), 3000);
          },

          onError: (err) => {
            console.error("PayPal error", err);
            alert("Payment failed. Try again.");
          },

          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
            height: 45,
          },
        })
        .render(paypalRef.current);
    };

    if (!document.getElementById("paypal-sdk")) {
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src =
        `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD`;
      script.onload = loadPaypal;
      document.body.appendChild(script);
    } else {
      loadPaypal();
    }
  }, [plan]);

  /* ---------------- UI ---------------- */
  return (
    <>
      <Header />

      <main className="payment-main-content">
        <section className="payment-page-header">
          <h1 className="payment-page-title">Complete Your Payment</h1>
          <p className="payment-page-subtitle">
            Choose your preferred payment method
          </p>
        </section>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <div className="payment-container">
            {/* ORDER SUMMARY */}
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-item">
                <div className="item-info">
                  <img
                    src={'/short_logo.png'}
                    alt={plan.Program_Name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h4>{plan.Program_Name}</h4>
                    <p>{plan.Program_Details}</p>
                    <p>Duration: {plan.Duration} days</p>
                  </div>
                </div>

                <div className="item-price">₹{plan.Price}</div>
              </div>

              <div className="summary-total">
                <span className="total-label">Total Amount:</span>
                <span className="total-amount">₹{plan.Price}</span>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="payment-methods">
              <h2 className="methods-title">Payment Method</h2>

              <div className="paypal-section">
                <p className="paypal-description">
                  Pay securely using PayPal or card
                </p>

                <div
                  className="paypal-button-container"
                  ref={paypalRef}
                ></div>

                {showPaypalSuccess && (
                  <div className="success-message show">
                    <h3>Payment Successful!</h3>
                    <p>Your subscription is now active.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Payment;
