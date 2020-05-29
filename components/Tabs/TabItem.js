import { useDispatch, useSelector } from 'react-redux';
import { getActiveCategorie } from '../../redux/selectors';
import { SET_ACTIVE_CATEGORIE } from '../../redux/constants';

const TabItem = ({ categorie, label }) => {
  const dispatch = useDispatch();
  const activeCategorie = useSelector(getActiveCategorie);

  return (
    <li key={categorie} className={activeCategorie === categorie ? 'is-active' : ''}>
      <a onClick={() => dispatch({ type: SET_ACTIVE_CATEGORIE, payload: categorie })}>{label}</a>
    </li>
  );
};

TabItem.propTypes = {
  categorie: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TabItem;
