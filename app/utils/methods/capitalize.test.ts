import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toEqual('Hello');
    expect(capitalize('world')).toEqual('World');
  });

  it('should return an empty string if given an empty string', () => {
    expect(capitalize('')).toEqual('');
  });

  it('should return the same string if the first letter is already capitalized', () => {
    expect(capitalize('Hello')).toEqual('Hello');
    expect(capitalize('World')).toEqual('World');
  });
});
