import MockAdapter from "axios-mock-adapter";

import {ServerURL, ServerResponseStatus, AuthorizationStatus} from "../../const.js";

import createAPI from "../../api.js";

import {ActionType, ActionCreator, Operation, reducer} from "./user.js";

describe(`UserActionCreator`, () => {
  it(`should create SET_AUTHORIZATION_STATUS action`, () => {
    const authorizationStatus = AuthorizationStatus.AUTHORIZED;

    expect(ActionCreator.setAuthorizationStatus(authorizationStatus)).toEqual({
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: authorizationStatus
    });
  });

  it(`should create SET_EMAIL action`, () => {
    const email = `email`;

    expect(ActionCreator.setEmail(email)).toEqual({
      type: ActionType.SET_EMAIL,
      payload: email
    });
  });
});

describe(`UserOperation`, () => {
  const email = `email`;
  const api = createAPI(() => {});

  new MockAdapter(api)
    .onGet(ServerURL.LOGIN).reply(ServerResponseStatus.OK, {email})
    .onPost(ServerURL.LOGIN).reply(ServerResponseStatus.OK, {email});

  it(`should check authorizationStatus`, () => {
    const dispatch = jest.fn();

    Operation.checkAuthorizationStatus()(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: ActionType.SET_AUTHORIZATION_STATUS, payload: AuthorizationStatus.AUTHORIZED});
        expect(dispatch).toHaveBeenNthCalledWith(2, {type: ActionType.SET_EMAIL, payload: email});
      });
  });

  it(`should login`, () => {
    const dispatch = jest.fn();

    Operation.login()(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {type: ActionType.SET_AUTHORIZATION_STATUS, payload: AuthorizationStatus.AUTHORIZED});
        expect(dispatch).toHaveBeenNthCalledWith(2, {type: ActionType.SET_EMAIL, payload: email});
      });
  });
});

describe(`userReducer`, () => {
  it(`should return initialState`, () => expect(reducer(undefined, {})).toEqual({
    authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
    email: null
  }));

  it(`should set authorizationStatus`, () => {
    const authorizationStatus = AuthorizationStatus.AUTHORIZED;

    expect(reducer(undefined, {type: ActionType.SET_AUTHORIZATION_STATUS, payload: authorizationStatus})).toEqual({
      authorizationStatus,
      email: null
    });
  });

  it(`should set email`, () => {
    const email = `email`;

    expect(reducer(undefined, {type: ActionType.SET_EMAIL, payload: email})).toEqual({
      authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
      email
    });
  });
});
