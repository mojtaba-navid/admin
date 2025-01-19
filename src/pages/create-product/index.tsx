// AddProductForm.tsx
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProduct, AddProductData, deleteProduct, getProducts, uploadFile } from "./create-product.api";
import {
    OFF, MODEL, NUMBER_OF_EXIST, PHOTO,
    PRICE_FOR_USER, PRICE_FOR_WORKMATE, WARRANTY, BRAND, TYPE, CATERGORY,
    defaultValues
} from "./create-product.config";
import { Button, TextFiled, Select, ImageUploader, Form, Card, Modal } from "../../components";
import AddCollapse from "../../components/add-collapse";
import { productSchema } from "./product.schema";
import { getCatergories } from "../category/category.api";
import { BaseResponse } from "../../types/client/general";
import { Product } from "../../types/product.type";
import CustomDataGrid from "../../components/dataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Icon } from '@iconify/react'
import Edit from "./edit";
import { ProductPhoto } from "../../types/productPhoto.type";
import { PropertyTitle } from "../../types/propertyTitle.type";
import toast from "react-hot-toast";



const AddProductForm: React.FC = () => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [rows, setRows] = useState<Array<Product>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [model, setModel] = useState<string>()
    const [dataForm, setDataForm] = useState<AddProductData>();

    const pageSize = 10;

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["productTypes", currentPage],
        queryFn: () => getProducts(currentPage, pageSize),
    });

    useEffect(() => {
        if (data) {
            setRows(data.data || []);
            setTotalPageCount(data.meta?.pageCount || 1);

        }
    }, [data]);

    const { mutate: deleteMutate } = useMutation<
        BaseResponse<void>,
        Error,
        { model: string }
    >({
        mutationFn: ({ model }: { model: string }) => deleteProduct(model || ""),
        onSuccess: () => {
            toast.success("ویرایش محصول با موفقیت انجام شد", {
                position: "bottom-left",
            });
            refetch()
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

    const columns: GridColDef[] = [
        { field: "model", headerName: "مدل", width: 200 },
        {
            field: "actions",
            headerName: "عملیات",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='  flex mt-2 gap-8'>
                        <Icon icon="ic:baseline-delete" width="24" height="24" className=' text-red-500 mt-1 cursor-pointer' onClick={() => { console.log(params.row.model); deleteMutate(params.row.model) }} />
                        <Icon icon="mage:edit" width="24" height="24" className='text-blue-600 mt-1 cursor-pointer' onClick={() => { setOpenEditModal(true); setModel(params.row.model) }} />
                    </div >
                );
            },
        },
    ];
    const [brands, setBrands] = useState<{ value: string; label: string }[]>([]);
    const [prodcutTypes, setProdcutTypes] = useState<{ value: string; label: string }[]>([]);
    const [properties, setProperties] = useState<
        Array<PropertyTitle>
    >([]);
    const methods = useForm<AddProductData>({
        resolver: zodResolver(productSchema),
        defaultValues,
    });

    const { fields: propertyFields } = useFieldArray({
        control: methods.control,
        name: "properties",
    });


    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        refetch()
    };

    const { data: CategoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCatergories(1, 50),
    });

    const categories = CategoriesData?.data.data.map((item) => ({
        value: item.id.toString(),
        label: item.title,
    })) || [];

    const { handleSubmit, reset, watch, formState: { isSubmitting } } = methods;

    const mutation = useMutation<BaseResponse<Product>, Error, AddProductData>({
        mutationFn: addProduct,
        onSuccess: () => {
            toast.success("افزودن محصول با موفقیت انجام شد", {
                position: "bottom-left",
            });
            reset();
        },
        onError: (error) => {
            let errorMessage = "خطایی رخ داده است.";
            try {
                errorMessage = JSON.parse(error.message).message;
            } catch {
                // اگر پیام خطا JSON نباشد، از پیام پیش‌فرض استفاده شود
            }
            toast.error(errorMessage, {
                position: "bottom-left",
            });
        },
    });

    const changeCategory = watch("category");
    useEffect(() => {
        if (changeCategory) {
            const selectedCategory = CategoriesData?.data.data.find(
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
    }, [changeCategory]);


    const { mutate: UploadFilemutate } = useMutation<BaseResponse<ProductPhoto>, Error, string>({
        mutationFn: uploadFile,
        onSuccess: (data) => {
            console.log(data)
            // const sendData = {
            //     ...dataForm,
            //     photo: data.data.id
            // }

            const sendData = {

                type: dataForm?.type || "",
                model: dataForm?.model || "",
                category: dataForm?.category || "",
                brand: dataForm?.brand || "",
                types: dataForm?.types || "",
                priceForUser: dataForm?.priceForUser || "",
                priceForWorkmate: dataForm?.priceForWorkmate || "",
                warranty: dataForm?.warranty || "",
                numberOfExist: dataForm?.numberOfExist || "",
                off: dataForm?.off || "",
                properties: dataForm?.properties || [],
                photo: dataForm?.photo || "",
            }
            mutation.mutate(sendData)
            toast.success("فایل با موفقیت اپلود شد", {
                position: 'bottom-left',
            });
        },
        onError: (error) => {
            toast.error(JSON.parse(error.message).message, {
                position: 'bottom-left',
            });
        },
    });


    const onSubmit = handleSubmit((data) => {
        if (!data.photo)
            mutation.mutate(data);
        else {
            setDataForm(data)
            UploadFilemutate(data.photo)
        }
    });

    return (
        <>
            <AddCollapse title="ایجاد محصول">
                <Card showHeader={false}>
                    <Form methods={methods} onSubmit={onSubmit}>
                        <div className="flex flex-col gap-4">
                            <TextFiled label="مدل" name={MODEL} type="text" />
                            <div className=" z-40">
                                <Select label="دسته‌بندی" name={CATERGORY} options={categories} />
                                <Select label="برند" name={BRAND} options={brands} />
                                <Select label="نوع" name={TYPE} options={prodcutTypes} />

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
                                <Button type="submit" loading={isSubmitting}>
                                    افزودن محصول
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Card>
            </AddCollapse>

            <Card showHeader={false} className="w-full h-5/6 mt-8">
                <CustomDataGrid
                    rows={rows}
                    columns={columns}
                    totalPageCount={totalPageCount}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    loading={isFetching}
                />
            </Card>
            <Modal show={openEditModal}
                title={'ویرایش'}
                onClose={() => setOpenEditModal(false)}
                modalContent={<Edit CategoriesData={CategoriesData?.data.data || []} categories={categories} model={model || ''} onEdit={() => { setOpenEditModal(false); refetch() }} />} sheetContent={<Edit categories={categories} CategoriesData={CategoriesData?.data.data || []} model={model || ''} onEdit={() => { refetch(); setOpenEditModal(false) }} />}
            />


        </>
    );
};

export default AddProductForm;


