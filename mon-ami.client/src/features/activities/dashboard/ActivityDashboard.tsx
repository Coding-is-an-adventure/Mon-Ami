import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import ActivityList from "../dashboard/ActivityList";

interface IActivityDashboardProps {
  activities: IActivity[];
}

const ActivityDashboard: React.FC<IActivityDashboardProps> = ({
  activities,
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
