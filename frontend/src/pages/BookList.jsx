import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CSS/BookList.css';

export default function BookList() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('api/items', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => setItems(res.data))
    .catch(err => console.error('Ошибка при получении товаров:', err));
  }, []);

  const filtered = items.filter(item =>
    (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
    (item.author && item.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page-wrapper">
      <header>
        <Link to="/" className="back-link">← Назад</Link>
        <h2 className="page-title">Список товаров</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Поиск товара или автора..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      
        <ul className="item-list">
          {filtered.map(item => (
            <li key={item.id} className="item">
              <strong>(ID: {item.id}) {item.title}</strong> ({item.category}) — {item.price}₽, {item.quantity} шт
              <div className="item-details">
                {item.category.toLowerCase() === 'книга' ? (
                  <>
                    <div>Автор: {item.author || '—'}</div>
                    <div>Издательство: {item.publisher || '—'}</div>
                    <div>Издание: {item.edition || '—'}</div>
                  </>
                ) : (
                  <div>Производитель: {item.manufacturer || '—'}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      
    </div>
  );
}
