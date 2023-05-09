import { FC } from "react";
import { IUser } from "../shared/types";
import { ChatUser } from "./ChatUser";

interface IOnlineUsersProps {
  users: IUser[];
}

export const OnlineUsers: FC<IOnlineUsersProps> = ({ users }) => {
  return (
    <div className='websocket-page__users'>
      <h4>Пользователи онлайн</h4>
      {users.map((user) => {
        return <ChatUser key={user.id} user={user} />;
      })}
    </div>
  );
};
