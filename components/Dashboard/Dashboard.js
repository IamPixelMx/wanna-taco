// import React, { useState, Fragment } from 'react';

//create custom forceUpdate hook
// const useForceUpdate = () => {
//   const [value, setValue] = useState(0); // integer state
//   return () => setValue(value => value + 1); // update the state to force render
// };
// const forceUpdate = useForceUpdate();

const Dashboard = ({ sections, activeCategorie }) => {
  // console.log('info de categoría', sections[activeCategorie]);

  return (
    <section id='dashboard'>
      <div id='list' className='container has-margin-top'>
        {activeCategorie}
        {/* {sections[activeCategorie].map(props => (
          <UserCard {...props} key={props.name} />
        ))} */}
      </div>
    </section>
  );
};

export default Dashboard;
