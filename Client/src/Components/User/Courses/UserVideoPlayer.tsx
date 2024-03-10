import React, { useEffect, useRef, useState } from 'react'
import { X } from 'react-feather';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


function UserVideoPlayer({videoUrl}:any) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
 


 

  const handleCloseClick = () => {
    window.location.reload()
    
    
  };
  return (
    <div className='fixed z-50 top-0 left-0 flex w-full h-full justify-center items-center bg-black bg-opacity-65 flex-col'>
      <div className='text-white flex w-full p-3 justify-end'><X size={30} onClick={handleCloseClick}/></div>
        <div className=' h-5/6 w-9/12'>

        <video
          controls
         className='w-full h-full object-contain bg-transparent'
          ref={videoRef}
        >

          <source 
          src={videoUrl}/>
        </video>



        </div>
    </div>
  )
}

export default UserVideoPlayer
