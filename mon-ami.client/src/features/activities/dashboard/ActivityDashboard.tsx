import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import ActivityList from "../dashboard/ActivityList";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivities, initialLoading } = rootStore.activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Grid>
      <Grid.Column width={16}>
        {initialLoading ? <ActivityListItemPlaceholder /> : <ActivityList />}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
