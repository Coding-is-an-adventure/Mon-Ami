import React, { useEffect, useContext, Fragment } from "react";

import { Container } from "semantic-ui-react";
import NavigationBar from "../../features/navigation/NavigationBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Loading from "./Loading";

import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.initialLoading)
    return <Loading content="Loading activities...." />;
  else
    return (
      <Fragment>
        <NavigationBar />
        <Container style={{ marginTop: "7em" }}>
          <ActivityDashboard />
        </Container>
      </Fragment>
    );
};

export default observer(App);
