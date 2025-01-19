import React, { useEffect, useState } from 'react';
import { AddProductData, editProduct, getAvailableProducts, getProduct } from './create-product.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, ImageUploader, Select, TextFiled } from '../../components';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from './product.schema';
import {
    OFF, MODEL, NUMBER_OF_EXIST, PHOTO,
    PRICE_FOR_USER, PRICE_FOR_WORKMATE, WARRANTY, BRAND, TYPE, CATERGORY,
    defaultValues
} from "./create-product.config";
import { Catergory } from '../../types/catergory.type';
import { PropertyTitle } from '../../types/propertyTitle.type';
import { BaseResponse } from '../../types/client/general';
import { Product } from '../../types/product.type';
import toast from 'react-hot-toast';
interface PropsType {
    model: string;
    onEdit: () => void;
    categories: Array<{ value: string, label: string }>
    CategoriesData: Array<Catergory>
}

const Edit: React.FC<PropsType> = ({ model, onEdit, categories, CategoriesData }) => {
    const [brands, setBrands] = useState<{ value: string; label: string }[]>([]);
    const [prodcutTypes, setProdcutTypes] = useState<{ value: string; label: string }[]>([]);
    const [properties, setProperties] = useState<PropertyTitle[]>([]);

    const { data, refetch } = useQuery({
        queryKey: ["product", model],
        queryFn: () => getProduct(model),
    });

    const { data: availableData } = useQuery({
        queryKey: ["available", model],
        queryFn: () => getAvailableProducts(model),
    });





    const { mutate } = useMutation<
        BaseResponse<Product>,
        Error,
        { model: string; data: AddProductData }
    >({
        mutationFn: ({ model, data }) => editProduct(model, data), // Wrapper برای تطابق با آرگومان مورد انتظار
        onSuccess: () => {
            toast.success("ویرایش محصول با موفقیت انجام شد", {
                position: "bottom-left",
            });
            refetch()
            onEdit()
            methods.reset();
        },
        onError: (error) => {
            try {
                const errorMessage = JSON.parse(error.message)?.message || "خطایی رخ داده است";
                toast.error(errorMessage, {
                    position: "bottom-left",
                });
            } catch {
                toast.error("خطایی در سرور رخ داده است", {
                    position: "bottom-left",
                });
            }
        },
    });

    useEffect(() => {
        if (data) {
            setValue("numberOfExist", availableData?.data.toString() || "")
            setValue("model", data.data.model.toString() || "")
            setValue("category", data.data.category.id.toString() || "")
            setValue("brand", data.data.brand.id.toString() || "")
            setValue("types", data.data.productTypes[0].id.toString() || "")
            setValue("priceForUser", data.data.priceForUser || "")
            setValue("priceForWorkmate", data.data.priceForWorkmate || "")
            setValue("warranty", data.data.warranty || "")
            setValue("off", data.data.off.toString() || "")
        }
    }, [data, availableData])

    const methods = useForm({
        resolver: zodResolver(productSchema),
        defaultValues,
    });
    const { handleSubmit, setValue, watch, control, formState: { isSubmitting } } = methods;

    const { fields: propertyFields } = useFieldArray({
        control,
        name: "properties",
    });

    const changeCategory = watch("category");

    useEffect(() => {
        if (changeCategory) {
            const selectedCategory = CategoriesData?.find(
                (item) => item.id.toString() === changeCategory
            );
            const optionBrands = selectedCategory?.brands.map((item) => ({
                value: item.id.toString(),
                label: item.title,
            }));
            const optionProdcutTypes = selectedCategory?.productTypes.map((item) => ({
                value: item.id.toString(),
                label: item.title,
            }));
            const categoryProperties = selectedCategory?.propertyTitles || [];
            setBrands(optionBrands || []);
            setProdcutTypes(optionProdcutTypes || []);
            setProperties(categoryProperties || []);
            methods.setValue(
                "properties",
                categoryProperties.map((propertyTitle) => ({
                    id: propertyTitle.id.toString(),
                    value: "",
                }))
            );
        }
    }, [changeCategory, CategoriesData, methods]);
    const onSubmit = handleSubmit((data) => {
        if (data[PHOTO]) {
            const senddata: AddProductData = { ...data, photo: data[PHOTO] || "" }
            mutate({ model, data: senddata })
        }
    });

    return (
        <div className="p-10">

            <Form methods={methods} onSubmit={onSubmit}>
                <div className="flex flex-col gap-4">
                    <TextFiled label="مدل" name={MODEL} type="text" />
                    <div className='z-40'>
                        <Select name={CATERGORY} options={categories} />
                        <Select name={BRAND} options={brands} />
                        <Select name={TYPE} options={prodcutTypes} />
                        {propertyFields.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-2">
                                <Select
                                    name={`properties.${index}.value`}
                                    label={`انتخاب ${properties[index]?.title || ""}`}
                                    options={properties[index]?.properties.map((prop) => ({
                                        value: prop.id.toString(),
                                        label: prop.property,
                                    })) || []}
                                />
                            </div>
                        ))}
                    </div>
                    <TextFiled label="قیمت برای کاربر" name={PRICE_FOR_USER} type="number" />
                    <TextFiled label="قیمت برای همکار" name={PRICE_FOR_WORKMATE} type="number" />
                    <TextFiled label="گارانتی" name={WARRANTY} type="text" />
                    <TextFiled label="تعداد موجودی" name={NUMBER_OF_EXIST} type="number" />
                    <TextFiled label="تخفیف" name={OFF} type="number" />

                    <ImageUploader
                        name={PHOTO}
                        label="آپلود عکس"
                        accept="image/*"
                        maxSize={2 * 1024 * 1024} // ۲ مگابایت
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting}>
                            ویرایش محصول
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default Edit;




