import React, { useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Dashboard, Layout, Tabs } from 'components';
import { GET_MELP_RESTAURANTS_DATA } from '../redux/constants';
import { getCategories } from '../redux/selectors';

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  /*
   * Use 'useEffect' to get Melp data
   */
  useEffect(() => {
    dispatch({ type: GET_MELP_RESTAURANTS_DATA });
  }, []);

  return (
    <Layout>
      <Fade right>
        <section id='home' className={'section .m-t-xxl'}>
          <div className='container'>
            <h2 className='title is-2 is-spaced'>¡Bienvenid@!</h2>
            <h5 className='subtitle is-3 is-spaced'>
              Tenemos toda la información de los sitios con mejor sabor, estilo y servicio.
            </h5>
            <div className='content has-text-centered has-lg-margin-top'>
              <p className='is-size-4'> ¿Qué se te anotoja comer hoy?</p>
              <Tabs />
              <Dashboard />
            </div>
          </div>
        </section>
      </Fade>
    </Layout>
  );
};

export default Home;
