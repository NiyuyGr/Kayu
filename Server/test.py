import sys
import json
import pandas as pd
from tensorflow import keras
import numpy as np
from sklearn.model_selection import train_test_split

def main():
    E = int(sys.argv[1])/100.0
    I = int(sys.argv[2])/100.0
    S = int(sys.argv[3])/100.0
    N = int(sys.argv[4])/100.0
    F = int(sys.argv[5])/100.0
    T = int(sys.argv[6])/100.0
    P = int(sys.argv[7])/100.0
    J = int(sys.argv[8])/100.0

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

    model.fit(x_train, y_train, epochs=100, batch_size=32, verbose=0)
    #model.save('Kayu_Pred.h5')

    test = np.expand_dims([E,I,S,N,F,T,P,J],0)

    prediction = model.predict(test,verbose=0)[0].tolist()
    first = prediction.index(max(prediction))
    prediction.pop(first)
    second = prediction.index(max(prediction))
    print(first, second)

    sys.stdout.flush

if __name__ == '__main__':
    main()