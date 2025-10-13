import React from "react";
import { Users, Leaf, CheckCircle, Heart } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-white via-yellow-50 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-red-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-orange-300 rounded-full blur-3xl"></div>
      </div>

      {/* Top Statistics Bar */}
      <div className="relative bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 text-white py-3">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center space-x-2">
                  <achievement.icon className="h-6 w-6 text-yellow-100 group-hover:text-white transition-colors duration-300" />
                  <span className="text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                    {achievement.value}
                  </span>
                </div>
                <p className="text-red-100 text-sm mt-1 group-hover:text-white transition-colors duration-300">
                  {achievement.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t-2 border-yellow-200 bg-gradient-to-r from-yellow-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-700 font-medium">
                © {currentYear}{" "}
                <span className="font-bold text-red-600 hover:text-orange-600 transition-colors duration-300">
                  PlantCare AI
                </span>
                . All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <a
                href="#privacy"
                className="text-gray-600 hover:text-red-500 font-medium transition-all duration-300 hover:scale-105"
              >
                Privacy
              </a>
              <span className="text-yellow-400">•</span>
              <a
                href="#terms"
                className="text-gray-600 hover:text-orange-500 font-medium transition-all duration-300 hover:scale-105"
              >
                Terms
              </a>
              <span className="text-yellow-400">•</span>
              <a
                href="#cookies"
                className="text-gray-600 hover:text-yellow-600 font-medium transition-all duration-300 hover:scale-105"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const achievements = [
  {
    icon: Users,
    value: "10K+",
    label: "Happy Users",
  },
  {
    icon: Leaf,
    value: "500+",
    label: "Plants Identified",
  },
  {
    icon: CheckCircle,
    value: "95%",
    label: "Accuracy Rate",
  },
  {
    icon: Heart,
    value: "24/7",
    label: "Support",
  },
];

export default Footer;
