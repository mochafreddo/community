import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { InputField } from './InputField';

export const PasswordConfirmInput = () => {
  const { control } = useFormContext();
  const { password } = useWatch({ control, name: 'password' });

  return (
    <Controller
      name="passwordConfirm"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data !== password) {
            return '비밀번호가 일치하지 않습니다.';
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호 확인을 입력해 주세요."
          secureTextEntry
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
};
