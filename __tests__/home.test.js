import React from 'react';
import renderer from 'react-test-renderer';
import Home from 'pages';

describe('Home', () => {
  const homeElement = renderer.create(<Home />).toJSON();

  it('Renders Home', () => {
    expect(homeElement).toMatchSnapshot();
  });
});
