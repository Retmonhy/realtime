import { FC, useEffect, useState } from "react";
import { IMessage } from "../shared/types";
import { MessageForm } from "./MessageForm";
import { Chat } from "./Chat";
interface IEventSoursingProps {}

export const EventSoursing: FC<IEventSoursingProps> = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  useEffect(() => {
    subscribe();
  }, []);
  //тут подписывааемся на события, чтобы ссервер слал запрос, как только пользователь добавит новое сообщение
  const subscribe = async () => {
    console.log("EventSoursing = ");
    const eventSource = new EventSource("http://localhost:5000/connect");
    eventSource.onmessage = function (event: MessageEvent) {
      // console.log(event.data);
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
  };
  return (
    <>
      <MessageForm />
      <Chat messages={messages} />
    </>
  );
};
