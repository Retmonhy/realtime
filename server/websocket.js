//modules
const fetch = require("node-fetch");
const express = require("express");
const middlewares = require("./middlewares");
const wsserver = require("./WSServer");

const app = express();
const PORT = 5000;
// app.use(cors()).use(express.json());
middlewares(app);
const expressServer = app.listen(PORT, () => `Http server have been started on port ${PORT}`);
wsserver(expressServer);

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
