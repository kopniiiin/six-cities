import React, {PureComponent} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";
import OfferScreen from "../offer-screen/offer-screen.jsx";

const offerScreenPropTypesCopy = Object.assign({}, OfferScreen.propTypes);
offerScreenPropTypesCopy.id = PropTypes.string.isRequired;
delete offerScreenPropTypesCopy.nearOffers;

const propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerScreenPropTypesCopy)).isRequired
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
    const {offers} = this.props;
    const {activeOfferId} = this.state;

    if (activeOfferId) {
      return <OfferScreen {...offers.find(({id}) => id === activeOfferId)} nearOffers={offers}/>;
    }

    return <Main offers={offers} onOfferCardNameClick={this._handleOfferCardNameClick}/>;
  }

  _handleOfferCardNameClick(id) {
    this.setState({activeOfferId: id});
  }
}

App.propTypes = propTypes;

export default App;
