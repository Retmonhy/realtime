const ws = require("ws");

//клиенты вебсокета
const clients = new Set();
module.exports = (expressServer, onlineUsers) => {
  const websocketServer = new ws.Server({
    noServer: true,
  });

  // нам нужно обработать подключение сервера веб-сокетов к существующему серверу ExpressServer.
  // Для этого на экспресс-сервере мы прослушиваем событие обновления. Это событие запускается всякий раз,
  // когда наш сервер Express — обычный HTTP-сервер — получает запрос на конечную точку с использованием протокола веб-сокетов.
  // Upgrade здесь означает «нам нужно обновить этот запрос для обработки веб-сокетов».

  // Передаваемый обратному вызову для обработчика событий — части .on('upgrade') — у нас есть три аргумента request, socket и head.
  // request представляет собой входящий HTTP-запрос, сделанный клиентом веб-сокета, socket представляет сетевое соединение между браузером
  // (клиентом) и сервером, а head представляет первый пакет/фрагмент данных для входящего запроса.

  // Далее, внутри обратного вызова для обработчика событий, мы делаем вызов websocketServer.handleUpgrade(),
  // передавая вместе с запросом, сокетом и головой. Этим мы говорим: «Нас просят обновить этот HTTP-запрос до запроса веб-сокета,
  // поэтому выполните обновление, а затем верните нам обновленное соединение».

  // Затем это обновленное соединение передается обратному вызову, который мы добавили в качестве четвертого аргумента в
  // websocketServer.handleUpgrade(). С этим обновленным соединением нам нужно обработать соединение — чтобы было ясно,
  // это теперь подключенное клиентское соединение веб-сокета. Для этого мы «передаем» обновленный веб-сокет соединения и исходный запрос,
  // создавая событие на сервере веб-сокета с именем соединение.
  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });
  //websocketConnection - открытое длительное сетевое соединение браузер - сервер
  //connectionRequest - HTTP запрос на открытие этого соединения
  websocketServer.on("connection", function (websocketConnection, connectionRequest) {
    const [_path, params] = connectionRequest?.url?.split("?");
    const connectionParams = parseParams(params);

    clients.add(websocketConnection);
    const connectedUser = onlineUsers.getUser(connectionParams.userId);

    websocketConnection.on("message", (message) => {
      //тут почему-то приходит в формате Buffer, поэтому вызываем toString
      let msg = JSON.parse(message.toString());
      switch (msg.type) {
        case "UserConnect":
          const UCmessage = {
            type: "UserConnect",
            users: onlineUsers.users,
          };
          msg = UCmessage;
          break;
        case "ChatMessage":
          break;
      }
      for (let client of clients) {
        client.send(JSON.stringify(msg));
      }
    });
    websocketConnection.on("close", (message) => {
      if (connectedUser) {
        onlineUsers.removeUser(connectedUser.id);
        const msg = {
          type: "UserConnect",
          users: onlineUsers.users,
        };
        for (let client of clients) {
          client.send(JSON.stringify(msg));
        }
      }
    });
  });

  return websocketServer;
};
const parseParams = (params /*string*/) => {
  const pairs = params.split("&");
  const paramsObj = {};
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    paramsObj[key] = value;
  });
  return paramsObj;
};
