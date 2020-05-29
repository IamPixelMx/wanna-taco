import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { TacosIcon } from 'components';

// const getIndex = id => {
//   const store = useStore();
//   const { reposList } = store.getState().reposListReducer;
//   const index = reposList.findIndex(repo => repo.id === id);
//   return index;
// };

const Card = ({ id, rating, name, contact, address }) => {
  return (
    <div className='tile is-child box' key={id}>
      <article className='media'>
        <figure className='media-left'>
          <p className='image is-96x96 is-img-card'>
            <img className='is-rounded' src='/logo.png' />
          </p>
        </figure>
        <div className='media-content'>
          <div className='content'>
            <p className='title is-4'>{name}</p>
            <p className='subtitle is-5 has-text-weight-bold is-spaced'>Dirección</p>
            <p>{`${address.street}, ${address.city}, ${address.state}`}</p>
            <p className='subtitle is-5 is-spaced'>
              <small> {`📞  ${contact.phone}`} </small>
            </p>
            <p className='subtitle is-5 is-spaced'>
              <small> {`Calificación: ${rating}  ⭐`} </small>
            </p>
            <div className='level has-text-centered'>
              <p className='level-item is-vertical-align'>
                <a href={contact.site} target='_blank'>
                  <span className='is-vertical-align'>
                    <small className='has-text-weight-semibold'>{`👍   Me gusta`}</small>
                  </span>
                </a>
              </p>
              <p className='level-item is-vertical-align'>
                <a href={contact.site} target='_blank'>
                  <span className='is-vertical-align'>
                    <small className='has-text-weight-semibold'>Abrir sitio</small>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
