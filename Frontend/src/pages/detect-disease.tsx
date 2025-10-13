import React, { useState, useEffect } from "react";
import {
  Camera,
  Upload,
  AlertCircle,
  CheckCircle2,
  Leaf,
  Sparkles,
  X,
  Clock,
  Shield,
  TrendingUp,
  Droplets,
} from "lucide-react";
import { DiseaseService } from "../services/disease-services";
import type { DiseaseAnalysisResult } from "../services/disease-services";

// Camera Capture Component
const CameraCapture = ({ onImageCapture }) => {
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = React.useRef(null);
  const streamRef = React.useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setShowCamera(true);
    } catch (err) {
      alert("Unable to access camera: " + err.message);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

      canvas.toBlob((blob) => {
        const file = new File([blob], "camera-capture.jpg", {
          type: "image/jpeg",
        });
        onImageCapture(file);
        stopCamera();
      }, "image/jpeg");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setShowCamera(false);
  };

  return (
    <div className="mb-6">
      {!showCamera ? (
        <button
          onClick={startCamera}
          className="group relative w-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-center justify-center relative z-10 gap-3">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-lg">Open Camera</span>
          </div>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-200">
            <video ref={videoRef} autoPlay playsInline className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={captureImage}
              className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Capture
              </div>
            </button>
            <button
              onClick={stopCamera}
              className="bg-gradient-to-br from-gray-600 to-gray-700 text-white font-bold py-4 px-6 rounded-xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-2">
                <X className="w-5 h-5" />
                Cancel
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function DetectDisease() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    setBackendStatus("checking");
    try {
      const isAvailable = await DiseaseService.checkBackendAvailability();
      setBackendStatus(isAvailable ? "online" : "offline");
    } catch {
      setBackendStatus("offline");
    }
  };

  const handleImageCapture = (file) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
    setPrediction(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError(
          "Image file is too large. Please select an image smaller than 10MB"
        );
        return;
      }

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
      setPrediction(null);
    }
  };

  const analyzePlant = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    if (backendStatus === "offline") {
      setError(
        "Backend server is not available. Please make sure it is running."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await DiseaseService.predictDiseaseWithAnalysis(
        selectedImage
      );
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze plant");
      setBackendStatus("offline");
    } finally {
      setLoading(false);
    }
  };

  const BackendStatusIndicator = () => (
    <div className="mb-8 p-5 flex items-center justify-between bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className={`w-4 h-4 rounded-full ${
              backendStatus === "online"
                ? "bg-gradient-to-br from-green-400 to-green-600"
                : backendStatus === "offline"
                ? "bg-gradient-to-br from-red-400 to-red-600"
                : "bg-gradient-to-br from-yellow-400 to-yellow-600"
            }`}
          ></div>
          {backendStatus === "online" && (
            <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-400 animate-ping opacity-75"></div>
          )}
        </div>
        <div>
          <span className="text-sm font-bold text-gray-800">
            {backendStatus === "online"
              ? "System Online"
              : backendStatus === "offline"
              ? "System Offline"
              : "Connecting..."}
          </span>
          <p className="text-xs text-gray-500">
            {backendStatus === "online"
              ? "Ready to analyze"
              : "Connection status"}
          </p>
        </div>
      </div>
      {backendStatus === "offline" && (
        <button
          onClick={checkBackendStatus}
          className="bg-gradient-to-br from-orange-500 to-red-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform font-semibold text-sm shadow-md"
        >
          Retry
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-16 px-4">
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-300/30 to-red-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-red-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-1 rounded-full shadow-xl">
            <div className="bg-white rounded-full p-3">
              <Leaf className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-5xl font-black text-white pr-6">
              AI Plant Doctor
            </h1>
            <div className="bg-white rounded-full p-3">
              <Sparkles className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Advanced AI-powered disease detection with instant treatment
            recommendations
          </p>
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-700">
                95% Accurate
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-700">
                500+ Diseases
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-700">
                Instant Results
              </span>
            </div>
          </div>
        </div>

        <BackendStatusIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Input */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Upload Image
                </h2>
              </div>

              <CameraCapture onImageCapture={handleImageCapture} />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm font-bold text-gray-500">
                    OR UPLOAD FILE
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block">
                  <div className="relative group cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="border-3 border-dashed border-orange-300 rounded-2xl p-8 text-center bg-gradient-to-br from-orange-50 to-red-50 group-hover:border-orange-500 group-hover:bg-gradient-to-br group-hover:from-orange-100 group-hover:to-red-100 transition-all duration-300">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-800">
                            Click to upload
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            JPG, PNG, GIF (max 10MB)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {imagePreview && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Selected plant"
                      className="w-full h-96 object-cover rounded-2xl shadow-xl border-4 border-orange-200"
                    />
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                        setPrediction(null);
                      }}
                      className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-xl opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {selectedImage?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {((selectedImage?.size || 0) / 1024 / 1024).toFixed(2)}{" "}
                        MB
                      </p>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              )}

              <button
                onClick={analyzePlant}
                disabled={
                  !selectedImage || loading || backendStatus !== "online"
                }
                className="group relative w-full mt-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-black py-6 px-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-2xl hover:shadow-orange-500/50 overflow-hidden text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center justify-center relative z-10 gap-3">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-3 border-white"></div>
                      <span>Analyzing Plant...</span>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span>Analyze with AI</span>
                    </>
                  )}
                </div>
              </button>

              {error && (
                <div className="mt-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl p-5 shadow-lg animate-fade-in">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-500 rounded-full">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-red-800">Error Occurred</p>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Results */}
          <div>
            {prediction ? (
              <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-100 animate-fade-in">
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className={`p-3 rounded-xl shadow-lg ${
                      prediction.isHealthy
                        ? "bg-gradient-to-br from-green-500 to-emerald-500"
                        : "bg-gradient-to-br from-orange-500 to-red-500"
                    }`}
                  >
                    {prediction.isHealthy ? (
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div>
                    <h2
                      className={`text-3xl font-black ${
                        prediction.isHealthy
                          ? "text-green-600"
                          : "bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                      }`}
                    >
                      Diagnosis Complete
                    </h2>
                    <p className="text-sm text-gray-500">AI Analysis Results</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Main Info Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-2xl border-2 border-orange-200 shadow-md">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                        Disease Detected
                      </p>
                      <p className="text-xl font-black text-orange-700">
                        {prediction.disease}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-2xl border-2 border-blue-200 shadow-md">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                        Plant Type
                      </p>
                      <p className="text-xl font-black text-blue-700">
                        {prediction.plantType}
                      </p>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border-2 border-purple-200 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Confidence Level
                      </p>
                      <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {prediction.confidence}%
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                      <div
                        className={`h-4 rounded-full transition-all duration-1000 shadow-lg ${
                          parseFloat(prediction.confidence) > 80
                            ? "bg-gradient-to-r from-green-400 to-emerald-500"
                            : parseFloat(prediction.confidence) > 60
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                            : "bg-gradient-to-r from-red-400 to-pink-500"
                        }`}
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Severity Badge */}
                  {!prediction.isHealthy && (
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-300 shadow-md">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                          Severity Level
                        </p>
                        <span
                          className={`inline-block mt-1 px-4 py-1.5 rounded-full text-sm font-black shadow-md ${
                            prediction.severity === "Severe"
                              ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                              : prediction.severity === "Moderate"
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                              : "bg-gradient-to-r from-yellow-400 to-orange-400 text-white"
                          }`}
                        >
                          {prediction.severity}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 shadow-md">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                      Description
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {prediction.description}
                    </p>
                  </div>

                  {/* Treatment Steps */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Droplets className="w-5 h-5 text-green-600" />
                      <p className="text-sm font-black text-green-800 uppercase tracking-wide">
                        {prediction.isHealthy
                          ? "Care Recommendations"
                          : "Treatment Plan"}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {prediction.treatment.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-black shadow-lg">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 font-medium pt-1">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention Tips */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-2xl border-2 border-cyan-200 shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-cyan-600" />
                      <p className="text-sm font-black text-cyan-800 uppercase tracking-wide">
                        Prevention Tips
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {prediction.prevention.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <span className="text-gray-700 font-medium pt-1">
                            {tip}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-2xl border-2 border-purple-200 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                          Recovery Timeline
                        </p>
                        <p className="text-lg font-black text-purple-700">
                          {prediction.timeline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Products */}
                  {prediction.supplements &&
                    prediction.supplements.length > 0 && (
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200 shadow-md">
                        <p className="text-sm font-black text-amber-800 uppercase tracking-wide mb-4">
                          Recommended Products
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {prediction.supplements.map((supplement, index) => (
                            <div
                              key={index}
                              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-[1.02] border border-amber-200"
                            >
                              <div className="flex items-center gap-4">
                                {supplement.supplement_image && (
                                  <img
                                    src={supplement.supplement_image}
                                    alt={supplement.supplement_name}
                                    className="w-20 h-20 object-cover rounded-lg shadow-md"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                )}
                                <div className="flex-1">
                                  <h4 className="font-black text-gray-800">
                                    {supplement.supplement_name}
                                  </h4>
                                  {supplement.buy_link && (
                                    <a
                                      href={supplement.buy_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-block mt-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition-transform font-bold text-sm shadow-md"
                                    >
                                      Buy Now
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Disclaimer */}
                  <div
                    className={`p-5 rounded-2xl border-2 shadow-md ${
                      prediction.isHealthy
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                        : "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          prediction.isHealthy
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      />
                      <p
                        className={`text-sm ${
                          prediction.isHealthy
                            ? "text-green-700"
                            : "text-yellow-700"
                        }`}
                      >
                        <strong>Disclaimer:</strong> This AI analysis is for
                        informational purposes only. For serious plant health
                        issues or professional advice, please consult with a
                        certified plant pathologist or agricultural expert.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/60 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-gray-100 h-full flex items-center justify-center min-h-[700px]">
                <div className="text-center">
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative p-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-full">
                      <Leaf className="w-24 h-24 text-orange-500" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="w-12 h-12 text-red-500 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
                    Ready to Diagnose
                  </h3>
                  <p className="text-lg text-gray-600 max-w-md mx-auto mb-6">
                    Upload or capture a clear image of your plant's affected
                    leaves to begin AI-powered analysis
                  </p>
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                      <span>Fast Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                      <span>Accurate Results</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                      <span>Expert Tips</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
