import {combineReducers} from "redux";

import NameSpace from "./name-space.js";

import {reducer as appReducer} from "./app/app.js";
import {reducer as userReducer} from "./user/user.js";
import {reducer as offersReducer} from "./offers/offers.js";
import {reducer as reviewsReducer} from "./reviews/reviews.js";

const reducer = combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.OFFERS]: offersReducer,
  [NameSpace.REVIEWS]: reviewsReducer
});

export default reducer;
