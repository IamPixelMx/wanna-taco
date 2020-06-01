import { TabItem } from '.';
import { CATEGORIES_ITEMS } from 'utils';

const Tabs = () => {
  return (
    <div className='tabs is-toggle is-toggle-rounded is-medium is-centered is-fullwidth is-primary'>
      <ul>
        {CATEGORIES_ITEMS.map(props => (
          <TabItem key={`${props.categorie}-tab`} {...props} />
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
