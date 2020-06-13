import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

const PLACES = [
  `Wood and stone place`,
  `Only wood place`,
  `Only stone place`,
  `Paper place`
];

const placeNameClickHandler = () => {};

ReactDOM.render(
    <App places={PLACES} placeNameClickHandler={placeNameClickHandler}/>,
    document.querySelector(`#root`)
);
