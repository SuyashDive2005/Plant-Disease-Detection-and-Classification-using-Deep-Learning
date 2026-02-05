const API_BASE_URL = "http://localhost:5000/api";

export interface DiseaseDetectionResult {
  predicted_class: string;
  confidence: number;
  disease_info: {
    disease_name: string;
    description: string;
    possible_steps: string;
    image_url?: string;
  };
  all_predictions: Record<string, number>;
}

export interface SupplementInfo {
  disease_name: string;
  supplement_name: string;
  supplement_image: string;
  buy_link: string;
}

export interface DiseaseAnalysisResult {
  disease: string;
  confidence: string;
  plantType: string;
  severity: string;
  description: string;
  treatment: string[];
  prevention: string[];
  timeline: string;
  isHealthy: boolean;
  supplements?: SupplementInfo[];
}

export const checkBackendAvailability = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  }
};

// Upload image for disease detection
export const uploadImageForDetection = async (
  imageFile: File
): Promise<DiseaseDetectionResult> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorText}`
    );
  }

  return await response.json();
};

export interface DiseaseInfo {
  disease_name: string;
  description: string;
  possible_steps: string;
  image_url?: string;
}

// Get all diseases information
export const getAllDiseases = async (): Promise<DiseaseInfo[]> => {
  const response = await fetch(`${API_BASE_URL}/diseases`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// Get all supplements information
export const getAllSupplements = async (): Promise<SupplementInfo[]> => {
  const response = await fetch(`${API_BASE_URL}/supplements`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// Extract plant type from disease name
const extractPlantType = (diseaseName: string): string => {
  const lowerName = diseaseName.toLowerCase();

  if (lowerName.includes("tomato")) return "Tomato";
  if (lowerName.includes("potato")) return "Potato";
  if (lowerName.includes("pepper")) return "Pepper";
  if (lowerName.includes("apple")) return "Apple";
  if (lowerName.includes("grape")) return "Grape";
  if (lowerName.includes("corn")) return "Corn";
  if (lowerName.includes("peach")) return "Peach";
  if (lowerName.includes("cherry")) return "Cherry";
  if (lowerName.includes("strawberry")) return "Strawberry";
  if (lowerName.includes("orange")) return "Orange";
  if (lowerName.includes("blueberry")) return "Blueberry";
  if (lowerName.includes("raspberry")) return "Raspberry";
  if (lowerName.includes("soybean")) return "Soybean";
  if (lowerName.includes("squash")) return "Squash";

  return "Unknown Plant";
};

// Determine disease severity
const getDiseasesSeverity = (diseaseName: string): string => {
  const lowerName = diseaseName.toLowerCase();

  if (lowerName.includes("healthy")) return "None";
  if (
    lowerName.includes("late_blight") ||
    lowerName.includes("virus") ||
    lowerName.includes("curl")
  )
    return "Severe";
  if (
    lowerName.includes("early_blight") ||
    lowerName.includes("bacterial") ||
    lowerName.includes("rot")
  )
    return "Moderate";
  if (
    lowerName.includes("spot") ||
    lowerName.includes("mold") ||
    lowerName.includes("rust")
  )
    return "Mild to Moderate";
  if (lowerName.includes("mites") || lowerName.includes("mildew"))
    return "Mild";

  return "Moderate";
};

// Get timeline for treatment
const getTreatmentTimeline = (diseaseName: string): string => {
  const lowerName = diseaseName.toLowerCase();

  if (lowerName.includes("healthy")) return "N/A - maintain health";
  if (lowerName.includes("virus")) return "No recovery - remove plants";
  if (lowerName.includes("late_blight"))
    return "1-2 weeks (aggressive treatment needed)";
  if (lowerName.includes("mites")) return "1-2 weeks";
  if (lowerName.includes("early_blight") || lowerName.includes("bacterial"))
    return "2-3 weeks";
  if (lowerName.includes("spot") || lowerName.includes("mold"))
    return "2-4 weeks";

  return "2-3 weeks";
};

// Parse treatment steps from backend description
const parseTreatmentSteps = (possibleSteps: string): string[] => {
  if (!possibleSteps) return ["No specific treatment steps available"];

  // Split by common delimiters and clean up
  const steps = possibleSteps
    .split(/[.\n]/)
    .map((step) => step.trim())
    .filter((step) => step.length > 10) // Filter out very short fragments
    .slice(0, 6); // Limit to 6 steps for UI

  return steps.length > 0 ? steps : ["Follow general plant care guidelines"];
};

// Generate prevention tips based on disease type
const generatePreventionTips = (diseaseName: string): string[] => {
  const lowerName = diseaseName.toLowerCase();

  const commonTips = [
    "Ensure proper air circulation around plants",
    "Water at soil level to avoid wetting leaves",
    "Remove plant debris regularly",
    "Use disease-resistant varieties when possible",
  ];

  const specificTips: Record<string, string[]> = {
    bacterial: [
      "Disinfect tools between plants",
      "Avoid overhead watering",
      "Remove affected plant parts immediately",
      "Quarantine new plants before introducing",
    ],
    virus: [
      "Control insect vectors (aphids, whiteflies)",
      "Use certified disease-free seeds",
      "Remove weeds that harbor viruses",
      "Practice strict sanitation",
    ],
    fungal: [
      "Improve drainage",
      "Apply fungicide preventively",
      "Rotate crops annually",
      "Maintain proper plant spacing",
    ],
    healthy: [
      "Continue current care routine",
      "Monitor regularly for changes",
      "Maintain balanced nutrition",
      "Ensure optimal growing conditions",
    ],
  };

  if (lowerName.includes("healthy")) return specificTips.healthy;
  if (lowerName.includes("virus"))
    return [...specificTips.virus, ...commonTips.slice(0, 2)];
  if (lowerName.includes("bacterial"))
    return [...specificTips.bacterial, ...commonTips.slice(0, 2)];

  return [...specificTips.fungal, ...commonTips.slice(0, 2)];
};

// Map backend result to frontend analysis format
export const mapDiseaseToAnalysis = async (
  backendResult: DiseaseDetectionResult
): Promise<DiseaseAnalysisResult> => {
  const { predicted_class, confidence, disease_info } = backendResult;

  // Clean up disease name for display
  const cleanDiseaseName = predicted_class
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const isHealthy = predicted_class.toLowerCase().includes("healthy");
  const plantType = extractPlantType(predicted_class);
  const severity = getDiseasesSeverity(predicted_class);
  const timeline = getTreatmentTimeline(predicted_class);

  // Parse treatment steps from backend
  const treatmentSteps = parseTreatmentSteps(
    disease_info?.possible_steps || ""
  );
  const preventionTips = generatePreventionTips(predicted_class);

  // Get supplements for this disease
  let supplements: SupplementInfo[] = [];
  try {
    const allSupplements = await getAllSupplements();
    supplements = allSupplements
      .filter(
        (sup) =>
          sup.disease_name
            .toLowerCase()
            .includes(predicted_class.toLowerCase()) ||
          predicted_class.toLowerCase().includes(sup.disease_name.toLowerCase())
      )
      .slice(0, 3); // Limit to 3 supplements
  } catch (error) {
    console.warn("Failed to fetch supplements:", error);
  }

  return {
    disease: cleanDiseaseName,
    confidence: (confidence * 100).toFixed(1),
    plantType,
    severity,
    description:
      disease_info?.description || "No detailed description available.",
    treatment: treatmentSteps,
    prevention: preventionTips,
    timeline,
    isHealthy,
    supplements: supplements.length > 0 ? supplements : undefined,
  };
};

// Predict disease with full analysis
export const predictDiseaseWithAnalysis = async (
  imageFile: File
): Promise<DiseaseAnalysisResult> => {
  const backendResult = await uploadImageForDetection(imageFile);
  return await mapDiseaseToAnalysis(backendResult);
};

// Create a service object for easier usage
export const DiseaseService = {
  checkBackendAvailability,
  uploadImageForDetection,
  getAllDiseases,
  getAllSupplements,
  mapDiseaseToAnalysis,
  predictDiseaseWithAnalysis,
};
