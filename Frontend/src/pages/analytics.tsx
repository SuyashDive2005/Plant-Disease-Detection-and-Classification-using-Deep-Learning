import React, { useState, useEffect } from "react";
import {
  Calendar,
  ChevronDown,
  ShieldCheck,
  Bug,
  Filter,
  ArrowRight,
  BarChartHorizontal,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const Analytics = () => {
  const [isVisible, setIsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elementsToAnimate = document.querySelectorAll("[data-animate]");
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => elementsToAnimate.forEach((el) => observer.unobserve(el));
  }, []);

  // Effect to handle scroll for parallax animation
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxBg = (speed) => ({
    backgroundPositionY: `${scrollY * speed}px`,
    transition: "background-position 0.2s ease-out",
  });

  // --- Mock Data ---
  const analysisData = [
    {
      id: 1,
      plantName: "Monstera Deliciosa",
      image: "🌿",
      scanDate: "2025-09-15",
      diagnosis: "Healthy",
      confidence: 99,
      status: "resolved",
    },
    {
      id: 2,
      plantName: "Rose Bush",
      image: "🌹",
      scanDate: "2025-09-12",
      diagnosis: "Black Spot",
      confidence: 92,
      status: "needs_treatment",
    },
    {
      id: 3,
      plantName: "Snake Plant",
      image: "🐍",
      scanDate: "2025-09-10",
      diagnosis: "Healthy",
      confidence: 98,
      status: "resolved",
    },
    {
      id: 4,
      plantName: "Basil Plant",
      image: "🌿",
      scanDate: "2025-09-08",
      diagnosis: "Aphids Detected",
      confidence: 88,
      status: "treatment_in_progress",
    },
    {
      id: 5,
      plantName: "Lavender",
      image: "💜",
      scanDate: "2025-09-05",
      diagnosis: "Healthy",
      confidence: 100,
      status: "resolved",
    },
    {
      id: 6,
      plantName: "Jade Plant",
      image: "💎",
      scanDate: "2025-08-28",
      diagnosis: "Root Rot",
      confidence: 85,
      status: "needs_treatment",
    },
  ];

  const weeklyTrendsData = [
    { day: "Mon", healthy: 8, issues: 2 },
    { day: "Tue", healthy: 12, issues: 1 },
    { day: "Wed", healthy: 7, issues: 3 },
    { day: "Thu", healthy: 15, issues: 0 },
    { day: "Fri", healthy: 10, issues: 4 },
    { day: "Sat", healthy: 5, issues: 1 },
    { day: "Sun", healthy: 9, issues: 2 },
  ];

  const filteredData = analysisData.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "healthy") return item.diagnosis === "Healthy";
    if (activeFilter === "issues") return item.diagnosis !== "Healthy";
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-700";
      case "needs_treatment":
        return "bg-red-100 text-red-700";
      case "treatment_in_progress":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header Section */}
      <section
        className="pt-24 pb-16 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50"
        style={parallaxBg(0.1)}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent leading-tight">
              Scan Analysis History
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Review and manage all your plant health scans in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Summary and Graph Section */}
      <section id="dashboard-summary" data-animate className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Graph */}
            <div
              className={`lg:col-span-2 bg-white/80 backdrop-blur-sm p-8 shadow-lg ${
                isVisible["dashboard-summary"]
                  ? "animate-fade-in-up"
                  : "opacity-0"
              }`}
              style={{ borderRadius: "2rem" }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Weekly Scan Trends
              </h2>
              <p className="text-gray-500 mb-6">
                Activity over the last 7 days.
              </p>
              <div className="flex justify-between items-end h-64 space-x-2">
                {weeklyTrendsData.map((data, index) => (
                  <div
                    key={data.day}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="flex flex-col-reverse w-full h-full justify-start">
                      <div
                        className={`w-full bg-green-400 rounded-t-lg transition-all duration-700 ease-out ${
                          isVisible["dashboard-summary"] ? "h-auto" : "h-0"
                        }`}
                        style={{
                          height: `${(data.healthy / 20) * 100}%`,
                          transitionDelay: `${index * 80}ms`,
                        }}
                      ></div>
                      <div
                        className={`w-full bg-red-400 transition-all duration-700 ease-out ${
                          isVisible["dashboard-summary"] ? "h-auto" : "h-0"
                        }`}
                        style={{
                          height: `${(data.issues / 20) * 100}%`,
                          transitionDelay: `${index * 80}ms`,
                        }}
                      ></div>
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-500">
                      {data.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Stats */}
            <div
              className={`bg-white/80 backdrop-blur-sm p-8 shadow-lg ${
                isVisible["dashboard-summary"]
                  ? "animate-fade-in-up"
                  : "opacity-0"
              }`}
              style={{
                borderRadius: "40% 60% 60% 80% / 60% 30% 70% 40%",
                animationDelay: "200ms",
              }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                This Month
              </h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <BarChartHorizontal className="w-8 h-8 text-blue-500 mr-4" />
                  <div>
                    <p className="text-3xl font-bold text-gray-800">
                      {analysisData.length}
                    </p>
                    <p className="text-gray-500">Total Scans</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-4" />
                  <div>
                    <p className="text-3xl font-bold text-gray-800">
                      {
                        analysisData.filter((d) => d.status === "resolved")
                          .length
                      }
                    </p>
                    <p className="text-gray-500">Healthy Plants</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="w-8 h-8 text-red-500 mr-4" />
                  <div>
                    <p className="text-3xl font-bold text-gray-800">
                      {
                        analysisData.filter((d) => d.status !== "resolved")
                          .length
                      }
                    </p>
                    <p className="text-gray-500">Issues Found</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Table Section */}
      <section id="analysis-table" data-animate className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`bg-white/80 backdrop-blur-sm p-8 shadow-lg transition-opacity duration-500 ${
              isVisible["analysis-table"] ? "opacity-100" : "opacity-0"
            }`}
            style={{ borderRadius: "2rem" }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                Detailed History
              </h2>
              <div className="flex items-center space-x-2 bg-orange-100/50 p-2 rounded-full">
                <Filter className="w-5 h-5 text-orange-500 ml-2" />
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                    activeFilter === "all"
                      ? "bg-orange-500 text-white"
                      : "text-gray-600 hover:bg-orange-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter("healthy")}
                  className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                    activeFilter === "healthy"
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:bg-green-200"
                  }`}
                >
                  Healthy
                </button>
                <button
                  onClick={() => setActiveFilter("issues")}
                  className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                    activeFilter === "issues"
                      ? "bg-red-500 text-white"
                      : "text-gray-600 hover:bg-red-200"
                  }`}
                >
                  Issues
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b-2 border-orange-100">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-gray-600 uppercase">
                      Plant
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600 uppercase">
                      Scan Date
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600 uppercase">
                      Diagnosis
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600 uppercase text-center">
                      Confidence
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600 uppercase text-center">
                      Status
                    </th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b border-orange-100/50 hover:bg-orange-50/50 opacity-0 ${
                        isVisible["analysis-table"] ? "animate-fade-in-up" : ""
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.image}</span>
                          <span className="font-medium text-gray-800">
                            {item.plantName}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{item.scanDate}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {item.diagnosis === "Healthy" ? (
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                          ) : (
                            <Bug className="w-5 h-5 text-red-500" />
                          )}
                          <span className="text-gray-800">
                            {item.diagnosis}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-center text-gray-600">
                        {item.confidence}%
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="flex items-center text-orange-600 hover:text-orange-800 font-semibold text-sm group">
                          Details{" "}
                          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredData.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No scans match the selected filter.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
