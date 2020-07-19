import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {City, SortType} from "../../const.js";

import Header from "../header/header.jsx";
import Main from "../main/main.jsx";
import LoginScreen from "../login-screen/login-screen.jsx";
import OfferScreen from "../offer-screen/offer-screen.jsx";

import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";
import withAuthorizationData from "../../hocs/with-authorization-data/with-authorization-data.jsx";

import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {getActiveCity, getActiveSortType} from "../../reducer/app/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {getEmail} from "../../reducer/user/selectors.js";
import {getFilteredAndSortedOffers} from "../../reducer/offers/selectors.js";

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
  email: PropTypes.string,
  activeCity: PropTypes.oneOf(Object.values(City)).isRequired,
  activeSortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerScreenPropTypesCopy)).isRequired,
  onCityClick: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
  onLoginScreenSubmit: PropTypes.func.isRequired
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeScreen: Screen.MAIN, activeOfferId: null};
    this._handleHeaderLoginButtonClick = this._handleHeaderLoginButtonClick.bind(this);
    this._handleOfferCardNameClick = this._handleOfferCardNameClick.bind(this);
  }

  render() {
    const {offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">{this._renderApp()}</Route>
          <Route exact path="/dev-offer"><OfferScreen {...offers[0]} nearOffers={offers}/></Route>
        </Switch>
      </BrowserRouter>
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
        screen = <OfferScreen {...offers.find(({id}) => id === activeOfferId)} nearOffers={offers}/>;
    }

    return screen;
  }

  _handleHeaderLoginButtonClick() {
    this.setState({activeScreen: Screen.LOGIN});
  }

  _handleOfferCardNameClick(id) {
    this.setState({activeScreen: Screen.OFFER, activeOfferId: id});
  }
}

App.propTypes = propTypes;

const mapStateToProps = (state) => ({
  email: getEmail(state),
  activeCity: getActiveCity(state),
  activeSortType: getActiveSortType(state),
  offers: getFilteredAndSortedOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(AppActionCreator.setActiveCity(city)),
  onSortTypeChange: (sortType) => dispatch(AppActionCreator.setActiveSortType(sortType)),
  onLoginScreenSubmit: (authorizationData) => dispatch(UserOperation.login(authorizationData))
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
