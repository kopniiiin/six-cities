import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withAuthorizationData = (Component) => {
  const propTypes = Object.assign({}, Component.propTypes);
  delete propTypes.email;
  delete propTypes.password;
  delete propTypes.onEmailChange;
  delete propTypes.onPasswordChange;
  propTypes.onSubmit = PropTypes.func.isRequired;

  class WithAuthorizationData extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {email: ``, password: ``};
      this._handleEmailChange = this._handleEmailChange.bind(this);
      this._handlePasswordChange = this._handlePasswordChange.bind(this);
    }

    render() {
      // eslint-disable-next-line react/prop-types
      const {onSubmit} = this.props;
      const {email, password} = this.state;

      return (
        <Component
          {...this.props}
          email={email}
          password={password}
          onEmailChange={this._handleEmailChange}
          onPasswordChange={this._handlePasswordChange}
          onSubmit={() => onSubmit({email, password})}/>
      );
    }

    _handleEmailChange(email) {
      this.setState({email});
    }

    _handlePasswordChange(password) {
      this.setState({password});
    }
  }

  WithAuthorizationData.propTypes = propTypes;

  return WithAuthorizationData;
};

export default withAuthorizationData;
