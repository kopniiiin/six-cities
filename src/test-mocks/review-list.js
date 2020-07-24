import {AuthorizationStatus} from "../const.js";

export default {
  authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
  reviews: [{
    id: `4`,
    date: `2020-04-04`,
    text: `Good`,
    rating: 4,
    user: {
      name: `User`,
      photo: `photo`
    }
  }],
  onReviewFormSubmit: () => {}
};
