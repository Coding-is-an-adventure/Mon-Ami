import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { RouteComponentProps } from "react-router";
import Loading from "../../../app/layout/Loading";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";

interface IDetailParameters {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<IDetailParameters>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, initialLoading } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (initialLoading) {
    return <Loading content="Loading activity..." />;
  }

  if (!activity) {
    return <h2>Activity not found</h2>;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSideBar attendees={activity.attendees}/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
