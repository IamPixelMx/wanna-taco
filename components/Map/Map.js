import React, { Fragment, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet-universal';

// Leaflet CSS
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';

const Map = () => {
  // useEffect(() => {
  //   const L = require('leaflet');

  //   delete L.Icon.Default.prototype._getIconUrl;

  //   L.Icon.Default.mergeOptions({
  //     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  //     iconUrl: require('leaflet/dist/images/marker-icon.png'),
  //     shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  //   });
  // }, []);
  // const createClusterCustomIcon = cluster =>
  //   L.divIcon({
  //     html: `<span>${cluster.getChildCount()}</span>`,
  //     className: 'marker-cluster-custom',
  //     iconSize: L.point(40, 40, true),
  //   });

  // iconCreateFunction={createClusterCustomIcon}

  return (
    <LeafletMap center={[23.63, -102.55]} zoom={5} maxZoom={18} style={{ height: '100vh' }}>
      {() => {
        const MarkerClusterGroup = require('react-leaflet-markercluster').default;
        return (
          <Fragment>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup>
              <Marker position={[19.436, -99.1297]}>
                <Popup>
                  ALGUN LUGAR QUE PREFIERO NO RECORDAR. <br /> PopUp Easily customizable.
                </Popup>
              </Marker>
              <Marker position={[19.4424, -99.1238]} />
              <Marker position={[19.4334, -99.1285]} />
              <Marker position={[19.49, -99.12]}>
                <Popup>
                  CIUDAD DE MEXICO. <br /> PopUp Easily customizable.
                </Popup>
              </Marker>
            </MarkerClusterGroup>
          </Fragment>
        );
      }}
    </LeafletMap>
  );
};

export default Map;
