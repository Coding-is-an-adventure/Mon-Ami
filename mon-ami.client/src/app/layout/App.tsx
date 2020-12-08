import React, { useState, useEffect, Fragment } from "react";

import { Container } from "semantic-ui-react";
import NavigationBar from "../../features/navigation/NavigationBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

import axios from "axios";
import { IActivity } from "./../models/Activity";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

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
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
};

export default App;
