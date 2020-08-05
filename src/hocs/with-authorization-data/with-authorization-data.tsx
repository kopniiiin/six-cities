import * as React from "react";
import {Subtract} from "utility-types";

import {AuthorizationData} from "../../types";

interface State {
  email: string;
  password: string;
}

interface InjectedProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
}

const withAuthorizationData = (Component) => {
  type Props = Subtract<React.ComponentProps<typeof Component>, InjectedProps> & {
    onSubmit: (authorizationData: AuthorizationData) => void;
  }

  return class WithAuthorizationData extends React.PureComponent<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
      super(props);
      this.state = {email: ``, password: ``};
      this._handleEmailChange = this._handleEmailChange.bind(this);
      this._handlePasswordChange = this._handlePasswordChange.bind(this);
    }

    _handleEmailChange(email) {
      this.setState({email});
    }

    _handlePasswordChange(password) {
      this.setState({password});
    }

    render() {
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
  };
};

export default withAuthorizationData;
