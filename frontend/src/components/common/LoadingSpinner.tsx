import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex space-x-2 justify-center items-center bg-white h-16">
      <div className="h-3 w-3 bg-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-3 w-3 bg-blue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-3 w-3 bg-blue rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingSpinner;
