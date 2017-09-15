let socket;
// инициализация подключения
function init(url) {
  socket = new WebSocket(url);
  console.log('connecting...');
}

function registerOpenHandler(handlerFunction) { // принимает на входе функциональный аргумент и присваивает анонимную функцию свойству onopen соединения с сокетом
  socket.onopen = () => {
    console.log('open');
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) { // интерфейс обработки сообщений по мере их поступления
  socket.onmessage = (e) => {
    console.log('message', e.data);
    let data = JSON.parse(e.data);
    handlerFunction(data);
  };
}

function sendMessage(payload) { // преобразуем содержимое в строку JSON  и отправляем серверу WebSockets
  socket.send(JSON.stringify(payload));
}

export default {
  init,
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
}
