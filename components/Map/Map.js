import React, { Fragment, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet-universal';

// Leaflet CSS
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const PopupMarker = ({ content, position }) => (
    <Marker position={position}>
      <Popup>{content}</Popup>
    </Marker>
  );

  const MarkersGroupElement = ({ markers }) => {
    const items = markers.map((props, key) => <PopupMarker key={key} {...props} />);
    return <Fragment>{items}</Fragment>;
  };

  const myMarkers = {
    markers: [
      { key: 'restaurante1', position: [19.4424, -99.1238], content: 'My first popup' },
      { key: 'restaurante2', position: [19.4334, -99.1285], content: 'My second popup' },
      { key: 'restaurante3', position: [19.436, -99.1297], content: 'My third popup' },
      { key: 'CDMX', position: [19.49, -99.12], content: 'Ciudad de México' },
    ],
  };

  return (
    <LeafletMap center={[23.63, -102.55]} zoom={6} maxZoom={18}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkersGroupElement {...myMarkers} />
    </LeafletMap>
  );
};

export default Map;
