import React, { useState } from 'react';

function App() {
  // 상태 관리
  const [name, setName] = useState('');           // 입력한 이름
  const [email, setEmail] = useState('');         // 입력한 이메일
  const [users, setUsers] = useState([]);         // 사용자 목록
  const [message, setMessage] = useState('');     // Hello 메시지

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
  // Hello 버튼
  const handleHello = async () => {
    const response = await fetch(`${BACKEND_URL}/`);
    const data = await response.json();
    setMessage(data.message);
    setUsers([]);  // 목록 초기화
  };

  // 사용자 목록 버튼
  const handleGetUsers = async () => {
    const response = await fetch(`${BACKEND_URL}/users`);
    const data = await response.json();
    setUsers(data.users);
    setMessage('');  // 메시지 초기화
  };

  // 사용자 추가 버튼
  const handleAddUser = async () => {
    if (!name || !email) {
      alert('이름과 이메일을 입력하세요!');
      return;
    }

    await fetch(`${BACKEND_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    setName('');   // 입력 초기화
    setEmail('');
    alert('추가 완료!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>도커 테스트</h1>
      
      {/* 입력 폼 */}
      <div>
        <input 
          type="text" 
          placeholder="이름" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="이메일" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAddUser}>추가</button>
      </div>

      {/* 버튼들 */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleHello}>Hello</button>
        <button onClick={handleGetUsers}>사용자 목록</button>
      </div>

      {/* 결과 표시 */}
      <div style={{ marginTop: '20px' }}>
        {message && <h2>{message}</h2>}
        
        {users.length > 0 && (
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>이름</th>
                <th>이메일</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
