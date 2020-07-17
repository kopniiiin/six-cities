import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {City, SortType} from "../../const.js";

import Main from "../main/main.jsx";
import OfferScreen from "../offer-screen/offer-screen.jsx";

import withActiveItem from "../../hocs/with-active-item/with-active-item.jsx";

import {ActionCreator as AppActionCreator} from "../../reducer/app/app.js";
import {getActiveCity, getActiveSortType} from "../../reducer/app/selectors.js";
import {getFilteredAndSortedOffers} from "../../reducer/offers/selectors.js";

const MainWithActiveItem = withActiveItem(Main);

const offerScreenPropTypesCopy = Object.assign({}, OfferScreen.propTypes);
offerScreenPropTypesCopy.id = PropTypes.string.isRequired;
delete offerScreenPropTypesCopy.nearOffers;

const propTypes = {
  activeCity: PropTypes.oneOf(Object.values(City)).isRequired,
  activeSortType: PropTypes.oneOf(Object.values(SortType)).isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerScreenPropTypesCopy)).isRequired,
  onCityClick: PropTypes.func.isRequired,
  onSortTypeChange: PropTypes.func.isRequired
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeOfferId: null};
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
    const {activeCity, activeSortType, offers, onCityClick, onSortTypeChange} = this.props;
    const {activeOfferId} = this.state;

    if (activeOfferId) {
      return <OfferScreen {...offers.find(({id}) => id === activeOfferId)} nearOffers={offers}/>;
    }

    return (
      <MainWithActiveItem
        activeCity={activeCity}
        activeSortType={activeSortType}
        offers={offers}
        onCityClick={onCityClick}
        onSortTypeChange={onSortTypeChange}
        onOfferCardNameClick={this._handleOfferCardNameClick}/>
    );
  }

  _handleOfferCardNameClick(id) {
    this.setState({activeOfferId: id});
  }
}

App.propTypes = propTypes;

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  activeSortType: getActiveSortType(state),
  offers: getFilteredAndSortedOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(AppActionCreator.setActiveCity(city)),
  onSortTypeChange: (sortType) => dispatch(AppActionCreator.setActiveSortType(sortType))
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
