import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";

import {Path, AuthorizationStatus} from "../../types";

type Props = RouteProps & {
  authorizationStatus: AuthorizationStatus;
  render: () => React.ReactNode;
}

const GuestRoute: React.FC<Props> = ({authorizationStatus, path, exact, render}: Props) => (
  <Route
    path={path}
    exact={exact}
    render={() => authorizationStatus === AuthorizationStatus.UNAUTHORIZED ? render() : <Redirect to={Path.MAIN}/>}/>
);

export default GuestRoute;
