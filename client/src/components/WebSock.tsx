import { FC, useContext, useEffect, useState } from "react";
import { IMessage } from "../shared/types";
import { MessageForm } from "./MessageForm";
import { Chat } from "./Chat";
import { StoreContext } from "..";
interface IWebSockProps {}

export const WebSock: FC<IWebSockProps> = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useContext(StoreContext);
  useEffect(() => {
    connect();
  }, []);
  const websocket = new WebSocket("ws://localhost:5000");
  //тут идет коннект к вебсокет серверу
  const connect = async () => {
    if (websocket) {
      websocket.onopen = () => {
        console.log("websocket is started");
      };
      websocket.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);
        console.log("message = ", message);
        setMessages((prev) => [message, ...prev]);
      };
    }
  };
  const sendMessage = (text: string) => {
    const message = { id: Date.now(), text, user: { nickname: user.nickname, picture: user.picture, id: user.id } };
    websocket.send(JSON.stringify(message));
  };
  return (
    <>
      <MessageForm onSend={sendMessage} />
      <Chat messages={messages} />
    </>
  );
};
