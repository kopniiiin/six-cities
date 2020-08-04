export enum OfferType {
  APARTMENT = `apartment`,
  HOTEL = `hotel`,
  HOUSE = `house`,
  ROOM = `room`
}

export enum City {
  PARIS = `Paris`,
  COLOGNE = `Cologne`,
  BRUSSELS = `Brussels`,
  AMSTERDAM = `Amsterdam`,
  HAMBURG = `Hamburg`,
  DUSSELDORF = `Dusseldorf`
}

export enum SortType {
  POPULAR = `popular`,
  TO_HIGH_PRICE = `price: low to high`,
  TO_LOW_PRICE = `price: high to low`,
  TOP_RATED = `top rated first`
}

export enum Path {
  MAIN = `/`,
  LOGIN = `/login`,
  OFFER = `/offer`,
  FAVORITES = `/favorites`
}

export enum ServerURL {
  LOGIN = `/login`,
  OFFERS = `/hotels`,
  FAVORITES = `/favorite`,
  REVIEWS = `/comments`
}

export enum ServerResponseStatus {
  OK = 200,
  UNAUTHORIZED = 401
}

export enum AuthorizationStatus {
  AUTHORIZED = `AUTHORIZED`,
  UNAUTHORIZED = `UNAUTHORIZED`
}

export interface Id {
  id: string;
}

export interface Location {
  coordinates: number[];
}

export interface User {
  name: string;
  photo: string;
}

export type Offer = Id & {
  type: OfferType;
  name: string;
  mainPhoto: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  price: number;
}

export interface Review {
  date: string;
  text: string;
  rating: number;
  user: User;
}

export type ReviewWithId = Id & Review;

export interface ReviewData {
  text: string;
  rating: number;
}

export interface AuthorizationData {
  email: string;
  password: string;
}
