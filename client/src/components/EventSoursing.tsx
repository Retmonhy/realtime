import { FC, useContext, useEffect, useState } from "react";
import { IMessage } from "../shared/types";
import { MessageForm } from "./MessageForm";
import { Chat } from "./Chat";
import { StoreContext } from "..";
import { MessageService } from "../shared/api/services";
interface IEventSoursingProps {}

export const EventSoursing: FC<IEventSoursingProps> = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useContext(StoreContext);
  const sendMessage = async (text: string) => {
    await MessageService.SendMessage({
      id: Date.now().toString(),
      text: text,
      user: { nickname: user.nickname, picture: user.picture, id: user.id },
    });
  };

  useEffect(() => {
    subscribe();
  }, []);
  //тут подписывааемся на события, чтобы ссервер слал запрос, как только пользователь добавит новое сообщение
  const subscribe = async () => {
    const eventSource = new EventSource("http://localhost:5000/connect");
    eventSource.onmessage = function (event: MessageEvent) {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
  };
  return (
    <>
      <Chat messages={messages} />
      <MessageForm onSend={sendMessage} />
    </>
  );
};
