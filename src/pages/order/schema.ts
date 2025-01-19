import { z } from "zod";
import { form_inputs } from "./order.config";

export const schema = z.object({
  [form_inputs.name]: z.string().nonempty("نام الزامی است"),
  [form_inputs.lastName]: z.string().nonempty("نام خانوادگی الزامی است"),
  [form_inputs.nationalCode]: z
    .string()
    .length(10, "کد ملی باید ۱۰ رقم باشد")
    .regex(/^\d+$/, "کد ملی فقط شامل اعداد است"),
  [form_inputs.phoneNumber]: z
    .string()
    .length(11, "شماره تلفن باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره تلفن معتبر نیست"),
  [form_inputs.model]: z.string().optional(),
  [form_inputs.state]: z.string().nonempty("استان الزامی است"),
  [form_inputs.city]: z.string().nonempty("شهر الزامی است"),
});
