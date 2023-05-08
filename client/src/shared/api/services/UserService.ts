import { api } from "../api";
import { Endpoints } from "../interface";

export class UserService {
  static InitUser() {
    return api.get(Endpoints.InitUser);
  }
}
