[![CI/CD Pipeline](https://github.com/olichuk/flower-shop/actions/workflows/ci-cd.yml/badge.svg?branch=main)](https://github.com/olichuk/flower-shop/actions/workflows/ci-cd.yml)
# Flower Shop "F.lover" - E-commerce Platform
Посилання на сайт: https://flower-shop-f-lover.vercel.app/

## Опис проєкту

Flower Shop "F.lover" — це повноцінна e-commerce платформа для продажу квітів та букетів.

Додаток включає:

- каталог товарів з пошуком
- кошик покупок
- процес оформлення замовлення
- адміністративну панель для управління замовленнями

## Стек технологій

### Frontend

- React 18 (Vite)
- React Router
- Context API

### База даних

- Firebase Firestore

## Встановлення та запуск

### 1. Клонування репозиторію

\```bash
git clone https://github.com/olichuk/flower-shop.git
cd flower-shop
\```

### 2. Встановлення залежностей

\```bash
npm install
\```

### 3. Налаштування змінних середовища

Створи файл `.env.` в корені проєкту:
\```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
\```

### 4. Запуск проєкту

\```bash
npm run dev
\```

Додаток буде доступний за адресою: http://localhost:5173

## Основні можливості

- перегляд каталогу квітів
- додавання товарів у кошик
- оформлення замовлення
- адміністративна панель
