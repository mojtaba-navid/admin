import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, TextFiled, MultiSelect, Card, ImageUploader, Modal } from "../../components"; // Assuming you have a Select component
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBrands } from "../brand/brand.api";
import { getProductTypes } from "../product-type/prodcut-type.api";
import { getProperties } from "../property/property.api";
import AddCollapse from "../../components/add-collapse";
import { AddCategory, AddCategoryData, deleteCategory, getCatergories, uploadFile } from "./category.api";
import { Catergory } from "../../types/catergory.type";
import { BaseResponse } from "../../types/client/general";
import { useEffect, useState } from "react";
import CustomDataGrid from "../../components/dataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import Edit from "./edit";
import toast from "react-hot-toast";

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

    image: z
        .custom<File | null>((file) => file !== null, {
            message: "An image is required",
        })
        .refine((file) => file && file?.size <= 2 * 1024 * 1024, {
            message: "File size must be less than 2MB",
        }),
});

export default function Categories() {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [rows, setRows] = useState<Array<Catergory>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [dataForm, setDataForm] = useState<SelectFormData>();
    const [id, setId] = useState<number>(0)
    const pageSize = 10;

    const columns: GridColDef[] = [
        { field: "title", headerName: "نام دسته بندی", width: 200 },
        {
            field: "actions",
            headerName: "عملیات",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='  flex mt-2 gap-8'>
                        <Icon icon="ic:baseline-delete" width="24" height="24" className=' text-red-500 mt-1 cursor-pointer' onClick={() => deleteMutate(params.row.id)} />
                        <Icon icon="mage:edit" width="24" height="24" className='text-blue-600 mt-1 cursor-pointer' onClick={() => { setOpenEditModal(true); console.log('parmas', params?.row?.id); setId(params.row.id) }} />
                    </div >
                );
            },
        },
    ];

    const { data: categoryData, isFetching, refetch } = useQuery({
        queryKey: ["brands", currentPage],
        queryFn: () => getCatergories(currentPage, pageSize),
    });

    const { data } = useQuery({
        queryKey: ["brand"],
        queryFn: () => getBrands(1, 50),
    });
    const { data: productTypesData } = useQuery({
        queryKey: ["prodcutType"],
        queryFn: () => getProductTypes(1, 50),
    });
    const { data: propertiesData } = useQuery({
        queryKey: ["property"],
        queryFn: () => getProperties(1, 50),
    });

    const { mutate, } = useMutation<BaseResponse<Catergory>, Error, AddCategoryData>({
        mutationFn: AddCategory,
        onSuccess: () => {
            toast.success("افزودن دسته بندی با موفقیت انجام شد", {
                position: 'bottom-left',
            });
            methods.reset()
            refetch()
        },
        onError: (error) => {
            toast.error(JSON.parse(error.message).message, {
                position: 'bottom-left',
            });
        },
    });



    const { mutate: UploadFilemutate } = useMutation<BaseResponse<{ src: string }>, Error, string>({
        mutationFn: uploadFile,
        onSuccess: (data) => {
            const sendData = {
                properties: dataForm?.properties || [],
                brands: dataForm?.brands || [],
                types: dataForm?.types || [],
                type: dataForm?.type || "",
                photo: data.data.src || ""
            }

            mutate(sendData)
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


    const { mutate: deleteMutate } = useMutation<void, Error, number>({
        mutationFn: deleteCategory,
        onSuccess: () => {
            toast.success("حذف دسته بندی با موفقیت اپلود شد", {
                position: 'bottom-left',
            });
            refetch()
        },
        onError: (error) => {
            toast.error(JSON.parse(error.message).message, {
                position: 'bottom-left',
            });
        },
    });





    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // refetch()
    };


    useEffect(() => {
        if (categoryData) {
            setRows(categoryData.data.data || []);
            setTotalPageCount(categoryData.data.meta?.pageCount || 1);
        }
    }, [categoryData]);


    const brands = data?.data.data.map((item) => ({
        label: item.title.toString(),
        value: item.id.toString()
    })) || []

    const productTypes = productTypesData?.data.data.map((item) => ({
        label: item.title.toString(),
        value: item.id.toString()
    })) || []

    const properties = propertiesData?.data.data.map((item) => ({
        label: item.title.toString(),
        value: item.id.toString()
    })) || []

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

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit((formData) => {
        setDataForm(formData)
        UploadFilemutate(formData.image)
        // UploadFilemutate(formData)
    });
    const isSubmitting = false
    return (
        <>
            <AddCollapse title="افزودن دسته بندی">
                <Card showHeader={false}>
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
                modalContent={
                    <Edit
                        brands={brands}
                        properties={properties}
                        productTypes={productTypes}
                        id={id} onEdit={() => { refetch(); setOpenEditModal(false) }}
                    />} sheetContent={
                        <Edit
                            brands={brands}
                            properties={properties}
                            productTypes={productTypes}
                            id={id}
                            onEdit={() => { refetch(); setOpenEditModal(false) }} />}
            />
        </>
    );
}
