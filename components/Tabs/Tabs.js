import { TabItem } from '.';
import { CATEGORIES_ITEMS } from 'utils';

const Tabs = () => {
  return (
    <div className='tabs is-toggle is-toggle-rounded is-medium is-centered is-fullwidth'>
      <ul>
        {CATEGORIES_ITEMS.map(props => (
          <TabItem {...props} />
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
