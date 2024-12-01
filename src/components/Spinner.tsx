import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="animate-spin rounded-full border-4 border-t-transparent border-blue-500"
        style={{
          width: '40px',
          height: '40px',
        }}
      ></div>
    </div>
  );
};

export default Spinner;
