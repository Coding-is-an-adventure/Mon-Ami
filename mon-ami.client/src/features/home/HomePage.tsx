import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Header, Image, Button } from "semantic-ui-react";

const HomePage: React.FC = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Mon Ami
        </Header>
        <Header as="h2" inverted content="Welcome to Mon Ami" />
        <Button as={Link} to="/login" size="huge" inverted>
          Login
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
