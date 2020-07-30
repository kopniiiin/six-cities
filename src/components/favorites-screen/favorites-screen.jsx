import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {Path} from "../../const.js";

import OfferList from "../offer-list/offer-list.jsx";

import {Operation as OffersOperation} from "../../reducer/offers/offers.js";
import {getGroupedByCityFavoriteOffers} from "../../reducer/offers/selectors.js";

const propTypes = {
  children: PropTypes.element.isRequired,
  citiesToOffers: PropTypes.object.isRequired,
  loadData: PropTypes.func.isRequired,
  onOfferCardBookmarkButtonClick: PropTypes.func.isRequired
};

class FavoritesScreen extends PureComponent {
  render() {
    const {children, citiesToOffers, onOfferCardBookmarkButtonClick} = this.props;

    const offerGroups = Object.entries(citiesToOffers);

    const favoritesClassName = `page ${offerGroups.length ? `` : `page--favorites-empty`}`;
    const mainClassName = `page__main page__main--favorites ${offerGroups.length ? `` : `page__main--favorites-empty`}`;

    return (
      <div className={favoritesClassName}>
        {children}

        <main className={mainClassName}>
          <div className="page__favorites-container container">
            {offerGroups.length ? (
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {offerGroups.map(([city, offers]) => (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      {
                        <OfferList
                          blockClassName={`favorites`}
                          offers={offers}
                          onOfferCardMouseEnter={() => {}}
                          onOfferCardMouseLeave={() => {}}
                          onOfferCardBookmarkButtonClick={onOfferCardBookmarkButtonClick}/>
                      }
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
                </div>
              </section>
            )}
          </div>
        </main>

        <footer className="footer container">
          <Link className="footer__logo-link" to={Path.MAIN}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      </div>
    );
  }

  componentDidMount() {
    const {loadData} = this.props;

    loadData();
  }
}

FavoritesScreen.propTypes = propTypes;

const mapStateToProps = (state) => ({
  citiesToOffers: getGroupedByCityFavoriteOffers(state)
});

const mapDispatchToProps = (dispatch) => ({
  loadData: () => dispatch(OffersOperation.loadFavoriteOffers())
});

export {FavoritesScreen};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
