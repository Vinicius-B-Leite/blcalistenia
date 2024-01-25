import React from 'react';

import {Filter} from '../Filter';
import {render} from '@/test';
import {dark} from '@/theme';

describe('Filter', () => {
  it('should display the correct labe', () => {
    const {getByText} = render(<Filter label="Test" isActive={false} />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('should have correct styles when isActive is true', () => {
    const {getByTestId, getByText} = render(
      <Filter label="Test" isActive={true} />,
    );

    const filterComponent = getByTestId('filter-component');
    expect(filterComponent).toHaveStyle({
      backgroundColor: dark.colors.contrast,
    });

    const label = getByText('Test');
    expect(label).toHaveStyle({
      color: dark.colors.text,
    });
  });

  it('should have correct styles when isActive is false', () => {
    const {getByTestId, getByText} = render(
      <Filter label="Test" isActive={false} />,
    );

    const filterComponent = getByTestId('filter-component');
    expect(filterComponent).toHaveStyle({
      backgroundColor: dark.colors.primaryBg,
    });

    const label = getByText('Test');
    expect(label).toHaveStyle({
      color: dark.colors.secondText,
    });
  });
});
