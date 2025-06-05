import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/Login.css'; // подключение CSS
import loginImage from '../assets/fon.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate('/');
    } catch (err) {
      alert('Ошибка при входе');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <div className="login-box">
          <h2>Кентуки</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Войти</button>
        </div>
      </div>
      <div className="login-image-side">
        <img src={loginImage} alt="Login Visual" />
      </div>
    </div>
  );
}
