import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const [isDropOpen, setIsDropOpen] = useState(false);

  const toggleDrop = () => {
    setIsDropOpen(!isDropOpen);
  };

  const handleClick = type => {
    if (dataToSort) {
      const sortedData = sortData(dataToSort, type);
      dispatch({ type: SET_SORTED_DATA, payload: { [activeCategorie]: sortedData } });
      console.log('====================================');
      console.log('Se realizo dispatch ', SET_SORTED_DATA, 'categories: ', categories);
      console.log('====================================');
    }
    toggleDrop();
  };

  return (
    <div className={isDropOpen ? 'dropdown is-left is-active' : 'dropdown is-left'}>
      <div className='dropdown-trigger' onClick={toggleDrop}>
        <button
          className='button is-rounded is-medium is-outlined is-info is-light'
          aria-haspopup='true'
          aria-controls='dropdown-sort-options'
        >
          <span className='has-text-weight-bold'>Ordenar por&nbsp; </span>
          <span className='icon is-small'>
            <i className='fa fa-arrow-circle-down has-text-info' aria-hidden='true'></i>
          </span>
          <span className='has-text-weight-bold'> : </span>
        </button>
      </div>
      <div className='dropdown-menu' id='dropdown-sort-options' role='menu'>
        <div className='dropdown-content'>
          {sortOptions.map(({ label, type }) => (
            <a key={`${type}-dropdown`} className='dropdown-item' onClick={() => handleClick(type)}>
              <p>{label}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortDropdrown;
