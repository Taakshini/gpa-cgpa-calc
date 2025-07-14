import cv2
import numpy as np

class FilterEngine:
    def __init__(self):
        self.filters = ['normal', 'gray', 'sepia', 'blush', 'vintage']
        self.current = 0

    def switch_filter(self):
        self.current = (self.current + 1) % len(self.filters)
        return self.filters[self.current]

    def apply(self, frame):
        f = self.filters[self.current]
        if f == 'gray':
            return cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        elif f == 'sepia':
            sepia_filter = np.array([[0.272, 0.534, 0.131],
                                     [0.349, 0.686, 0.168],
                                     [0.393, 0.769, 0.189]])
            return cv2.transform(frame, sepia_filter)
        elif f == 'blush':
            blush = frame.copy()
            blush[:, :, 2] = cv2.add(blush[:, :, 2], 30)  # red boost
            return blush
        elif f == 'vintage':
            vintage = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            vintage[:, :, 1] = cv2.add(vintage[:, :, 1], 50)  # saturation boost
            return cv2.cvtColor(vintage, cv2.COLOR_HSV2BGR)
        return frame
