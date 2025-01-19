import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";

type Props = {
    name: string;
    label?: string;
    options: { value: string; label: string }[];
    helperText?: string;
    isSearchable?: boolean;
};

const RHFSingleSelect = ({ name, label, options, helperText, isSearchable = true }: Props) => {
    const { control } = useFormContext();

    return (
        <div style={{ marginBottom: "1rem" }}>
            {label && (
                <label className="pr-2">
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}

                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <ReactSelect
                            className=" border-red-50 border"
                            isSearchable={isSearchable} // فعال کردن قابلیت جستجو
                            options={options}
                            value={options.find((option) => option.value === value) || null} // مقدار انتخاب‌شده
                            onChange={(selected) => onChange((selected as any)?.value || "")} // مقدار انتخاب‌شده
                            placeholder={''}
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

export default RHFSingleSelect;
