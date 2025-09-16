// import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import FileInput from "../input/FileInput";
// import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
// import DatePicker from "../date-picker.tsx";

export default function DefaultInputs() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  }
  const options = [
    { value: "AD", label: "AD" },
    { value: "AC", label: "AC" },
    { value: "AB", label: "AB" },
    { value: "KA", label: "KA" },
    { value: "AE", label: "AE" }
  ];
  const handleSelectChange = (value: string) => {
    console.log("Oy tanlang:", value);
  };

  return (
    <ComponentCard className="bg-red" title="Firibgar ma'lumotlarini to'ldiring">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input" className="text-[20px]">Firibgar ismini kiriting:</Label>
          <Input type="text" placeholder="Masalan: Ali Valiyev" id="input" />
        </div>
        <div>
          <Label htmlFor="inputTwo" className="text-[20px]">PASSPORT SERIA & RAQAMI:</Label>
          <div className="flex flex-row items-center justify-between gap-4">
          <Select
            options={options}
            placeholder="Seria"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />

          <Input type="text" id="inputTwo" placeholder="4987854" />
          </div>
        </div>
        <ComponentCard title="FIRIBGAR RASMINI QO'SHISH">
      <div>
        <Label>Firibgar rasmini qo'shing:</Label>
        <FileInput onChange={handleFileChange} className="custom-class" />
      </div>
    </ComponentCard>
      </div>
    </ComponentCard>
  );
}
