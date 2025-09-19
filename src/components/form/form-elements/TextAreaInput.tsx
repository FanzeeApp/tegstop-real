import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import FileInput from "../input/FileInput";
import TextArea from "../input/TextArea";
import { getPassport } from "../../../hooks/usePassport";
import { useState } from "react";
import { useFraudsters } from "../../../hooks/useFraudster";
import axios from "axios";
import { notification } from "antd";

export default function DefaultInputs() {
  const { data, isLoading, error } = getPassport();
  const { createFraudster } = useFraudsters();

  const initialFormValues = {
    name: "",
    surname: "",
    passportId: "",
    passportCode: "",
    location: "",
    description: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 🚀 Notification
  const [api, contextHolder] = notification.useNotification();

  const passportSeriesOptions =
    data?.map((item: { id: string; series: string }) => ({
      value: item.id,
      label: item.series,
    })) || [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSelectChange = (val: string) => {
    setFormValues((prev) => ({ ...prev, passportId: val }));
    if (errors["passportId"]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy["passportId"];
        return copy;
      });
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("https://api.saparboy.uz/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  };

  const parseValidationErrors = (err: any): Record<string, string> => {
    const result: Record<string, string> = {};
    const res = err?.response?.data;

    if (!res) {
      result.general = err?.message || "Noma'lum xatolik yuz berdi";
      return result;
    }

    if (
      res.errors &&
      typeof res.errors === "object" &&
      !Array.isArray(res.errors)
    ) {
      Object.entries(res.errors).forEach(([k, v]) => {
        result[k] = Array.isArray(v) ? v.join(", ") : String(v);
      });
      return result;
    }

    if (Array.isArray(res.errors)) {
      res.errors.forEach((e: any) => {
        const key = e.param || e.field || "general";
        result[key] = e.msg || e.message || String(e);
      });
      return result;
    }

    if (res.validation && typeof res.validation === "object") {
      Object.entries(res.validation).forEach(([k, v]) => {
        result[k] = Array.isArray(v) ? v.join(", ") : String(v);
      });
      return result;
    }

    if (res.message) {
      result.general = String(res.message);
      return result;
    }

    if (Object.keys(res).length > 0) {
      Object.entries(res).forEach(([k, v]) => {
        if (typeof v === "string" || typeof v === "number") {
          result[k] = String(v);
        }
      });
      if (Object.keys(result).length) return result;
    }

    result.general = "Serverdan noaniq xatolik keldi";
    return result;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setErrors({});
      let imageUrl = "";

      if (selectedFile) {
        const uploadRes = await uploadImage(selectedFile);
        console.log("Upload javobi:", uploadRes);
        imageUrl = uploadRes.image || uploadRes.path || uploadRes.url || "";
        if (!imageUrl && uploadRes.path) {
          imageUrl = `https://api.saparboy.uz${uploadRes.path}`;
        }
      }

      const body = { ...formValues, image: imageUrl };
      console.log("Yuborilayotgan body:", body);

      createFraudster.mutate(body, {
        onSuccess: () => {
          api.success({
            message: "Muvaffaqiyatli!",
            description: "✅ Firibgar muvaffaqiyatli saqlandi!",
            placement: "topRight",
            style: {
              background: "#1f2937",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "bold",
              marginTop: "40px"
            },
          });
          setFormValues(initialFormValues);
          setSelectedFile(null);
          setErrors({});
        },
        onError: (err) => {
          const parsed = parseValidationErrors(err);
          setErrors(parsed);

          const firstMsg =
            parsed.general ||
            parsed.name ||
            parsed.surname ||
            parsed.passportId ||
            parsed.passportCode ||
            Object.values(parsed)[0] ||
            "Server bilan aloqa qilolmadi.";

          api.error({
            message: "❌ Xatolik",
            description: firstMsg,
            placement: "topRight",
            duration: 6,
          });
        },
      });
    } catch (err) {
      console.error("❌ Umumiy xatolik:", err);
      api.error({
        message: "Xatolik",
        description:
          "Rasm yuklanishi yoki form yuborilishida xatolik yuz berdi.",
        placement: "topRight",
      });
    }
  };

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi</p>;

  return (
    <>
      {contextHolder} {/* 🚀 Notification context qo‘yildi */}
      <form onSubmit={onSubmit}>
        <ComponentCard title="Firibgar ma'lumotlarini to'ldiring">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ism */}
            <div>
              <Label htmlFor="name" className="text-[20px]">
                Firibgar ismini kiriting:
              </Label>
              <Input
                type="text"
                name="name"
                placeholder="Masalan: Ali"
                value={formValues.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Familiya */}
            <div>
              <Label htmlFor="surname" className="text-[20px]">
                Firibgar familiyasini kiriting:
              </Label>
              <Input
                type="text"
                name="surname"
                placeholder="Masalan: Valiyev"
                value={formValues.surname}
                onChange={handleChange}
              />
              {errors.surname && (
                <p className="text-sm text-red-600 mt-1">{errors.surname}</p>
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
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900 w-28"
                />
                <Input
                  type="text"
                  name="passportCode"
                  placeholder="1234567"
                  value={formValues.passportCode}
                  onChange={handleChange}
                  className="flex-1"
                />
              </div>
              {(errors.passportId || errors.passportCode) && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.passportId || errors.passportCode}
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
                name="location"
                placeholder="Masalan: Toshkent"
                value={formValues.location}
                onChange={handleChange}
              />
              {errors.location && (
                <p className="text-sm text-red-600 mt-1">{errors.location}</p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label htmlFor="description" className="text-[20px]">
                Tavsif:
              </Label>
              <TextArea
                name="description"
                placeholder="Firibgarlik qilganlikda gumon qilinmoqda..."
                value={formValues.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <ComponentCard title="FIRIBGAR RASMINI QO'SHISH">
                <div>
                  <Label>Firibgar rasmini qo'shing:</Label>
                  <FileInput onFileChange={setSelectedFile} />
                  {(errors.image || errors.file) && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.image || errors.file}
                    </p>
                  )}
                </div>
              </ComponentCard>
            </div>

            {/* Submit */}
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
    </>
  );
}
