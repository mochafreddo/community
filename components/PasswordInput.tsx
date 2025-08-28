import { Controller, useFormContext } from 'react-hook-form';

import { InputField } from './InputField';

export const PasswordInput = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name="password"
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호을 입력해 주세요."
          value={value}
          onChangeText={onChange}
        />
      )}
    />
  );
};
