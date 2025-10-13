import os
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model
from sklearn.metrics import classification_report, confusion_matrix

dataset_dir = "PlantVillage" 
model_path = "static/model.h5"

# Load the trained model
model = load_model(model_path)
print("✅ Model loaded successfully!")

# Image size (same as training)
img_size = (128, 128)
batch_size = 32

# Data generator for evaluation
datagen = ImageDataGenerator(rescale=1.0 / 255.0)

# Use the dataset folder directly
if not os.path.exists(dataset_dir):
    raise FileNotFoundError(f"❌ Dataset folder not found at path: {dataset_dir}")

print("📂 Loading dataset for evaluation...")
test_data = datagen.flow_from_directory(
    dataset_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=False
)

# Evaluate model
loss, acc = model.evaluate(test_data, verbose=1)
print(f"\n✅ Model Accuracy: {acc * 100:.2f}%")
print(f"📉 Model Loss: {loss:.4f}")

# Predict labels
preds = model.predict(test_data)
y_pred = np.argmax(preds, axis=1)
y_true = test_data.classes
class_labels = list(test_data.class_indices.keys())

# Classification Report
print("\n📊 Classification Report:")
print(classification_report(y_true, y_pred, target_names=class_labels))

# Confusion Matrix
cm = confusion_matrix(y_true, y_pred)
print("\n🧩 Confusion Matrix:")
print(cm)

# ---- 📈 Plot Confusion Matrix ----
plt.figure(figsize=(12, 10))
sns.heatmap(cm, annot=False, cmap='Blues', xticklabels=class_labels, yticklabels=class_labels)
plt.title('Confusion Matrix')
plt.xlabel('Predicted Labels')
plt.ylabel('True Labels')
plt.tight_layout()
plt.show()

# ---- 📊 Plot Accuracy and Loss ----
plt.figure(figsize=(6, 4))
bars = plt.bar(['Accuracy', 'Loss'], [acc * 100, loss * 100], color=['#4CAF50', '#F44336'])
plt.title('Model Performance')
plt.ylabel('Percentage (%)')
plt.grid(axis='y', linestyle='--', alpha=0.6)

for bar in bars:
    yval = bar.get_height()
    plt.text(bar.get_x() + bar.get_width() / 2, yval + 1, f"{yval:.2f}%", ha='center', va='bottom')

plt.tight_layout()
plt.show()
