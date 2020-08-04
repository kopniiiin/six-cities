import * as React from "react";

interface Props {
  blockClassName: string;
}

const PremiumMark: React.FC<Props> = ({blockClassName}: Props) => <div className={`${blockClassName}__mark`}><span>Premium</span></div>;

export default PremiumMark;
