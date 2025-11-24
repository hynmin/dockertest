const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <body>
      <h1>도커 테스트</h1>      
        <button onclick="callAPI('/')"> Hello </button>
        <button onclick="callAPI('/users')">사용자 목록 보기</button>
      
        <div id="result"></div>
      
        <script>
            async function callAPI(path) {
            const response = await fetch('http://localhost:8000' + path);
            const data = await response.json();
            document.getElementById('result').innerHTML = 
                '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            }
        </script>
    </body>
    </html>
  `);
});

// 서버 시작
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend running on http://localhost:${PORT}`);
});