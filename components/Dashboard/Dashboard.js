// import React, { useState, Fragment } from 'react';

//create custom forceUpdate hook
// const useForceUpdate = () => {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update the state to force render
// };
// const forceUpdate = useForceUpdate();
import { useSelector } from 'react-redux';
import { getActiveCategorie, getCategories, getState } from '../../redux/selectors';

import { Card } from 'components';

const getItemsToShow = array => (array.length > 15 ? array.slice(0, 15) : array);

const Dashboard = () => {
  const activeCategorie = useSelector(getActiveCategorie);
  const categories = useSelector(getCategories);

  const itemsToShow = categories[activeCategorie] && getItemsToShow(categories[activeCategorie]);
  const cards = itemsToShow && itemsToShow.map(props => <Card key={props.id} {...props} />);
  return (
    <section className='tile' id='dashboard'>
      <div id='list' className='container has-margin-top'>
        {cards != null ? (
          cards
        ) : (
          <p className='subtitle is-spaced'>
            Aún no tenemos sitios en la categoría <strong>{activeCategorie}</strong>. Seguiremos
            trabajando para ofrecerte la mejor información. ¡Gracias!
          </p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
