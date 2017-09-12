var WebSocket = require('ws'); // импортируем модуль ws
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({ // слоздаем websocket server
  port: port
});
var messages = []; // массив для хранения сообщений

console.log('websockets server started');

// обратный вызов для событий connection
ws.on('connection', function(socket) {
  console.log('client connection established');

  messages.forEach(function(msg) { // отправка истории сообщений всем новым подключениям
    socket.send(msg);
  });

  // эхо-функциональность
  socket.on('message', function(data) {
    console.log('message received: ' + data);
    messages.push(data); // добавление новых сообщений в массив
    ws.clients.forEach(function(clientSocket) { // отправка сообщений всем клиентам
      clientSocket.send(data);
    });
  });
});
