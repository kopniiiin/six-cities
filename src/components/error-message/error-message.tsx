import * as React from "react";

interface Props {
  text: string;
}

const ErrorMessage: React.FC<Props> = ({text}: Props) => <div className="error-message">{text}</div>;

export default ErrorMessage;
