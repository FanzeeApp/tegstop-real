import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import FileInput from "../input/FileInput";
import axios from "axios";
import { getPassport } from "../../../hooks/usePassport";

type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function SelectInputs({ formData, setFormData }: Props) {
  const { data } = getPassport();
  const passportSeriesOptions =
    data?.map((item: { id: string; series: string }) => ({
      value: item.id,
      label: item.series,
    })) || [];

  const handleSelectChange = (val: string) => {
    setFormData((prev: any) => ({ ...prev, passportId: val }));
  };

  // Rasmlarni upload qilish funksiyasi
  const uploadImage = async (file: File) => {
    const formDataObj = new FormData();
    formDataObj.append("file", file);

    const res = await axios.post(
      "https://api.saparboy.uz/upload",
      formDataObj,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  };

  return (
    <ComponentCard title="Xaridor ma'lumotlarini to'ldiring">
      <div className="space-y-6">
        {/* Ism */}
        <div>
          <Label>Xaridor ismini kiriting:</Label>
          <Input
            type="text"
            placeholder="Masalan: Ali Valiyev"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="flex-1">
          <Label>Xaridor familiyasini kiriting:</Label>
          <Input
            type="text"
            placeholder="Masalan: Valiyev"
            value={formData.customerSurname}
            onChange={(e) =>
              setFormData({ ...formData, surname: e.target.value })
            }
          />
        </div>

        {/* Passport */}
        <div className="flex gap-4">
          <Select
            options={passportSeriesOptions}
            placeholder="Seriya"
            onChange={handleSelectChange}
            className="dark:bg-dark-900 w-28"
          />
          <Input
            type="text"
            placeholder="4987854"
            value={formData.passportNumber}
            onChange={(e) =>
              setFormData({ ...formData, passportCode: e.target.value })
            }
          />
        </div>

        {/* Telefon raqami */}
        <div>
          <Label>Xaridor telefon raqamini kiriting:</Label>
          <Input
            type="tel"
            placeholder="+998901234567"
            value={formData.customerPhone}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </div>

        {/* Xaridor rasmi */}
        {/* Xaridor rasmi */}
        <ComponentCard title="XARIDOR RASMINI QO'SHISH">
          <FileInput
            onFileChange={async (file) => {
              if (file) {
                try {
                  const uploaded = await uploadImage(file); // backendga yuboramiz
                  setFormData({ ...formData, userImage: uploaded.image });
                  // Backenddan {"url":"https://..."} qaytadi deb hisoblayapmiz
                } catch (error) {
                  console.error("Rasm yuklashda xatolik:", error);
                }
              }
            }}
          />
        </ComponentCard>
      </div>
    </ComponentCard>
  );
}
