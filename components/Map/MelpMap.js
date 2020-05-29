import { Map, TileLayer, Marker, Popup } from 'react-leaflet-universal';

// type State = {
//   lat: number,
//   lng: number,
//   zoom: number,
// };

const MelpMap = () => {
  const state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  };

  const position = [state.lat, state.lng];
  const ref = { center: position, zoom: state.zoom };

  return (
    <Map leafletRef={ref}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  );
};

export default MelpMap;
