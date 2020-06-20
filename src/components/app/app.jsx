import React from "react";

import Main from "../main/main.jsx";

const propTypes = Main.propTypes;

const App = (props) => {
  const {offers} = props;

  return <Main offers={offers}/>;
};

App.propTypes = propTypes;

export default App;
