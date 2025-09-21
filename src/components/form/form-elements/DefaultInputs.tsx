import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import FileInput from "../input/FileInput";
import axios from "axios";

type Props = {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function DefaultInputs({ formData, setFormData }: Props) {
  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("https://api.saparboy.uz/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  };

  return (
    <ComponentCard title="Qurilma ma'lumotlarini to'ldiring">
      <div className="space-y-6">
        {/* Qurilma nomi */}
        <div>
          <Label htmlFor="deviceName">Qurilma nomini kiriting:</Label>
          <Input
            type="text"
            id="deviceName"
            placeholder="Masalan: Iphone 15max"
            value={formData.deviceName}
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
          />
        </div>

        {/* IMEI raqam */}
        <div>
          <Label htmlFor="imei">Qurilma IMEI raqamini kiriting:</Label>
          <Input
            type="text"
            id="imei"
            placeholder="8162325611561"
            value={formData.imei}
            onChange={(e) =>
              setFormData({ ...formData, phoneImei: e.target.value })
            }
          />
        </div>

        {/* Muddat */}
        <div>
          <Label>Qancha muddatga oldi?:</Label>
          <Select
            options={options}
            placeholder="Oy tanlang"
            value={formData.months}
            onChange={(val: string) => setFormData({ ...formData, time: val })}
          />
        </div>

        {/* Boshlang‘ich va oylik to‘lov */}
        <div className="flex gap-4">
          <Input
            placeholder="Boshlang‘ich: 200$"
            value={formData.startPay}
            onChange={(e) =>
              setFormData({ ...formData, downPayment: e.target.value })
            }
          />
          <Input
            placeholder="Oylik: 75$"
            value={formData.monthlyPay}
            onChange={(e) =>
              setFormData({ ...formData, monthlyPayment: e.target.value })
            }
          />
        </div>

        {/* Qurilma rasmi */}
        <ComponentCard title="QURILMA RASMINI QO'SHISH">
          <FileInput
            onFileChange={async (file) => {
              if (file) {
                try {
                  const uploaded = await uploadImage(file); // backendga yuboramiz
                  setFormData({ ...formData, productImage: uploaded.image });
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
