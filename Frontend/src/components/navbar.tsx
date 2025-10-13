import React, { useState } from "react";
import { Menu, X, Camera, BarChart3, Home, Leaf } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center cursor-pointer group ${className}`}>
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
        </div>

        {/* Mobile version - Simplified */}
        <div className="text-gray-900 font-bold text-lg sm:hidden">
          <span className="text-red-500 group-hover:text-red-600 transition-colors duration-300 font-extrabold">
            PC
          </span>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // update hrefs to real routes
  const navItems: NavItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "Detect Disease", href: "/detect", icon: Camera },
    { name: "Plant Database", href: "/database", icon: Leaf },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <nav
      className="w-full flex justify-center py-6 sticky top-0 z-50 
    bg-transparent"
    >
      <div className="max-w-7xl w-full px-4">
        {/* pill container */}
        <div className="bg-gradient-to-r from-red-300/80 via-orange-300 to-yellow-200 backdrop-blur-md rounded-[35px] shadow-lg px-10 py-3 flex items-center justify-between">
          {/* Logo left */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Logo className="h-14 w-auto" />
          </div>

          {/* desktop nav with pear-shaped orange hover effects */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => {
              const orangeVariants = [
                "from-orange-300/20 to-orange-400/20",
                "from-orange-400/20 to-orange-500/20",
                "from-orange-500/20 to-orange-600/20",
                "from-orange-600/20 to-orange-700/20",
              ];

              const textColors = [
                "group-hover:text-orange-600",
                "group-hover:text-orange-700",
                "group-hover:text-orange-800",
                "group-hover:text-orange-900",
              ];

              const borderColors = [
                "group-hover:border-orange-600",
                "group-hover:border-orange-500",
                "group-hover:border-orange-600",
                "group-hover:border-orange-600",
              ];

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `group relative flex items-center space-x-2 text-lg px-4 py-3 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 ${
                      textColors[index]
                    } ${
                      isActive
                        ? "text-orange-700 font-semibold"
                        : "text-gray-700"
                    }`
                  }
                  style={{
                    borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${orangeVariants[index]} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-md border-2 border-transparent ${borderColors[index]}`}
                    style={{
                      borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                    }}
                  ></div>

                  <item.icon className="relative z-10 h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative z-10 font-medium">{item.name}</span>

                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-600/0 group-hover:from-orange-400/10 group-hover:to-orange-600/10 blur-sm transition-all duration-300`}
                    style={{
                      borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                    }}
                  ></div>
                </NavLink>
              );
            })}
          </div>

          {/* Enhanced CTA button */}
          <div className="hidden md:block">
            <NavLink
              to="/detect"
              onClick={handleNavClick}
              className="relative bg-gradient-to-r from-orange-600 to-red-400 text-white font-semibold text-lg py-3 px-8 rounded-[25px] shadow-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300 hover:scale-105 hover:-translate-y-0.4 hover:shadow-sm group"
            >
              <span className="relative z-10">Scan Plant</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </NavLink>
          </div>

          {/* Enhanced mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="relative p-3 transition-all duration-300 hover:scale-110 group"
              style={{
                borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
              }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                }}
              ></div>
              {isMenuOpen ? (
                <X className="relative z-10 h-7 w-7 text-gray-800 transition-transform duration-300 group-hover:rotate-90 group-hover:text-orange-700" />
              ) : (
                <Menu className="relative z-10 h-7 w-7 text-gray-800 transition-transform duration-300 group-hover:rotate-180 group-hover:text-orange-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 md:hidden shadow-xl">
          {navItems.map((item, index) => {
            const mobileOrangeVariants = [
              "from-orange-300/10 to-orange-400/10",
              "from-orange-400/10 to-orange-500/10",
              "from-orange-500/10 to-orange-600/10",
              "from-orange-600/10 to-orange-700/10",
            ];

            const mobileBorderColors = [
              "hover:border-orange-400",
              "hover:border-orange-500",
              "hover:border-orange-600",
              "hover:border-orange-700",
            ];

            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `group relative flex items-center px-6 py-4 transition-all duration-300 text-lg border-l-4 border-transparent ${
                    mobileBorderColors[index]
                  } hover:shadow-lg ${
                    isActive
                      ? "text-orange-700 font-semibold"
                      : "text-gray-700 hover:text-orange-700"
                  }`
                }
                style={{
                  animationDelay: `${index * 0.03}s`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${mobileOrangeVariants[index]} opacity-0 group-hover:opacity-100 transition-all duration-300`}
                  style={{
                    borderRadius: "0 60% 60% 0 / 0 40% 40% 0",
                  }}
                ></div>

                <item.icon className="relative z-10 h-6 w-6 mr-3 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10 font-medium">{item.name}</span>

                <div className="relative z-10 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-orange-600 rotate-[-45deg]"></div>
                </div>
              </NavLink>
            );
          })}

          {/* Enhanced mobile CTA */}
          <NavLink
            to="/detect"
            onClick={handleNavClick}
            className="relative w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg py-4 transition-all duration-300 hover:from-orange-600 hover:to-red-600 group flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <Camera className="h-6 w-6 inline mr-2 transition-transform duration-300 group-hover:scale-110" />
            <span className="relative z-10">Scan Plant Now</span>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
