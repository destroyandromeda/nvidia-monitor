module.exports = {
  apps: [
    {
      name: 'nvidia-monitor',
      script: 'index.js',
      watch: true,
      env: {
        PORT: 4000, // Здесь указываем порт
      },
    },
  ],
};