import { isObjectEmpty } from '../';

describe('Tests isObjectEmpty', () => {
  it('Tests empty object', () => {
    const obj = {};
    const isEmpty = isObjectEmpty(obj);
    expect(isEmpty).toBe(true);
  });

  it('Tests object with elements', () => {
    const obj = {
      name: 'tests',
    };
    const isEmpty = isObjectEmpty(obj);
    expect(isEmpty).toBe(false);
  });
});
