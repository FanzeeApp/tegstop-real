// import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import FileInput from "../input/FileInput";
// import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
// import DatePicker from "../date-picker.tsx";

export default function DefaultInputs() {
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

  const handleFileChange = (file: File | null) => {
    if (file) {
      console.log("Selected file:", file.name);
    } else {
      console.log("Fayl o‘chirildi");
    }
  };

  return (
    <ComponentCard title="Qurilma ma'lumotlarini to'ldiring">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input" className="text-[20px]">
            Qurilma nomini kiriting:
          </Label>
          <Input type="text" placeholder="Masalan: Iphone 15max" id="input" />
        </div>

        <div>
          <Label htmlFor="inputTwo" className="text-[20px]">
            Qurilma IMEI raqamini kiriting:
          </Label>
          <Input type="text" id="inputTwo" placeholder="8162325611561" />
        </div>

        <div>
          <Label className="text-[20px]">Qancha muddatga oldi?:</Label>
          <Select
            options={options}
            placeholder="Oy tanlang"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>

        <div>
          <div className="flex flex-row items-center justify-between mb-2">
            <Label className="text-[20px]">Boshlang'ich to'lov</Label>
            <Label className="text-[20px]">Oylik to'lov</Label>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Input className="pl-2" placeholder="Masalan: 200$" />
            <p> </p>
            <Input placeholder="Masalan: 75$" />
          </div>
        </div>

        <ComponentCard title="QURILMA RASMINI QO'SHISH">
          <div>
            <Label>Qurilma rasmini qo'shing</Label>
            {/* ✅ To‘g‘ri prop ishlatyapmiz */}
            <FileInput onFileChange={handleFileChange} className="custom-class" />
          </div>
        </ComponentCard>
      </div>
    </ComponentCard>
  );
}
