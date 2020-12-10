import { observable, action, computed, makeObservable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable selectedActivity: IActivity | undefined;
  @observable editMode: boolean = false;

  @observable initialLoading: boolean = false;
  @observable submitting: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.initialLoading = true;
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        this.activityRegistry.set(activity.id, activity);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.initialLoading = false;
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      this.editMode = false;
    } catch (error) {
      console.error();
    } finally {
      this.submitting = false;
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.editMode = false;
    } catch (error) {
      console.log(error);
    } finally {
      this.submitting = false;
    }
  };
}

export default createContext(new ActivityStore());
