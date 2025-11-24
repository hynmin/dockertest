CREATE TABLE users (            /*testdb 안에 user테이블 생성*/
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100)
);

INSERT INTO users (name, email) VALUES 
    ('admin', 'admin@test.com');
