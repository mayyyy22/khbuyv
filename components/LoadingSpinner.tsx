
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
