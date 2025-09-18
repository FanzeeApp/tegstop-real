import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import FileInput from "../input/FileInput";

export default function DefaultInputs() {
  const handleFileChange = (file: File | null) => {
    if (file) {
      console.log("Selected file:", file.name);
    } else {
      console.log("File removed");
    }
  };

  const options = [
    { value: "bir", label: "1" },
    { value: "ikki", label: "2" },
    { value: "uch", label: "3" },
    { value: "tort", label: "4" },
    { value: "besh", label: "5" },
    { value: "olti", label: "6" },
    { value: "yetti", label: "7" },
    { value: "sakkiz", label: "8" },
    { value: "toqqiz", label: "9" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Oy tanlang:", value);
  };

  return (
    <ComponentCard title="Qurilma ma'lumotlarini to'ldiring">
      <div className="space-y-6">
        {/* Qurilma nomi */}
        <div>
          <Label htmlFor="deviceName" className="text-[20px]">
            Qurilma nomini kiriting:
          </Label>
          <Input
            type="text"
            placeholder="Masalan: Iphone 15max"
            id="deviceName"
          />
        </div>

        {/* IMEI raqam */}
        <div>
          <Label htmlFor="imei" className="text-[20px]">
            Qurilma IMEI raqamini kiriting:
          </Label>
          <Input type="text" id="imei" placeholder="8162325611561" />
        </div>

        {/* Muddat */}
        <div>
          <Label className="text-[20px]">Qancha muddatga oldi?:</Label>
          <Select
            options={options}
            placeholder="Oy tanlang"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>

        {/* Boshlang'ich va oylik to‘lov */}
        <div>
          <div className="flex flex-row items-center justify-between mb-2">
            <Label className="text-[20px]">Boshlang'ich to'lov</Label>
            <Label className="text-[20px]">Oylik to'lov</Label>
          </div>
          <div className="flex flex-row items-center justify-between gap-4">
            <Input className="pl-2" placeholder="Masalan: 200$" />
            <Input placeholder="Masalan: 75$" />
          </div>
        </div>

        {/* Qurilma rasmi */}
        <ComponentCard title="QURILMA RASMINI QO'SHISH">
          <div>
            <Label>Qurilma rasmini qo'shing</Label>
            <FileInput onFileChange={handleFileChange} className="custom-class" />
          </div>
        </ComponentCard>
      </div>
    </ComponentCard>
  );
}
