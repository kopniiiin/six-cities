import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";

import {Path, AuthorizationStatus} from "../../const";

const propTypes = {
  authorizationStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)).isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired
};

const PrivateRoute = ({authorizationStatus, path, exact, render}) => (
  <Route
    path={path}
    exact={exact}
    render={() => authorizationStatus === AuthorizationStatus.AUTHORIZED ? render() : <Redirect to={Path.LOGIN}/>}/>
);

PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
