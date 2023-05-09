const fetch = require("node-fetch");

module.exports = (expressApp, onlineUsers) => {
  expressApp.get("/user/init", async (req, res) => {
    try {
      //получаем случайны ник
      const nickname = await fetch("https://names.drycodes.com/1");
      const nicknameData = await nickname.json();
      //получаем случайную фоточку - аватарку
      const picture = await fetch("https://dog.ceo/api/breeds/image/random");
      const pictureData = await picture.json();
      const user = {
        id: Date.now().toString(),
        nickname: nicknameData[0],
        picture: pictureData.message,
      };
      onlineUsers.addUser(user);
      res.json(user);
    } catch (error) {
      console.log("error = ", error);
      res.status(500).json(JSON.stringify(error));
    }
  });
};
