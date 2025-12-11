import React, { useEffect, useRef } from "react";

const PayPalButton = () => {
  const paypalRef = useRef();

  useEffect(() => {
    const existingScript = document.getElementById("paypal-sdk");
    if (existingScript) {
      renderPayPalButtons();
      return;
    }
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ATJXwBBU0l8mvG8m0zdmhwFKpXmbFU4s2cLw1OxLqARf60Qjan-agAWA9_cn-iPVe8cXoM6UDPcWJ6nb&currency=USD";
    script.onload = renderPayPalButtons;
    document.body.appendChild(script);

    function renderPayPalButtons() {
      if (!window.paypal || !paypalRef.current) return;

      // Clear any old buttons (important to prevent zoid errors)
      paypalRef.current.innerHTML = "";

      window.paypal
        .Buttons({
          createOrder: async () => {
            const response = await fetch("http://127.0.0.1:5000/payments/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: "10.00" }),
            });
            const order = await response.json();
            return order.order_id;
          },
          onApprove: async (data) => {
            const response = await fetch(
              `http://127.0.0.1:5000/payments/capture/${data.orderID}`,
              { method: "POST", headers: { "Content-Type": "application/json" } }
            );
            const result = await response.json();
            console.log("Payment Success:", result);
            alert("Payment Successful! Check console for details.");
          },
          onError: (err) => {
            console.error("PayPal Error:", err);
            alert("Payment Failed. See console.");
          },
        })
        .render(paypalRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (paypalRef.current) paypalRef.current.innerHTML = "";
    };
  }, []);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
