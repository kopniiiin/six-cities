import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isActive: boolean;
}

interface InjectedProps {
  isActive: boolean;
  onActiveStateChange: () => void;
}

const withActiveState = (Component) => {
  type Props = Subtract<React.ComponentProps<typeof Component>, InjectedProps>

  return class WithActiveState extends React.PureComponent<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
      super(props);
      this.state = {isActive: false};
      this._handleActiveStateChange = this._handleActiveStateChange.bind(this);
    }

    _handleActiveStateChange() {
      this.setState(({isActive}) => ({isActive: !isActive}));
    }

    render() {
      const {isActive} = this.state;

      return <Component {...this.props} isActive={isActive} onActiveStateChange={this._handleActiveStateChange}/>;
    }
  };
};

export default withActiveState;
