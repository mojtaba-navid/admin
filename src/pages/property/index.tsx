import { useEffect, useState } from "react";
import { Button, Card, Form, Modal, ModalFooter, TextFiled } from "../../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Icon } from "@iconify/react";
import AddCollapse from "../../components/add-collapse";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BaseResponse } from "../../types/client/general";
import { addproperty, AddPropertyData, deletePropertyTitle, getProperties } from "./property.api";
import { Property } from "../../types/property.type";
import { GridColDef } from "@mui/x-data-grid";
import CustomDataGrid from "../../components/dataGrid";
import Edit from "./edit";
import toast from "react-hot-toast";

interface FormData {
    title: string;
    properties: { [key: string]: string };
}

export default function Properties() {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [rows, setRows] = useState<Array<Property>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [id, setId] = useState<number>(0)
    const pageSize = 10;
    const [fields, setFields] = useState<string[]>(["property1"]);
    const columns: GridColDef[] = [
        { field: "title", headerName: "عنوان ویژگی", width: 200 },
        {
            field: "actions",
            headerName: "عملیات",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='  flex mt-2 gap-8'>
                        <Icon icon="ic:baseline-delete" width="24" height="24" className=' text-red-500 mt-1 cursor-pointer' onClick={() => { deleteMutate(params.row.id) }} />
                        <Icon icon="mage:edit" width="24" height="24" className='text-blue-600 mt-1 cursor-pointer' onClick={() => { setOpenEditModal(true); setId(params.row.id) }} />
                    </div >
                );
            },
        },
    ];
    const { data, isFetching, refetch } = useQuery({
        queryKey: ["property", currentPage],
        queryFn: () => getProperties(currentPage, pageSize),
    });

    const { mutate } = useMutation<BaseResponse<Property>, Error, AddPropertyData>({
        mutationFn: addproperty,
        onSuccess: () => {
            toast.success("افزودن نوع محصول با موفقیت انجام شد", {
                position: 'bottom-left',
            });
            refetch()
            methods.reset()
        },
        onError: (error) => {
            toast.error(JSON.parse(error.message).message, {
                position: 'bottom-left',
            });
        },
    });
    const { mutate: deleteMutate } = useMutation<void, Error, number>({
        mutationFn: deletePropertyTitle,
        onSuccess: () => {
            toast.success("حذف ویژگی با موفقیت انجام شد", {
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


    const schema = z.object({
        title: z.string().nonempty("عنوان را وارد کنید"),
        properties: z.record(z.string().nonempty("لطفا ویژگی را وارد کنید")),
    });

    const methods = useForm<FormData>({
        mode: "onChange",
        defaultValues: {
            title: "",
            properties: fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}),
        },
        resolver: zodResolver(schema),
    });

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        refetch()
    };

    const { handleSubmit, formState: { errors, isSubmitting }, setValue } = methods;

    useEffect(() => {
        if (data) {
            setRows(data.data.data || []);
            setTotalPageCount(data.data.meta?.pageCount || 1);

        }
    }, [data]);

    const addField = () => {
        const newField = `property${fields.length + 1}`;
        setFields((prevFields) => [...prevFields, newField]);
        setValue(`properties.${newField}`, "");
    };

    const removeLastField = (index: number) => {
        const fieldName = fields[index];
        setFields((prevFields) => prevFields.filter((_, i) => i !== index));
        setValue(`properties.${fieldName}`, '');
    };

    const onSubmit = handleSubmit((formData) => {
        mutate(formData)

    });

    return (
        <>
            <AddCollapse title="افزون ویژگی">
                <Card showHeader={false}>
                    <Form methods={methods} onSubmit={onSubmit}>
                        <div className="flex flex-col gap-6 p-10" dir="rtl">
                            <div className="w-full sm:w-1/2 flex justify-start">
                                <TextFiled
                                    type="text"
                                    label="عنوان"
                                    name="title"
                                    helperText={errors.title?.message as string}
                                    dir="rtl"
                                    className="w-full sm:w-1/2"
                                />
                            </div>
                            <div className="w-full border-b-2 border-gray-300 my-4"></div>
                            <div className="flex gap-2 flex-wrap justify-start w-full">
                                {fields.map((field, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 w-full sm:w-auto"
                                        dir="rtl"
                                    >
                                        <div className="flex flex-row-reverse items-center gap-2 w-full">
                                            <div className="flex gap-2">
                                                {index === fields.length - 1 && (
                                                    <>
                                                        <Icon
                                                            icon="mdi:plus-circle"
                                                            width={24}
                                                            height={24}
                                                            className="cursor-pointer"
                                                            onClick={addField}
                                                        />
                                                        {fields.length > 1 && (
                                                            <Icon
                                                                icon="mdi:trash-can-outline"
                                                                width={24}
                                                                height={24}
                                                                style={{ color: "red" }}
                                                                className="cursor-pointer"
                                                                onClick={() => removeLastField(index)}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <TextFiled
                                                type="text"
                                                label={`ویژگی ${index + 1}`}
                                                name={`properties.${field}`}
                                                helperText={errors.properties?.[field]?.message as string}
                                                dir="rtl"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <ModalFooter>
                            <Button variant="contained" type="submit" loading={isSubmitting} className="btn-submit" disabled={isSubmitting}>
                                ارسال
                            </Button>
                        </ModalFooter>
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
                modalContent={<Edit id={id} onEdit={() => { setOpenEditModal(false); refetch() }} />} sheetContent={<Edit id={id} onEdit={() => { refetch(); setOpenEditModal(false) }} />}
            />
        </>
    );
}
