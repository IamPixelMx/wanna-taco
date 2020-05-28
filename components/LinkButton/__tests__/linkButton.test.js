import React from 'react';
import renderer from 'react-test-renderer';
import { LinkButton } from 'components';

describe('LinkButton', () => {
  const buttonElement = renderer.create(<LinkButton />).toJSON();

  it('Renders LinkButton', () => {
    expect(buttonElement).toMatchSnapshot();
  });
});
