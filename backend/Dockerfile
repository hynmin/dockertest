FROM python:3.11-slim

# 2. 작업 디렉토리 지정
WORKDIR /app

# 3. 의존성 파일 복사, 설치
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# 4. 소스 코드 복사
COPY . .

# 6. 포트
EXPOSE 8000

# 7. 컨테이너 실행 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]