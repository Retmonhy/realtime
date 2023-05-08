export enum Endpoints {
  SendMessage = "/new-message",
  GetMessage = "get-message",
  InitUser = "user/init",
}

export interface ISendMessagePayload {
  id: string;
  nickname: string;
  picture: string;
  text: string;
}
