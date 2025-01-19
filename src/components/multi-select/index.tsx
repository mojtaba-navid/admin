import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";

type Props = {
    name: string;
    label?: string;
    options: { value: string; label: string }[];
    helperText?: string;
    isSearchable?: boolean;
    placeholder?: string// اضافه کردن جستجو به‌صورت اختیاری
};

const RHFMultiSelect = ({ placeholder, name, label, options, helperText, isSearchable = true }: Props) => {
    const { control } = useFormContext();

    return (
        <div style={{ marginBottom: "1rem" }}>
            <label style={{ marginBottom: "0.5rem", display: "block", fontWeight: "bold" }}>
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <ReactSelect
                            isMulti
                            isSearchable={isSearchable} // فعال کردن جستجو
                            options={options}
                            value={options.filter((option) => value?.includes(option.value))} // مقادیر انتخاب‌شده
                            onChange={(selected) =>
                                onChange(selected.map((item: any) => item.value)) // به‌روزرسانی مقادیر
                            }
                            placeholder={placeholder}
                        />
                        {helperText && !error && (
                            <small style={{ color: "#6c757d", marginTop: "0.25rem", display: "block" }}>
                                {helperText}
                            </small>
                        )}
                        {error && (
                            <small style={{ color: "red", marginTop: "0.25rem", display: "block" }}>
                                {error.message}
                            </small>
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default RHFMultiSelect;
