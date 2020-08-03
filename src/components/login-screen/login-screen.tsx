import React from "react";
import PropTypes from "prop-types";

import {City} from "../../const";

const propTypes = {
  children: PropTypes.element.isRequired,
  activeCity: PropTypes.oneOf(Object.values(City)).isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const LoginScreen = (props) => {
  const {
    children,
    activeCity,
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSubmit
  } = props;

  return (
    <div className="page page--gray page--login">

      {children}

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={(evt) => {
                evt.preventDefault();
                onSubmit({email, password});
              }}>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  required
                  onChange={(evt) => onEmailChange(evt.target.value)}/>
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  required
                  onChange={(evt) => onPasswordChange(evt.target.value)}/>
              </div>

              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#"><span>{activeCity}</span></a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

LoginScreen.propTypes = propTypes;

export default LoginScreen;
