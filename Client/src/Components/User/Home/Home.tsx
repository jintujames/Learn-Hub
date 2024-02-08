import React from "react"

function Home() {
  return (
    <>
{/* What We Offer */}

    <br></br>

      <div className="container mx-auto px-20">
        <h1 className="text-center text-blue-600 font-medium mb-2">What We Offer</h1>
           <br></br>
<h4 className="text-center text-lg font-bold mb-2">Invest In Your Professional</h4>
<h4 className="text-center text-lg font-bold mb-2">Goals With E-Study</h4>
  <div style={{ backgroundColor: "rgb(255, 255, 255)" }}>
    <div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 pt-20 pb-10 lg:pt-40 lg:pb-20"
      style={{ cursor: "auto" }}
    >
      <div className="p-6 bg-gray-100 rounded-lg">
        <div className="mb-5">
        <img
  className="inline-block w-70 h-50"
  src="public/Free Vector _ Illustrated people on business training.jpeg"  // Replace with the actual path to your image
  alt="Your Image Alt Text"
/>

        </div>
        <h3 className="text-lg font-bold mb-2">Expert Instruction</h3>
        <p className="text-sm leading-6 text-gray-600">
         Guiding Aspirations, Nurturing Talent: Empowering Excellence Through Expert Instruction and Unparalleled Educational Guidance.
        </p>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg">
        <div className="mb-5">
        <img
  className="inline-block w-70 h-50"
  src="public/Premium Vector _ Video conference.jpeg"  // Replace with the actual path to your image
  alt="Your Image Alt Text"
/>
        </div>
        <h3 className="text-lg font-bold mb-2">Video Tutorials</h3>
        <p className="text-sm leading-6 text-gray-600">
        Embark on a Journey of Learning with Engaging Video Tutorials: Explore, Learn, and Master New Skills in the World of Educational Videos.
        </p>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg" style={{ cursor: "auto" }}>
        <div className="mb-5" style={{ cursor: "auto" }}>
        <img
  className="inline-block w-70 h-50"
  src="public/09156fbe1a3bb3084aec33845482d33d.jpg"  // Replace with the actual path to your image
  alt="Your Image Alt Text"
/>
        </div>
        <h3 className="text-lg font-bold mb-2">Lifetime Access </h3>
        <p className="text-sm leading-6 text-gray-600">
        Unlock the doors to endless knowledge with Lifetime Access! Embark on a transformative journey of lifelong learning, where opportunities are boundless, and your pursuit of wisdom knows no limits.
        </p>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg">
        <div className="mb-5">
        <img
  className="inline-block w-70 h-50"
  src="public/fd7bf3cbd6d511e2ce39ab0f9132cd35.jpg"  // Replace with the actual path to your image
  alt="Your Image Alt Text"
/>
        </div>
        <h3 className="text-lg font-bold mb-2">Global certificate</h3>
        <p className="text-sm leading-6 text-gray-600">
        Unlock Global Opportunities: Elevate Your Skills and Gain Recognition Anywhere in the World with Our Certified Training Programs!
        </p>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Home
