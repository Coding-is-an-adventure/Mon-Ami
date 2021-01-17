import React, { useState, useContext, useEffect } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { ActivityFormModel } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/utilities/utilities";
import { v4 as uuid } from "uuid";
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";

const validator = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  category: isRequired("Category"),
  date: isRequired("Date"),
  time: isRequired("Time"),
  city: isRequired("City"),
  venue: isRequired("Venue"),
});

interface IDetailParameters {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<IDetailParameters>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    submitting,
    loadActivity,
    createActivity,
    editActivity,
  } = rootStore.activityStore;

  const [activity, setActivity] = useState(new ActivityFormModel());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadActivity(match.params.id)
        .then((activity) => setActivity(new ActivityFormModel(activity)))
        .finally(() => setLoading(false));
    }
  }, [loadActivity, match.params.id]);

  const handleFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validator}
            initialValues={activity}
            onSubmit={handleFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
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
                <Form.Group widths="equal">
                  <Field
                    component={DateInput}
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={activity.date}
                  />
                  <Field
                    component={DateInput}
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={activity.time}
                  />
                </Form.Group>
                <Field
                  name="city"
                  placeholder="City"
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  name="venue"
                  placeholder="Venue"
                  value={activity.venue}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push("/activities")
                  }
                  disabled={loading}
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
