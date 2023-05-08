//modules
const ws = require("ws");
const http = require("http");
const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");

const PORT = 5000;

const clients = new Set();
const app = express();
app.use(cors()).use(express.json());
const expressServer = app.listen(PORT, () => "hhtp server have been started");
const websocketServer = new ws.Server(
  {
    noServer: true,
  },
  () => console.log(`websocket server have been started on port: ${PORT}`)
);
expressServer.on("upgrade", (request, socket, head) => {
  websocketServer.handleUpgrade(request, socket, head, (websocket) => {
    websocketServer.emit("connection", websocket, request);
  });
});
app.get("/user/init", async (req, res) => {
  try {
    //получаем случайны ник
    const nickname = await fetch("https://names.drycodes.com/1");
    const nicknameData = await nickname.json();
    //получаем случайную фоточку - аватарку
    const picture = await fetch("https://dog.ceo/api/breeds/image/random");
    const pictureData = await picture.json();
    res.json({
      id: Date.now(),
      nickname: nicknameData[0],
      picture: pictureData.message,
    });
  } catch (error) {
    console.log("error = ", error);
    res.status(500).json(JSON.stringify(error));
  }
});

websocketServer.on("connection", function (ws) {
  clients.add(ws);
  ws.on("message", (message) => {
    //тут почему-то приходит в формате Buffer, поэтому вызываем toString
    const stringMessage = message.toString();
    for (let client of clients) {
      client.send(stringMessage);
    }
  });
  // ws.send("Пользователь подключился");
});
