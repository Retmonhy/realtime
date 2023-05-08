import React, { FC } from "react";
import { IMessage } from "../shared/types";
interface IMessageProps {
  message: IMessage;
}

export const Message: FC<IMessageProps> = ({ message }) => {
  console.log("message = ", message);
  return (
    <div className='message'>
      <div className='message__content'>
        <div className='message__image'>
          <img className='message__image' src={message.user.picture} />
        </div>
        <div>
          <p className='message__nickname'>{message.user.nickname}</p>
          <p className='message__text'>{message.text}</p>
        </div>
      </div>
    </div>
  );
};
