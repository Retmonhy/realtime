import { FC, memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { IMessage, IUser, MessageType } from "../shared/types";
import { MessageForm } from "./MessageForm";
import { Chat } from "./Chat";
import { StoreContext } from "..";
import { OnlineUsers } from "./OnlineUsers";
interface IWebSockProps {}

export const WebSock: FC<IWebSockProps> = memo(() => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<IUser[]>([]);
  const { user } = useContext(StoreContext);
  const websocket = useRef<WebSocket>();
  useEffect(() => {
    websocket.current = new WebSocket(`ws://localhost:5000?userId=${user.id}`);
    websocket.current.onopen = () => {
      const message = {
        type: "UserConnect",
        user: { id: user.id, nickname: user.nickname, picture: user.picture },
      };
      if (websocket.current) {
        websocket.current.send(JSON.stringify(message));
      }
    };
    websocket.current.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case MessageType.ChatMessage:
          setMessages((prev) => [message, ...prev]);
          break;
        case MessageType.UserConnect:
          //если включить, то будет много ререндеров
          setOnlineUsers(message.users);
          break;
      }
    };
    return () => {
      if (websocket.current) websocket.current.close(1000, "Пользователь покинул страницу");
    };
  }, []);
  //тут идет коннект к вебсокет серверу
  const sendMessage = (text: string) => {
    const message = { type: MessageType.ChatMessage, id: Date.now().toString(), text, user: { nickname: user.nickname, picture: user.picture, id: user.id } };
    if (websocket.current) websocket.current.send(JSON.stringify(message));
  };
  return (
    <>
      <div className='websocket-page'>
        {onlineUsers.length ? <OnlineUsers users={onlineUsers} /> : null}
        <div className='websocket-page__content'>
          <Chat messages={messages} />
          <MessageForm onSend={sendMessage} />
        </div>
      </div>
    </>
  );
});
