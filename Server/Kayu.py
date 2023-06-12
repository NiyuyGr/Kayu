import os
import pandas as pd
from tensorflow import keras
import numpy as np
from sklearn.model_selection import train_test_split


df = pd.read_excel('data.xlsx')
input = df[['e','i','s','n','f','t','p','j']]
output = df['etiqueta']

input = input / 100.0

class_names = ['Arte','Especializado','Historia','Arte']

x_train, x_test, y_train, y_test = train_test_split(input,output, test_size=.2)

model = keras.Sequential([
    keras.layers.Flatten(input_shape = (8,1)),
    keras.layers.Dense(128, activation="relu"),
    keras.layers.Dense(4, activation="sigmoid")
])



model.compile(loss='sparse_categorical_crossentropy', optimizer='adam', metrics='accuracy')

model.fit(x_train, y_train, epochs=100, batch_size=32)
model.save('Kayu_Pred.h5')

test = np.expand_dims([0.83,0.17,0.32,0.68,0.68,0.32,0.74,0.26],0)

prediction = model.predict(test)[0].tolist()
print("////////////// \n")
print(prediction)
first = prediction.index(max(prediction))
prediction.pop(first)
second = prediction.index(max(prediction))
salida = str(first)
salida = salida.append(str(second))
print(first)
print(second)

newModel = keras.load_model("Kayu_Pred.h5")

""" prediction = model.predict(x_test)
print("///////////////////////////////")
print(class_names[np.argmax(prediction[0])]) """

"""new_model = keras.models.load_model('Kayu.h5')"""
