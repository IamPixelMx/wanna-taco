// import React, { useState, Fragment } from 'react';

//create custom forceUpdate hook
// const useForceUpdate = () => {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update the state to force render
// };
// const forceUpdate = useForceUpdate();
import { useSelector } from 'react-redux';
import { getActiveCategorie, getCategories } from '../../redux/selectors';

import { Card } from 'components';

const Dashboard = () => {
  const categories = useSelector(getCategories);
  const activeCategorie = useSelector(getActiveCategorie);

  // console.log('info de categoria:', categories[activeCategorie]);

  return (
    <section className='tile' id='dashboard'>
      <div id='list' className='container has-margin-top'>
        {`La categoría activa es: ${activeCategorie}`}
        {categories[activeCategorie]
          ? categories[activeCategorie].map(props => <Card {...props} />)
          : `No hay sitios en ${activeCategorie}`}
      </div>
    </section>
  );
};

export default Dashboard;
