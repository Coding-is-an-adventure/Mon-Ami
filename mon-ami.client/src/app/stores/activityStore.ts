import { observable, action, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/Activity";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable initialLoading = false;

  constructor() {
    makeObservable(this)
  }

  @action loadActivities = () => {
    this.initialLoading = true;
    agent.Activities.list()
      .then((activities) => {
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activities.push(activity);
        });
      })
      .finally(() => (this.initialLoading = false));
  };
}

export default createContext(new ActivityStore());
