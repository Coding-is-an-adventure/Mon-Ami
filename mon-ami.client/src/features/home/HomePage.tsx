import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Header, Image, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

const HomePage: React.FC = () => {
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

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
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}!`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to the activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Mon Ami" />
            <Button
              onClick={() => openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
