import cv2
import numpy as np

cap = cv2.VideoCapture(2)

saved = False
while True:
    ret, frame = cap.read()
    if not ret:
        break

    # 그레이스케일로 변환 (밝기 분석 용도)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 최대 밝기 찾기
    max_val = np.max(gray)

    # 특정 밝기 이상이면 "빛이 닿았다" 판단
    if max_val > 250 and not saved:  # 임계값은 상황에 맞게 조절 (ex. 레이저 빛)
        cv2.imwrite("light_capture.jpg", frame)
        print("💡 광 감지! 한 장 저장 완료")
        saved = True
        break  # 바로 종료

    cv2.imshow("Live", frame)
    if cv2.waitKey(1) == 27:  # ESC 누르면 수동 종료
        break

cap.release()
cv2.destroyAllWindows()
