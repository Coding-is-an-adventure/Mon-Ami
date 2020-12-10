import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityStore from "../../../app/stores/activityStore";

interface IActivityDetailsProps {
  setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IActivityDetailsProps> = ({
  setSelectedActivity,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    openEditForm,
    cancelFormOpen,
    cancelSelectedActivity,
  } = activityStore;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>
          <span>{activity!.description}</span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(activity!.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => setSelectedActivity(null)}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
