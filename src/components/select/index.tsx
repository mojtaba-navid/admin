import type { SelectProps } from '@mui/material/Select';
import { Controller, useFormContext } from 'react-hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

type Props = SelectProps & {
    name: string;
    label: string;
    options: { value: string | number; label: string }[];
    helperText?: string;
};

const RHFSelect = ({ name, label, options, helperText, ...other }: Props) => {
    const { control } = useFormContext();

    return (
        <FormControl fullWidth size="small" error={!!helperText}>
            <InputLabel>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
                    <>
                        <Select
                            {...other}
                            value={value || ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            inputRef={ref}
                            label={label}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {helperText && <FormHelperText>{helperText}</FormHelperText>}
                        {error && <FormHelperText>{error.message}</FormHelperText>}
                    </>
                )}
            />
        </FormControl>
    );
};

export default RHFSelect;
