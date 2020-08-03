import React, {PureComponent} from "react";
import {Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import history from "../../history";

import {OfferType, City, SortType, Path, AuthorizationStatus} from "../../const";

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

const offerScreenPropTypesCopy = Object.assign({}, OfferScreen.propTypes);
offerScreenPropTypesCopy.id = PropTypes.string.isRequired;
delete offerScreenPropTypesCopy.nearOffers;

const propTypes = {
  authorizationStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)).isRequired,
  email: PropTypes.string,
  activeCity: PropTypes.oneOf(Object.values(City)).isRequired,
  activeSortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  error: PropTypes.string,
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(OfferType)).isRequired,
    name: PropTypes.string.isRequired,
    mainPhoto: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
    }).isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
        zoom: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  })).isRequired,
  onCityClick: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onLoginScreenSubmit: PropTypes.func.isRequired,
  onOfferFavoritenessChange: PropTypes.func.isRequired
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this._handleLoginScreenSubmit = this._handleLoginScreenSubmit.bind(this);
    this._handleOfferCardBookmarkButtonClick = this._handleOfferCardBookmarkButtonClick.bind(this);
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
}

App.propTypes = propTypes;

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
