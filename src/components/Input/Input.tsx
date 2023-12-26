import React, {useRef} from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import Box, {BoxPressable} from '../Box/Box';
import {useAppTheme} from '@/hooks/useAppTheme';
import {textsVariantsStyles} from '../Text/variants';
import {BoxType} from '../Box/types';

type InputProps = TextInputProps & {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  boxProps?: BoxType;
};

const Input: React.FC<InputProps> = ({
  leftIcon,
  rightIcon,
  boxProps,
  ...inputProps
}) => {
  const theme = useAppTheme();
  const inputRef = useRef<TextInput>(null);

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
      {...boxProps}>
      {leftIcon}
      <TextInput
        ref={inputRef}
        placeholder="askdnakjsndajk"
        style={{
          ...textsVariantsStyles.pMedium,
          color: theme.colors.text,
          flex: 1,
        }}
        cursorColor={theme.colors.contrast}
        placeholderTextColor={theme.colors.secondText}
        {...inputProps}
      />
      {rightIcon}
    </BoxPressable>
  );
};

export default Input;
