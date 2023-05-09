import React, { FC } from "react";
import { IMessage } from "../shared/types";
interface IMessageProps {
  message: IMessage;
}

export const Message: FC<IMessageProps> = ({ message }) => {
  return (
    <div className='message'>
      <div className='content'>
        <div className='image'>
          <img className='image' src={message.user.picture} />
        </div>
        <div>
          <p className='nickname'>{message.user.nickname}</p>
          <p className='text'>{message.text}</p>
        </div>
      </div>
    </div>
  );
};
