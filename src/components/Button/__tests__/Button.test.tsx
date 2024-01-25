import {fireEvent, render} from '@/test';
import {Button} from '../Button';

describe('<Button />', () => {
  it('should call onPress function when it is NOT loading or disabed', () => {
    const mockedOnPress = jest.fn();
    const {getByText} = render(<Button label="Test" onPress={mockedOnPress} />);

    const label = getByText('Test');
    expect(label).toBeTruthy();

    fireEvent.press(label);
    expect(mockedOnPress).toHaveBeenCalledTimes(1);
  });

  it('should NOT call onPress function when it is loading', () => {
    const mockedOnPress = jest.fn();
    const {getByTestId} = render(
      <Button label="Test" onPress={mockedOnPress} isLoading />,
    );

    const spinner = getByTestId('spinner');
    expect(spinner).toBeTruthy();

    fireEvent.press(spinner);
    expect(mockedOnPress).toHaveBeenCalledTimes(0);
  });
  it('should NOT call onPress function when it is disabled', () => {
    const mockedOnPress = jest.fn();
    const {getByText} = render(
      <Button label="Test" onPress={mockedOnPress} disabled />,
    );

    const label = getByText('Test');
    expect(label).toBeTruthy();

    fireEvent.press(label);
    expect(mockedOnPress).toHaveBeenCalledTimes(0);
  });
});
