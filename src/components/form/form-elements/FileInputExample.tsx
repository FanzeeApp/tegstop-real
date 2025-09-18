import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";

export default function FileInputExample() {
  const handleFileChange = (file: File | null) => {
    if (file) {
      console.log("Selected file:", file.name);
    } else {
      console.log("File removed");
    }
  };

  return (
    <ComponentCard title="File Input">
      <div>
        <Label>Upload file</Label>
        <FileInput onFileChange={handleFileChange} className="custom-class" />
      </div>
    </ComponentCard>
  );
}