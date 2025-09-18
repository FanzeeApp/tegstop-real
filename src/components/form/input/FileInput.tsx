import React, { useState } from "react";

export interface FileInputProps {
  onFileChange?: (file: File | null) => void;
  className?: string;
}

const FileInput: React.FC<FileInputProps> = ({ onFileChange, className = "" }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFileChange?.(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    onFileChange?.(null);
    
    // Input elementini tozalash
    if (selectedFile) {
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (input) {
        input.value = '';
      }
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
            onClick={handleRemoveFile}
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-sm">Rasm yuklash uchun bosing</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default FileInput;