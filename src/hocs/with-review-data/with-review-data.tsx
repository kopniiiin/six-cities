import * as React from "react";
import {Subtract} from "utility-types";

import {ReviewData} from "../../types";

interface State {
  text?: string;
  rating?: number;
}

interface InjectedProps {
  text?: string;
  rating?: number;
  onTextChange: (text: string) => void;
  onRatingChange: (rating: number) => void;
}

const withReviewData = (Component) => {
  type Props = Subtract<React.ComponentProps<typeof Component>, InjectedProps> & {
    onSubmit: (reviewData: ReviewData) => void;
  }

  return class WithReviewData extends React.PureComponent<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
      super(props);
      this.state = {text: ``, rating: null};
      this._handleTextChange = this._handleTextChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
    }

    _handleTextChange(text) {
      this.setState({text});
    }

    _handleRatingChange(rating) {
      this.setState({rating});
    }

    render() {
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
  };
};

export default withReviewData;
