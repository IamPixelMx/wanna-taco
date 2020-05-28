import React, { useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';

import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Layout, LinkButton } from 'components';
import { getMelpRestaurantsData } from '../redux/actions';
import { getRestaurantsData } from '../redux/selectors';

const Home = () => {
  const dispatch = useDispatch();
  const restaurantsData = useSelector(getRestaurantsData);

  /*
   * Use 'useEffect' to get Melp data
   */
  useEffect(() => {
    dispatch(getMelpRestaurantsData());
    console.log('restaurantsData antes de return: ', restaurantsData);
  }, [restaurantsData]);

  /*
   *Categories of food
   */
  const SELECTIONS = [
    { href: '/cafecito', text: 'cafecito', color: 'is-info' },
    { href: '/oriental', text: 'oriental', color: 'is-warning' },
    { href: '/postres', text: 'postres', color: 'is-primary' },
    { href: '/tacos', text: 'tacos', color: 'is-link' },
    { href: '/vegetariano', text: 'vegetariano', color: 'is-danger' },
  ];

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
              <div className='buttons is-centered'>
                {/* <LinkButton href='/home' text='vegetariano' color='is-danger' /> */}
                {/*  <LinkButton {SELECTIONS[0]} />
                  <LinkButton {SELECTIONS[1]} />
                  <LinkButton {SELECTIONS[2]} />
                  <LinkButton {SELECTIONS[3]} />*/}
              </div>
            </div>
          </div>
        </section>
      </Fade>
    </Layout>
  );
};

export default Home;
