import React, { useState, useEffect, Fragment } from "react";

import { Container } from "semantic-ui-react";
import NavigationBar from "../../features/navigation/NavigationBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

import axios from "axios";
import { IActivity } from "./../models/Activity";

const App = () => {
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [activities, setActivities] = useState<IActivity[]>([]);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
  };

  useEffect(() => {
    axios
      .get<IActivity[]>("https://localhost:44380/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment>
      <NavigationBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
