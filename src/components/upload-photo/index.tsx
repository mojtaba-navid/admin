import { Controller,  useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";

type Props = {
    name: string;
    label?: string;
    helperText?: string;
    accept?: string;
    maxSize?: number;
};

const RHFImageUploader = ({
    name,
    label,
    helperText,
    // accept = "image/*",
    maxSize = 2 * 1024 * 1024, // Default 2MB
}: Props) => {
    const { control, watch } = useFormContext();
    const [preview, setPreview] = useState<string | null>(null);

    // گرفتن مقدار پیش‌فرض از فرم
    const defaultValue = watch(name);

    useEffect(() => {
        if (defaultValue && typeof defaultValue === "string") {
            setPreview(defaultValue); // تنظیم مقدار پیش‌فرض
        }
    }, [defaultValue]);

    const onDrop = (acceptedFiles: File[], onChange: Function) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setPreview(URL.createObjectURL(file)); // Show image preview
            onChange(file); // Save file in form context
        }
    };

    const clearFile = (onChange: Function) => {
        setPreview(null); // Clear preview
        onChange(null); // Reset field value
    };

    return (
        <div className="form-group">
            {label && (
                <label className="form-label" style={{ fontWeight: "bold" }}>
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => {
                    const { getRootProps, getInputProps } = useDropzone({
                        onDrop: (files) => onDrop(files, onChange),
                        // accept,
                        maxSize,
                        multiple: false, // Single file upload
                    });

                    return (
                        <div>
                            <div
                                {...getRootProps()}
                                className="dropzone"
                                style={{
                                    border: "2px dashed #cccccc",
                                    padding: "20px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <input {...getInputProps()} />
                                <p>Click here or drag a file to upload.</p>
                            </div>
                            {preview && (
                                <div
                                    style={{
                                        marginTop: "1rem",
                                        textAlign: "center",
                                        position: "relative",
                                    }}
                                >
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{
                                            maxWidth: "100px",
                                            height: "auto",
                                            borderRadius: "8px",
                                        }}
                                    />
                                    <Icon
                                        icon="mdi:close-circle"
                                        style={{
                                            position: "absolute",
                                            top: "0",
                                            right: "0",
                                            cursor: "pointer",
                                            color: "red",
                                            fontSize: "20px",
                                        }}
                                        onClick={() => clearFile(onChange)}
                                    />
                                </div>
                            )}
                            {helperText && !error && (
                                <small className="text-muted">{helperText}</small>
                            )}
                            {error && (
                                <small className="text-danger">{error.message}</small>
                            )}
                        </div>
                    );
                }}
            />
        </div>
    );
};



export default RHFImageUploader