from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # ← 이거 추가!
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import os


DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:password123@db:5432/testdb")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine) #engine과 연결
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100))
    

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_hello():
    return {"message": "Hello World"}

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all() #db에서 user 테이블 조회
    return {
        "users": [
            {"id": u.id, "name": u.name, "email": u.email}
            for u in users
        ]
    }