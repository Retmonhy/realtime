export interface IMessage {
  id: string;
  text: string;
  user: IUser;
}
export interface IUser {
  id: string;
  nickname: string;
  picture: string;
}

export enum MessageType {
  UserConnect = "UserConnect",
  ChatMessage = "ChatMessage",
}
