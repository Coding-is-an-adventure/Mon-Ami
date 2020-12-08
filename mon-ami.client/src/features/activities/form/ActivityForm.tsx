import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

interface IActivityFormProps {
  setEditMode: (editMode: boolean) => void;
}

const ActivityForm: React.FC<IActivityFormProps> = ({ setEditMode }) => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea rows={2} placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input type="date" placeholder="Date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
