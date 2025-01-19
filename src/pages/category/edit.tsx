import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, TextFiled, MultiSelect, ImageUploader } from "../../components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddCategoryData, editCatergory, getCatergory, uploadFile } from "./category.api";
import { BaseResponse } from "../../types/client/general";
import { useEffect, useState } from "react";
import { Catergory } from "../../types/catergory.type";
import { toast } from 'react-hot-toast';

interface SelectFormData {
    brands: string[];
    types: string[];
    properties: string[];
    type: string,
    image: string
}

const schema = z.object({
    brands: z.array(z.string()).nonempty("حداقل یک گزینه را انتخاب کنید"),
    types: z.array(z.string()).nonempty("حداقل یک گزینه را انتخاب کنید"),
    properties: z.array(z.string()).nonempty("حداقل یک گزینه را انتخاب کنید"),
    type: z
        .string()
        .min(3, "نام دسته‌بندی باید حداقل ۳ کاراکتر باشد") // بررسی طول کاراکترها
        .max(50, "نام دسته‌بندی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد") // حداکثر طول
        .nonempty("این فیلد نمی‌تواند خالی باشد"), // بررسی عدم خال

    image: z.custom<File | null>((file) => file !== null, {
        message: "An image is required",
    })
        .refine((file) => file && file?.size <= 2 * 1024 * 1024, {
            message: "File size must be less than 2MB",
        }),
});

interface PropsType {
    brands: { value: string, label: string }[],
    properties: { value: string, label: string }[],
    productTypes: { value: string, label: string }[],
    id: number,
    onEdit: () => void
}
export default function Edit({ id, brands, properties, productTypes, onEdit }: PropsType) {
    const [dataForm, setDataForm] = useState<SelectFormData>();
    const { data } = useQuery({
        queryKey: ["category"],
        queryFn: () => getCatergory(id),
    });

    const { mutate } = useMutation<
        BaseResponse<Catergory>,
        Error,
        { id: number; data: AddCategoryData }
    >({
        mutationFn: ({ id, data }) => editCatergory(id, data), // Wrapper برای تطابق با آرگومان مورد انتظار
        onSuccess: () => {
            toast.success("ویرایش دسته‌بندی با موفقیت انجام شد", {
                position: "bottom-left",
            });
            methods.reset();
            onEdit()
        },
        onError: (error) => {
            const errorMessage = JSON.parse(error.message)?.message || "خطایی رخ داده است";
            toast.error(errorMessage, {
                position: "bottom-left",
            });

        },
    });

    useEffect(() => {
        setValue("type", data?.data.title || '')
        const selectedBrands = data?.data.brands.map((item) => item.id.toString())
        const selectedProperties = data?.data.propertyTitles.map((item) => item.id.toString())
        const selectedTypes = data?.data.productTypes.map((item) => item.id.toString())
        setValue("image", data?.data.photo || "")
        setValue("brands", selectedBrands || [''])
        setValue("properties", selectedProperties || [''])
        setValue("types", selectedTypes || [''])
    }, [data])


    const { mutate: UploadFilemutate } = useMutation<BaseResponse<{ src: string }>, Error, string>({
        mutationFn: uploadFile,
        onSuccess: (data) => {
            const sendData: AddCategoryData = {
                properties: dataForm?.properties || [],
                brands: dataForm?.brands || [],
                types: dataForm?.types || [],
                type: dataForm?.type || "",
                photo: data.data.src || ""
            }
            toast.success("فایل با موفقیت اپلود شد", {
                position: 'bottom-left',
            });
            mutate({ id, data: sendData })
        },
        onError: (error) => {
            toast.error(JSON.parse(error.message).message, {
                position: 'bottom-left',
            });
        },
    });



    const methods = useForm<SelectFormData>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: {
            brands: [],
            type: "",
            types: [],
            properties: [],

        }
    });

    const { handleSubmit, setValue } = methods;

    const onSubmit = handleSubmit((formData) => {
        setDataForm(formData)
        UploadFilemutate(formData.image)
        // UploadFilemutate(formData)
    });
    const isSubmitting = false
    return (
        <div className=" p-10">
            {/* <Card showHeader={false}> */}
            <Form methods={methods} onSubmit={onSubmit}>
                <div className="flex flex-col gap-0 " dir="rtl">
                    <div className=" mb-4">
                        <TextFiled
                            type="text"
                            label="نام دسته بندی"
                            name="type"
                            className="w-full sm:w-1/2"
                        />
                    </div>
                    <MultiSelect
                        // label="گزینه 1"
                        name="brands"
                        options={brands}
                        placeholder="برندها"
                    />
                    <MultiSelect
                        // label="گزینه 2"

                        name="types"
                        placeholder="انواع"
                        options={productTypes}
                    />
                    <MultiSelect
                        // placeholder="ویژگی ها "
                        placeholder="ویژگی ها"
                        name="properties"
                        options={properties}
                    />
                    <ImageUploader name="image" />
                    <div className="flex justify-end mt-4">
                        <Button variant="contained" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "در حال ارسال..." : "ارسال"}
                        </Button>
                    </div>
                </div>
            </Form>
            {/* </Card> */}
        </div>
    );
}
