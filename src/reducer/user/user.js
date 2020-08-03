import {ServerURL, AuthorizationStatus} from "../../const";

import {extend} from "../../utils";

const initialState = {
  authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
  email: null
};

export const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  SET_EMAIL: `SET_EMAIL`
};

export const ActionCreator = {
  setAuthorizationStatus: (authorizationStatus) => ({type: ActionType.SET_AUTHORIZATION_STATUS, payload: authorizationStatus}),
  setEmail: (email) => ({type: ActionType.SET_EMAIL, payload: email})
};

export const Operation = {
  checkAuthorizationStatus: () => (dispatch, getState, api) => api.get(ServerURL.LOGIN)
    .then(({data: {email}}) => {
      dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
      dispatch(ActionCreator.setEmail(email));
    }),

  login: (authorizationData) => (dispatch, getState, api) => api.post(ServerURL.LOGIN, authorizationData)
    .then(({data: {email}}) => {
      dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTHORIZED));
      dispatch(ActionCreator.setEmail(email));
    })
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return extend(state, {authorizationStatus: action.payload});
    case ActionType.SET_EMAIL:
      return extend(state, {email: action.payload});
  }

  return state;
};
