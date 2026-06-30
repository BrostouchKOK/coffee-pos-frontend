import React from "react";
import MainLayout from "../../layouts/MainLayout";

const Loading = ({ text }) => {
  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="relative">
          {/* Outer Spinner */}
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>

          {/* Animated Spinner */}
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <h2 className="mt-5 text-lg font-semibold text-gray-700">
          {text}
        </h2>

        <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
      </div>
    </MainLayout>
  );
};

export default Loading;
