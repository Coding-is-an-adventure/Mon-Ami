import React, { useState, useEffect } from "react";
import { Header, Icon, List } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/Activity";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios
      .get<IActivity[]>("https://localhost:44380/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  return (
    <div className="App">
      <Header as="h2">
        <Icon name="users"></Icon>
        <Header.Content>Mon Ami</Header.Content>
      </Header>
      <List>
        {activities.map((activity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
};

export default App;
