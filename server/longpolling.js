const cors = require("cors");
const express = require("express");
const events = require("events");
const fetch = require("node-fetch");

const PORT = 5000;
const emitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/get-message", (req, res) => {
  emitter.once("newMessage", (message) => {
    res.json(message);
  });
});
app.post("/new-message", (req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  res.status(200).json();
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
    res.status(500).json({ error });
  }
});
app.listen(5000, () => console.log("Прилодение запущено на порте: " + PORT));
