# 🌿 PlantCare - Plant Disease Detection System

A full-stack web application for detecting and classifying plant diseases using deep learning. The system uses Convolutional Neural Networks (CNN) to identify diseases in pepper, potato, and tomato plants, providing disease information and treatment recommendations.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Model Information](#model-information)
- [Dataset](#dataset)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

PlantCare is an AI-powered plant disease detection system that helps farmers and gardeners identify plant diseases quickly and accurately. The system can detect 15 different classes of plant diseases across three crop types: peppers, potatoes, and tomatoes.

### Supported Disease Classes

- **Pepper**: Bacterial spot, Healthy
- **Potato**: Early blight, Late blight, Healthy
- **Tomato**: Target Spot, Tomato mosaic virus, Yellow Leaf Curl Virus, Bacterial spot, Early blight, Late blight, Leaf Mold, Septoria leaf spot, Spider mites, Healthy

## ✨ Features

- 📸 **Image Upload & Camera Capture**: Upload plant images or capture directly from camera
- 🔍 **Disease Detection**: Real-time plant disease classification using CNN
- 📊 **Analytics Dashboard**: View detection statistics and trends
- 📚 **Plant Database**: Comprehensive information about diseases and treatments
- 💊 **Treatment Recommendations**: Get supplement and treatment information for detected diseases
- 📄 **PDF Reports**: Generate downloadable reports of disease analysis
- 🎨 **Modern UI**: Responsive design built with React and Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.1
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **PDF Generation**: jsPDF

### Backend

- **Framework**: Flask 3.0
- **Deep Learning**: TensorFlow 2.15
- **Image Processing**: Pillow, OpenCV
- **Data Processing**: Pandas, NumPy
- **CORS**: Flask-CORS

### Machine Learning

- **Model Architecture**: CNN (Convolutional Neural Network)
- **Image Size**: 128x128 pixels
- **Augmentation**: ImageDataGenerator
- **Additional**: GAN (Generative Adversarial Network) for data augmentation

## 📁 Project Structure

```
PLantCare/
├── Backend/
│   ├── app.py                      # Flask API server
│   ├── CNN.py                      # CNN model training script
│   ├── check_model_input.py        # Model input validation
│   ├── evaluate_model.py           # Model evaluation script
│   ├── requirements.txt            # Python dependencies
│   ├── disease_info.csv            # Disease information database
│   ├── supplement_info.csv         # Treatment supplement data
│   ├── static/
│   │   └── model.h5                # Trained CNN model
│   ├── PlantVillage/               # Training dataset
│   │   ├── Pepper__bell___Bacterial_spot/
│   │   ├── Pepper__bell___healthy/
│   │   ├── Potato___Early_blight/
│   │   ├── Tomato_healthy/
│   │   └── ...                     # Other disease classes
│   └── Tomato-Plant-Disease-Classification-using-CNN-with-GAN-master/
│       ├── CGAN_code.py            # Conditional GAN implementation
│       ├── DCGAN_code.py           # Deep Convolutional GAN
│       ├── CNN_model.py            # Alternative CNN model
│       └── dataset_handling.py     # Dataset utilities
│
└── Frontend/
    ├── src/
    │   ├── App.tsx                 # Main application component
    │   ├── main.tsx                # Application entry point
    │   ├── components/
    │   │   ├── navbar.tsx          # Navigation bar
    │   │   ├── footer.tsx          # Footer component
    │   │   ├── camera-capture.tsx  # Camera capture component
    │   │   └── report.tsx          # PDF report generator
    │   ├── pages/
    │   │   ├── home.tsx            # Landing page
    │   │   ├── detect-disease.tsx  # Disease detection page
    │   │   ├── plant-database.tsx  # Plant information database
    │   │   └── analytics.tsx       # Analytics dashboard
    │   └── services/
    │       └── disease-services.ts # API service layer
    ├── public/
    │   ├── images/                 # Static images
    │   └── logo/                   # Logo assets
    ├── package.json                # Node dependencies
    ├── vite.config.ts              # Vite configuration
    ├── tailwind.config.js          # Tailwind CSS configuration
    └── tsconfig.json               # TypeScript configuration
```

## 🚀 Installation

### Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn
- Git

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/SuyashDive2005/Plant-Disease-Detection-and-Classification-using-Deep-Learning.git
cd PLantCare
```

2. Navigate to the Backend directory:

```bash
cd Backend
```

3. Create a virtual environment (recommended):

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

4. Install Python dependencies:

```bash
pip install -r requirements.txt
```

5. Ensure the model file exists at `static/model.h5`

### Frontend Setup

1. Navigate to the Frontend directory:

```bash
cd Frontend
```

2. Install Node dependencies:

```bash
npm install
```

## 💻 Usage

### Running the Backend

1. Navigate to the Backend directory:

```bash
cd Backend
```

2. Activate your virtual environment (if using one)

3. Start the Flask server:

```bash
python app.py
```

The backend API will start on `http://localhost:5000`

### Running the Frontend

1. Open a new terminal and navigate to the Frontend directory:

```bash
cd Frontend
```

2. Start the development server:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is busy)

3. Open your browser and navigate to the displayed URL

### Building for Production

**Frontend:**

```bash
cd Frontend
npm run build
```

The production-ready files will be in the `dist` folder.

## 🧠 Model Information

### CNN Architecture

The model uses a Sequential CNN architecture:

- **Input Layer**: 128x128x3 (RGB images)
- **Conv2D Layer 1**: 32 filters, 3x3 kernel, ReLU activation
- **MaxPooling2D**: 2x2 pool size
- **Conv2D Layer 2**: 64 filters, 3x3 kernel, ReLU activation
- **MaxPooling2D**: 2x2 pool size
- **Flatten Layer**
- **Dense Layer**: 128 neurons, ReLU activation
- **Dropout**: 0.3 rate
- **Output Layer**: 15 classes, Softmax activation

### Training Details

- **Optimizer**: Adam
- **Loss Function**: Categorical Crossentropy
- **Image Size**: 128x128 pixels
- **Batch Size**: 32
- **Validation Split**: 20%
- **Data Augmentation**: Enabled via ImageDataGenerator

### GAN Integration

The project includes GAN (Generative Adversarial Network) implementations for data augmentation:

- **CGAN**: Conditional GAN for generating class-specific images
- **DCGAN**: Deep Convolutional GAN for enhanced image generation

## 📊 Dataset

The model is trained on the **PlantVillage Dataset**, which contains images of healthy and diseased plant leaves across multiple crop species.

### Dataset Statistics

- **Total Classes**: 15
- **Crop Types**: Pepper, Potato, Tomato
- **Image Resolution**: 128x128 pixels
- **Training/Validation Split**: 80/20

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### POST `/predict`

Detect plant disease from an uploaded image.

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `image`: Image file (JPG, PNG)

**Response:**

```json
{
  "class": "Tomato_Early_blight",
  "confidence": 0.95,
  "disease_info": {
    "name": "Early Blight",
    "description": "...",
    "symptoms": "...",
    "causes": "..."
  },
  "supplement_info": {
    "treatment": "...",
    "prevention": "...",
    "recommendations": "..."
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 Development Notes

### Training a New Model

To train a new model from scratch:

1. Ensure your dataset is in the `Backend/PlantVillage/` directory
2. Run the training script:

```bash
cd Backend
python CNN.py
```

3. The trained model will be saved to `static/model.h5`

### Model Evaluation

To evaluate the model performance:

```bash
cd Backend
python evaluate_model.py
```

### Using GANs for Data Augmentation

To generate additional training images:

```bash
cd Backend/Tomato-Plant-Disease-Classification-using-CNN-with-GAN-master
python CGAN_code.py  # For Conditional GAN
# or
python DCGAN_code.py  # For Deep Convolutional GAN
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Suyash Dive** - [@SuyashDive2005](https://github.com/SuyashDive2005)

## 🙏 Acknowledgments

- PlantVillage Dataset
- TensorFlow and Keras teams
- React and Vite communities
- All contributors to this project

## 📧 Contact

For questions or support, please open an issue on GitHub or contact the repository owner.

---

Made with ❤️ for healthier plants and sustainable agriculture
