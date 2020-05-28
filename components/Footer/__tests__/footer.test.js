import React from 'react';
import renderer from 'react-test-renderer';
import { Footer } from 'components';

describe('Footer', () => {
  const footerElement = renderer.create(<Footer />).toJSON();

  it('Renders Footer', () => {
    expect(footerElement).toMatchSnapshot();
  });
});
