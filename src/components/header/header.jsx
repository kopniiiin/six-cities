import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {Path} from "../../const.js";

const propTypes = {
  email: PropTypes.string
};

const Header = ({email}) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link" to={Path.MAIN}>
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              {email ? (
                <Link className="header__nav-link header__nav-link--profile" to={Path.FAVORITES}>
                  <div className="header__avatar-wrapper user__avatar-wrapper"/>
                  <span className="header__user-name user__name">{email}</span>
                </Link>
              ) : (
                <Link className="header__nav-link header__nav-link--profile" to={Path.LOGIN}>
                  <div className="header__avatar-wrapper user__avatar-wrapper"/>
                  <span className="header__login">Sign in</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

Header.propTypes = propTypes;

export default Header;
