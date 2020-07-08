import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {SortType} from "../../const.js";

import {sortOffers} from "../../utils.js";

import Main from "../main/main.jsx";
import OfferScreen from "../offer-screen/offer-screen.jsx";

import {ActionCreator} from "../../reducer.js";

const offerScreenPropTypesCopy = Object.assign({}, OfferScreen.propTypes);
offerScreenPropTypesCopy.id = PropTypes.string.isRequired;
delete offerScreenPropTypesCopy.nearOffers;

const propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string.isRequired,
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
    const {cities, activeCity, activeSortType, offers, onCityClick, onSortTypeChange} = this.props;
    const {activeOfferId} = this.state;

    if (activeOfferId) {
      return <OfferScreen {...offers.find(({id}) => id === activeOfferId)} nearOffers={offers}/>;
    }

    return (
      <Main
        cities={cities}
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

const mapStateToProps = ({activeCity, activeSortType, offers}) => ({
  cities: offers.map(({city}) => city),
  activeCity,
  activeSortType,
  offers: sortOffers(offers.find(({city}) => city === activeCity).offers, activeSortType)
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(ActionCreator.setActiveCity(city)),
  onSortTypeChange: (sortType) => dispatch(ActionCreator.setActiveSortType(sortType))
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
