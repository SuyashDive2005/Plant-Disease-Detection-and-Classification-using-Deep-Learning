import tensorflow as tf
model = tf.keras.models.load_model('static/model.h5')
print(model.input_shape)
