import * as React from "react";
import {Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import history from "../../history";

import {
  City,
  SortType,
  Path,
  AuthorizationStatus,
  Location,
  Offer,
  AuthorizationData
} from "../../types";

import GuestRoute from "../guest-route/guest-route";
import PrivateRoute from "../private-route/private-route";
import ErrorMessage from "../error-message/error-message";
import Header from "../header/header";
import Main from "../main/main";
import LoginScreen from "../login-screen/login-screen";
import OfferScreen from "../offer-screen/offer-screen";
import FavoritesScreen from "../favorites-screen/favorites-screen";

import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withAuthorizationData from "../../hocs/with-authorization-data/with-authorization-data";

import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {getActiveCity, getActiveSortType} from "../../reducer/app/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import {getAuthorizationStatus, getEmail} from "../../reducer/user/selectors";
import {Operation as OffersOperation} from "../../reducer/offers/offers";
import {getError, getFilteredAndSortedOffers} from "../../reducer/offers/selectors";

const MainWithActiveItem = withActiveItem(Main);
const LoginScreenWithAuthorizationData = withAuthorizationData(LoginScreen);

interface Props {
  authorizationStatus: AuthorizationStatus;
  email?: string;
  activeCity: City;
  activeSortType: SortType;
  error?: string;
  offers: (Offer & {
    location: Location;
    city: {location: Location & {zoom: number}};
  })[];
  onCityClick: (city: City) => void;
  onSortTypeChange: (sortType: SortType) => void;
  onLoginScreenSubmit: (authorizationData: AuthorizationData) => void;
  onOfferFavoritenessChange: (id: string) => void;
}

class App extends React.PureComponent<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this._handleLoginScreenSubmit = this._handleLoginScreenSubmit.bind(this);
    this._handleOfferCardBookmarkButtonClick = this._handleOfferCardBookmarkButtonClick.bind(this);
  }

  _handleLoginScreenSubmit(authorizationData) {
    const {onLoginScreenSubmit} = this.props;

    onLoginScreenSubmit(authorizationData);
  }

  _handleOfferCardBookmarkButtonClick(offerId) {
    const {authorizationStatus, onOfferFavoritenessChange} = this.props;

    if (authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      onOfferFavoritenessChange(offerId);
      return;
    }

    history.push(Path.LOGIN);
  }

  render() {
    const {
      authorizationStatus,
      email,
      activeCity,
      activeSortType,
      error,
      offers,
      onCityClick,
      onSortTypeChange,
    } = this.props;

    const header = <Header email={email}>{error && <ErrorMessage text={error}/>}</Header>;

    return (
      <Router history={history}>
        <Switch>

          <Route path={Path.MAIN} exact render={() => (
            <MainWithActiveItem
              activeCity={activeCity}
              activeSortType={activeSortType}
              offers={offers}
              onCityClick={onCityClick}
              onSortTypeChange={onSortTypeChange}
              onOfferCardBookmarkButtonClick={this._handleOfferCardBookmarkButtonClick}>
              {header}
            </MainWithActiveItem>
          )}/>

          <GuestRoute authorizationStatus={authorizationStatus} path={Path.LOGIN} exact render={() => (
            <LoginScreenWithAuthorizationData
              activeCity={activeCity}
              onSubmit={this._handleLoginScreenSubmit}>
              {header}
            </LoginScreenWithAuthorizationData>
          )}/>

          <Route path={`${Path.OFFER}/:offerId`} exact render={({match: {params: {offerId}}}) => (
            <OfferScreen
              authorizationStatus={authorizationStatus}
              id={offerId}
              onOfferCardBookmarkButtonClick={this._handleOfferCardBookmarkButtonClick}>
              {header}
            </OfferScreen>
          )}/>

          <PrivateRoute authorizationStatus={authorizationStatus} path={Path.FAVORITES} exact render={() => (
            <FavoritesScreen
              onOfferCardBookmarkButtonClick={this._handleOfferCardBookmarkButtonClick}>
              {header}
            </FavoritesScreen>
          )}/>

        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  email: getEmail(state),
  activeCity: getActiveCity(state),
  activeSortType: getActiveSortType(state),
  error: getError(state),
  offers: getFilteredAndSortedOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(AppActionCreator.setActiveCity(city)),
  onSortTypeChange: (sortType) => dispatch(AppActionCreator.setActiveSortType(sortType)),
  onLoginScreenSubmit: (authorizationData) => dispatch(UserOperation.login(authorizationData)),
  onOfferFavoritenessChange: (offerId) => dispatch(OffersOperation.toggleFavoriteness(offerId))
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
