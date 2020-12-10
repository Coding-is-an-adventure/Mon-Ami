import React, {
  useState,
  useEffect,
  useContext,
  Fragment,
  SyntheticEvent,
} from "react";

import { Container } from "semantic-ui-react";
import NavigationBar from "../../features/navigation/NavigationBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Loading from "../layout/Loading";

import agent from "../api/agent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import { IActivity } from "../models/activity";

const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(event.currentTarget.name);
    setSubmitting(true);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.initialLoading) return <Loading content="Loading activities...." />;
  else
    return (
      <Fragment>
        <NavigationBar />
        <Container style={{ marginTop: "7em" }}>
          <ActivityDashboard
            setEditMode={setEditMode}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
            target={target}
          />
        </Container>
      </Fragment>
    );
};

export default observer(App);
