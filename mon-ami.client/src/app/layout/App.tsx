import React, { Fragment, useContext, useEffect } from "react";

import { Container } from "semantic-ui-react";

import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";

import NavigationBar from "../../features/navigation/NavigationBar";
import HomePage from "../../features/home/HomePage";
import ProfilePage from "../../features/profiles/ProfilePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

import { ToastContainer } from "react-toastify";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../stores/rootStore";
import Loading from "./Loading";
import ModalContainer from "../common/modals/ModalContainer";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) {
    return <Loading content="Loading app..." />;
  }

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-left" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavigationBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path="/activities"
                  component={ActivityDashboard}
                />
                <PrivateRoute
                  path="/activities/:id"
                  component={ActivityDetails}
                />
                <PrivateRoute
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <PrivateRoute
                  path="/profile/:username"
                  component={ProfilePage}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
