const express = require('express');
const cors = require('cors');
const axios = require('axios');
const verifyToken = require('./authMiddleware');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const BOOK_SERVICE_URL = '${BOOK_SERVICE_URL}';

// 🔒 Получить все товары (книги и канцелярию)
app.get('/items', verifyToken(), async (req, res) => {
  try {
    const response = await axios.get(`${BOOK_SERVICE_URL}/items`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    console.error('Ошибка при получении товаров:', err.message);
    res.status(500).json({ error: 'Ошибка при получении товаров' });
  }
});

// 🔒 Добавить товар (книгу или канцелярию)
app.post('/items', verifyToken(), async (req, res) => {
  try {
    const response = await axios.post(`${BOOK_SERVICE_URL}/items`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    console.error('Ошибка при проксировании добавления товара:', err.message);
    res.status(500).json({ error: 'Ошибка при добавлении товара' });
  }
});

// 🧪 Порт запуска
app.listen(3000, () => {
  console.log('API Gateway работает на http://localhost:3000');
});
