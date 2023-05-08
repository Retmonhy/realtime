const ws = require("ws");

//клиенты вебсокета
const clients = new Set();

module.exports = (expressServer) => {
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
    //так можно получить query параметры запроса. Тут не используется, но знать полезно
    // const [_path, params] = connectionRequest?.url?.split("?");
    // const connectionParams = queryString.parse(params); //тут какая-то либа парсит парамсы, но можно и ручками

    clients.add(websocketConnection);
    websocketConnection.on("message", (message) => {
      //тут почему-то приходит в формате Buffer, поэтому вызываем toString
      const stringMessage = message.toString();
      for (let client of clients) {
        client.send(stringMessage);
      }
    });
  });

  return websocketServer;
};
