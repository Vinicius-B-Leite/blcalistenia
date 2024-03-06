import {dark} from '@/theme';
import {getDatesTrained} from '../getDatesTrained';
import {mocks} from './__mocks__/mocks';

describe('utils: getDatesTrained', () => {
  it('should return an array of configured dates', () => {
    const config = {
      selected: false,
      marked: true,
      dotColor: dark.colors.contrast,
    };
    const datesConfigureds = getDatesTrained(config, mocks.historicMock);

    expect(datesConfigureds).toEqual({
      '2024-01-26': {
        selected: false,
        marked: true,
        dotColor: dark.colors.contrast,
      },
    });
  });

  it('should return an empty object if historic em an empty array', () => {
    const config = {
      selected: false,
      marked: true,
      dotColor: dark.colors.contrast,
    };
    const datesConfigureds = getDatesTrained(config, []);

    expect(datesConfigureds).toEqual({});
  });
});
