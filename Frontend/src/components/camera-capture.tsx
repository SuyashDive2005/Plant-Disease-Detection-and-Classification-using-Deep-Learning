import React, { useRef, useState } from "react";
import { Camera, Upload, CheckCircle, X } from "lucide-react";

const CameraCapture = ({ onImageCapture }) => {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);

  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null); // store snapshot for confirmation

  // Handle file upload or mobile camera
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCapturedImage(reader.result); // show preview
    };
    reader.readAsDataURL(file);
  };

  // Start desktop webcam
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Camera access denied:", err);
    }
  };

  // Capture snapshot from webcam
  const takeSnapshot = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImage(dataUrl); // preview image
  };

  // Confirm snapshot (send to parent/model)
  const confirmImage = () => {
    if (onImageCapture) onImageCapture(capturedImage);
  };

  // Retake / clear image
  const retakeImage = () => {
    setCapturedImage(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Buttons */}
      {!capturedImage && (
        <div className="flex gap-4">
          {/* Upload */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 flex items-center gap-2"
          >
            <Upload className="w-5 h-5" /> Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Mobile Camera */}
          <button
            onClick={() => cameraInputRef.current.click()}
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 flex items-center gap-2"
          >
            <Camera className="w-5 h-5" /> Use Camera
          </button>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Desktop Webcam */}
          <button
            onClick={startCamera}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 flex items-center gap-2"
          >
            <Camera className="w-5 h-5" /> Start Webcam
          </button>
        </div>
      )}

      {/* Webcam preview */}
      {!capturedImage && cameraStream && (
        <div className="mt-4 flex flex-col items-center">
          <video
            ref={videoRef}
            autoPlay
            className="rounded-xl border-4 border-orange-500 w-80 h-60 mb-4"
          />
          <button
            onClick={takeSnapshot}
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700"
          >
            Capture Snapshot
          </button>
        </div>
      )}

      {/* Captured image preview */}
      {capturedImage && (
        <div className="mt-4 flex flex-col items-center">
          <img
            src={capturedImage}
            alt="Captured"
            className="rounded-xl border-4 border-green-500 w-80 h-60 mb-4 object-cover"
          />
          <div className="flex gap-4">
            <button
              onClick={confirmImage}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" /> Confirm
            </button>
            <button
              onClick={retakeImage}
              className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 flex items-center gap-2"
            >
              <X className="w-5 h-5" /> Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
