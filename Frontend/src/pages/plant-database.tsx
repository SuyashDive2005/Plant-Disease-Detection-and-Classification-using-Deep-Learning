import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Leaf,
  Droplet,
  Sun,
  Thermometer,
  Clock,
  Heart,
  Info,
  ChevronRight,
  BookOpen,
  Star,
  MapPin,
  Calendar,
  Scissors,
  Bug,
  Shield,
  Zap,
  Eye,
  Grid,
  List,
  Home,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const PlantDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [isVisible, setIsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [themeColor, setThemeColor] = useState("orange");

  const plantCategories = [
    { id: "all", name: "All Plants", icon: Leaf },
    { id: "indoor", name: "Indoor Plants", icon: Home },
    { id: "outdoor", name: "Outdoor Plants", icon: Sun },
    { id: "herbs", name: "Herbs & Spices", icon: Leaf },
    { id: "flowers", name: "Flowering Plants", icon: Heart },
    { id: "succulents", name: "Succulents", icon: Droplet },
  ];

  const plants = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      scientificName: "Monstera deliciosa",
      category: "indoor",
      difficulty: "easy",
      image: "🌿",
      description:
        "Popular tropical houseplant known for its distinctive split leaves and Instagram-worthy appearance.",
      care: {
        light: "Bright, indirect light",
        water: "Water when top inch of soil is dry",
        humidity: "50-60% humidity preferred",
        temperature: "65-85°F (18-29°C)",
        soil: "Well-draining potting mix",
        fertilizer: "Monthly during growing season",
      },
      commonDiseases: ["Root rot", "Spider mites", "Scale insects"],
      propagation: "Stem cuttings in water or soil",
      toxicity: "Toxic to pets and children",
      origin: "Central America",
      bloomTime: "Rarely flowers indoors",
      size: "Can grow 6-10 feet tall indoors",
      tips: [
        "Provide a moss pole for climbing support",
        "Wipe leaves regularly to remove dust",
        "Rotate plant weekly for even growth",
      ],
    },
    {
      id: 2,
      name: "Snake Plant",
      scientificName: "Sansevieria trifasciata",
      category: "indoor",
      difficulty: "beginner",
      image: "🐍",
      description:
        "Hardy succulent perfect for beginners and low-light conditions. Nearly indestructible!",
      care: {
        light: "Low to bright, indirect light",
        water: "Water every 2-3 weeks, less in winter",
        humidity: "Normal household humidity",
        temperature: "60-80°F (15-27°C)",
        soil: "Cactus or well-draining potting mix",
        fertilizer: "2-3 times per year",
      },
      commonDiseases: ["Root rot", "Mealybugs"],
      propagation: "Leaf cuttings or division",
      toxicity: "Mildly toxic to pets",
      origin: "West Africa",
      bloomTime: "Rarely flowers, fragrant white blooms",
      size: "2-4 feet tall",
      tips: [
        "Perfect for bedrooms - releases oxygen at night",
        "Very drought tolerant",
        "Can survive in low light conditions",
      ],
    },
    {
      id: 3,
      name: "Basil",
      scientificName: "Ocimum basilicum",
      category: "herbs",
      difficulty: "easy",
      image: "🌿",
      description:
        "Aromatic herb essential for cooking, especially Italian cuisine. Fresh basil elevates any dish!",
      care: {
        light: "6+ hours of direct sunlight",
        water: "Keep soil consistently moist",
        humidity: "Moderate humidity",
        temperature: "65-75°F (18-24°C)",
        soil: "Rich, well-draining soil",
        fertilizer: "Every 2-3 weeks with balanced fertilizer",
      },
      commonDiseases: ["Fusarium wilt", "Bacterial leaf spot", "Aphids"],
      propagation: "Seeds or stem cuttings",
      toxicity: "Safe for humans and pets",
      origin: "India and Southeast Asia",
      bloomTime: "Summer (pinch flowers for better leaves)",
      size: "12-24 inches tall",
      tips: [
        "Pinch flowers to keep leaves tender",
        "Harvest regularly to encourage growth",
        "Companion plant with tomatoes",
      ],
    },
    {
      id: 4,
      name: "Rose",
      scientificName: "Rosa spp.",
      category: "flowers",
      difficulty: "intermediate",
      image: "🌹",
      description:
        "Classic flowering plant beloved for its beauty and intoxicating fragrance. The queen of flowers!",
      care: {
        light: "6+ hours of morning sunlight",
        water: "Deep watering 1-2 times per week",
        humidity: "Good air circulation important",
        temperature: "60-70°F (15-21°C) ideal",
        soil: "Rich, well-draining soil, pH 6.0-7.0",
        fertilizer: "Regular feeding during growing season",
      },
      commonDiseases: ["Black spot", "Powdery mildew", "Rust", "Aphids"],
      propagation: "Grafting, cuttings, or bare root",
      toxicity: "Thorns can cause injury, petals edible",
      origin: "Asia, Europe, North America",
      bloomTime: "Spring through fall",
      size: "Varies by variety, 2-8 feet",
      tips: [
        "Prune in late winter/early spring",
        "Apply mulch to retain moisture",
        "Choose disease-resistant varieties",
      ],
    },
    {
      id: 5,
      name: "Jade Plant",
      scientificName: "Crassula ovata",
      category: "succulents",
      difficulty: "beginner",
      image: "💎",
      description:
        "Lucky succulent with thick, glossy leaves and tree-like growth. Brings prosperity and good fortune!",
      care: {
        light: "Bright, indirect to direct light",
        water: "Water deeply, then let soil dry completely",
        humidity: "Low humidity preferred",
        temperature: "65-75°F (18-24°C)",
        soil: "Cactus/succulent potting mix",
        fertilizer: "Light feeding 2-3 times per year",
      },
      commonDiseases: ["Root rot", "Mealybugs", "Scale"],
      propagation: "Leaf or stem cuttings",
      toxicity: "Toxic to pets",
      origin: "South Africa",
      bloomTime: "Winter (mature plants only)",
      size: "3-6 feet tall with age",
      tips: [
        "Symbol of good luck and prosperity",
        "Can live for decades with proper care",
        "Reduce watering in winter",
      ],
    },
    {
      id: 6,
      name: "Lavender",
      scientificName: "Lavandula angustifolia",
      category: "outdoor",
      difficulty: "easy",
      image: "💜",
      description:
        "Fragrant herb prized for its calming scent and beautiful purple flowers. Nature's aromatherapy!",
      care: {
        light: "Full sun (6+ hours)",
        water: "Deep, infrequent watering",
        humidity: "Low humidity, good air circulation",
        temperature: "60-70°F (15-21°C)",
        soil: "Sandy, well-draining, alkaline soil",
        fertilizer: "Light feeding once per year",
      },
      commonDiseases: ["Root rot", "Fungal issues in humid conditions"],
      propagation: "Cuttings or division",
      toxicity: "Safe for humans, mild toxicity to pets",
      origin: "Mediterranean region",
      bloomTime: "Summer",
      size: "1-3 feet tall and wide",
      tips: [
        "Prune after flowering to maintain shape",
        "Drought tolerant once established",
        "Harvest flowers for potpourri and cooking",
      ],
    },
  ];

  // **FIX:** The filteredPlants constant is now declared *before* it is used in the useEffect hook below.
  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || plant.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || plant.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Scroll effect with theme detection
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Theme color detection
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

  // Animation observer
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

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredPlants, viewMode]); // This now works correctly.

  const toggleFavorite = (plantId) => {
    setFavorites((prev) =>
      prev.includes(plantId)
        ? prev.filter((id) => id !== plantId)
        : [...prev, plantId]
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 bg-green-100";
      case "easy":
        return "text-blue-600 bg-blue-100";
      case "intermediate":
        return "text-orange-600 bg-orange-100";
      case "advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Parallax background
  const parallaxBg = (speed) => ({
    backgroundPositionY: `${scrollY * speed}px`,
    transition: "background-position 0.2s ease-out",
  });

  if (selectedPlant) {
    return (
      <div
        className={`min-h-screen transition-colors duration-500 bg-orange-50`}
      >
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedPlant(null)}
              className="group flex items-center text-orange-600 hover:text-orange-800 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Database
            </button>
          </div>
        </div>

        {/* Plant Detail */}
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Plant Info */}
            <div className="space-y-8">
              <div
                className="group relative bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                style={{ borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%" }}
              >
                <div className="flex items-center mb-6">
                  <div className="text-6xl mr-4 group-hover:scale-110 transition-transform">
                    {selectedPlant.image}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent mb-2">
                      {selectedPlant.name}
                    </h1>
                    <p className="text-xl italic text-gray-600 mb-3">
                      {selectedPlant.scientificName}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                          selectedPlant.difficulty
                        )}`}
                      >
                        {selectedPlant.difficulty}
                      </span>
                      <button
                        onClick={() => toggleFavorite(selectedPlant.id)}
                        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                          favorites.includes(selectedPlant.id)
                            ? "text-red-500 bg-red-100"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(selectedPlant.id)
                              ? "fill-current"
                              : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedPlant.description}
                </p>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%" }}
                ></div>
              </div>

              {/* Quick Facts */}
              <div
                className="bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{
                  borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                }}
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-6 flex items-center">
                  <Info className="w-6 h-6 mr-3 text-orange-600" />
                  Quick Facts
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: MapPin,
                      label: "Origin",
                      value: selectedPlant.origin,
                    },
                    {
                      icon: Calendar,
                      label: "Bloom Time",
                      value: selectedPlant.bloomTime,
                    },
                    { icon: Eye, label: "Size", value: selectedPlant.size },
                    {
                      icon: Shield,
                      label: "Toxicity",
                      value: selectedPlant.toxicity,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-gray-800">
                          {item.label}:
                        </span>
                        <p className="text-gray-600">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Care Guide */}
            <div className="space-y-8">
              {/* Care Requirements */}
              <div
                className="bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{
                  borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                }}
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-6 flex items-center">
                  <Leaf className="w-6 h-6 mr-3 text-orange-600" />
                  Care Requirements
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: Sun,
                      label: "Light",
                      value: selectedPlant.care.light,
                      gradient: "from-yellow-400 to-orange-400",
                    },
                    {
                      icon: Droplet,
                      label: "Water",
                      value: selectedPlant.care.water,
                      gradient: "from-blue-400 to-cyan-400",
                    },
                    {
                      icon: Thermometer,
                      label: "Temperature",
                      value: selectedPlant.care.temperature,
                      gradient: "from-red-400 to-pink-400",
                    },
                    {
                      icon: Zap,
                      label: "Humidity",
                      value: selectedPlant.care.humidity,
                      gradient: "from-purple-400 to-indigo-400",
                    },
                    {
                      icon: BookOpen,
                      label: "Soil",
                      value: selectedPlant.care.soil,
                      gradient: "from-amber-400 to-orange-400",
                    },
                    {
                      icon: Star,
                      label: "Fertilizer",
                      value: selectedPlant.care.fertilizer,
                      gradient: "from-green-400 to-emerald-400",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-start space-x-4 p-4 bg-orange-50 hover:bg-orange-100 transition-all duration-300 hover:scale-105"
                      style={{
                        borderRadius: "40% 60% 60% 80% / 60% 30% 70% 40%",
                      }}
                    >
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {item.label}
                        </h3>
                        <p className="text-gray-600 mt-1">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tips */}
              <div
                className="bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{
                  borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                }}
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-6 flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-orange-600" />
                  Pro Tips
                </h2>
                <div className="space-y-3">
                  {selectedPlant.tips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                      <p className="text-gray-700 group-hover:text-gray-900">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Issues */}
              <div
                className="bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{
                  borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                }}
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-6 flex items-center">
                  <Bug className="w-6 h-6 mr-3 text-orange-600" />
                  Common Issues
                </h2>
                <div className="space-y-3">
                  {selectedPlant.commonDiseases.map((disease, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-red-50 hover:bg-red-100 transition-colors group"
                      style={{
                        borderRadius: "40% 60% 60% 80% / 60% 30% 70% 40%",
                      }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {disease}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 bg-${themeColor}-50`}
    >
      {/* Hero Section */}
      <section
        data-theme="orange"
        className="relative overflow-hidden pt-20 pb-16 min-h-screen flex items-center"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent leading-tight">
              Plant Database & Care Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover comprehensive care guides for all your favorite plants.
              From beginners to experts, find everything you need to grow a
              thriving indoor jungle.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {plants.length}
                </div>
                <div className="text-gray-600">Plant Species</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">100+</div>
                <div className="text-gray-600">Care Tips</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">24/7</div>
                <div className="text-gray-600">Community Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="w-96 h-96 bg-gradient-to-r from-orange-200/20 to-red-200/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="w-64 h-64 bg-gradient-to-r from-red-200/20 to-yellow-200/20 rounded-full blur-2xl animate-bounce"></div>
        </div>
      </section>

      {/* Search & Filters */}
      <section
        id="search-section"
        data-theme="yellow"
        className="sticky top-0 py-8 bg-white/50 backdrop-blur-sm border-y border-orange-200 z-40"
        style={parallaxBg(0.05)}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative group w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 group-focus-within:scale-110 transition-transform" />
              <input
                type="text"
                placeholder="Search plants by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-orange-300 focus:border-orange-500 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:scale-105 focus:shadow-lg"
                style={{ borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%" }}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-orange-300 focus:border-orange-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{ borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%" }}
              >
                {plantCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border-2 border-orange-300 focus:border-orange-500 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{ borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%" }}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="easy">Easy</option>
                <option value="intermediate">Intermediate</option>
              </select>

              {/* View Mode Toggle */}
              <div
                className="flex bg-white/80 border-2 border-orange-300 p-1"
                style={{ borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%" }}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  className={`p-2 transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white scale-110"
                      : "text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                  }`}
                  style={{ borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%" }}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="List View"
                  className={`p-2 transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white scale-110"
                      : "text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                  }`}
                  style={{ borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%" }}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plant Grid/List */}
      <section
        data-theme="red"
        className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 min-h-screen"
        style={parallaxBg(0.08)}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600 text-lg">
              Showing{" "}
              <span className="font-bold text-orange-600">
                {filteredPlants.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-orange-600">{plants.length}</span>{" "}
              plants
            </p>
          </div>

          {filteredPlants.length > 0 ? (
            // GRID VIEW
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlants.map((plant, index) => (
                  <div
                    key={plant.id}
                    id={`plant-${plant.id}`}
                    data-animate
                    className={`bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col group hover:-translate-y-2 ${
                      isVisible[`plant-${plant.id}`]
                        ? "animate-fade-in-up"
                        : "opacity-0"
                    }`}
                    style={{
                      borderRadius: "60% 40% 40% 20% / 60% 30% 70% 40%",
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-5xl group-hover:scale-110 transition-transform">
                          {plant.image}
                        </div>
                        <button
                          onClick={() => toggleFavorite(plant.id)}
                          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                            favorites.includes(plant.id)
                              ? "text-red-500 bg-red-100"
                              : "text-gray-400 hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favorites.includes(plant.id) ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        {plant.name}
                      </h2>
                      <p className="text-sm italic text-gray-500 mb-3">
                        {plant.scientificName}
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          plant.difficulty
                        )}`}
                      >
                        {plant.difficulty}
                      </span>
                      <p className="text-gray-600 mt-4 h-20 overflow-hidden">
                        {plant.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedPlant(plant)}
                      className="mt-6 w-full text-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg flex items-center justify-center"
                      style={{
                        borderRadius: "40% 60% 60% 80% / 60% 30% 70% 40%",
                      }}
                    >
                      View Details{" "}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              // LIST VIEW
              <div className="space-y-4">
                {filteredPlants.map((plant, index) => (
                  <div
                    key={plant.id}
                    id={`plant-${plant.id}`}
                    data-animate
                    className={`bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex items-center gap-6 group hover:scale-105 ${
                      isVisible[`plant-${plant.id}`]
                        ? "animate-fade-in-up"
                        : "opacity-0"
                    }`}
                    style={{
                      borderRadius: "80% 20% 70% 30% / 50% 60% 40% 50%",
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {plant.image}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold text-gray-800">
                        {plant.name}
                      </h2>
                      <p className="text-sm italic text-gray-500">
                        {plant.scientificName}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          plant.difficulty
                        )}`}
                      >
                        {plant.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(plant.id)}
                        className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                          favorites.includes(plant.id)
                            ? "text-red-500 bg-red-100"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(plant.id) ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => setSelectedPlant(plant)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-2 px-4 transition-all duration-300 group-hover:shadow-md"
                        style={{
                          borderRadius: "40% 60% 60% 80% / 60% 30% 70% 40%",
                        }}
                      >
                        <span className="hidden md:inline">Details</span>
                        <ArrowRight className="w-4 h-4 md:hidden" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            // NO RESULTS VIEW
            <div className="text-center py-20 animate-fade-in-up">
              <Leaf className="mx-auto h-24 w-24 text-orange-300" />
              <h3 className="mt-4 text-2xl font-bold text-gray-800">
                No Plants Found
              </h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or filters to find your perfect plant.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Diseases & Supplements Database */}
      <section
        data-theme="green"
        className="py-16 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 min-h-screen"
        style={parallaxBg(0.1)}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              Diseases & Supplements Database
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive information on plant diseases and supplements to
              help you maintain a healthy and thriving garden.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <nav className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab("diseases")}
                className={`py-2 px-4 rounded-lg transition-all duration-300 ${
                  activeTab === "diseases"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Diseases ({diseases.length})
              </button>
              <button
                onClick={() => setActiveTab("supplements")}
                className={`py-2 px-4 rounded-lg transition-all duration-300 ${
                  activeTab === "supplements"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Supplements ({supplements.length})
              </button>
            </nav>
          </div>

          {/* Content */}
          {activeTab === "diseases" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diseases.map((disease, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">
                    {disease.disease_name.replace(/_/g, " ")}
                  </h3>
                  <p className="text-gray-700 mb-4">{disease.description}</p>
                  {disease.possible_steps && (
                    <div>
                      <h4 className="font-semibold mb-2">Treatment:</h4>
                      <p className="text-sm text-gray-600">
                        {disease.possible_steps}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "supplements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supplements.map((supplement, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">
                    {supplement.supplement_name}
                  </h3>
                  <p className="text-gray-700 mb-4">{supplement.description}</p>
                  {supplement.benefits && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Benefits:</h4>
                      <p className="text-sm text-gray-600">
                        {supplement.benefits}
                      </p>
                    </div>
                  )}
                  {supplement.usage && (
                    <div>
                      <h4 className="font-semibold mb-2">Usage:</h4>
                      <p className="text-sm text-gray-600">
                        {supplement.usage}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PlantDatabase;
