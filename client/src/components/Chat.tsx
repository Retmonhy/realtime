import React, { FC } from "react";
import { IMessage } from "../shared/types";
import { Message } from "./Message";
interface IChatProps {
  messages: IMessage[];
}

export const Chat: FC<IChatProps> = ({ messages }) => {
  return (
    <div className='mform wrapper'>
      <h4>Сообщения</h4>
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};
