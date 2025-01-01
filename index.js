const express = require('express');
const { exec } = require('child_process');
const WebSocket = require('ws');
const path = require('path');

const PORT = process.env.PORT || 3000; // Задаём порт через переменную окружения

const app = express();
const wss = new WebSocket.Server({ noServer: true });

// Обработка WebSocket соединений
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  const interval = setInterval(() => {
    exec('nvidia-smi', (error, stdout, stderr) => {
      if (error) {
        ws.send(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        ws.send(`Stderr: ${stderr}`);
        return;
      }
      ws.send(stdout);
    });
  }, 100); // Обновление каждые 100 мс

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
    clearInterval(interval);
  });
});

// Отдача статической HTML-страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Интеграция WebSocket с HTTP-сервером
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('upgrade', (request, socket, head) => {
  if (request.url === '/ws') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});