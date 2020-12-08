import React from "react";
import { Segment, Form } from "semantic-ui-react";

interface ActivityFormProps {}

const ActivityForm: React.FC<ActivityFormProps> = () => {
  return <Segment>
    <Form>
      <Form.Input placeholder="Title" />
      <Form.TextArea placeholder="Description" />
      <Form.Input placeholder="Category" />
      <Form.Input placeholder="Date" />
      <Form.Input placeholder="City" />
      <Form.Input placeholder="Venue" />
    </Form>
  </Segment>;
};

export default ActivityForm;
