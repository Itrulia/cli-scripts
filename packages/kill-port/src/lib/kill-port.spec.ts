import { killPort } from './kill-port';

describe('killPort', () => {
  it('should work', () => {
    expect(killPort()).toEqual('kill-port');
  });
});
