import NameSpace from "../name-space";

export const getActiveCity = (state) => state[NameSpace.APP].activeCity;

export const getActiveSortType = (state) => state[NameSpace.APP].activeSortType;
