import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Form, TextFiled } from "../../components";
import { form_inputs } from "./order.config";
import AddCollapse from "../../components/add-collapse";
import { Order } from "../../types/order.type";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "./order.api";
import CustomDataGrid from "../../components/dataGrid";
import { GridColDef } from "@mui/x-data-grid";
// import { Icon } from '@iconify/react'




type FormData = typeof form_inputs

export default function Orders() {
    // const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [params, setParmas] = useState<Partial<FormData>>({})
    const [rows, setRows] = useState<Array<Order>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageCount] = useState(1);
    const pageSize = 10;

    const columns: GridColDef[] = [
        { field: "model", headerName: "model", width: 200 },
        {
            field: "actions",
            headerName: "عملیات",
            width: 150,
            renderCell: () => {
                return (
                    <div className='  flex mt-2 gap-8'>
                        {/* <Icon icon="ic:baseline-delete" width="24" height="24" className=' text-red-500 mt-1 cursor-pointer' onClick={() => deleteMutate(params.row.id)} />
                        <Icon icon="mage:edit" width="24" height="24" className='text-blue-600 mt-1 cursor-pointer' onClick={() => { setOpenEditModal(true); setId(params.row.id) }} /> */}
                    </div >
                );
            },
        },
    ];

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["orders", currentPage],
        queryFn: () => {
            return getOrders(currentPage, pageSize, params);
        },
    });
    const methods = useForm<FormData>({
        mode: "onChange",

    });


    useEffect(() => {
        setRows([])
    }, [data])


    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = handleSubmit((data) => {
        setParmas(data)
        refetch();
    });

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        refetch()
    };

    return (
        <>
            <AddCollapse title="جستوجوی سفارشها">
                <Card showHeader={false}>
                    <Form methods={methods} onSubmit={onSubmit}>
                        <div className="flex   flex-col lg:flex-row gap-6 " dir="rtl">
                            <TextFiled
                                label="نام"
                                name={form_inputs.name}
                                helperText={errors.name?.message as string}
                            />
                            <TextFiled
                                label="نام خانوادگی"
                                name={form_inputs.lastName}
                                helperText={errors.lastName?.message as string}
                            />
                            <TextFiled
                                type="number"
                                label="کد ملی"
                                name={form_inputs.nationalCode}
                                helperText={errors.nationalCode?.message as string}
                            />
                            <TextFiled
                                label="شماره تلفن"
                                name={form_inputs.phoneNumber}
                                helperText={errors.phoneNumber?.message as string}
                            />
                            <TextFiled
                                label="مدل"
                                name={form_inputs.model}
                                helperText={errors.model?.message as string}
                            />
                            <TextFiled
                                label="استان"
                                name={form_inputs.state}
                                helperText={errors.state?.message as string}
                            />
                            <TextFiled
                                label="شهر"
                                name={form_inputs.city}
                                helperText={errors.city?.message as string}
                            />
                        </div>
                        <div className=" mt-5 flex justify-end gap-3">
                            <Button
                                variant="contained"
                                type="submit"
                                loading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                جستوجو
                            </Button>
                            <Button
                                variant="contained"
                                type="button"
                                onClick={() => { methods.reset() }}
                                loading={isSubmitting}
                                disabled={isSubmitting}
                            >
                                بازگشت به حالت اولیه
                            </Button>
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
        </>

    );
}
