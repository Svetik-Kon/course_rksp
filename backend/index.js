const express = require('express');
const cors = require('cors');
const axios = require('axios');
const verifyToken = require('./authMiddleware');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const BOOK_SERVICE_URL = process.env.BOOK_SERVICE_URL;

// Все маршруты идут с префиксом /api
const router = express.Router();

// 🔒 Получить все товары (книги и канцелярию)
router.get('/items', verifyToken(), async (req, res) => {
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
router.post('/items', verifyToken(), async (req, res) => {
  try {
    const response = await axios.post(`${BOOK_SERVICE_URL}/items`, req.body, {
      headers: { Authorization: req.headers.authorization }
    });
    res.json(response.data);
  } catch (err) {
    console.error('Ошибка при добавлении товара:', err.message);
    res.status(500).json({ error: 'Ошибка при добавлении товара' });
  }
});




router.post('/register', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/register`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error('Ошибка при регистрации:', err.message);
    res.status(500).json({ error: 'Ошибка при регистрации' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/login`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error('Ошибка при логине:', err.message);
    res.status(500).json({ error: 'Ошибка при логине' });
  }
});

// Удаление товара по ID
router.delete('/items/:id', verifyToken(), async (req, res) => {
  try {
    const response = await axios.delete(`${BOOK_SERVICE_URL}/items/${req.params.id}`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.status(204).send();
  } catch (err) {
    console.error('Ошибка при удалении товара:', err.message);
    res.status(500).json({ error: 'Ошибка при удалении товара' });
  }
});

// Удаление пользователя по email
router.delete('/users/:email', verifyToken(), async (req, res) => {
  try {
    const response = await axios.delete(`${process.env.AUTH_SERVICE_URL}/users/${req.params.email}`, {
      headers: { Authorization: req.headers.authorization }
    });
    res.status(204).send();
  } catch (err) {
    console.error('Ошибка при удалении пользователя:', err.message);
    res.status(500).json({ error: 'Ошибка при удалении пользователя' });
  }
});



// 🧪 Порт запуска
app.listen(3000, () => {
  console.log('API Gateway работает на http://localhost:3000');
});


// Подключаем маршруты к /api
app.use('/api', router);