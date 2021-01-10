import React from "react";
import { Link } from "react-router-dom";
import { Segment, Header, Button, Icon } from "semantic-ui-react";

const NotFound: React.FC = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - We've have looked everywhere but we couldn't find what you were
        looking for.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          Return to Activities page
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
