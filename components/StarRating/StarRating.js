import { Fragment } from 'react';

const StarRating = ({ rating, id }) => {
  const rateArr = [1, 2, 3, 4, 5];
  const isChecked = rate => (rate <= rating ? true : false);

  return (
    <div key={`${id}-rating`} className='star-rating'>
      {rateArr.map(rate => (
        <Fragment>
          <input
            key={`${id}-star${rate}`}
            id={`${id}-star${rate}`}
            type='radio'
            name='rating'
            value={`${id}-star${rate}`}
            checked={isChecked(rate)}
          />
          <label key={`${id}-star${rate}`} for={`${id}-star${rate}`} title={`${rate}-stars`}>
            <i className='active fa fa-star' aria-hidden='true'></i>
          </label>
        </Fragment>
      ))}
    </div>
  );
};

export default StarRating;
