import React from "react";

import Main from "../main/main.jsx";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {placeAmount} = props;

  return <Main placeAmount={placeAmount}/>;
};

export default App;
