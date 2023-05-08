import { UserStore } from "./UserStore";
export class Store {
  user: UserStore;
  constructor() {
    this.user = new UserStore();
  }
}
export const store = new Store();
