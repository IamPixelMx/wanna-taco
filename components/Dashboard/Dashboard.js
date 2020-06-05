import { useSelector } from 'react-redux';
import { getActiveCategorie, getCategories } from '../../redux/selectors';

import { Card } from 'components';

const getItemsToShow = array => (array.length > 15 ? array.slice(0, 15) : array);

const Dashboard = () => {
  const activeCategorie = useSelector(getActiveCategorie);
  const categories = useSelector(getCategories);
  const activeCategorieArr = categories[activeCategorie];

  const itemsToShow = activeCategorieArr && getItemsToShow(activeCategorieArr);
  const cards = itemsToShow && itemsToShow.map(props => <Card key={props.id} {...props} />);
  return (
    <section className='tile' id='dashboard'>
      <div id='list' className='container'>
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
