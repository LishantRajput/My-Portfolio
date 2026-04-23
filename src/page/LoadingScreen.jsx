import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      
      {/* Wave Container */}
      <div className="relative w-[600px] h-[200px]">
        
        {/* First Wave */}
        <div className="absolute inset-0 bg-purple-600 opacity-60 blur-3xl rounded-full animate-wave1"></div>

        {/* Second Wave */}
        <div className="absolute inset-0 bg-purple-500 opacity-50 blur-2xl rounded-full animate-wave2"></div>

        {/* Third Wave */}
        <div className="absolute inset-0 bg-purple-400 opacity-40 blur-xl rounded-full animate-wave3"></div>

      </div>

    </div>
  );
};

export default LoadingScreen;
