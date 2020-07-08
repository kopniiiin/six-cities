import React, {PureComponent} from "react";

const withActiveState = (Component) => {
  const propTypes = Object.assign({}, Component.propTypes);
  delete propTypes.isActive;
  delete propTypes.onActiveStateChange;

  class WithActiveState extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {isActive: false};
      this._handleActiveStateChange = this._handleActiveStateChange.bind(this);
    }

    render() {
      const {isActive} = this.state;

      return <Component {...this.props} isActive={isActive} onActiveStateChange={this._handleActiveStateChange}/>;
    }

    _handleActiveStateChange() {
      this.setState((prevState) => ({isActive: !prevState.isActive}));
    }
  }

  WithActiveState.propTypes = propTypes;

  return WithActiveState;
};

export default withActiveState;
