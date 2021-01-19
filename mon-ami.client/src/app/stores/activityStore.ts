import {
  observable,
  action,
  computed,
  makeObservable,
  runInAction,
} from "mobx";
import { RootStore } from "./rootStore";
import { SyntheticEvent } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";
import { history } from "../..";
import { toast } from "react-toastify";
import {
  createAttendee,
  setActivityProps,
} from "../common/utilities/utilities";

export default class ActivityStore {
  rootStore: RootStore;

  @observable
  activityRegistry = new Map();
  @observable
  activity: IActivity | null = null;
  @observable
  initialLoading: boolean = false;
  @observable
  submitting: boolean = false;
  @observable
  target: string = "";
  @observable
  loading: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @computed
  get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  @action
  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivities = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action
  loadActivities = async () => {
    this.initialLoading = true;
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
        });
      });
    } catch (error) {
      console.log(error.response);
    } finally {
      runInAction(() => {
        this.initialLoading = false;
      });
    }
  };

  @action
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.initialLoading = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction(() => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.initialLoading = false;
        });
        return activity;
      } catch (error) {
        console.log(error.response);
        runInAction(() => {
          this.initialLoading = false;
        });
      }
    }
  };

  @action
  clearActivity = () => {
    this.activity = null;
  };

  @action
  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action
  createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      activity.attendees = attendees;
      activity.isHost = true;
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      console.log(error.response);
      toast.error("Problem submitting data");
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action
  editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      console.log(error.response);
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action
  deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    try {
      this.submitting = true;
      this.target = event.currentTarget.name;
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
      });
    } catch (error) {
      console.log(error.response);
    } finally {
      runInAction(() => {
        this.submitting = false;
        this.target = "";
      });
    }
  };

  @action
  attendActivity = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Activities.attend(this.activity!.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees.push(attendee);
          this.activity.isGoing = true;
          this.activityRegistry.set(this.activity.id, this.activity);
        }
      });
    } catch (error) {
      console.log(error.response);
      toast.error("An error occured while signing up to an activity!");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  cancelAttendance = async () => {
    this.loading = true;
    try {
      await agent.Activities.leave(this.activity!.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees = this.activity.attendees.filter(
            (a) => a.username !== this.rootStore.userStore.user!.userName
          );
          this.activity.isGoing = false;
          this.activityRegistry.set(this.activity.id, this.activity);
        }
      });
    } catch (error) {
      console.log(error.response);
      toast.error(
        "An error occured while cancelling attendance to an activity!"
      );
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
