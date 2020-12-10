import { observable, action, computed, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/Activity";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable editMode: boolean = false;

  @observable initialLoading: boolean = false;
  @observable submitting: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @computed get activitiesByDate() {
    return this.activities.slice().sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  @action loadActivities = async () => {
    this.initialLoading = true;
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        this.activities.push(activity);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.initialLoading = false;
    }
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id);
    this.editMode = false;
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.activities.push(activity);
      this.editMode = false;
    } catch (error) {
      console.error();
    } finally {
      this.submitting = false;
    }
  };
}

export default createContext(new ActivityStore());
