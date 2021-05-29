import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
import warnings
# warnings.filterwarnings("ignore", category='I tensorflow')
import sys
import numpy as np
import cv2
from keras.models import load_model


model = load_model('model.h5')

# warnings.filterwarnings('always')

# print(load_model)

# print('This is from Python')
# print(int(sys.argv[1]) + int(sys.argv[2]))
X = cv2.imread(sys.argv[3])

# X = cv2.imread(sys.argv[3], cv2.IMREAD_COLOR)
# print(X)
X = cv2.resize(X, (256, 256))
X = np.array(X)
X = np.expand_dims(X, axis=0)

y_pred = np.round(model.predict(X))
if y_pred[0][0] == 1:
    print(0)
else:
    print(1)
sys.stdout.flush()


# print(image)
#  cv2.imshow('image',img)
#  cv2.waitKey(0)
#  cv2.destroyAllWindows()
