import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
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
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, initialLoading } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (initialLoading || !activity) {
    return <Loading content="Loading activity..." />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
