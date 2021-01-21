import {
  action,
  makeObservable,
  observable,
  runInAction,
  computed,
} from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { IPicture, IProfile } from "../models/profile";
import { RootStore } from "./rootStore";

export default class ProfileStore {
  rootStore: RootStore;

  @observable
  profile: IProfile | null = null;
  @observable
  loadingProfile: boolean = true;
  @observable
  uploadingPicture: boolean = false;
  @observable
  loading: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @computed
  get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.userName === this.profile.username;
    } else {
      return false;
    }
  }

  @action
  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loadingProfile = false;
      });
    }
  };

  @action
  uploadPicture = async (file: Blob) => {
    try {
      const picture = await agent.Profiles.uploadPicture(file);
      runInAction(() => {
        if (this.profile) {
          this.profile.pictures.push(picture);
          if (picture.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = picture.url;
            this.profile.image = picture.url;
          }
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("An error occured while uploading an image");
    } finally {
      runInAction(() => {
        this.uploadingPicture = false;
      });
    }
  };

  @action
  setMainPicture = async (picture: IPicture) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPicture(picture.id);
      runInAction(() => {
        this.rootStore.userStore.user!.image = picture.url;
        this.profile!.pictures.find((a) => a.isMain)!.isMain = false;
        this.profile!.pictures.find((a) => a.id === picture.id)!.isMain = true;
        this.profile!.image = picture.url;
      });
    } catch (error) {
      console.log(error);
      toast.error("An error occured setting a main profile picture");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  deletePicture = async (picture: IPicture) => {
    try {
      await agent.Profiles.deletePicture(picture.id);
      runInAction(() => {
        this.profile!.pictures = this.profile!.pictures.filter(
          (a) => a.id !== picture.id
        );
      });
    } catch (error) {
      console.log(error);
      toast.error("An error occured while deleting the picture");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
