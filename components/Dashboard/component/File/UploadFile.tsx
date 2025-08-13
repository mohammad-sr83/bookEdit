import ImgPlaceholder from "@/components/icons/ImgPlaceholder";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import * as React from "react";
import { useRef, useState } from "react";

interface UploadFileFormProps {
  value: string | undefined | [string];
  fill?:string
  setvalue: (data: Partial<any>) => void;
  fild: string;
  isPhoto?: boolean;
}

const UploadFile: React.FC<UploadFileFormProps> = ({
  setvalue,
  fill,
  fild,
  isPhoto,
}) => {
  const [urlImage, setUrlImage] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRefImage = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
    {fill && <span>{fill}</span>}
      {isPhoto ? (
        <div
          onClick={() => inputRefImage.current?.click()}
          className="w-full h-[9rem] relative cursor-pointer p-2 flex justify-center items-center border-dashed border-2 rounded-lg border-black"
        >
          {urlImage ? (
            <img src={urlImage} className="object-cover h-auto max-h-full" />
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
            onChange={(event) => {
              const files = event.target.files;
              if (files && files[0]) {
                setvalue({ [fild]: files[0] });
                if (isPhoto) {
                  const reader = new FileReader();
                  reader.readAsDataURL(files[0]);
                  reader.onload = () => {
                    if (reader.result) {
                      setUrlImage(reader.result.toString());
                    }
                  };
                }
              }
            }}
          />
          <button
            className="absolute bottom-1 right-1 bg-red-500 text-white p-1 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              setUrlImage("");
              setvalue({
                [fild]: new File([], "empty.png", { type: "image/png" }),
              });
            }}
          >
            حذف
          </button>
        </div>
      ) : (
        <div className="w-full h-[4rem] p-3 grid grid-cols-[1fr_3fr_1fr] items-center cursor-pointer border-2 border-black rounded-lg gap-2">
          <span>
            <GraphicEqIcon />
            <input
              ref={inputRef}
              className="hidden"
              type="file"
              accept=".zip"
              onChange={(event) => {
                const files = event.target.files;
                if (files && files[0]) {
                  setvalue({ [fild]: files[0] });
                  setFileName(files[0].name);
                }
              }}
            />
          </span>
          <span className="truncate whitespace-nowrap overflow-hidden">
            {fileName || "انتخاب فایل"}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="bg-green-500 text-white p-1 rounded-lg"
          >
            آپلود
          </button>
        </div>
      )}
    </>
  );
};

export default UploadFile;
