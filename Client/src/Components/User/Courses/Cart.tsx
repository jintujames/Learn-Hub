import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Course } from '../../../Features/TutorSlice/courseSlice';
import { selectUser } from '../../../Features/UserSlice/userSlice';
import axios from 'axios';
import { updateCartCount } from '../../../Features/UserSlice/CartSlice';
import { toast } from 'react-toastify';

interface CartItem {
  _id: string;
  quantity: number;

  course: any; 
}

function Cart() {

  const [userId,setuserId]:any=useState('')
  const dispatch = useDispatch();
  const [cartItems,setCartItems]:any =useState<any[]>([])
const [userid,setuserid]=useState(null)


  const user = useSelector(selectUser)
  useEffect(()=>{
    const userId:any=localStorage.getItem("userId")
    
    setuserId(userId)
  
    console.log(userId,'HUHUHUHUHUHUHUHUHUHUH');
    
    
  },[userId])
  

      

  useEffect(() => {
    if (!userId) {
      toast.error('No user found');
      return;
    }
  
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/v1/student/cart/${userId}`);
        setCartItems(response.data);
        dispatch(updateCartCount(response.data.length));
      } catch (error) {
        console.error('Error fetching cart items:', error);
        toast.error('Error fetching cart items');
      }
    };
  
    fetchCartItems();
  }, [userId, dispatch]);

  const handleDelete =(cartItemId:any)=>{
    axios.delete(`http://localhost:4001/api/v1/student/removeCourse/${cartItemId}`)
    .then((response)=>{
      console.log(response.data,"deleted Successfully")
      
      dispatch(updateCartCount(response.data.length));

      setCartItems((prevCartItems: any[])=>prevCartItems.filter((cartItem:any)=>cartItem.course[0]?._id !== cartItemId))
    })
    .catch((error)=>{
      console.error("error", error);
    })
    
  }
  
  
  return (
    <div>
      <>
  {/* component */}
  {/* Create By Joker Banny */}
  <style
    dangerouslySetInnerHTML={{
      __html:
        '\n    @layer utilities {\n    input[type="number"]::-webkit-inner-spin-button,\n    input[type="number"]::-webkit-outer-spin-button {\n      -webkit-appearance: none;\n      margin: 0;\n    }\n  }\n'
    }}
  />
  
  <div className="h-screen bg-gray-100 pt-20 ">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 overflow-auto max-h-96">



      {cartItems.length > 0 && cartItems.map((cartItem: CartItem, index: number) => (
  <div key={index} className="justify-between mb-6 rounded-lg p-6 shadow-md sm:flex sm:justify-start">
    {/* Assuming you want to display the first course in the cart item */}
    <img
      src={cartItem.course[0]?.image[0]}
      alt="product-image"
      className="w-full rounded-lg sm:w-40"
    />
    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
      <div className="mt-5 sm:mt-0">
        <h2 className="text-lg font-bold text-gray-900">
          {cartItem.course[0]?.courseName}
        </h2>
        <p className="mt-1 text-xs text-gray-700">
          {cartItem.course[0]?.courseDescription}
        </p>
      </div>
      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
        <div className="flex items-center space-x-4">
          <p className="text-sm">Rs. {cartItem.course[0]?.coursefee}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex items-center border-gray-100">
  <p
    onClick={() => handleDelete(cartItem.course[0]?._id)}
    className="cursor-pointer text-red-500 hover:underline"
  >
    Remove
  </p>
</div>

      </div>
    </div>
  </div>
))}

        
      </div>
      {/* Sub total */}
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">Rs.{
      cartItems.reduce(
        (total, cartItem) =>
          total + cartItem.course[0]?.coursefee * cartItem.quantity,
        0
      ).toFixed(2)
    }</p>
        </div>
        <div className="flex justify-between">
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">Rs. {cartItems
        .reduce(
          (total, cartItem) =>
            total + cartItem.course[0]?.coursefee * cartItem.quantity,
          0
        )
        .toFixed(2)}</p>
            <p className="text-sm text-gray-700">including GST</p>
          </div>
        </div>
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
          Check out
        </button>
      </div>
    </div>
  </div>
</>

    </div>
  )
}

export default Cart
