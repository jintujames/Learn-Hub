import React, { useEffect, useState } from 'react'
import '../AdminDashBoard/Header/dashBoard.css'
import { logout } from '../../../Features/AdminSlice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../../utils/config/axios.Methode.post';

function AdminDashboard() {  

  const navigate = useNavigate()

  const { admin } = useSelector( (state:any) => state.admin)

  useEffect ( () =>{
    if(admin){
      console.log("user is here");
      
      navigate('/adminDashboard')
    }
  },[])

  
  return (
    <>
  {/* component */}
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n@import url(https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css);\n"
    }}
  />
      <div className="max-w-2xl min-h-screen bg-gray-200 flex items-center justify-end px-5 py-2">
    <div className="w-full max-w-3xl">
      <div className="-mx-2 md:flex">
        <div className="w-full md:w-1/3 px-2">
          <div className="rounded-lg shadow-sm mb-4">
            <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
              <div className="px-3 pt-8 pb-10 text-center relative z-10">
                <h4 className="text-sm uppercase text-gray-500 leading-tight">
                  Users
                </h4>
                <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                  3,682
                </h3>
                <p className="text-xs text-green-500 leading-tight">▲ 57.1%</p>
              </div>
              <div className="absolute bottom-0 inset-x-0">
                <canvas id="chart1" height={70} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2">
          <div className="rounded-lg shadow-sm mb-4">
            <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
              <div className="px-3 pt-8 pb-10 text-center relative z-10">
                <h4 className="text-sm uppercase text-gray-500 leading-tight">
                  Subscribers
                </h4>
                <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                  11,427
                </h3>
                <p className="text-xs text-red-500 leading-tight">▼ 42.8%</p>
              </div>
              <div className="absolute bottom-0 inset-x-0">
                <canvas id="chart2" height={70} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-2">
          <div className="rounded-lg shadow-sm mb-4">
            <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
              <div className="px-3 pt-8 pb-10 text-center relative z-10">
                <h4 className="text-sm uppercase text-gray-500 leading-tight">
                  Comments
                </h4>
                <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
                  8,028
                </h3>
                <p className="text-xs text-green-500 leading-tight">▲ 8.2%</p>
              </div>
              <div className="absolute bottom-0 inset-x-0">
                <canvas id="chart3" height={70} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES */}
  
</>

  )
}

export default AdminDashboard
