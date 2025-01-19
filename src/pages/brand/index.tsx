import { Button, Card, Form, Modal, TextFiled } from '../../components';
import { BRAND, TITLE } from './barnd.config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addBrand, AddBrandData, deleteBrand, getBrands } from './brand.api';
import { useEffect, useState } from 'react';
import CustomDataGrid from '../../components/dataGrid';
import { Brand } from '../../types/brand.type';
import { GridColDef } from '@mui/x-data-grid';
import { Icon } from '@iconify/react'
import AddCollapse from '../../components/add-collapse';
import Edit from './edit';
import { BaseResponse } from '../../types/client/general';
import toast from 'react-hot-toast';
import { Backdrop, CircularProgress } from '@mui/material';



export default function Brands() {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [rows, setRows] = useState<Array<Brand>>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [id, setId] = useState<number>(0)
    const pageSize = 10;

    const { data, isFetching, refetch } = useQuery({
        queryKey: ["brands", currentPage],
        queryFn: () => getBrands(currentPage, pageSize),
    });

    const { mutate, isPending } = useMutation<BaseResponse<Brand>, Error, AddBrandData>({
        mutationFn: addBrand,
        onSuccess: () => {
            toast.success("افزودن برند با موفقیت انجام شد", {
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

    const { mutate: deleteMutate, isPending: DeletePending } = useMutation<void, Error, number>({
        mutationFn: deleteBrand,
        onSuccess: () => {
            toast.success("حذف برند با موفقیت انجام شد", {
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

    const columns: GridColDef[] = [
        { field: "brand", headerName: "نام برند", width: 200 },
        {
            field: "actions",
            headerName: "عملیات",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='  flex mt-2 gap-8'>
                        <Icon icon="ic:baseline-delete" width="24" height="24" className=' text-red-500 mt-1 cursor-pointer' onClick={() => deleteMutate(params.row.id)} />
                        <Icon icon="mage:edit" width="24" height="24" className='text-blue-600 mt-1 cursor-pointer' onClick={() => { setOpenEditModal(true); setId(params.row.id) }} />
                    </div >
                );
            },
        },
    ];

    useEffect(() => {
        if (data) {
            setRows(data.data.data || []);
            setTotalPageCount(data.data.meta?.pageCount || 1);

        }
    }, [data]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        refetch()
    };

    // Mutation for adding a new brand


    const defaultValues = {
        [BRAND]: '',
        [TITLE]: '',
    };

    const schema = z.object({
        [BRAND]: z.string().nonempty('نام برند به فارسی را وارد کنید'),
        [TITLE]: z.string().nonempty('نام برند به انگلیسی را وارد کنید'),
    });

    const methods = useForm({
        mode: 'all',
        defaultValues,
        resolver: zodResolver(schema),
    });

    const { handleSubmit } = methods;

    const onSubmit = handleSubmit(async (formData) => {
        methods.reset();
        mutate(formData);
    });

    return (
        <>
            <AddCollapse title='افزون برند'>
                <Card showHeader={false} className="w-full h-5/6 rounded-none rounded-b">
                    <Form methods={methods} onSubmit={onSubmit}>
                        <div className="flex flex-col gap-6 items-center">

                            <TextFiled
                                type="text"
                                label="نام برند را به زبان فارسی وارد کنید"
                                name={BRAND}
                                className="inline-block"
                            />
                            <TextFiled
                                type="text"
                                label="نام برند به انگلیسی"
                                name={TITLE}
                                className="inline-block"
                            />
                        </div>
                        <div className="flex justify-end p-5">
                            <Button variant="contained" type="submit" loading={isPending}>
                                تایید
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

            <Backdrop
                open={DeletePending}
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal show={openEditModal}
                title={'ویرایش'}
                onClose={() => setOpenEditModal(false)}
                modalContent={<Edit id={id} onEdit={() => { refetch() }} />} sheetContent={<Edit id={id} onEdit={() => { refetch() }} />} />
        </ >
    );
}
