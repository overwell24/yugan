from flask import Flask, request, render_template, redirect, request
from io import BytesIO
from PIL import Image
from SirloinClassifier import SirloinClassifier
import io
import base64

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('main.html')

@app.route('/result', methods=[ 'POST', 'GET'])
def upload():
  if request.method == 'POST':
    # 업로드된 파일 확인
    uploaded_image = request.files['meat_img'] 
    if uploaded_image.filename != '':
      image_data = uploaded_image.read()
      image = Image.open(io.BytesIO(image_data)).convert("RGB")

      # 모델 처리
      model = SirloinClassifier()
      prob, grade = model.predict(image)
      prob = str(100 * prob)[:5]

      # 이미지 데이터를 base64로 인코딩
      buffered = BytesIO()
      image.save(buffered, format="PNG")
      img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

      return render_template('result.html', grade=grade, prob=prob, img_data=img_str)
  
  else:
    return redirect('/')

if __name__ == '__main__':
  app.run(port=8000)
