import React from 'react';
import renderer from 'react-test-renderer';
import { Loader } from 'components';

describe('Loader', () => {
  const loaderElement = renderer.create(<Loader />).toJSON();

  it('Renders Loader', () => {
    expect(loaderElement).toMatchSnapshot();
  });
});
