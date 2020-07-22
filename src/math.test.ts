import { sum } from './math';

describe('Math', () => {
  it('should sum two values', () => {
    expect(sum(2, 2)).toEqual(4);
  });
});
