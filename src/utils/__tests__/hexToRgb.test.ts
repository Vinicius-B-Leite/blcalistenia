import {hexToRgb} from '../hexToRgb';

describe('utils: hexToRgb', () => {
  it('should convert hex color to rgba correctly', () => {
    const result = hexToRgb('#ffffff', 1);
    expect(result).toBe('rgba(255, 255, 255, 1)');
  });

  it('should not permit hex color without hash symbol', () => {
    const result = hexToRgb('000000', 0.5);
    expect(result).toBe('');
  });

  it('should handle uppercase hex color', () => {
    const result = hexToRgb('#ABCDEF', 0.8);
    expect(result).toBe('rgba(171, 205, 239, 0.8)');
  });

  it('should handle invalid hex color', () => {
    const result = hexToRgb('zzzzzz', 1);
    expect(result).toBe('');
  });

  it('should handle opacity correctly', () => {
    const result = hexToRgb('#123456', 0.3);
    expect(result).toBe('rgba(18, 52, 86, 0.3)');
  });
});
