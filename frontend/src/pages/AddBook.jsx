import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CSS/AddBook.css';

export default function AddBook() {
  const [category, setCategory] = useState('Книга');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    edition: '',
    manufacturer: '',
    price: '',
    quantity: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.post('${process.env.REACT_APP_API_URL}/items', {
        category,
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Товар добавлен!');
    } catch (err) {
      alert('Ошибка при добавлении');
      console.error(err);
    }
  };

  return (
    <div className="add-form-container">
      <Link to="/" className="back-link">← Назад</Link>
      <h2 className="form-title">Добавить товар</h2>

      <div className="form-fields">
        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Книга">Книга</option>
          <option value="Канцелярия">Канцелярия</option>
        </select>

        <input name="title" placeholder={category === 'Книга' ? 'Название' : 'Наименование товара'} onChange={handleChange} />

        {category === 'Книга' ? (
          <>
            <input name="author" placeholder="Автор" onChange={handleChange} />
            <input name="publisher" placeholder="Издательство" onChange={handleChange} />
            <input name="edition" placeholder="Издание" onChange={handleChange} />
          </>
        ) : (
          <input name="manufacturer" placeholder="Производитель" onChange={handleChange} />
        )}

        <input name="price" placeholder="Цена" type="number" onChange={handleChange} />
        <input name="quantity" placeholder="Количество" type="number" onChange={handleChange} />
      </div>

      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}
