# course_rksp
# 📦 Складской учёт — Приложение с ролями и авторизацией

Это веб-приложение для управления товарным складом книжного магазина. Реализованы:
- 🔐 Регистрация и авторизация с JWT
- 👥 Разграничение прав доступа (администратор и сотрудник)
- ➕ Добавление товара
- 📚 Просмотр всех товаров
- 🗑 Удаление товара (только для админа)
- 👤 Управление пользователями (создание и удаление — только для админа)

## ⚙️ Стек технологий

### Frontend
- React
- React Router DOM
- Axios
- React Toastify

### Backend
- Node.js
- Express
- Prisma ORM
- Bcrypt
- JSON Web Token (JWT)

### Базы данных
- PostgreSQL


## 🚀 Как запустить проект (через Docker Compose)

1. **Склонируйте проект:**

git clone https://github.com/Svetik-Kon/course_rksp

2.**Соберите и запустите проект:**

docker-compose up --build

На готовый и уже собраный проект можно перейти по ссылке http://gen12.net:3020/

Учетные данные для авторизации с правами Администратора: email – admin@example.com, Пароль – 123456
Учетные данные для авторизации с правами Сотрудника: email – worker@example.com, Пароль – 111111


👥 Роли пользователей
Роль	        Возможности
admin	        Просмотр, добавление и удаление товаров, управление пользователями
employee	    Только добавление и просмотр товаров
