import axios from "axios";
import React, { useState } from "react";
import { BaseUrl, PaymentBaseUrl } from "../../../utils/Api";
import { toast } from "react-toastify";

 function PayButton ({cartItems}:any) {



  const handleCheckOut = () => {
    console.log(cartItems,'ll cart');
    
    
    axios
      .post(`${PaymentBaseUrl}/stripePayment`, {
        cartItems,
        
      })
      .then(async(response:any) => {
        console.log(response,'FIRST____');
        
        if (response.data.url) {
          
         
          window.location.href= response.data.url

           
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  
  return (
    <div>
      <button
        onClick={() => handleCheckOut()}
        className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
      >
        Check out
      </button>
    </div>
  );
}

export default PayButton;
