import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  activeItem?: string;
}

interface InjectedProps {
  activeItem?: string;
  onActiveItemChange: (activeItem: string) => void;
  onActiveItemRemoval: () => void;
}

const withActiveItem = (Component) => {
  type Props = Subtract<React.ComponentProps<typeof Component>, InjectedProps>

  return class WithActiveItem extends React.PureComponent<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
      super(props);
      this.state = {activeItem: null};
      this._handleActiveItemChange = this._handleActiveItemChange.bind(this);
      this._handleActiveItemRemoval = this._handleActiveItemRemoval.bind(this);
    }

    _handleActiveItemChange(activeItem) {
      this.setState({activeItem});
    }

    _handleActiveItemRemoval() {
      this.setState({activeItem: null});
    }

    render() {
      const {activeItem} = this.state;

      return (
        <Component
          {...this.props}
          activeItem={activeItem}
          onActiveItemChange={this._handleActiveItemChange}
          onActiveItemRemoval={this._handleActiveItemRemoval}/>
      );
    }
  };
};

export default withActiveItem;
