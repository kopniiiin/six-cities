import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

const PLACES = [
  `Wood and stone place`,
  `Only wood place`,
  `Only stone place`,
  `Paper place`
];

ReactDOM.render(<App places={PLACES}/>, document.querySelector(`#root`));
