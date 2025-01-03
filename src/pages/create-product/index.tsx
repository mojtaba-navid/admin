import React, { useEffect, useRef, useState } from 'react'
import { Button, DataGrid, Form, Modal, TextFiled } from '../../components'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from '../../components/select';
import { BORD, BRAND, CATERGORY, DELIVERY_METHOD, EXIST, LENZ, MODEL, NUMBER_OF_EXIST, OFF, PHOTO, PRICE_FOR_USER, PRICE_FOR_WORKMATE, TYPE, WARRANTY } from './create-product.config';
import { Brand } from '../../types/brand.type';
import { Catergory } from '../../types/catergory.type';
import { z } from 'zod';
import { optionsType } from '../../types/client/general';
import { useQuery } from '@tanstack/react-query';
import { getCatergoris } from './create-product.api';

export default function CreateProduct() {
    const { data, status, error } = useQuery({
        queryKey: ["categories"],  // The query key is now inside queryKey
        queryFn: getCatergoris,    // The function to fetch the data is now queryFn
    });

    const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false)
    const [brands, setBrands] = useState<Array<optionsType>>([]);
    // const [brandForSend, setBrandForSend] = useState();
    const [categories, setCategories] = useState<Array<optionsType>>([]);
    // const [columns, setColumns] = useState([]);
    // const [formInputs, setFormInputs] = useState([]);
    // const [isLoading, setIsloading] = useState(false);
    // const [isloadingSelect, setIsloadingSelect] = useState(false);
    // const [rows, setRows] = useState([]);
    // const [open, setOpen] = useState(false);
    // const [openBackDrop, setOpenBackDrop] = useState(false);
    // const [openConfirmModal, setOpenConfirmModal] = useState(false);
    // const [openInputModal, setOpenInputModal] = useState(false);
    // const [photo, setPhoto] = useState(null);
    // const [productInfo, setProductInfo] = useState({});
    // const [productTypes, setProductTypes] = useState({});
    // const [typesForSend, setTypesForSend] = useState();
    // const [catValue, setCatValue] = useState(null);
    // const [brandsValue, setBrandsValue] = useState(null);
    const [typesValue, setTypesValue] = useState<Array<optionsType>>([]);
    // const [propertyInputArray, setPropertyInputArray] = useState();
    // const [model, setModel] = useState(null);
    // const fileInputRef = useRef();

    // const [dataGrid, setDataGrid] = useState({
    //     loading: true,
    //     rows: [],
    //     totalRows: 1,
    //     pageSize: 10,
    //     page: 1,
    // });

    // useEffect(() => {
    //     getAllProducts();
    // }, [dataGrid.page]);

    // useEffect(() => {
    //     getCategories();
    // }, []);

    // const getCategories = async () => {
    //     setIsloading(true);
    //     setBrands([]);
    //     setProductTypes([]);
    //     try {
    //         const { getCats } = props;
    //         const result = await getCats();
    //         const categories =
    //             !isEmptyArray(result.data) &&
    //             result.data.map((item) => {
    //                 return { value: item.id, label: item.title };
    //             });

    //         setCategories(categories);
    //     } catch (error) {
    //         console.log("error", error);
    //     } finally {
    //         setIsloading(false);
    //     }
    // };

    // const handleClickInputFile = () => {
    //     fileInputRef.current.click();
    // };

    // const handleSubmit = async (e) => {
    //     try {
    //         const empty = [];
    //         let featrues = [];
    //         setOpenBackDrop(true);
    //         const { createProduct } = props;
    //         setIsloading(true);
    //         e.preventDefault();
    //         const form = new FormData(e.target);
    //         const data = Object.fromEntries(form);
    //         for (let key in data) {
    //             let searchKey = key.search("feature");
    //             if (searchKey > -1) {
    //                 featrues.push({ id: Number(data[key]) });
    //                 delete data[key];
    //             }
    //         }
    //         data.properties = featrues;
    //         data.photo = photo;
    //         data[BRAND] = brandForSend;
    //         data[TYPE] = typesForSend;
    //         const result = await createProduct(data);
    //         if (result) {
    //             getAllProducts();
    //             e.target.reset();
    //             setBrands([...empty]);
    //             setProductTypes([...empty]);
    //             setPhoto(null);
    //             setPropertyInputArray([...empty]);
    //             setBrandsValue([...empty]);
    //             setTypesValue(null);
    //             setCatValue(null);
    //         }
    //     } catch (error) {
    //         console.log("error", error);
    //     } finally {
    //         setOpenBackDrop(false);
    //         setIsloading(false);
    //     }
    // };
    // const getAllProducts = async () => {
    //     const { getProducts } = props;

    //     const columns = [
    //         {
    //             headerClassName: "super-app-theme--header",
    //             field: "photo",
    //             sortable: false,
    //             headerName: "عکس",
    //             filterable: false,
    //             hideable: false,
    //             renderCell: (params) => {
    //                 if (params.row?.photo) {
    //                     return (
    //                         <img
    //                             src={BASE_URL + params.row.photo}
    //                             width={50}
    //                             height={50}
    //                             className="rouned"
    //                             alt=""
    //                         />
    //                     );
    //                 } else {
    //                     return (
    //                         <div className=" text-center text-gray-500    p-2  border  rounded-full bg-blue-100">
    //                             <PersonOutlineIcon />
    //                         </div>
    //                     );
    //                 }
    //             },
    //         },
    //         { field: MODEL, headerName: "مدل", width: 150 },
    //         {
    //             field: "edit",
    //             sortable: false,
    //             headerName: "",
    //             filterable: false,
    //             hideable: false,
    //             renderCell: (params) => {
    //                 const onClick = (e) => {
    //                     e.stopPropagation();

    //                     edit(params.row);
    //                 };
    //                 return (
    //                     <Button onClick={onClick}>
    //                         <EditIcon />
    //                         <div className="px-5"> ویرایش </div>
    //                     </Button>
    //                 );
    //             },
    //         },
    //         {
    //             field: "delete",
    //             headerName: "",
    //             sortable: false,
    //             filterable: false,
    //             renderCell: (params) => {
    //                 const onClick = (e) => {
    //                     e.stopPropagation();
    //                     deleteItem(params.row);
    //                 };
    //                 return (
    //                     <Button onClick={onClick} color="error">
    //                         <DeleteIcon />
    //                         <div> حذف</div>
    //                     </Button>
    //                 );
    //             },
    //         },
    //     ];
    //     try {
    //         setOpenBackDrop(true);
    //         const products = await getProducts({ page: dataGrid.page });
    //         dataGrid.totalRows = products.meta.itemCount;
    //         setDataGrid({ ...dataGrid });
    //         const data = products.data.map((item) => {
    //             return {
    //                 id: item.id,
    //                 [MODEL]: item.model,

    //                 [PHOTO]: item.photo,
    //             };
    //         });

    //         setRows(data);
    //         setColumns(columns);
    //     } catch (error) {
    //         console.log("error", error);
    //     } finally {
    //         setOpenBackDrop(false);
    //     }
    // };

    // const edit = async (row) => {
    //     setModel(row.model);
    //     setOpen(true);
    //     SetEditId(null);
    //     SetEditId(row.id);
    // };

    // const deleteItem = (item) => {
    //     setProductInfo(item);
    //     setOpenConfirmModal(true);
    // };

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleCloseModal = () => {
    //     SetEditId(null);
    //     setOpen(false);
    // };

    // const handleEdit = async (data) => {
    //     setOpenBackDrop(true);
    //     const { editProduct } = props;
    //     const mainData = {
    //         ...data,
    //     };
    //     try {
    //         await editProduct(mainData, model);
    //         SetEditId(null);
    //         getAllProducts();
    //     } catch (error) {
    //         console.log("error", error);
    //     } finally {
    //         setOpen(false);
    //         setOpenBackDrop(false);
    //     }
    // };
    // const handleCloseConfirmModal = () => {
    //     setOpenConfirmModal(false);
    // };

    // const handleDisagree = async () => {
    //     setOpenBackDrop(true);
    //     const { deleteProduct } = props;
    //     try {
    //         await deleteProduct(productInfo.model);
    //         getAllProducts();
    //     } catch (error) {
    //         console.log("error", error);
    //     } finally {
    //         setOpenBackDrop(false);
    //         setOpenConfirmModal(false);
    //     }
    // };
    // const handleChangeFile = async (file) => {
    //     const { uploadProductImage } = props;
    //     try {
    //         if (file) {
    //             setOpenBackDrop(true);
    //             const formData = new FormData();
    //             formData.append("photo", file);
    //             const uploadedPhoto = await uploadProductImage(formData);
    //             setPhoto(uploadedPhoto.data.src);
    //         }
    //     } catch (error) {
    //         console.log("error", error);
    //     } finally {
    //         setOpenBackDrop(false);
    //     }
    // };

    // const handleCanclePhoto = () => {
    //     setPhoto(null);
    // };

    // const handleOpenAddInputModal = () => {
    //     setOpenInputModal(true);
    // };
    // const handleSubmitAddInput = (data) => {
    //     formInputs.push(data);
    //     setFormInputs(formInputs);
    //     setOpenInputModal(false);
    // };
    // const handleCloseAddInput = () => {
    //     setOpenInputModal(false);
    // };

    // const hanleChangeCategory = async (item) => {
    //     let emtpy = [];
    //     setCatValue(item);
    //     setBrands([...emtpy]);
    //     setProductTypes([...emtpy]);
    //     const { getCat } = props;
    //     try {
    //         setIsloadingSelect(true);
    //         const data = {
    //             id: Number(item?.value),
    //             brand: true,
    //             productType: true,
    //             propertyTitles: true,
    //         };
    //         const result = await getCat(data);
    //         const brands = result.data.brands.map((item) => ({
    //             value: item?.id,
    //             label: item?.title,
    //         }));
    //         const productTypes = result.data.productTypes.map((item) => ({
    //             value: item?.id,
    //             label: item?.title,
    //         }));
    //         createInputs(result.data.propertyTitles);

    //         setBrands(brands);
    //         setProductTypes(productTypes);
    //     } catch (error) {
    //         console.log("error", error);
    //     } finally {
    //         setIsloadingSelect(false);
    //     }
    // };

    // const createInputs = (items) => {
    //     const inputs = !isEmptyArray(items)
    //         ? items.map((item, index) => {
    //             const selectItems =
    //                 !isEmptyArray(item.properties) &&
    //                 item.properties.map((data) => ({
    //                     label: data?.property,
    //                     value: data.id,
    //                 }));
    //             return {
    //                 name: "feature_" + index,
    //                 label: item.title,
    //                 selectItems,
    //             };
    //         })
    //         : [];

    //     setPropertyInputArray(inputs);
    // };

    // const handleChangeBrand = (item) => {
    //     setBrandsValue(item);
    //     setBrandForSend({ id: item.value });
    // };

    // const handleChangeType = (item) => {
    //     setTypesValue(item);
    //     const types =
    //         !isEmptyArray(item) &&
    //         item.map((item) => {
    //             return { id: item.value };
    //         });
    //     setTypesForSend(types);
    // };
    // const handlePageChange = (page) => {
    //     dataGrid.page = page + 1;
    //     setDataGrid({ ...dataGrid });
    // };

    const defaultValues = {
        [MODEL]: '',
        [BORD]: '',
        [DELIVERY_METHOD]: '',
        [OFF]: '',
        [EXIST]: '',
        [LENZ]: '',
        [NUMBER_OF_EXIST]: '',
        [PHOTO]: '',
        [PRICE_FOR_USER]: '',
        [PRICE_FOR_WORKMATE]: '',
        [WARRANTY]: '',
        [BRAND]: '',
        [TYPE]: '',
        [CATERGORY]: '',
    }

    const schema = z.object({
        [MODEL]: z.string().min(1, { message: "مدل الزامی است" }),
        [BORD]: z.string().min(1, { message: "بورد الزامی است" }),
        [DELIVERY_METHOD]: z.string().min(1, { message: "روش ارسال الزامی است" }),
        [OFF]: z.number().min(0, { message: "تخفیف نباید کمتر از 0 باشد" }).optional(),
        [EXIST]: z.number().min(1, { message: "تعداد موجودی الزامی است" }),
        [LENZ]: z.string().min(1, { message: "لنز الزامی است" }),
        [NUMBER_OF_EXIST]: z.number().min(1, { message: "تعداد موجودی باید حداقل 1 باشد" }).optional(),
        [PHOTO]: z.string().min(1, { message: "عکس الزامی است" }),
        [PRICE_FOR_USER]: z.number().min(0, { message: "قیمت برای کاربر نباید کمتر از 0 باشد" }).optional(),
        [PRICE_FOR_WORKMATE]: z.number().min(0, { message: "قیمت برای همکار نباید کمتر از 0 باشد" }).optional(),
        [WARRANTY]: z.string().min(1, { message: "گارانتی الزامی است" }),
        [BRAND]: z.string().min(1, { message: "برند الزامی است" }),
        [TYPE]: z.array(z.string()).min(1, { message: "حداقل یک نوع باید انتخاب شود" }),
        [CATERGORY]: z.string().min(1, { message: "دسته‌بندی الزامی است" }),
    });

    const methods = useForm({
        mode: 'all',
        defaultValues,
        resolver: zodResolver(schema),
    });

    const { handleSubmit, formState: { isSubmitting, errors } } = methods;


    const onSubmit = handleSubmit(async (data) => {
        // mutate(data);
    });
    return (
        <>
            {/* <DataGrid /> */}
            <Button variant='contained' onClick={() => setShowAddProductModal(true)}>افزودن محصول</Button>
            <Form methods={methods} onSubmit={onSubmit} >
                <Modal open={showAddProductModal} title='ایجاد محصول' onClose={() => setShowAddProductModal(false)} onAgree={() => console.log('hello')}>
                    <div className={` flex flex-col gap-6 w-full`}>
                        <TextFiled name={MODEL} label="Model" />
                        <Select name={CATERGORY} label="Category" options={categories} />
                        <Select name={BRAND} label="Brand" options={brands} />
                        <Select name={TYPE} label="Types" options={typesValue} />
                        <TextFiled name={BORD} label="Bord" />
                        <TextFiled name={DELIVERY_METHOD} label="Delivery Method" />
                        <TextFiled name={OFF} label="Discount" type="number" />
                        <TextFiled name={EXIST} label="Exist" />
                        <TextFiled name={LENZ} label="Lenz" />
                        <TextFiled name={NUMBER_OF_EXIST} label="Number of Exist" type="number" />
                        <TextFiled name={PHOTO} label="Photo" />
                        <TextFiled name={PRICE_FOR_USER} label="Price for User" type="number" />
                        <TextFiled name={PRICE_FOR_WORKMATE} label="Price for Workmate" type="number" />
                        <TextFiled name={WARRANTY} label="Warranty" />
                    </div>
                </Modal >
            </Form>
        </>
    )
}
