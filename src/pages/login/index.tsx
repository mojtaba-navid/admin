import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { PATHS } from '../../config/routes.config';
import { Form, Card, Button, TextFiled, InputLable } from '../../components';
import { useMutation } from '@tanstack/react-query';
import { login, LoginData, LoginResponse } from './login.api';

const PHONE_NUMBER = 'phoneNumber';
const PASSWORD = 'password';

export default function Login() {
    const navigate = useNavigate();
    const { mutate } = useMutation<
        LoginResponse,  // The type of the response returned by login
        Error,          // The type of the error
        LoginData       // The type of data that will be passed to login
    >({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify(data.data))
            navigate(PATHS.home)
        },
        onError: (error) => { console.log('error', error) },
    });

    const defaultValues = {
        [PHONE_NUMBER]: '',
        [PASSWORD]: '',
    };

    const schema = z.object({
        [PHONE_NUMBER]: z.string().min(10, 'شماره تلفن باید حداقل ۱۰ رقم باشد').max(15, 'شماره تلفن باید کمتر از ۱۵ رقم باشد'),
        [PASSWORD]: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
    });

    const methods = useForm({
        mode: 'all',
        defaultValues,
        resolver: zodResolver(schema),
    });

    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = handleSubmit(async (data) => {
        mutate(data);
    });

    return (
        <div className="flex h-screen w-full">
            <div className="m-auto">
                <Form methods={methods} onSubmit={onSubmit}>
                    <Card
                        headerTitle="صفحه ورود"
                        showFooter
                        footer={() => (
                            <Button variant='contained' loading={isSubmitting} type="submit">
                                ورود
                            </Button>
                        )}
                    >
                        <div>
                            <InputLable> شماره تلفن</InputLable>
                            <TextFiled name={PHONE_NUMBER} />
                        </div>
                        <div className='mt-2'>
                            <InputLable> رمز عبور</InputLable>
                            <TextFiled name={PASSWORD} type='password' />
                        </div>
                    </Card>
                </Form>
                <div className="text-center p-2 underline text-black">
                    <Link to={PATHS.register}>ثبت نام</Link>
                </div>
            </div>
        </div>
    );
}
