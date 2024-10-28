import React from 'react';

export const Alert = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "relative w-full rounded-lg border p-4 mb-4 flex gap-3";
  const variantStyles = {
    default: "bg-white text-gray-900 border-gray-200",
    destructive: "border-red-600/50 text-red-600 bg-red-50"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, className = "" }) => {
  return (
    <h5 className={`font-medium leading-none tracking-tight ${className}`}>
      {children}
    </h5>
  );
};

export const AlertDescription = ({ children, className = "" }) => {
  return (
    <div className={`text-sm opacity-90 ${className}`}>
      {children}
    </div>
  );
};

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-lg border bg-white text-gray-950 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "" }) => {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
};

export default {
  Alert,
  AlertTitle,
  AlertDescription,
  Card,
  CardHeader,
  CardTitle,
  CardContent
};