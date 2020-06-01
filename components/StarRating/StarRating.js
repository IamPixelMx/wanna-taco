import { Fragment } from 'react';

const StarRating = ({ rating, id }) => {
  const rateArr = [1, 2, 3, 4, 5];
  const isChecked = rate => (rate <= rating ? true : false);

  return (
    <div className='star-rating'>
      {rateArr.map(rate => (
        <Fragment>
          <input
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
      <style jsx>
        {`
          .star-rating {
            direction: rtl;
            display: block;
          }

          .star-rating input[type='radio'] {
            display: none;
          }

          .star-rating label {
            color: #bbb;
            font-size: 18px;
            padding: 0;
            cursor: pointer;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
          }

          .star-rating label:hover,
          .star-rating label:hover ~ label,
          .star-rating input[type='radio']:checked ~ label {
            color: #f2b600;
          }
        `}
      </style>
    </div>
  );
};

export default StarRating;
