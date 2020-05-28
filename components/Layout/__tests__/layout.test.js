import React from 'react';
import renderer from 'react-test-renderer';
import { Layout } from 'components';

describe('Layout', () => {
  const layoutElement = renderer.create(<Layout />).toJSON();

  it('Renders Layout', () => {
    expect(layoutElement).toMatchSnapshot();
  });
});
