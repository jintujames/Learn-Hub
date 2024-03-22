import axios from "axios";
import React, { useState,useEffect } from "react";
import { BaseUrl, PaymentBaseUrl } from "../../../utils/Api";
import { toast } from "react-toastify";
import { addCartId } from "../../../Features/UserSlice/CartSlice";
import { useDispatch } from "react-redux";
 function PayButton ({cartItems}:any) {

  useEffect(() => {
  
    console.log(cartItems[0]._id,'KKKART--');
    
  }, [])
  
const dispatch=useDispatch()

  const handleCheckOut = () => {
    console.log(cartItems,'ll cart');
    
    dispatch(addCartId(cartItems[0]._id))
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
        className="mt-2 w-full rounded-md bg-blue-500 py-1.2 font-medium text-blue-50 hover:bg-blue-600"
      >
        Check out
      </button>
    </div>
  );
}

export default PayButton;
