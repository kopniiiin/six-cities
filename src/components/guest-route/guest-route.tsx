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

const GuestRoute = ({authorizationStatus, path, exact, render}) => (
  <Route
    path={path}
    exact={exact}
    render={() => authorizationStatus === AuthorizationStatus.UNAUTHORIZED ? render() : <Redirect to={Path.MAIN}/>}/>
);

GuestRoute.propTypes = propTypes;

export default GuestRoute;
