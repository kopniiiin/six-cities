import * as React from "react";

interface Props {
  blockClassName: string;
}

const Map: React.FC<Props> = ({blockClassName}: Props) => <section className={`${blockClassName}__map map`} id="map"/>;

export default Map;
