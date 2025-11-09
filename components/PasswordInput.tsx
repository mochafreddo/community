import { TextInputProps } from 'react-native';

import { Controller, useFormContext } from 'react-hook-form';

import { InputField } from './InputField';

interface PasswordInputProps {
  submitBehavior?: TextInputProps['submitBehavior'];
}

export const PasswordInput = ({
  submitBehavior = 'blurAndSubmit',
}: PasswordInputProps) => {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 8) {
            return '비밀번호는 8자 이상 입력해 주세요.';
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호을 입력해 주세요."
          submitBehavior={submitBehavior}
          textContentType="oneTimeCode"
          secureTextEntry
          value={value}
          onChangeText={onChange}
          error={error?.message}
          onSubmitEditing={() => setFocus('passwordConfirm')}
        />
      )}
    />
  );
};
