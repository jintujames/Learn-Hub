import React from 'react'
import { BaseUrl, PaymentBaseUrl } from '../../../utils/Api';
import axios from 'axios';

function SingleViewPayButton({courseDetails}:any) {
    const handleCourseCheckOut = () => {
        console.log(courseDetails,'detailszzzzzzzz');
        
        
        axios
          .post(`${PaymentBaseUrl}/SinglestripePayment`, {
            courseDetails
          })
          .then((response) => {
            if (response.data.url) {
              window.location.href = response.data.url;
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
  return (
    <div>
    <button
      onClick={() => handleCourseCheckOut()}
      className="px-6 py-2 rounded-md bg-yellow-300 text-gray-900 text-sm font-medium  hover:bg-yellow-500 focus:outline-none focus:bg-yellow-300"
      >
      Buy Course
    </button>
  </div>
);
}

export default SingleViewPayButton
