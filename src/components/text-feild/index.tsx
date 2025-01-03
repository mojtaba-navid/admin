import type { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';

type Props = TextFieldProps & {
  name: string;
  mask?: string;
  textAlign?: string;
};

const RHFTextField = ({
  textAlign = 'center',
  name,
  helperText,
  mask,
  type,
  ...other
}: Props) => {
  const { control } = useFormContext();

  const commonStyles = {
    input: {
      textAlign: textAlign,
      direction: 'ltr',
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) =>
        mask ? (
          <InputMask
            mask={mask}
            maskChar=""
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                inputRef={ref}
                fullWidth
                type={type}
                dir="rtl"
                className="bg"
                size="small"
                error={!!error}
                helperText={error?.message ?? helperText}
                sx={commonStyles}
                {...other}
              />
            )}
          </InputMask>
        ) : (
          <TextField
            fullWidth
            type={type}
            dir="rtl"
            className="bg"
            size="small"
            error={!!error}
            helperText={error?.message ?? helperText}
            sx={commonStyles}
            {...{ onChange, onBlur, value, inputRef: ref, ...other }}
          />
        )
      }
    />
  );
};

export default RHFTextField;
