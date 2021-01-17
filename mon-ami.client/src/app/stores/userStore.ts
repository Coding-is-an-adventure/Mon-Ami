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
import { history } from "../..";

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

  @action
  getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action
  register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };

  @action
  login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  };

  @action
  logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };
}
