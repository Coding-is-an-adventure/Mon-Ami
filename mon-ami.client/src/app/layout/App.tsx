import React, { useState, useEffect, Fragment } from "react";

import { Container } from "semantic-ui-react";
import NavigationBar from "../../features/navigation/NavigationBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

import axios from "axios";
import { IActivity } from "./../models/Activity";

const App = () => {
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  useEffect(() => {
    axios
      .get<IActivity[]>("https://localhost:44380/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment>
      <NavigationBar openCreateForm={handleOpenCreateForm}/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
