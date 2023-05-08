export interface IMessage {
  id: number;
  text: string;
  user: IUser;
}
export interface IUser {
  id: string;
  nickname: string;
  picture: string;
}
