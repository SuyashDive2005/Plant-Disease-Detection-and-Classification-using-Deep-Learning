import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center cursor-pointer group">
      <div className="flex-shrink-0 flex items-center">
        {/* Enhanced Custom Plant Icon Container */}
        <div className="relative w-12 h-12 bg-gradient-to-br from-red-500 to-blue-400 rounded-2xl flex items-center justify-center mr-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-red-500/25">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-blue-400 rounded-2xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

          {/* Custom Plant SVG */}
          <svg
            className="relative z-10 w-7 h-7 text-white group-hover:text-green-100 transition-colors duration-300"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            {/* Pot */}
            <path d="M10 24h12l1 4H9l1-4z" opacity="0.8" />
            <rect x="9" y="22" width="14" height="2" rx="1" />

            {/* Soil */}
            <ellipse cx="16" cy="22" rx="6" ry="1" opacity="0.6" />

            {/* Main stem */}
            <rect
              x="15.5"
              y="12"
              width="1"
              height="10"
              className="animate-pulse"
            />

            {/* Large leaf (left) */}
            <path
              d="M8 16c0-4 3-6 7.5-6.5C15.5 9.5 12 12 12 16s3.5 6.5 3.5 6.5C11 22 8 20 8 16z"
              className="transform group-hover:rotate-12 transition-transform duration-700 origin-bottom-right"
              opacity="0.9"
            />

            {/* Large leaf (right) */}
            <path
              d="M24 16c0-4-3-6-7.5-6.5C16.5 9.5 20 12 20 16s-3.5 6.5-3.5 6.5C21 22 24 20 24 16z"
              className="transform group-hover:-rotate-12 transition-transform duration-700 origin-bottom-left"
              opacity="0.9"
            />

            {/* Small leaf (top left) */}
            <path
              d="M12 12c0-2 1.5-3 3-3.5-0.5-0.5-2 0.5-2 2s1 2.5 1 2.5c-1.5-0.5-2-1-2-1z"
              className="transform group-hover:rotate-6 transition-transform duration-500"
              opacity="0.7"
            />

            {/* Small leaf (top right) */}
            <path
              d="M20 12c0-2-1.5-3-3-3.5 0.5-0.5 2 0.5 2 2s-1 2.5-1 2.5c1.5-0.5 2-1 2-1z"
              className="transform group-hover:-rotate-6 transition-transform duration-500"
              opacity="0.7"
            />

            {/* Tiny decorative elements */}
            <circle
              cx="14"
              cy="14"
              r="0.7"
              className="animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <circle
              cx="18"
              cy="18"
              r="0.7"
              className="animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </svg>
        </div>

        {/* Enhanced Text */}
        <div className="text-gray-900 font-bold text-xl hidden sm:block">
          <div className="flex items-baseline space-x-1">
            <span className="text-red-500 group-hover:text-red-600 transition-colors duration-300 text-2xl font-extrabold tracking-tight">
              Plant
            </span>
            <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300 text-2xl font-extrabold tracking-tight">
              Care
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-gray-700 text-sm font-medium tracking-wide group-hover:text-gray-900 transition-colors duration-300">
              
            </span>
            {/* AI indicator */}
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
              <div
                className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-1 h-1 bg-red-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Mobile version - Simplified */}
        <div className="text-gray-900 font-bold text-lg sm:hidden">
          <span className="text-red-500 group-hover:text-red-600 transition-colors duration-300 font-extrabold">
            PC
          </span>
          <span className="text-xs block text-gray-700 font-medium -mt-1">
            AI
          </span>
        </div>
      </div>

      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

export default Logo;
