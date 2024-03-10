import React, { useEffect, useRef, useState } from 'react'
import { X } from 'react-feather';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';


type VideoPlayerProps = {
    videoUrl: string;
    setShowVideoModal: any;
    setCurrentVideoUrl:any
  };

function VideoPlayer({ videoUrl, setShowVideoModal,setCurrentVideoUrl }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

const navigate=useNavigate()
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', handleVideoEnded);
      return () => {
        videoRef.current!.removeEventListener('ended', handleVideoEnded);
      };
    } 
  }, []);

  const togglePlay = () => {
    toast.success('here')
    if (videoRef.current) {
    toast.success('1')

      if (!isPlaying) {
    toast.success('3')

        videoRef.current.play();
      } else {
    toast.success('4')

        videoRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleCloseClick = () => {
    window.location.reload()
    setCurrentVideoUrl('')
    setShowVideoModal(false)
    
  };
  return (
    <div className='fixed top-0 left-0 flex w-full h-full justify-center items-center bg-black bg-opacity-65 flex-col'>
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

export default VideoPlayer
