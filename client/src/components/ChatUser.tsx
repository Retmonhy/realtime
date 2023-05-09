import { FC } from "react";
import { IUser } from "../shared/types";

interface IChatUserProps {
  user: IUser;
}

export const ChatUser: FC<IChatUserProps> = ({ user }) => {
  return (
    <div className='chat-user'>
      <div className='content'>
        <div className='image'>
          <img className='image' src={user.picture} />
        </div>
        <div>
          <p className='nickname'>{user.nickname}</p>
        </div>
      </div>
    </div>
  );
};
