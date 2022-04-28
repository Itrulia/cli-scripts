import { blamePort } from './blame-port';

describe('blamePort', () => {
  it('should work', () => {
    expect(blamePort()).toEqual('blame-port');
  });
});
