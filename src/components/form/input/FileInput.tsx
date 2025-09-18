import React, { useState } from "react";

interface FileInputProps {
  onFileChange?: (file: File | null) => void; // ✅ nomini o'zgartirdik
  className?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  onFileChange,
  className = "",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    onFileChange?.(selectedFile); // ✅ endi yangi nom ishlatyapmiz

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer hover:border-brand-400 transition ${className}`}
    >
      {preview ? (
        <div className="relative w-40 h-40">
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full rounded-lg shadow-md"
          />
          <button
            type="button"
            onClick={() => {
              setFile(null);
              setPreview(null);
              onFileChange?.(null); // ✅ shu ham moslashdi
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs shadow-md hover:bg-red-600"
          >
            ✕
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center text-center text-gray-500 cursor-pointer">
          <svg
            className="w-12 h-12 mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-sm">Rasm yuklash uchun bosing</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // ✅ endi event tipiga mos
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default FileInput;
