import { TabItem } from '.';

/*
 *Categories of food
 */
const TAB_ITEMS = [
  { categorie: 'all', label: 'Todo' },
  { categorie: 'oriental', label: 'Oriental' },
  { categorie: 'desserts', label: 'Postres' },
  { categorie: 'vegie', label: 'Vegetariana' },
  { categorie: 'coffee', label: 'Cafecito' },
];

const Tabs = () => {
  return (
    <div className='tabs is-toggle is-toggle-rounded is-medium is-centered is-fullwidth'>
      <ul>
        {TAB_ITEMS.map(props => (
          <TabItem {...props} />
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
