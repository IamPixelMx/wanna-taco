import React, { Fragment } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet-universal';
import 'leaflet/dist/leaflet.css';

const MapWithCluster = () => {
  return (
    <Map className='markercluster-map' center={[23.63, 102.55]} zoom={10} maxZoom={18}>
      {() => {
        const MarkerClusterGroup = require('react-leaflet-markercluster').default;
        return (
          <Fragment>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <Marker position={[19.4978, 99.1269]}>
              <Popup>
                CIUDAD DE MEXICO. <br /> PopUp Easily customizable.
              </Popup>
            </Marker> */}
            <MarkerClusterGroup
              markers={[
                { position: [19.44005, -99.12704] },
                { position: [19.43607, -99.12978] },
                { position: [19.44248, -99.12383] },
                { position: [19.43349, -99.12851] },
              ]}
            />
          </Fragment>
        );
      }}
    </Map>
  );
};

export default MapWithCluster;
