// import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';

type Props = TextFieldProps & {
  name: string;
  mask?: string;
  textAlign?: string;
};

const RHFTextField = ({
  name,
  helperText,
  mask,
  textAlign = 'left',
  type,
  ...other
}: Props) => {
  const { control } = useFormContext();
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        mask ? (
          <></>
          // <InputMask
          //   mask={mask}
          //   maskChar=""
          //   value={value || ''}
          //   onChange={onChange}
          //   onBlur={onBlur}
          // >
          //   {(inputProps: any) => (
          //     <TextField
          //       {...inputProps}
          //       inputRef={ref}
          //       fullWidth
          //       type={type}
          //       size="small"
          //       error={!!error}
          //       helperText={error?.message ?? helperText}
          //       sx={{
          //         input: { textAlign },
          //         '& .MuiInputBase-root': {
          //           background: focused ? '#ffffff' : '#F4F4F4',
          //           '&:hover': { background: '#ffffff' },
          //         },
          //       }}
          //       onFocus={handleFocus}
          //       onBlur={handleBlur}
          //       {...other}
          //     />
          //   )}
          // </InputMask>
        ) : (
          <TextField
            fullWidth
            type={type}
            size="small"
            error={!!error}
            helperText={error?.message ?? helperText}
            sx={{
              input: { textAlign },
              '& .MuiInputBase-root': {
                background: focused ? '#ffffff' : '#F4F4F4',
                '&:hover': { background: '#ffffff' },
              },
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...{ onChange, value, inputRef: ref, ...other }}
          />
        )
      )}
    />
  );
};

export default RHFTextField;
