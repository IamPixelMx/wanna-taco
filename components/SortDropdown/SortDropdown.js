import { useSelector } from 'react-redux';
import { getActiveCategorie, getCategories } from '../../redux/selectors';
import { SET_SORTED_DATA } from '../../redux/constants';

import { sortData } from 'utils';

const sortOptions = [
  { label: 'A-Z', type: 'A-Z' },
  { label: 'Z-A', type: 'Z-A' },
  { label: 'Most Rated', type: 'MOST_RATED' },
  { label: 'Least Rated', type: 'LEAST_RATED' },
];

const SortDropdrown = () => {
  const dispatch = useDispatch();
  const activeCategorie = useSelector(getActiveCategorie);
  const categories = useSelector(getCategories);

  const dataToSort = categories[activeCategorie];

  const handleClick = type => {
    if (dataToSort) {
      const sortedData = sortData(dataToSort, type);
      dispatch({ type: SET_SORTED_DATA, payload: { activeCategorie: sortedData } });
    }
  };

  return (
    <div className='dropdown is-left is-active'>
      <div className='dropdown-trigger'>
        <button className='button' aria-haspopup='true' aria-controls='dropdown-menu6'>
          <span>Right aligned</span>
          <span className='icon is-small'>
            <i className='fas fa-angle-down' aria-hidden='true'></i>
          </span>
        </button>
      </div>
      <div className='dropdown-menu' id='dropdown-menu6' role='menu'>
        <div className='dropdown-content'>
          {sortOptions.map(({ label, type }) => (
            <div key={`${type}-dropdown`} className='dropdown-item' onClick={handleClick(type)}>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortDropdrown;
