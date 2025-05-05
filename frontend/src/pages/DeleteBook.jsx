import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CSS/DeleteBook.css';

export default function DeleteBook() {
  const [itemId, setItemId] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      toast.success('✅ Товар успешно удалён');
      setItemId('');
    } catch (err) {
      toast.error('❌ Ошибка при удалении товара');
    }
  };

  return (
    <div className="delete-form-container">
      <Link to="/" className="back-link">← Назад</Link>
      <h2 className="form-title">Удаление товара</h2>
      <div className="delete-form-fields">
        <input
          type="number"
          placeholder="ID товара"
          value={itemId}
          onChange={e => setItemId(e.target.value)}
        />
      </div>
      <button onClick={handleDelete}>Удалить</button>

      {/* Контейнер для отображения всплывающих сообщений */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
