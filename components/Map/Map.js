import { useDispatch, useSelector } from 'react-redux';
import { GET_MELP_RESTAURANTS_DATA } from '../../redux/constants';
import { getCategories } from '../../redux/selectors';

import { Map, TileLayer } from 'react-leaflet-universal';
// Leaflet CSS and icons
import 'leaflet/dist/leaflet.css';

import { PopupMarker } from 'components';

const MelpMap = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  if (!categories) {
    dispatch({ type: GET_MELP_RESTAURANTS_DATA });
  }

  return (
    <Map center={[19.43277, -99.13305]} zoom={15} maxZoom={18}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {categories.all.map((props, key) => (
        <PopupMarker key={key} {...props} />
      ))}
    </Map>
  );
};

export default MelpMap;
