import {getMinutesFromSeconds} from '../getMinutesFromSeconds';

describe('utils: getMinutesFromSeconds', () => {
  it('should return "00" when input is 0', () => {
    expect(getMinutesFromSeconds(0)).toBe('00');
  });

  it('should return "00" when input is 30 seconds', () => {
    expect(getMinutesFromSeconds(30)).toBe('00');
  });

  it('should return "01" when input is 60 (1 minute)', () => {
    expect(getMinutesFromSeconds(60)).toBe('01');
  });

  it('should return "01" when input is 75 (1 minute 15 seconds)', () => {
    expect(getMinutesFromSeconds(75)).toBe('01');
  });

  it('should return "02" when input is 120 (2 minutes)', () => {
    expect(getMinutesFromSeconds(120)).toBe('02');
  });

  it('should return "02" when input is 179 (2 minutes 59 seconds)', () => {
    expect(getMinutesFromSeconds(179)).toBe('02');
  });

  it('should return "03" when input is 180 (3 minutes)', () => {
    expect(getMinutesFromSeconds(180)).toBe('03');
  });
});
