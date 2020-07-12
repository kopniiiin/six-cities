import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Leaflet from "leaflet";

const CENTER = [52.38333, 4.9];
const ZOOM = 12;
const LAYER_URL = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`;
const LAYER_ATTRIBUTION = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`;
const ICON_URL = `img/pin.svg`;
const ACTIVE_ICON_URL = `img/pin-active.svg`;
const ICON_SIZE = [27, 39];

const withMarkers = (Component) => {
  const propTypes = Object.assign({}, Component.propTypes);
  propTypes.markerCoordinates = PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired;
  propTypes.activeMarkerCoordinates = PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired;

  class WithMarkers extends PureComponent {
    constructor(props) {
      super(props);
      this._map = null;
      this._markers = null;
    }

    render() {
      const props = Object.assign({}, this.props);
      delete props.markerCoordinates;
      delete props.activeMarkerCoordinates;

      return <Component {...props}/>;
    }

    componentDidMount() {
      this._map = Leaflet.map(`map`, {
        center: CENTER,
        zoom: ZOOM,
        zoomControl: false,
        marker: true
      });

      this._map.setView(CENTER, ZOOM);
      Leaflet.tileLayer(LAYER_URL, {attribution: LAYER_ATTRIBUTION}).addTo(this._map);

      this._updateMarkers();
    }

    componentDidUpdate() {
      this._updateMarkers();
    }

    _updateMarkers() {
      // eslint-disable-next-line react/prop-types
      const {markerCoordinates, activeMarkerCoordinates} = this.props;

      if (this._markers) {
        this._markers.forEach((marker) => marker.remove());
      }

      const icon = Leaflet.icon({iconUrl: ICON_URL, iconSize: ICON_SIZE});
      const activeIcon = Leaflet.icon({iconUrl: ACTIVE_ICON_URL, iconSize: ICON_SIZE});

      this._markers = [
        // eslint-disable-next-line react/prop-types
        ...markerCoordinates.map((coordinates) => Leaflet.marker(coordinates, {icon})),
        // eslint-disable-next-line react/prop-types
        ...activeMarkerCoordinates.map((coordinates) => Leaflet.marker(coordinates, {icon: activeIcon}))
      ];

      this._markers.forEach((marker) => marker.addTo(this._map));
    }
  }

  WithMarkers.propTypes = propTypes;

  return WithMarkers;
};

export default withMarkers;
