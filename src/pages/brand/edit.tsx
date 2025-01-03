import React, { useEffect } from "react";
import { Button, Form, ModalFooter, TextFiled } from "../../components";
import { BRAND, TITLE } from "./barnd.config";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddBrandData, editBrand, getBrand } from "./brand.api";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { BaseResponse } from "../../types/client/general";
import { Brand } from "../../types/brand.type";

interface PropsType {
    id: number;
    onEdit: () => void
}

export default function Edit({ id, onEdit }: PropsType) {
    const { data, isFetching, isError, refetch } = useQuery({
        queryKey: ["brand", id],
        queryFn: () => getBrand(id),
    });

    const { mutate } = useMutation<BaseResponse<Brand>, Error, { id: number; data: AddBrandData }>({
        mutationFn: ({ id, data }) => editBrand(id,data),
        onSuccess: () => {
            toast.success("ویرایش برند با موفقیت انجام شد", {
                position: "bottom-left",
            });
            onEdit()
        },
        onError: (error) => {
            toast.error(JSON.parse(error.message).message, {
                position: "bottom-left",
            });
        },
    });

    const schema = z.object({
        [BRAND]: z.string().nonempty("نام برند به فارسی را وارد کنید").max(50, "نام برند نمی‌تواند بیشتر از 50 کاراکتر باشد"),
        [TITLE]: z.string().nonempty("نام برند به انگلیسی را وارد کنید").max(50, "نام برند نمی‌تواند بیشتر از 50 کاراکتر باشد"),
    });

    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            [BRAND]: "",
            [TITLE]: "",
        },
        resolver: zodResolver(schema),
    });

    const { handleSubmit, reset, formState: { isSubmitting } } = methods;

    useEffect(() => {
        if (data?.data) {
            reset({
                [BRAND]: data.data.brand || "",
                [TITLE]: data.data.title || "",
            });
        }
    }, [data, reset]);

    const onSubmit = handleSubmit((formData) => {
        mutate({ id, data: formData });
    });

    if (isFetching) {
        return <Icon icon="eos-icons:loading" width="24" height="24" />;
    }

    if (isError) {
        return <div>خطا در بارگذاری اطلاعات. لطفاً دوباره تلاش کنید.</div>;
    }

    return (
        <Form methods={methods} onSubmit={onSubmit}>
            <div className="flex flex-col gap-6 items-center p-10">
                <TextFiled
                    type="text"
                    label="نام برند را به زبان فارسی وارد کنید"
                    name={BRAND}
                />
                <TextFiled
                    type="text"
                    label="نام برند به انگلیسی"
                    name={TITLE}
                />
            </div>
            <ModalFooter>
                <Button variant="contained" type="submit" loading={isSubmitting}>
                    تایید
                </Button>
            </ModalFooter>
        </Form>
    );
}
