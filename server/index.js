const dotenv = require("dotenv");
const express = require("express");
const router = require("./src/router");
const middlewares = require("./src/middlewares");
const createLongpolling = require("./src/longpolling");
const createEventsoursing = require("./src/eventsoursing");
const createWebsocket = require("./src/websocket");
const OnlineUsers = require("./src/OnlineUsers");
dotenv.config();

const app = express();
const onlineUsers = new OnlineUsers();
middlewares(app);
router(app, onlineUsers);

const server = app.listen(5000, () => console.log(`Прилодение ${process.env.Real_Time_Type} запущено на порте: ` + process.env.Port));
switch (process.env.Real_Time_Type) {
  case "websocket":
    createWebsocket(server, onlineUsers);
    break;
  case "longpolling":
    createLongpolling(app);
    break;
  case "eventsoursing":
    createEventsoursing(app);
    break;
}
