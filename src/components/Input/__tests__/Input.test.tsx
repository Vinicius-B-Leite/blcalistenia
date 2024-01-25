import {fireEvent, render, screen} from '@/test';
import {Input} from '../Input';
import {Text} from 'react-native';

describe('Input Component', () => {
  it('should call the handleTextChange function when text is entered', () => {});

  it('should display leftIcon if provided', () => {
    const {getByText} = render(<Input leftIcon={<Text>Test</Text>} />);

    const leftIcon = getByText('Test');
    expect(leftIcon).toBeTruthy();
  });

  it('should display rightIcon if provided', () => {
    const {getByText} = render(<Input rightIcon={<Text>Test</Text>} />);

    const rightIcon = getByText('Test');
    expect(rightIcon).toBeTruthy();
  });
  it('should aplly the minute mask if provided', () => {
    const mockonChangeText = jest.fn();
    const {getByPlaceholderText} = render(
      <Input
        placeholder="00:00"
        mask="mm:ss"
        onChangeText={mockonChangeText}
      />,
    );

    const input = getByPlaceholderText('00:00');

    fireEvent.changeText(input, '1234');

    expect(mockonChangeText).toHaveBeenCalledWith('12:34');
  });
});
