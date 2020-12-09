import React, { useState, useEffect, Fragment } from "react";

import { Container } from "semantic-ui-react";
import NavigationBar from "../../features/navigation/NavigationBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

import Agent from "../api/Agent";
import { IActivity } from "./../models/Activity";

const App = () => {
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    Agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleEditActivity = (activity: IActivity) => {
    Agent.Activities.update(activity).then(() => {
      setActivities([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleDeleteActivity = (id: string) => {
    Agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((a) => a.id !== id)]);
    })
  };

  useEffect(() => {
    Agent.Activities.list().then((response) => {
      let activities: IActivity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });
      setActivities(activities);
    });
  }, []);

  return (
    <Fragment>
      <NavigationBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
