import cv2
import numpy as np

img = cv2.imread("light_capture.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 밝은 영역만 추출
_, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY)

# 밝은 점 찾기
coords = cv2.findNonZero(thresh)
if coords is not None:
    avg = np.mean(coords, axis=0)[0]
    print("광이 닿은 평균 위치: ", avg)
    cv2.circle(img, tuple(avg.astype(int)), 5, (0, 0, 255), -1)

# cv2.imshow("Result", img)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
