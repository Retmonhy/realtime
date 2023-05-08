import React, { FC, useEffect, useState } from "react";
import { MessageService } from "../shared/api/services";
import { IMessage } from "../shared/types";
import { MessageForm } from "./MessageForm";
import { Chat } from "./Chat";
interface ILongPollingProps {}

export const LongPolling: FC<ILongPollingProps> = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  useEffect(() => {
    subscribe();
  }, []);
  //тут подписывааемся на события, чтобы ссервер слал запрос, как только пользователь добавит новое сообщение
  const subscribe = async () => {
    try {
      const { data } = await MessageService.GetMessage();
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (error) {
      console.log("Subscribe error");
      setTimeout(() => {
        subscribe();
      }, 500);
    }
  };
  return (
    <>
      <MessageForm />
      <Chat messages={messages} />
    </>
  );
};
