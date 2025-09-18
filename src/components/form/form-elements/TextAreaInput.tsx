import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import FileInput from "../input/FileInput";
import TextArea from "../input/TextArea";
import { getPassport } from "../../../hooks/usePassport";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useFraudsters } from "../../../hooks/useFraudster";

interface FormValues {
  name: string;
  surname: string;
  passportId: string;
  passportCode: string;
  location: string;
  description: string;
}

export default function DefaultInputs() {
  const { data, isLoading, error } = getPassport();
  const { createFraudster } = useFraudsters();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const passportSeriesOptions =
    data?.map((item: { id: string; series: string }) => ({
      value: item.id,
      label: item.series,
    })) || [];

  const onSubmit = (values: FormValues) => {
    console.log("ishladi ✅");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("surname", values.surname);
    formData.append("passportId", values.passportId);
    formData.append("passportCode", values.passportCode);
    formData.append("location", values.location);
    formData.append("description", values.description);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    console.log("Form values:", values);
    console.log("Selected file:", selectedFile);

    // API chaqirish
    createFraudster.mutate(formData);
  };

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ComponentCard title="Firibgar ma'lumotlarini to'ldiring">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ism */}
          <div>
            <Label htmlFor="name" className="text-[20px]">
              Firibgar ismini kiriting:
            </Label>
            <Input
              type="text"
              placeholder="Masalan: Ali"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Ism majburiy</p>
            )}
          </div>

          {/* Familiya */}
          <div>
            <Label htmlFor="surname" className="text-[20px]">
              Firibgar familiyasini kiriting:
            </Label>
            <Input
              type="text"
              placeholder="Masalan: Valiyev"
              {...register("surname", { required: true })}
            />
            {errors.surname && (
              <p className="text-red-500 text-sm">Familiya majburiy</p>
            )}
          </div>

          {/* Passport */}
          <div className="md:col-span-2">
            <Label htmlFor="passport" className="text-[20px]">
              PASSPORT SERIYA & RAQAMI:
            </Label>
            <div className="flex flex-row items-center gap-4">
              <Select
                options={passportSeriesOptions}
                placeholder="Seriya"
                onChange={(val: string) =>
                  setValue("passportId", val, { shouldValidate: true })
                }
                className="dark:bg-dark-900 w-28"
              />
              {/* passportId formaga kiritilishi uchun */}
              <input
                type="hidden"
                {...register("passportId", { required: true })}
              />
              <Input
                type="text"
                placeholder="1234567"
                {...register("passportCode", { required: true })}
                className="flex-1"
              />
            </div>
            {errors.passportId && (
              <p className="text-red-500 text-sm">
                Passport seriya majburiy
              </p>
            )}
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <Label htmlFor="location" className="text-[20px]">
              Joylashuv (manzil):
            </Label>
            <Input
              type="text"
              placeholder="Masalan: Toshkent"
              {...register("location", { required: true })}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <Label htmlFor="description" className="text-[20px]">
              Tavsif:
            </Label>
            <TextArea
              placeholder="Firibgarlik qilganlikda gumon qilinmoqda..."
              {...register("description")}
            />
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <ComponentCard title="FIRIBGAR RASMINI QO'SHISH">
              <div>
                <Label>Firibgar rasmini qo'shing:</Label>
                <FileInput
                  onFileChange={setSelectedFile}
                  className="custom-class"
                />
              </div>
            </ComponentCard>
          </div>

          {/* Submit button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={createFraudster.isPending}
              className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-lg shadow-md"
            >
              {createFraudster.isPending ? "Yuborilmoqda..." : "Saqlash"}
            </button>
          </div>
        </div>
      </ComponentCard>
    </form>
  );
}
