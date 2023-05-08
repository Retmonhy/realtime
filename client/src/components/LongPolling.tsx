import React, { FC, useContext, useEffect, useState } from "react";
import { MessageService } from "../shared/api/services";
import { IMessage } from "../shared/types";
import { MessageForm } from "./MessageForm";
import { Chat } from "./Chat";
import { StoreContext } from "..";
interface ILongPollingProps {}

export const LongPolling: FC<ILongPollingProps> = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useContext(StoreContext);
  useEffect(() => {
    subscribe();
  }, []);
  const sendMessage = async (text: string) => {
    await MessageService.SendMessage({
      id: Date.now(),
      text: text,
      user: { nickname: user.nickname, picture: user.picture, id: user.id },
    });
  };
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
      <MessageForm onSend={sendMessage} />
      <Chat messages={messages} />
    </>
  );
};
