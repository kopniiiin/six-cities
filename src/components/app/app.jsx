import React from "react";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";

const App = (props) => {
  const {places} = props;

  return <Main places={places}/>;
};

App.propTypes = {
  places: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
