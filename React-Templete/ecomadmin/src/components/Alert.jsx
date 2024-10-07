import React from 'react';

const Alert = ({ message }) => (
  message && (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
      <p className="text-yellow-700">{message}</p>
    </div>
  )
);

export default Alert;