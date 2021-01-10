import { configure } from "mobx";
import { createContext } from "react";
import ActivityStore from "./activityStore";
import UserStore from "./userStore";

// Enforce the usage of an action when mutating the state of an observable in MobX.
configure({ enforceActions: "always" });

export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());