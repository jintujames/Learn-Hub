import React from 'react';

function Chat() {
  return (
    <div className="container mx-auto h-screen flex">
      {/* Recipients list */}
      <div className="w-1/4 bg-gray-200 p-4">
        <div className="font-semibold mb-4">Recipients</div>
        {/* Sample recipients */}
        <div className="flex items-center mb-4">
          <img
            src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
            className="h-10 w-10 rounded-full mr-2"
            alt=""
          />
          <div>
            <div className="font-semibold">John</div>
            <div className="text-gray-500">Online</div>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <img
            src="https://source.unsplash.com/otT2199XwI8/600x600"
            className="h-10 w-10 rounded-full mr-2"
            alt=""
          />
          <div>
            <div className="font-semibold">Anu</div>
            <div className="text-gray-500">Offline</div>
          </div>
        </div>
      </div>

      {/* Chat section */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="bg-white border-b-2 p-4">
          <div className="font-semibold text-xl">Students</div>
          <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
            RA
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          {/* User message */}
          <div className="flex justify-end mb-2">
            <div className="bg-blue-400 rounded-tl-3xl rounded-bl-3xl rounded-tr-xl py-2 px-4 text-white max-w-md">
              Welcome to the chat!
            </div>
          </div>
          {/* Other user message */}
          <div className="flex justify-start mb-2">
            <div className="bg-gray-400 rounded-tr-3xl rounded-br-3xl rounded-tl-xl py-2 px-4 text-white max-w-md">
              Hi there!
            </div>
          </div>
        </div>

        {/* Chat input */}
        <div className="bg-white border-t-2 p-2">
          <input
            type="text"
            placeholder="Write your message..."
            className="w-full py-2 px-4 focus:outline-none"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 ml-2 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
