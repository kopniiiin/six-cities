import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";
import OfferScreen from "../offer-screen/offer-screen.jsx";

import {ActionCreator} from "../../reducer.js";

const offerScreenPropTypesCopy = Object.assign({}, OfferScreen.propTypes);
offerScreenPropTypesCopy.id = PropTypes.string.isRequired;
delete offerScreenPropTypesCopy.nearOffers;

const propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCity: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerScreenPropTypesCopy)).isRequired,
  onCityClick: PropTypes.func.isRequired,
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
    const {cities, activeCity, offers, onCityClick} = this.props;
    const {activeOfferId} = this.state;

    if (activeOfferId) {
      return <OfferScreen {...offers.find(({id}) => id === activeOfferId)} nearOffers={offers}/>;
    }

    return (
      <Main
        cities={cities}
        activeCity={activeCity}
        offers={offers}
        onCityClick={onCityClick}
        onOfferCardNameClick={this._handleOfferCardNameClick}/>
    );
  }

  _handleOfferCardNameClick(id) {
    this.setState({activeOfferId: id});
  }
}

App.propTypes = propTypes;

const mapStateToProps = (state) => ({
  cities: state.offers.map(({city}) => city),
  activeCity: state.activeCity,
  offers: state.offers.find(({city}) => city === state.activeCity).offers
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(ActionCreator.setActiveCity(city))
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
