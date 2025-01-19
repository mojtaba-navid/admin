
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { PATHS } from '../../config/routes.config';
import { Form, Card, Button, TextFiled, InputLable } from '../../components';
import { useMutation } from '@tanstack/react-query';
import { register, RegisterData, RegisterResponse } from './register.api';
import { CONFIRM_PASSWORD, EMAIL, lAST_NAME, NAME, NATIONAL_CODE } from './register.config';
import toast from 'react-hot-toast';

const PHONE_NUMBER = 'phoneNumber';
const PASSWORD = 'password';

export default function Login() {
    const navigate = useNavigate();
    const { mutate } = useMutation<
        RegisterResponse,  // The type of the response returned by login
        Error,          // The type of the error
        RegisterData       // The type of data that will be passed to login
    >({
        mutationFn: register,
        onSuccess: () => {
            navigate(PATHS.login)
        },
        onError: (error) => {
            toast.error((JSON.parse(error.message).message), {
                position: 'bottom-left', // تنظیم موقعیت پیغام در گوشه پایین چپ
            })
        },
    });

    const defaultValues = {
        [NAME]: '',
        [lAST_NAME]: '',
        [EMAIL]: '',
        [PASSWORD]: '',
        [CONFIRM_PASSWORD]: '',
        [NATIONAL_CODE]: '',
        [PHONE_NUMBER]: '',
    };
    const schema = z.object({
        [NAME]: z.string().min(1, 'نام نمی‌تواند خالی باشد'),
        [lAST_NAME]: z.string().min(1, 'نام خانوادگی نمی‌تواند خالی باشد'),
        [EMAIL]: z.string().email('ایمیل معتبر وارد کنید'),
        [PHONE_NUMBER]: z.string().min(10, 'شماره تلفن باید حداقل ۱۰ رقم باشد').max(15, 'شماره تلفن باید کمتر از ۱۵ رقم باشد'),
        [PASSWORD]: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
        [NATIONAL_CODE]: z.string().min(10, 'کد ملی باید ۱۰ رقم باشد').max(10, 'کد ملی باید ۱۰ رقم باشد'),
        [CONFIRM_PASSWORD]: z.string().min(1, ''),
    })

    const methods = useForm({
        mode: 'all',
        defaultValues,
        resolver: zodResolver(schema),
    });

    const { handleSubmit, formState: { isSubmitting } } = methods;

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        mutate(data)
    });

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-4 sm:p-6 md:p-8 rounded">
                <Form methods={methods} onSubmit={onSubmit}>
                    <Card
                        headerTitle="ثبت نام"
                        showFooter
                        footer={() => (
                            <Button variant="contained" loading={isSubmitting} type="submit">
                                ثبت نام
                            </Button>
                        )}
                    >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <InputLable>نام</InputLable>
                                <TextFiled name={NAME} />
                            </div>
                            <div>
                                <InputLable>نام خانوادگی</InputLable>
                                <TextFiled name={lAST_NAME} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <InputLable>ایمیل</InputLable>
                            <TextFiled name={EMAIL} />
                        </div>
                        <div className="mt-4">
                            <InputLable>شماره تلفن</InputLable>
                            <TextFiled name={PHONE_NUMBER} />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                            <div>
                                <InputLable>رمز عبور</InputLable>
                                <TextFiled name={PASSWORD} type="password" />
                            </div>
                            <div>
                                <InputLable>تایید رمز عبور</InputLable>
                                <TextFiled name={CONFIRM_PASSWORD} type="password" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <InputLable>کد ملی</InputLable>
                            <TextFiled name={NATIONAL_CODE} />
                        </div>
                    </Card>
                </Form>
                <div className="text-center p-4 text-sm underline text-gray-700">
                    <Link to={PATHS.login}>ورود</Link>
                </div>
            </div>
        </div>
    );
}
