import {combineReducers} from "redux";

import NameSpace from "./name-space.js";

import {reducer as appReducer} from "./app/app.js";
import {reducer as offersReducer} from "./offers/offers.js";

const reducer = combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.OFFERS]: offersReducer
});

export default reducer;
