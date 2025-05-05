import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CSS/UserManagement.css';

export default function UserManagement() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [deleteEmail, setDeleteEmail] = useState('');

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:3001/register', {
        email,
        password,
        role,
      });
      toast.success('Пользователь успешно создан');
      setEmail('');
      setPassword('');
      setRole('employee');
    } catch (error) {
      toast.error('Ошибка при создании пользователя');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/users/${deleteEmail}`);
      toast.success('Пользователь успешно удалён');
      setDeleteEmail('');
    } catch (error) {
      toast.error('Ошибка при удалении пользователя');
    }
  };

  return (
    <div className="user-page">
      <Link to="/" className="back-link">← Назад</Link>
      <div className="user-form-wrapper">
        <div className="user-form-block">
          <h2>Создание пользователя</h2>
          <input
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
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="employee">Сотрудник</option>
            <option value="admin">Администратор</option>
          </select>
          <button onClick={handleCreate}>Создать</button>
        </div>

        <div className="user-form-block">
          <h2>Удаление пользователя</h2>
          <input
            placeholder="Email для удаления"
            value={deleteEmail}
            onChange={e => setDeleteEmail(e.target.value)}
          />
          <button onClick={handleDelete}>Удалить</button>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
