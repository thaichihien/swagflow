import { UploadIcon } from "@/assets/icons";
import { useState } from "react";

export function UploadFile({ onChange }: { onChange: (file: File) => void }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onChange(selectedFile);
    }
  };

  return (
    <div className="relative mb-5.5 block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary">
      <input
        type="file"
        name="profilePhoto"
        id="profilePhoto"
        accept="image/png, image/jpg, image/jpeg"
        hidden
        multiple={false}
      />

      <label
        htmlFor="profilePhoto"
        className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-7.5"
      >
        <div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
          <UploadIcon />
        </div>

        <p className="mt-2.5 text-body-sm font-medium">
          <span className="text-primary">Click to upload</span> or drag and drop
        </p>

        <p className="mt-1 text-body-xs">
          SVG, PNG, JPG or GIF (max, 800 X 800px)
        </p>
      </label>
    </div>
  );
}
