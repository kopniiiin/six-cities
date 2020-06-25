import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Leaflet from "leaflet";

const CENTER = [52.38333, 4.9];
const ZOOM = 12;
const LAYER_URL = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`;
const LAYER_ATTRIBUTION = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`;
const ICON_URL = `img/pin.svg`;
const ICON_SIZE = [27, 39];

const propTypes = {
  blockClassName: PropTypes.string.isRequired,
  markerCoordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

class Map extends PureComponent {
  render() {
    const {blockClassName} = this.props;

    return <section className={`${blockClassName}__map map`} id="map"/>;
  }

  componentDidMount() {
    const {markerCoordinates} = this.props;

    const map = Leaflet.map(`map`, {
      center: CENTER,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    map.setView(CENTER, ZOOM);

    Leaflet.tileLayer(LAYER_URL, {attribution: LAYER_ATTRIBUTION}).addTo(map);

    const icon = Leaflet.icon({iconUrl: ICON_URL, iconSize: ICON_SIZE});
    markerCoordinates.forEach((coordinates) => Leaflet.marker(coordinates, {icon}).addTo(map));
  }
}

Map.propTypes = propTypes;

export default Map;
