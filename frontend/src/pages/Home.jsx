import { getRole, logout } from '../auth';
import { Link } from 'react-router-dom';
import './CSS/Home.css'; // подключаем стили

export default function Home() {
  const role = getRole();

  return (
    <div className="home-container">
      <button onClick={logout} className="logout-btn">Выйти</button>

      <h1 className="welcome-title">Добро пожаловать, {role}</h1>

      <div className="functions-grid">
        <Link to="/add" className="function-tile">➕ Добавление товара</Link>
        <Link to="/books" className="function-tile">📚 Просмотр склада</Link>
        {role === 'admin' && (
          <>
            <Link to="/delete-book" className="function-tile">🗑 Удаление товара</Link>
            <Link to="/user-management" className="function-tile">👥 Управление пользователями</Link>
          </>
        )}
      </div>
    </div>
  );
}
