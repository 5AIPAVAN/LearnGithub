import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
function RazorPayButton({ buttonId }) {
  const location = useLocation();
  const formRef = useRef(null); // Create a ref for the form

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.setAttribute("data-payment_button_id", buttonId);

    formRef.current.appendChild(script); // Append the script to the form

    return () => {
      if (formRef.current) {
        formRef.current.removeChild(script);
      }
    };
  }, [buttonId]); // Add buttonId to the dependencies array

  return (
    <form ref={formRef}></form> // Assign the ref to the form
  );
}

export default RazorPayButton;
