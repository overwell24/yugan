import torch
from torchvision import transforms
import torchvision.models as models
import torch.nn as nn

class SirloinClassifier():
    def __init__(self):
        super().__init__()

        # 5개의 클래스에 대한 레이블 맵 정의
        self.label_map = {
            0: '1',
            1: '1+',
            2: '1++',
            3: '2',
            4: '3'
        }
        
        # 계산을 위한 장치 설정 (CPU)
        self.device = torch.device('cpu')
        # 사전 학습된 ResNext50_32x4d 모델 로드
        self.model = models.resnext50_32x4d(pretrained=True)
        # 최종 완전 연결 레이어를 수정하여 5개의 클래스에 대한 5개의 출력값 설정
        self.model.fc = nn.Linear(self.model.fc.in_features, 5)
        # 체크포인트 파일에서 사전 학습된 모델 가중치 로드
        self.checkpoint = torch.load('./Models/pretrain=true.pth', map_location=self.device)
        self.model.load_state_dict(self.checkpoint['state_dict'])

    def preprocess_image(self, image):
        # 이미지 전처리 파이프라인
        transform = transforms.Compose([
            transforms.Resize((512, 512)),
            transforms.ToTensor()
        ])
        # 이미지에 변환 적용하고 배치 형식 텐서로 변환
        image_tensor = transform(image).unsqueeze(0)
        return image_tensor
        
    def predict(self, image):
         # 평가 모드 설정
        self.model.eval()
        # 예측 중 경사 계산 비활성화
        with torch.no_grad():
            # 이미지 전처리
            image_tensor = self.preprocess_image(image)
            output = self.model(image_tensor)

            # 예측된 클래스 인덱스와 레이블 맵에서 해당 레이블 찾기
            _, pred = torch.max(output.data, 1)
            label = self.label_map[int(pred[0])]

            # 모든 클래스에 대한 소프트맥스 확률 계산 & 최대 확률 추출
            prob = torch.nn.functional.softmax(output.data, dim=1)
            max_prob, _ = torch.max(prob, dim=1)
            max_prob = float(max_prob)

            return max_prob, label