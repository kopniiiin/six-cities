import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withReviewData = (Component) => {
  const propTypes = Object.assign({}, Component.propTypes);
  delete propTypes.text;
  delete propTypes.rating;
  delete propTypes.onTextChange;
  delete propTypes.onRatingChange;
  propTypes.onSubmit = PropTypes.func.isRequired;

  class WithReviewData extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {text: ``, rating: null};
      this._handleTextChange = this._handleTextChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
    }

    render() {
      // eslint-disable-next-line react/prop-types
      const {onSubmit} = this.props;
      const {text, rating} = this.state;

      return (
        <Component
          {...this.props}
          text={text}
          rating={rating}
          onTextChange={this._handleTextChange}
          onRatingChange={this._handleRatingChange}
          onSubmit={() => onSubmit({text, rating})}/>
      );
    }

    _handleTextChange(text) {
      this.setState({text});
    }

    _handleRatingChange(rating) {
      this.setState({rating});
    }
  }

  WithReviewData.propTypes = propTypes;

  return WithReviewData;
};

export default withReviewData;
