const express = require('express');
const { PrismaClient } = require('@prisma/client');


const app = express();
const prisma = new PrismaClient();
const cors = require('cors');
app.use(cors());

app.use(express.json());

// 📦 Получить список всех товаров
app.get('/items', async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    res.status(500).json({ error: 'Ошибка при получении товаров' });
  }
});

// ➕ Добавить товар (или увеличить количество, если уже есть)
app.post('/items', async (req, res) => {
  const {
    title,
    category,
    author,
    publisher,
    edition,
    manufacturer,
    price,
    quantity
  } = req.body;

  if (!title || !category || price == null || quantity == null) {
    return res.status(400).json({ error: 'Обязательные поля не заполнены' });
  }

  try {
    // Найдём существующий товар по ключевым полям
    const existing = await prisma.item.findFirst({
      where: {
        title,
        category,
        ...(category === 'Книга' && {
          author,
          publisher,
          edition,
        }),
        ...(category !== 'Книга' && {
          manufacturer,
        }),
      },
    });

    if (existing) {
      // Обновим количество, если товар найден
      const updated = await prisma.item.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + Number(quantity),
        },
      });
      return res.json(updated);
    }

    // Создание нового товара
    const newItem = await prisma.item.create({
      data: {
        title,
        category,
        author,
        publisher,
        edition,
        manufacturer,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      },
    });

    res.json(newItem);
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
    res.status(500).json({ error: 'Ошибка при добавлении товара' });
  }
});

// 🚀 Запуск сервиса
app.listen(3002, () => {
  console.log('📚 Book-сервис запущен на http://localhost:3002');
});


// 🗑 Удалить товар по ID
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.item.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error('Ошибка при удалении товара:', error);
    res.status(500).json({ error: 'Ошибка при удалении товара' });
  }
});
