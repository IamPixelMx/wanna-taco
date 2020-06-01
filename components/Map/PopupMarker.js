import React, { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet-universal';
// Leaflet CSS and icons
// import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import retinaIcon from 'leaflet/dist/images/marker-icon-2x.png';

import { StarRating } from 'components';

const PopupMarker = ({
  id,
  name,
  contact: { phone, site },
  address: { street, city, state, location },
  rating,
}) => {
  useEffect(() => {
    const L = require('leaflet');

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconRetinaUrl: retinaIcon,
    });
  }, []);

  return (
    <Marker position={[location.lat, location.lng]}>
      <Popup>
        <p>
          <b>{name}</b>
        </p>
        <p>
          <b>Dirección</b>
        </p>
        <p>
          📍&nbsp;{` ${street}, ${city},`} <br /> &nbsp; &nbsp; &nbsp; {state}
        </p>
        <p> 📞 &nbsp; {phone}</p>
        <p> 🌐 &nbsp; {site}</p>
        <br />
        <strong>Rating</strong>
        <br />
        <StarRating id={id} rating={rating} />
      </Popup>
    </Marker>
  );
};

export default PopupMarker;
