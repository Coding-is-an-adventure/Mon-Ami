import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import ActivityList from "../dashboard/ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface IActivityDashboardProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
}

const ActivityDashboard: React.FC<IActivityDashboardProps> = ({
  activities,
  selectActivity,
  selectedActivity,
}) => {
  return (
    <Grid>
      <Grid.Column width={6}>
        {selectedActivity && <ActivityDetails activity={selectedActivity} />}
        <ActivityForm />
      </Grid.Column>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
