import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

import {AuthorizationStatus} from "./types";

import App from "./components/app/app";

import createAPI from "./api";

import reducer from "./reducer/reducer";
import {ActionCreator as UserActionCreator, Operation as UserOperation} from "./reducer/user/user";
import {Operation as OffersOperation} from "./reducer/offers/offers";

const api = createAPI(() => store.dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.UNAUTHORIZED)));

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(UserOperation.checkAuthorizationStatus());
store.dispatch(OffersOperation.loadOffers());

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.querySelector(`#root`)
);
