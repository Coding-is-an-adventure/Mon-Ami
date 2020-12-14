import React, { useState, useContext, useEffect } from "react";
import ActivityStore from "../../../app/stores/activityStore";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions"
import DateInput from "../../../app/common/form/DateInput";

interface IDetailParameters {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<IDetailParameters>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      clearActivity();
    };
  }, [
    activity.id.length,
    clearActivity,
    history,
    initialFormState,
    loadActivity,
    match.params.id,
  ]);

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={activity.description}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  options={categoryOptions}
                  placeholder="Category"
                  value={activity.category}
                  component={SelectInput}
                />
                <Field
                  name="date"
                  placeholder="Date"
                  date={true}
                  value={activity.date}
                  component={DateInput}
                />
                <Field
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={() => history.push("/activities")}
                  floated="right"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
