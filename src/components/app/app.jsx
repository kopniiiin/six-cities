import React, {PureComponent} from "react";
import {Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import history from "../../history.js";

import {City, SortType, Path, AuthorizationStatus} from "../../const.js";

import GuestRoute from "../guest-route/guest-route.jsx";
import Header from "../header/header.jsx";
import Main from "../main/main.jsx";
import LoginScreen from "../login-screen/login-screen.jsx";
import OfferScreen from "../offer-screen/offer-screen.jsx";

import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import withAuthorizationData from "../../hocs/with-authorization-data/with-authorization-data.jsx";

import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {getActiveCity, getActiveSortType} from "../../reducer/app/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getAuthorizationStatus, getEmail} from "../../reducer/user/selectors.js";
import {Operation as OffersOperation} from "../../reducer/offers/offers.js";
import {getFilteredAndSortedOffers} from "../../reducer/offers/selectors.js";
import {Operation as ReviewsOperation} from "../../reducer/reviews/reviews.js";

const MainWithActiveItem = withActiveItem(Main);
const LoginScreenWithAuthorizationData = withAuthorizationData(LoginScreen);

const Screen = {
  MAIN: `MAIN`,
  LOGIN: `LOGIN`,
  OFFER: `OFFER`
};

const offerScreenPropTypesCopy = Object.assign({}, OfferScreen.propTypes);
offerScreenPropTypesCopy.id = PropTypes.string.isRequired;
delete offerScreenPropTypesCopy.nearOffers;

const propTypes = {
  authorizationStatus: PropTypes.oneOf(Object.values(AuthorizationStatus)).isRequired,
  email: PropTypes.string,
  activeCity: PropTypes.oneOf(Object.values(City)).isRequired,
  activeSortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerScreenPropTypesCopy)).isRequired,
  onCityClick: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onLoginScreenSubmit: PropTypes.func.isRequired,
  onOfferFavoritenessChange: PropTypes.func.isRequired,
  onActiveOfferIdChange: PropTypes.func.isRequired
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeScreen: Screen.MAIN, activeOfferId: null};
    this._handleLoginScreenSubmit = this._handleLoginScreenSubmit.bind(this);
    this._handleOfferCardBookmarkButtonClick = this._handleOfferCardBookmarkButtonClick.bind(this);
    this._handleOfferCardNameClick = this._handleOfferCardNameClick.bind(this);
  }

  render() {
    const {
      authorizationStatus,
      email,
      activeCity,
      activeSortType,
      offers,
      onCityClick,
      onSortTypeChange,
    } = this.props;

    const header = <Header email={email}/>;

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
              onOfferCardBookmarkButtonClick={this._handleOfferCardBookmarkButtonClick}
              onOfferCardNameClick={this._handleOfferCardNameClick}>
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

        </Switch>
      </Router>
    );
  }

  _renderApp() {
    const {
      email,
      activeCity,
      activeSortType,
      offers,
      onCityClick,
      onSortTypeChange,
      onLoginScreenSubmit
    } = this.props;

    const {activeScreen, activeOfferId} = this.state;

    const header = <Header email={email} onLoginButtonClick={this._handleHeaderLoginButtonClick}/>;

    let screen;

    switch (activeScreen) {
      case Screen.MAIN:
        screen = (
          <MainWithActiveItem
            activeCity={activeCity}
            activeSortType={activeSortType}
            offers={offers}
            onCityClick={onCityClick}
            onSortTypeChange={onSortTypeChange}
            onOfferCardNameClick={this._handleOfferCardNameClick}>
            {header}
          </MainWithActiveItem>
        );

        break;
      case Screen.LOGIN:
        screen = (
          <LoginScreenWithAuthorizationData
            activeCity={activeCity}
            onSubmit={(authorizationData) => {
              this.setState({activeScreen: Screen.MAIN});
              onLoginScreenSubmit(authorizationData);
            }}>
            {header}
          </LoginScreenWithAuthorizationData>
        );

        break;
      case Screen.OFFER:
        screen = <OfferScreen id={activeOfferId}>{header}</OfferScreen>;
    }

    return screen;
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

  _handleOfferCardNameClick(activeOfferId) {
    const {onActiveOfferIdChange} = this.props;

    onActiveOfferIdChange(activeOfferId);
    this.setState({activeScreen: Screen.OFFER, activeOfferId});
  }
}

App.propTypes = propTypes;

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  email: getEmail(state),
  activeCity: getActiveCity(state),
  activeSortType: getActiveSortType(state),
  offers: getFilteredAndSortedOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(AppActionCreator.setActiveCity(city)),
  onSortTypeChange: (sortType) => dispatch(AppActionCreator.setActiveSortType(sortType)),
  onLoginScreenSubmit: (authorizationData) => dispatch(UserOperation.login(authorizationData)),
  onOfferFavoritenessChange: (offerId) => dispatch(OffersOperation.toggleFavoriteness(offerId)),
  onActiveOfferIdChange: (activeOfferId) => {
    dispatch(OffersOperation.loadNearOffers(activeOfferId));
    dispatch(ReviewsOperation.loadReviews(activeOfferId));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
