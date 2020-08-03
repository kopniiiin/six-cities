import React from "react";
import ReactDOM from "react-dom";
import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

import {AuthorizationStatus} from "./const.js";

import App from "./components/app/app.jsx";

import createAPI from "./api.js";

import reducer from "./reducer/reducer.js";
import {ActionCreator as UserActionCreator, Operation as UserOperation} from "./reducer/user/user.js";
import {Operation as OffersOperation} from "./reducer/offers/offers.js";

const api = createAPI(() => store.dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.UNAUTHORIZED)));

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(UserOperation.checkAuthorizationStatus());
store.dispatch(OffersOperation.loadOffers());

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.querySelector(`#root`)
);
