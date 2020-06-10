import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

const PLACE_AMOUNT = 4;

ReactDOM.render(<App placeAmount={PLACE_AMOUNT}/>, document.querySelector(`#root`));
