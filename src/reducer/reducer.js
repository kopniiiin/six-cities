import {combineReducers} from "redux";

import NameSpace from "./name-space";

import {reducer as appReducer} from "./app/app";
import {reducer as userReducer} from "./user/user";
import {reducer as offersReducer} from "./offers/offers";
import {reducer as reviewsReducer} from "./reviews/reviews";

const reducer = combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.OFFERS]: offersReducer,
  [NameSpace.REVIEWS]: reviewsReducer
});

export default reducer;
