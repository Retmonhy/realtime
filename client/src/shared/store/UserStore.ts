import { makeAutoObservable, runInAction } from "mobx";
import { IUser } from "../types";
import { UserService } from "../api/services";

export class UserStore {
  error: string | null = null;
  isLoading: boolean = false;
  id: string = "";
  nickname: string = "";
  picture: string = "";

  constructor() {
    makeAutoObservable(this);
  }
  setUser(user: IUser) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.picture = user.picture;
  }
  getUser() {
    return {
      id: this.id,
      nickname: this.nickname,
      picture: this.picture,
    };
  }
  async initUser() {
    try {
      this.isLoading = true;
      const { data } = await UserService.InitUser();
      if (data) {
        runInAction(() => {
          this.setUser(data);
        });
      }
    } catch (error: any) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
