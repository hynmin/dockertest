const express = require('express');
const app = express();
const PORT = 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <body>
      <h1>도커 테스트</h1>      
        <button onclick="callAPI('/')"> Hello </button>
        <button onclick="callAPI('/users')">user</button>
        <div id="result"></div>
      
        <script>
            const BACKEND_URL = '${BACKEND_URL}';
            async function callAPI(path) {
                const response = await fetch(BACKEND_URL + path);
                const data = await response.json();
                let output = '';
                if (data.message) {
                output = '<h2>' + data.message + '</h2>';
                } else if (data.users) {
                    output = '<h2>사용자 목록</h2><table border="1"><tr><th>ID</th><th>이름</th><th>이메일</th></tr>';
                    data.users.forEach(user => {
                    output += '<tr><td>' + user.id + '</td><td>' + user.name + '</td><td>' + user.email + '</td></tr>';
                    });
                    output += '</table>';
                }
                document.getElementById('result').innerHTML = output;

            }
        </script>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend running on http://localhost:${PORT}`);
});