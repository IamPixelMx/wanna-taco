import { Fragment } from 'react';

const StarRating = ({ rating }) => {
  const rateArr = [1, 2, 3, 4, 5];

  return (
    <Fragment>
      {rateArr.map(rate => (
        <label key={`star-${rate}`} for={`star-${rate}`} title={`${rate}-stars`}>
          <input
            id={`star-${rate}`}
            type='radio'
            name='rating'
            value={`star-${rate}`}
            {...(rating === rate ? 'checked' : '')}
          />
          <i className='active fa fa-star' aria-hidden='true'></i>
        </label>
      ))}
      <style jsx>
        {`
          .star-rating {
            direction: rtl;
            display: inline-block;
            padding: 20px;
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
    </Fragment>
  );
};

export default StarRating;
