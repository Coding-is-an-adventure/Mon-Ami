import { IActivity, IAttendee } from "../../models/activity";
import { IUser } from "../../models/user";

export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ":" + time.getMinutes() + ":00";

  const year = date.getFullYear();
  // starts at 0.
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const datestring = `${year}-${month}-${day}`;
  return new Date(datestring + " " + timeString);
};

export const setActivityProps = (activity: IActivity, user: IUser) => {
  activity.date = new Date(activity.date);
  activity.isGoing = activity.attendees.some(a => a.username === user.userName);
  activity.isHost = activity.attendees.some(a => a.username === user.userName && a.isHost);

  return activity;
}

export const createAttendee = (user: IUser): IAttendee => {
  return {
    displayName: user.displayName,
    isHost: false,
    username: user.userName,
    image: user.image!
  }
}