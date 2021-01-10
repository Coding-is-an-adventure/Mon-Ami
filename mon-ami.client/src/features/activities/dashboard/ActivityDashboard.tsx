import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import ActivityList from "../dashboard/ActivityList";
import { RootStoreContext } from "../../../app/stores/rootStore";
import Loading from "../../../app/layout/Loading";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivities, initialLoading } = rootStore.activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (initialLoading) {
    return <Loading content="Loading activities" />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
