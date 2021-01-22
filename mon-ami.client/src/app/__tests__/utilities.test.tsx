import {combineDateAndTime, createAttendee, setActivityProps} from "../common/utilities/utilities";
import { IActivity, IAttendee } from "../models/activity";
import { IUser } from "../models/user";

test("Correct date input", () => {
    let expected = combineDateAndTime(new Date("2011-10-05T14:48:00.312Z"), new Date("2000-10-10T14:48:00.000Z"));
    let actual = new Date("2011-10-05T14:48:00.000Z");
    expect(actual).toStrictEqual(expected);
});

test("Correct attendee", () => {
    let user: IUser = {
        displayName: "Bob",
        userName: "bob",
        image: "image",
        token: "invalid token"
    };
    
    let expected: IAttendee = {
        username: "bob",
        displayName: "Bob",
        image: "image",
        isHost: false
    };

    let actual = createAttendee(user);
    expect(actual).toStrictEqual(expected)
});

test("Return correct activity", () => {
    let user: IUser = {
        displayName: "Bob",
        userName: "bob",
        image: "image",
        token: "invalid token"
    };
    
    let activity: IActivity = {
        id: "abcdefg",
        title: "Soccer match",
        description: "Watch soccer",
        category: "Culture",
        date: new Date("2011-10-05T14:48:00.000Z"),
        city: "Eindhoven",
        venue: "PSV Stadium",
        isGoing: true,
        isHost: false,
        attendees: [],
        comments: []
    }

    let expected = {
        attendees: [],
        category: "Culture",
        city: "Eindhoven",
        comments: [],
        date: new Date("2011-10-05T14:48:00.000Z"),
        description: "Watch soccer",
        id: "abcdefg",
        isGoing: false,
        isHost: false,
        title: "Soccer match",
        venue: "PSV Stadium",
    }

    let actual = setActivityProps(activity, user);
    expect(actual).toStrictEqual(expected);
});