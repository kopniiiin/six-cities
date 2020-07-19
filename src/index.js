import React from "react";
import ReactDOM from "react-dom";
import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

import App from "./components/app/app.jsx";

import createAPI from "./api.js";

import reducer from "./reducer/reducer.js";
import {Operation as OffersOperation} from "./reducer/offers/offers.js";

const api = createAPI();

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(OffersOperation.loadOffers());

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.querySelector(`#root`)
);
