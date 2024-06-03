"use client"
import React, { useEffect, useState } from "react";

interface ILoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<ILoadingOverlayProps> = ({ isLoading }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // This effect runs only on the client side
    setShowOverlay(isLoading);
  }, [isLoading]);

  if (!showOverlay) {
    return null;
  }

  return (
    <div className="h-screen w-full fixed top-0 left-0 z-50 bg-gray-950 bg-opacity-50 flex items-center justify-center">
      <div className="w-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a12"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stopColor="#FFFFFF"></stop>
            <stop offset=".3" stopColor="#FFFFFF" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="#FFFFFF" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="#FFFFFF" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0"></stop>
          </radialGradient>
          <circle
            style={{ transformOrigin: "center" }}
            fill="none"
            stroke="url(#a12)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            style={{ transformOrigin: "center" }}
            fill="none"
            opacity=".2"
            stroke="#FFFFFF"
            strokeWidth="15"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      </div>
    </div>
  );
};

export default LoadingOverlay;
