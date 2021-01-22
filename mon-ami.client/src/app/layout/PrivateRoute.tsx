import React, { useContext } from "react";
import { RootStoreContext } from "../stores/rootStore";
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from "react-router-dom";
import { observer } from "mobx-react-lite";

interface IPrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const rootstore = useContext(RootStoreContext);
  const { isLoggedIn } = rootstore.userStore;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={"/"} />
      }
    />
  );
};

export default observer(PrivateRoute);
