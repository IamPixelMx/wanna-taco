import React from 'react';
import renderer from 'react-test-renderer';
import { Oops } from 'components';

describe('Oops', () => {
  const oopsElement = renderer.create(<Oops />).toJSON();

  it('Renders Oops', () => {
    expect(oopsElement).toMatchSnapshot();
  });
});
