import React from 'react';
import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';

import {Input, InputProps} from '../Input/Input';

export type FormTextInputProps<T extends FieldValues> = Omit<
  InputProps,
  'value' | 'onChangeText'
> &
  UseControllerProps<T>;

export const FormInput = <T extends FieldValues>({
  control,
  name,
  rules,
  ...rest
}: FormTextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <Input value={field.value} onChangeText={field.onChange} {...rest} />
      )}
    />
  );
};
