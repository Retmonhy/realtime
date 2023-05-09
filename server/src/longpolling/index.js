const events = require("events");

module.exports = (expressApp) => {
  const emitter = new events.EventEmitter();

  expressApp.get("/get-message", (req, res) => {
    emitter.once("newMessage", (message) => {
      res.json(message);
    });
  });
  expressApp.post("/new-message", (req, res) => {
    const message = req.body;
    emitter.emit("newMessage", message);
    res.status(200).json();
  });
};
