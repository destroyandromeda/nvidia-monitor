// Подключаем dotenv для использования переменных из .env
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'nvidia-monitor',  // Имя приложения
      script: './index.js',  // Путь к основному скрипту приложения
      instances: 1,  // Количество экземпляров приложения (для одного инстанса)
      autorestart: true,  // Автоматический перезапуск при сбое
      watch: false,  // Не следить за изменениями в файлах
      env: {
        PORT: process.env.PORT || 4000,  // Получаем порт из .env, если он не указан, используем 3000
      }
    }
  ]
};