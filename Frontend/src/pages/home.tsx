import React, { useState, useEffect } from "react";
import {
  Camera,
  Leaf,
  BarChart3,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Play,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [themeColor, setThemeColor] = useState("orange");

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
      { threshold: 0.2 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Effect to handle scroll for parallax animation + theme color
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // theme color detection
      const sections = document.querySelectorAll("section[data-theme]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          setThemeColor(section.dataset.theme);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Camera,
      title: "Instant Disease Detection",
      description:
        "Upload a photo and get instant AI-powered disease identification with 95% accuracy",
      gradient: "from-orange-400 to-red-400",
    },
    {
      icon: Leaf,
      title: "Comprehensive Plant Database",
      description:
        "Access information on 500+ plant species and their common diseases",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track plant health trends and get personalized care recommendations",
      gradient: "from-red-400 to-orange-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Urban Gardener",
      content:
        "This app saved my plants! The instant detection helped me catch diseases early.",
      avatar: "SC",
    },
    {
      name: "Mike Rodriguez",
      role: "Commercial Farmer",
      content:
        "Incredible accuracy and speed. It's revolutionized how I monitor crop health.",
      avatar: "MR",
    },
    {
      name: "Dr. Emily Watson",
      role: "Plant Pathologist",
      content:
        "The AI diagnostics are surprisingly sophisticated. A valuable tool for professionals.",
      avatar: "EW",
    },
  ];

  // Calculate parallax styles for the hero image based on scroll
  const heroImageStyle = {
    transform: `translateY(${scrollY * 0.15}px) scale(${
      1 - scrollY * 0.0005
    }) rotate(2deg)`,
    opacity: `${1 - scrollY * 0.002}`,
    transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
  };

  // parallax backgrounds for sections
  const parallaxBg = (speed) => ({
    backgroundPositionY: `${scrollY * speed}px`,
    transition: "background-position 0.2s ease-out",
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-500 bg-${themeColor}-50`}
    >
      {/* Hero Section */}
      <section
        data-theme="orange"
        className="relative overflow-hidden pt-20 pb-16 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent leading-tight">
                  Protect Your Plants with AI-Powered Disease Detection
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Upload a photo and instantly identify plant diseases with
                  cutting-edge artificial intelligence. Get treatment
                  recommendations and keep your garden healthy.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/detect")}
                  className="group relative bg-gradient-to-r from-orange-600 to-red-500 text-white font-semibold text-lg py-4 px-8 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
                  style={{ borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%" }}
                >
                  <div className="flex items-center justify-center">
                    <Camera className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                    Start Scanning Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-400 blur-md opacity-0 group-hover:opacity-30 transition-opacity"
                    style={{
                      borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                    }}
                  ></div>
                </button>

                <button
                  className="group relative bg-white/80 backdrop-blur-sm text-orange-700 font-semibold text-lg py-4 px-8 border-2 border-orange-300 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%" }}
                >
                  <div className="flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </div>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">95%</div>
                  <div className="text-gray-600">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">500+</div>
                  <div className="text-gray-600">Plant Species</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">50K+</div>
                  <div className="text-gray-600">Users Worldwide</div>
                </div>
              </div>
            </div>

            {/* Right Column - Mobile Mockup */}
            <div
              className="relative flex justify-center"
              style={heroImageStyle}
            >
              <div className="relative z-10">
                {/* Phone Mockup */}
                <div className="bg-gray-900 p-2 rounded-3xl shadow-2xl transform hover:rotate-0 transition-transform duration-500 w-64">
                  {/* Phone Screen */}
                  <div className="bg-white rounded-2xl overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-black text-white text-xs px-4 py-2 flex justify-between items-center">
                      <span className="font-medium">9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-2 border border-white rounded-sm">
                          <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">PlantAI</h3>
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <Camera className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-4 h-80">
                      {/* Upload Area */}
                      <div className="border-2 border-dashed border-orange-300 rounded-xl p-6 text-center bg-orange-50 mb-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Camera className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-gray-600 text-sm">
                          Tap to upload plant photo
                        </p>
                      </div>

                      {/* Recent Scans */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          Recent Scans
                        </h4>
                        <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg">
                          <div className="w-10 h-10 bg-green-400 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">
                                Healthy Plant
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 bg-yellow-50 p-3 rounded-lg">
                          <div className="w-10 h-10 bg-yellow-400 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-700">
                                Minor Issue
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="bg-gray-50 p-3 flex justify-around border-t">
                      <div className="flex flex-col items-center">
                        <Camera className="w-5 h-5 text-orange-500" />
                        <span className="text-xs text-orange-500 font-medium">
                          Scan
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                        <span className="text-xs text-gray-400">Analytics</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Leaf className="w-5 h-5 text-gray-400" />
                        <span className="text-xs text-gray-400">Plants</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-400 to-red-400 text-white p-3 rounded-full shadow-lg animate-bounce">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              {/* Background Decorations */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
                <div className="w-80 h-80 bg-gradient-to-r from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky sections container */}
      <div className="relative">
        {/* Features Section */}
        <section
          id="features-section"
          data-animate
          data-theme="yellow"
          className="sticky top-0 min-h-screen py-20 flex items-center bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50"
          style={parallaxBg(0.05)}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-4">
                Powerful Features for Plant Health
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to keep your plants healthy and thriving
                with cutting-edge AI technology.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                    isVisible["features-section"]
                      ? "animate-fade-in-up"
                      : "opacity-0"
                  }`}
                  style={{
                    borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                    style={{
                      borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works-section"
          data-animate
          data-theme="red"
          className="sticky top-0 min-h-screen py-20 flex items-center bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50"
          style={parallaxBg(0.08)}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Simple, fast, and accurate plant disease detection in three
                steps
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  step: "01",
                  title: "Upload Photo",
                  description:
                    "Take a clear photo of your plant's affected area",
                  icon: Camera,
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  description: "Our advanced AI analyzes the image in seconds",
                  icon: Zap,
                },
                {
                  step: "03",
                  title: "Get Results",
                  description:
                    "Receive diagnosis and treatment recommendations",
                  icon: CheckCircle,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`text-center ${
                    isVisible["how-it-works-section"]
                      ? "animate-scale-in"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform">
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-5xl font-bold text-orange-200 absolute -top-4 right-1/2 translate-x-1/2 sm:right-0 sm:translate-x-0 z-[-1]">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials-section"
          data-animate
          data-theme="orange"
          className="sticky top-0 min-h-screen py-20 flex items-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50"
          style={parallaxBg(0.12)}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-4">
                Trusted by Gardeners and Farmers Worldwide
              </h2>
              <p className="text-xl text-gray-600">
                See how our app is helping plant enthusiasts everywhere
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div
                className={`bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl transition-all duration-500 ${
                  isVisible["testimonials-section"]
                    ? "animate-fade-in-up"
                    : "opacity-0"
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {testimonials[currentSlide].avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">
                      {testimonials[currentSlide].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentSlide].role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {testimonials[currentSlide].content}
                </p>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? "bg-orange-500" : "bg-orange-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Final CTA Section */}
      <section
        data-theme="red"
        className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Protect Your Plants?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of plant enthusiasts using PlantAI to keep their
            plants healthy.
          </p>
          <button className="bg-white text-orange-600 font-semibold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
