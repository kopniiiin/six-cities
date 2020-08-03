import NameSpace from "../name-space";

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;

export const getEmail = (state) => state[NameSpace.USER].email;
