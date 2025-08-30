import React from 'react';
import Logo from "../Image/Logo.png"

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 mb-4">
        <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
      </div>
      <h1 className="text-2xl font-bold text-[rgb(0_82_159/1)] mb-2">Yes Bank App</h1>
      {/* <span className="text-xs text-gray-500 mb-6">v-1.0</span> */}
      <div className="w-16 h-16 border-t-4 border-green-700 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">loading ...</p>
    </div>
  );
};

export default Loader;
