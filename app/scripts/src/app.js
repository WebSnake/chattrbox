import socket from './ws-client';

class ChatApp {
  constructor() {
    socket.init('ws://localhost:3001');

    socket.registerOpenHandler(() => {
      let message = new ChatMessage({message: 'pow!'});
      socket.sendMessage(message.serialize());
    });

    socket.registerMessageHandler((data) => {
      console.log(data);
    });
  }
}

class ChatMessage {
  constructor({
    message: m,
    use: u = 'batman',
    timestamp: t = (new Date()).getTime()
  }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
  serialize() { // представление данных из свойства ChatMessage в виде обычного объекта
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

export default ChatApp;
