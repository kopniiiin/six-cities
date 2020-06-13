import React from "react";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";

const App = (props) => {
  const {places, placeNameClickHandler} = props;

  return <Main places={places} placeNameClickHandler={placeNameClickHandler}/>;
};

App.propTypes = {
  places: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeNameClickHandler: PropTypes.func.isRequired
};

export default App;
