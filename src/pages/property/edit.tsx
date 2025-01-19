import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Form, TextFiled } from "../../components";
import { useMutation, useQuery } from "@tanstack/react-query";;
import { deleteProperty, EditProperty, getProperty } from "./property.api";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { BaseResponse } from "../../types/client/general";
import toast from "react-hot-toast";

interface EditProps {
  id: number;
  onEdit: () => void;
}

interface FormData {
  title: string;
  properties: Array<{ mainId?: string, id: string; property: string }>;
}

const schema = z.object({
  title: z.string().nonempty("عنوان را وارد کنید"),
  properties: z
    .array(
      z.object({
        id: z.string().min(1, "شناسه ویژگی معتبر نیست"), // اضافه کردن اعتبارسنجی برای id
        property: z.string().nonempty("ویژگی را وارد کنید"),
      })
    )
    .min(1, "حداقل یک ویژگی وارد کنید"),
});

export default function Edit({ id, onEdit }: EditProps) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getProperty(id),
  });

  const { mutate } = useMutation<BaseResponse<FormData>, Error, FormData>({
    mutationFn: (formData) => EditProperty(id, formData),
    onSuccess: () => {
      toast.success("ویژگی با موفقیت ویرایش شد", {
        position: "bottom-left",
      });
      onEdit();
      methods.reset(); // Reset form after successful submission
    },
    onError: (error) => {
      toast.error(JSON.parse(error.message).message, {
        position: "bottom-left",
      });
    },
  });



  const { mutate: deletePropertyMutate } = useMutation<void, Error, string>({
    mutationFn: deleteProperty,
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


  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(schema),
  });

  const { control, handleSubmit, setValue, formState: { isSubmitting } } = methods;

  useEffect(() => {
    if (data) {
      methods.reset()
      setValue("title", data?.data?.title || "");
      data?.data?.properties.forEach(item => {
        append({ id: item?.id, mainId: item.id, property: item.property })
      })
    }
  }, [data]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });
  const onSubmit = handleSubmit((formData) => {
    mutate(formData);
    methods.reset()
    setValue("properties", [])
  });

  if (isLoading) {
    return <p>در حال بارگذاری...</p>; // می‌توانید این را با یک اسپینر لودینگ جایگزین کنید
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <div className="flex flex-col gap-6 p-10" dir="rtl">
        <TextFiled
          label="عنوان"
          name="title"
          type="text"
          dir="rtl"
        />
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <TextFiled
                label={`ویژگی ${index + 1}`}
                name={`properties.${index}.property`}
                type="text"
                dir="rtl"
              />
              <Icon
                icon="mdi:trash-can-outline"
                width={24}
                height={24}
                style={{ color: "red" }}
                className="cursor-pointer"
                onClick={() => { remove(index); deletePropertyMutate(field.mainId || ""); console.log(field.mainId) }} // حذف ویژگی از فیلد
              />
            </div>
          ))}
          <Button
            variant="outlined"
            type="button"
            onClick={() => append({ id: Date.now().toString(), property: "" })} // اضافه کردن ویژگی جدید با id منحصربه‌فرد
          >
            افزودن ویژگی جدید
          </Button>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "در حال ارسال..." : "ویرایش"}
          </Button>
        </div>
      </div>
    </Form>
  );
}
