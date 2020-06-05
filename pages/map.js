import regeneratorRuntime from 'regenerator-runtime';
import Fade from 'react-reveal/Fade';
import { Layout, Map } from 'components';

const MapPage = () => {
  return (
    <Layout>
      <Fade left>
        <section id='map-page' className={'padding-top section .m-t-xxl'}>
          <div className='container'>
            <h5 className='subtitle is-4 is-spaced'>
              Encuentra la info y ubicación de los mejores restaurantes en tu zona{' '}
            </h5>
            <div className='content has-text-centered has-lg-margin-top'>
              <Map />
            </div>
          </div>
        </section>
      </Fade>
    </Layout>
  );
};

export default MapPage;
