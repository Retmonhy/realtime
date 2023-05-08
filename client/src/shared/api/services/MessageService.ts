import { IMessage } from "../../types";
import { api } from "../api";
import { Endpoints } from "../interface";

export class MessageService {
  static GetMessage() {
    return api.get(Endpoints.GetMessage);
  }
  static SendMessage(payload: IMessage) {
    return api.post(Endpoints.SendMessage, payload);
  }
}
