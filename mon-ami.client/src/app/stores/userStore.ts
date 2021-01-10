import {
  observable,
  action,
  computed,
  makeObservable,
  runInAction,
} from "mobx";
import { RootStore } from "./rootStore";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/user";

export default class UserStore {
  rootStore: RootStore;

  @observable
  user: IUser | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @computed
  get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      console.log(user);
    } catch (error) {
      throw error;
    }
  };
}
