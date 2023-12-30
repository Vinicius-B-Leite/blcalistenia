import React, {useRef} from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import {BoxPressable, Box} from '../Box/Box';
import {useAppTheme} from '@/hooks';
import {textsVariantsStyles} from '../Text/variants';
import {BoxType} from '../Box/types';
import {inputMasks} from './constants';

export type InputProps = TextInputProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  boxProps?: BoxType;
  textPreset?: keyof typeof textsVariantsStyles;
  mask?: keyof typeof inputMasks;
};

export const Input: React.FC<InputProps> = ({
  leftIcon,
  rightIcon,
  boxProps,
  textPreset = 'pMedium',
  mask,
  onChangeText,
  ...inputProps
}) => {
  const theme = useAppTheme();
  const inputRef = useRef<TextInput>(null);

  const handleTextChange = (text: string) => {
    if (mask) {
      const formattedText = inputMasks[mask](text);
      inputRef.current?.setNativeProps({text: formattedText});
      if (onChangeText) {
        onChangeText(formattedText);
      }
      return;
    }

    onChangeText && onChangeText(text);
  };

  return (
    <BoxPressable
      onPress={() => inputRef.current?.focus()}
      bg="primaryBg"
      height={55}
      borderRadius={10}
      flexDirection="row"
      alignItems="center"
      paddingHorizontal={14}
      gap={4}
      activeOpacity={1}
      {...boxProps}>
      {leftIcon}
      <TextInput
        ref={inputRef}
        style={{
          ...textsVariantsStyles[textPreset],
          color: theme.colors.text,
          flex: 1,
        }}
        cursorColor={theme.colors.contrast}
        placeholderTextColor={theme.colors.secondText}
        onChangeText={handleTextChange}
        {...inputProps}
      />
      {rightIcon}
    </BoxPressable>
  );
};
