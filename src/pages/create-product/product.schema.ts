import { string, z } from "zod";

export const propertySchema = z.object({
  id: string(),
  value: z.string().nonempty("انتخاب این فیلد الزامی است"),
});

export const productSchema = z.object({
  model: z.string().nonempty("مدل الزامی است"),
  category: z.string().nonempty("دسته‌بندی الزامی است"),
  brand: z.string().nonempty("برند الزامی است"),
  types: z.string().nonempty("نوع الزامی است"),
  priceForUser: z.string().min(1, "قیمت کاربر باید عددی مثبت باشد"),
  priceForWorkmate: z.string().min(1, "قیمت همکار باید عددی مثبت باشد"),
  warranty: z.string().nonempty("گارانتی الزامی است"),
  numberOfExist: z.string().min(1, "تعداد موجودی باید عددی مثبت باشد"),
  off: z.string().min(0, "تخفیف باید عددی مثبت باشد"),
  photo: z.any().optional(),
  properties: z
    .array(
      z.object({
        id: z.string(),
        value: z.string().nonempty("انتخاب این فیلد الزامی است"),
      })
    )
    .nonempty("باید حداقل یک ویژگی انتخاب کنید"),
});
