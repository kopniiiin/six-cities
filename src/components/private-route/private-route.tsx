import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";

import {Path, AuthorizationStatus} from "../../types";

type Props = RouteProps & {
  authorizationStatus: AuthorizationStatus;
  render: () => React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({authorizationStatus, path, exact, render}: Props) => (
  <Route
    path={path}
    exact={exact}
    render={() => authorizationStatus === AuthorizationStatus.AUTHORIZED ? render() : <Redirect to={Path.LOGIN}/>}/>
);

export default PrivateRoute;
