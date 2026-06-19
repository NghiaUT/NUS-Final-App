import React from 'react';

const LoadingSpinner = () => {
  const bars = Array.from({ length: 12 });

  return (
    <div className="relative inline-block w-10 h-10">
      
      {bars.map((_, i) => {
        const rotation = i * 30;
        const delay = (i * 0.1) - 1.1;

        return (
          <div
            key={i}
            className="absolute top-0 left-0 w-full h-full animate-ios-fade"
            style={{
              transform: `rotate(${rotation}deg)`,
              animationDelay: `${delay}s`,
            }}
          >
            <div className="absolute top-[2px] left-[18px] w-[4px] h-[10px] rounded-[20%] bg-[#888888]" />
          </div>
        );
      })}
      
    </div>
  );
}

export default LoadingSpinner;