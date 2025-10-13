from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import tensorflow as tf
import io
import base64
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = tf.keras.models.load_model('static/model.h5')

# Load disease and supplement info
disease_info = pd.read_csv("disease_info.csv", encoding="ISO-8859-1")
supplement_info = pd.read_csv("supplement_info.csv", encoding="ISO-8859-1")

# Define class names based on your PlantVillage dataset
CLASS_NAMES = [
    'Pepper__bell___Bacterial_spot',
    'Pepper__bell___healthy',
    'Potato___Early_blight',
    'Potato___healthy',
    'Potato___Late_blight',
    'Tomato__Target_Spot',
    'Tomato__Tomato_mosaic_virus',
    'Tomato__Tomato_YellowLeaf__Curl_Virus',
    'Tomato_Bacterial_spot',
    'Tomato_Early_blight',
    'Tomato_healthy',
    'Tomato_Late_blight',
    'Tomato_Leaf_Mold',
    'Tomato_Septoria_leaf_spot',
    'Tomato_Spider_mites_Two_spotted_spider_mite'
]

def preprocess_image(image):
    image = image.resize((128, 128))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    return image_array


@app.route('/api/predict', methods=['POST'])
def predict_disease():
    try:
        # Get image from request
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        # Process image
        image = Image.open(file.stream)
        processed_image = preprocess_image(image)
        
        # Make prediction
        predictions = model.predict(processed_image)
        predicted_class_index = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_index])
        predicted_class = CLASS_NAMES[predicted_class_index]
        
        # Get disease information
        disease_data = disease_info[disease_info['disease_name'] == predicted_class]
        
        response = {
            'predicted_class': predicted_class,
            'confidence': confidence,
            'disease_info': disease_data.to_dict('records')[0] if not disease_data.empty else {},
            'all_predictions': {CLASS_NAMES[i]: float(predictions[0][i]) for i in range(len(CLASS_NAMES))}
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/diseases', methods=['GET'])
def get_diseases():
    """Get all disease information"""
    return jsonify(disease_info.to_dict('records'))

@app.route('/api/supplements', methods=['GET'])
def get_supplements():
    """Get all supplement information"""
    return jsonify(supplement_info.to_dict('records'))

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Backend is running'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
