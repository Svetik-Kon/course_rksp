const express = require('express');
const cors = require('cors');
require('dotenv').config();

const bcrypt = require('bcrypt'); // ← импортируем bcrypt
const { PrismaClient } = require('@prisma/client'); // ← импортируем PrismaClient
const prisma = new PrismaClient(); // ← создаем экземпляр клиента

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes); // Подключаем маршруты авторизации

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth-service запущен на http://localhost:${PORT}`);
});


app.post('/register', async (req, res) => {
    const { email, password, role } = req.body; // 🟢 email, не username
  
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }
  
    try {
      const existing = await prisma.user.findUnique({ where: { email } });
  
      if (existing) {
        return res.status(409).json({ error: 'Пользователь уже существует' });
      }
  
      const hashed = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          email,
          password: hashed,
          role,
        }
      });
  
      res.status(201).json({ message: 'Пользователь создан' });
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
      res.status(500).json({ error: 'Ошибка при создании пользователя' });
    }
  });
  

  app.delete('/users/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      const user = await prisma.user.delete({
        where: { email },
      });
  
      res.status(204).send(); // Успешно удалено
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
      res.status(500).json({ error: 'Ошибка при удалении пользователя' });
    }
  });
  