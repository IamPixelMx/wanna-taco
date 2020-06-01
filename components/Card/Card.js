const Card = ({ id, rating, name, contact: { phone, site }, address: { street, city, state } }) => {
  const rateArr = [1, 2, 3, 4, 5];
  const getStar = rate => (rate <= rating ? '&nbsp;⭐' : '');

  return (
    <div id={`${id}-card`} className='tile is-child box'>
      <article className='media'>
        <figure className='media-left'>
          <p className='image is-96x96 is-img-card'>
            <img className='is-rounded' src='/logo.png' />
          </p>
        </figure>
        <div className='media-content'>
          <p>{name}</p>
          <p className='subtitle is-5 has-text-weight-bold is-spaced'>Dirección</p>
          <p>📍 &nbsp; {`${street}, ${city}, ${state}`}</p>
          <p className='subtitle is-5 is-spaced'>
            <small>📞 &nbsp; {phone} </small>
          </p>
          <p className='is-inline-block has-text-weight-semibold'>Rating:&nbsp;&nbsp;{rating}</p>
          {rateArr.map(rate => getStar(rate))}
          <div className='level has-text-centered'>
            <p className='level-item is-vertical-align'>
              <a href={site} target='_blank'>
                <span className='is-vertical-align'>
                  <small className='has-text-weight-semibold'> 👍 &nbsp; Me gusta </small>
                </span>
              </a>
            </p>
            <p className='level-item is-vertical-align'>
              <a href={site} target='_blank'>
                <span className='is-vertical-align'>
                  <small className='has-text-weight-semibold'> 🌐 &nbsp; Abrir sitio web </small>
                </span>
              </a>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
