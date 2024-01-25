import {getSeconds} from '../getSeconds';

describe('utils: getSeconds', () => {
  it('should return "00" when input is 0', () => {
    expect(getSeconds(0)).toBe('00');
  });

  it('should return "30" when input is 30 seconds', () => {
    expect(getSeconds(30)).toBe('30');
  });

  it('should return "00" when input is 60 (1 minute)', () => {
    expect(getSeconds(60)).toBe('00');
  });

  it('should return "15" when input is 75 (1 minute 15 seconds)', () => {
    expect(getSeconds(75)).toBe('15');
  });

  it('should return "00" when input is 120 (2 minutes)', () => {
    expect(getSeconds(120)).toBe('00');
  });

  it('should return "59" when input is 179 (2 minutes 59 seconds)', () => {
    expect(getSeconds(179)).toBe('59');
  });
});
