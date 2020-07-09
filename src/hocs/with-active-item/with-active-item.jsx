import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  const propTypes = Object.assign({}, Component.propTypes);
  delete propTypes.activeItem;
  delete propTypes.onActiveItemChange;
  delete propTypes.onActiveItemRemoval;

  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {activeItem: null};
      this._handleActiveItemChange = this._handleActiveItemChange.bind(this);
      this._handleActiveItemRemoval = this._handleActiveItemRemoval.bind(this);
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

    _handleActiveItemChange(activeItem) {
      this.setState({activeItem});
    }

    _handleActiveItemRemoval() {
      this.setState({activeItem: null});
    }
  }

  WithActiveItem.propTypes = propTypes;

  return WithActiveItem;
};

export default withActiveItem;
