import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import configureStore from 'redux/configureStore';

const renderWithProvider = (
  uiComponent,
  { initialState, store = configureStore(initialState, { isServer: false }) } = {},
) => {
  return {
    ...render(<Provider store={store}>{uiComponent}</Provider>),
    store,
  };
};

export default renderWithProvider;
