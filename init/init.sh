#!/bin/sh

echo "⏳ Ожидаем готовности auth-service и book-service..."

# Ожидаем, пока auth-service вернёт 200
until [ "$(curl -s -o /dev/null -w "%{http_code}" http://auth-service:3001)" ]; do
  echo "⏳ Ждём auth-service..."
  sleep 2
done

# Ожидаем, пока book-service вернёт 200
until [ "$(curl -s -o /dev/null -w "%{http_code}" http://book-service:3002)" ]; do
  echo "⏳ Ждём book-service..."
  sleep 2
done

echo "✅ Сервисы готовы. Выполняем миграции..."

cd /auth-service
npx prisma migrate dev --name init --skip-seed

cd /book-service
npx prisma migrate dev --name init --skip-seed

echo "✅ Миграции выполнены. Создаём админа..."

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://auth-service:3001/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"123456","role":"admin"}')

if [ "$RESPONSE" = "201" ] || [ "$RESPONSE" = "200" ]; then
  echo "✅ Админ создан"
else
  echo "❌ Ошибка при создании админа. Код ответа: $RESPONSE"
  exit 1
fi
