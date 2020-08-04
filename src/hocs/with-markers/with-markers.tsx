import * as React from "react";
import * as Leaflet from "leaflet";

const LAYER_URL = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`;
const LAYER_ATTRIBUTION = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`;
const ICON_URL = `/img/pin.svg`;
const ACTIVE_ICON_URL = `/img/pin-active.svg`;
const ICON_SIZE = [27, 39];

interface Map {
  flyTo: (centerCoordinates: number[], zoom: number) => void;
  remove: () => void;
}

interface Marker {
  addTo: (map: Map) => void;
  remove: () => void;
}

const withMarkers = (Component) => {
  type Props = React.ComponentProps<typeof Component> & {
    centerCoordinates: number[];
    zoom: number;
    markerCoordinates: number[][];
    activeMarkerCoordinates: number[][];
  }

  return class WithMarkers extends React.PureComponent<Props> {
    props: Props;
    _map?: Map;
    _markers?: Marker[];

    constructor(props) {
      super(props);
      this._map = null;
      this._markers = null;
    }

    render() {
      const props = Object.assign({}, this.props);
      delete props.centerCoordinates;
      delete props.zoom;
      delete props.markerCoordinates;
      delete props.activeMarkerCoordinates;

      return <Component {...props}/>;
    }

    componentDidMount() {
      const {centerCoordinates, zoom} = this.props;

      this._map = Leaflet.map(`map`, {
        center: centerCoordinates,
        zoom,
        zoomControl: false,
        marker: true
      });

      Leaflet.tileLayer(LAYER_URL, {attribution: LAYER_ATTRIBUTION}).addTo(this._map);

      this._updateMarkers();
    }

    componentDidUpdate() {
      const {centerCoordinates, zoom} = this.props;

      this._map.flyTo(centerCoordinates, zoom);

      this._updateMarkers();
    }

    componentWillUnmount() {
      this._markers.forEach((marker) => marker.remove());
      this._map.remove();
    }

    _updateMarkers() {
      const {markerCoordinates, activeMarkerCoordinates} = this.props;

      if (this._markers) {
        this._markers.forEach((marker) => marker.remove());
      }

      const icon = Leaflet.icon({iconUrl: ICON_URL, iconSize: ICON_SIZE});
      const activeIcon = Leaflet.icon({iconUrl: ACTIVE_ICON_URL, iconSize: ICON_SIZE});

      this._markers = [
        ...markerCoordinates.map((coordinates) => Leaflet.marker(coordinates, {icon})),
        ...activeMarkerCoordinates.map((coordinates) => Leaflet.marker(coordinates, {icon: activeIcon}))
      ];

      this._markers.forEach((marker) => marker.addTo(this._map));
    }
  };
};

export default withMarkers;
