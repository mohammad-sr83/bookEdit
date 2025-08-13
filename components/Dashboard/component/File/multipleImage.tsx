import ImgPlaceholder from "@/components/icons/ImgPlaceholder";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { useRef, useState } from "react";

interface UploadFileFormProps {
  value: string[] | undefined;
  setvalue: (data: Partial<any>) => void;
  fild: string;
  isPhoto?: boolean;
}

const UploadImageMultiple: React.FC<UploadFileFormProps> = ({
  setvalue,
  value = [],
  fild,
  isPhoto,
}) => {
  const [urlImages, setUrlImages] = useState<string[]>([]);
  const inputRefImage = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles: File[] = Array.from(files);
      setvalue({ [fild]: [...(value || []), ...newFiles] });

      if (isPhoto) {
        const newUrls: string[] = [];
        newFiles.forEach((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (reader.result) {
              newUrls.push(reader.result.toString());
              setUrlImages((prev) => [...prev, reader.result!.toString()]);
            }
          };
        });
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newUrls = urlImages.filter((_, i) => i !== index);
    const newValues = (value || []).filter((_, i) => i !== index);
    setUrlImages(newUrls);
    setvalue({ [fild]: newValues });
  };

  return (
    <>
      <div
        onClick={() => inputRefImage.current?.click()}
        className="w-full min-h-[9rem] relative cursor-pointer p-2 flex justify-center items-center border-dashed border-2 rounded-lg border-black flex-wrap gap-2"
      >
        {urlImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {urlImages.map((src, index) => (
              <div key={index} className="relative w-[8rem] h-[8rem]">
                <img
                  onClick={(e) => e.stopPropagation()}
                  src={src}
                  className="object-cover w-full h-full rounded-lg"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage(index);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            <div className=" w-[8rem] h-[8rem] flex justify-center items-center bg-slate-200 rounded-lg">
              <AddIcon sx={{ width: "4rem", height: "4rem", color: "black" }} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-[8rem] h-[8rem]">
            <ImgPlaceholder className="w-full h-full" />
          </div>
        )}
        <input
          ref={inputRefImage}
          className="hidden"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};

export default UploadImageMultiple;
