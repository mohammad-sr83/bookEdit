"use client";
import { useEffect, useRef, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import QuizIcon from "@mui/icons-material/Quiz";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import MouseIcon from "@mui/icons-material/Mouse";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Crop54Icon from "@mui/icons-material/Crop54";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { Button, Tooltip, useTheme } from "@mui/material";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useParams } from "next/navigation";
import useResizeStore from "@/store/resaize/ResizeStore";
import { useResize } from "@/lib/hook/ResizeHook";
import { useButton } from "@/lib/hook/ButtonTextTeacher";
import DialogAddText from "@/components/page/TextBook/DialogTextDescription";
import { Rectangle } from "@/type/schema";
import DialogShowImage from "@/components/page/TextBook/DialogShowImageBook";

export default function Page() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const {
    rectangles,
    currentRect,
    isDrag,
    setIsDrag,
    isResize,
    scale,
    indexClick,
    selectedType,
    setRectangles,
    setCurrentRect,
    setIsResize,
    setScale,
    setIndexClick,
    showImg,
    setShowImg,
  } = useResizeStore();
  const {
    AddResponseRectangle,
    AddPhotoRectangle,
    AddQuizRectangle,
    AddCropRectangle,
    DeleteRectangles,
    MuoseRectangle,
    MoveImage,
    DeleteOneRectangle,
  } = useButton();
  const { handleResizeStart } = useResize();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedType) return;
    if (!containerRef.current) return;
    if (e.button === 1) {
      setIsDrag(false);
    } else {
      const rect = containerRef.current.getBoundingClientRect();
      const startX = (e.clientX - rect.left) / scale;
      const startY = (e.clientY - rect.top) / scale;

      const newRect: Rectangle = {
        id: Date.now(),
        type: selectedType,
        x: startX,
        y: startY,
        width: 0,
        height: 0,
        description: "",
      };

      setCurrentRect(newRect);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!currentRect) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newWidth = (e.clientX - rect.left) / scale - currentRect.x;
    const newHeight = (e.clientY - rect.top) / scale - currentRect.y;

    setCurrentRect(
      currentRect
        ? {
            ...currentRect,
            width: newWidth,
            height: newHeight,
          }
        : null
    );
  };

  const handleMouseUp = () => {
    setIsDrag(true);
    if (currentRect) {
      const correctedRect = {
        ...currentRect,
        x:
          currentRect.width < 0
            ? currentRect.x + currentRect.width
            : currentRect.x,
        y:
          currentRect.height < 0
            ? currentRect.y + currentRect.height
            : currentRect.y,
        width: Math.abs(currentRect.width),
        height: Math.abs(currentRect.height),
        isResizing: false,
      };
      if (currentRect.width != 0) {
        setRectangles([...rectangles, correctedRect]);
        setCurrentRect(null);
      } else {
        setCurrentRect(null);
      }
    }
  };

  const handleKeyDown = (event: { key: any }) => {
    if (event.key === "1" || event.key === "Shift") {
      AddQuizRectangle();
      return;
    } else if (event.key === "2" || event.key === "Alt") {
      AddResponseRectangle();
      return;
    } else if (event.key === "4" || event.key === "Control") {
      AddCropRectangle();
      return;
    }
    switch (event.key) {
      case "Delete":
        if (indexClick) {
          DeleteOneRectangle();
        } else {
          DeleteRectangles();
        }
        break;
      case "3":
        AddPhotoRectangle();
        break;
      case "5":
        MuoseRectangle();
        break;
      case "6":
        MoveImage();
        break;
      default:
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", ()=>{
      MuoseRectangle();
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", ()=>{
        MuoseRectangle();
      });
    };
  }, [indexClick]);

  return (
    <div className="grid grid-cols-[1fr_4fr] gap-2 h-[calc(100svh-150px)] overflow-hidden ">
      <div
        dir="ltr"
        className={`relative max-h-[calc(100svh-150px)] grid grid-rows-[1fr_auto] ${
          theme.palette.mode === "dark" ? "bg-[#262932]" : "bg-white"
        } rounded-lg shadow-lg p-2`}
      >
        <div className="overflow-y-auto grid grid-cols-2 gap-2 justify-center items-center p-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11].map((items) => (
            <img
              key={items}
              src="https://softketab.com/wp-content/uploads/2022/01/math11-session4-1.png"
              alt={`${items}`}
              onClick={() => (
                setShowImg(
                  "https://softketab.com/wp-content/uploads/2022/01/math11-session4-1.png"
                ),
                DeleteRectangles()
              )}
              className="cursor-pointer rounded-lg border-2 border-black object-contain"
            />
          ))}
        </div>
        <div
          onClick={() => setOpenImg(true)}
          className={`flex justify-center items-center w-full ${theme.palette.mode === "dark" ? "bg-[#262932] hover:bg-black/95" : "bg-white/85 hover:bg-white/95"}  cursor-pointer`}
        >
          <Tooltip title="نمایش کامل عکس ها" placement="bottom">
            <ExpandMoreIcon />
          </Tooltip>
          <DialogShowImage
            list={[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "12",
              "11",
            ]}
            setOpenImg={setOpenImg}
            open={openImg}
          />
        </div>
      </div>

      <div
        className={`relative  max-h-[calc(100svh-150px)] ${
          theme.palette.mode === "dark" ? "bg-[#262932]" : "bg-white"
        } ${selectedType && "cursor-crosshair"} ${!isDrag && "cursor-move"} rounded-lg shadow-lg flex justify-center items-center p-1`}
      >
        <TransformWrapper
          initialScale={0.8}
          minScale={0.5}
          centerOnInit={true}
          centerZoomedOut={true}
          maxScale={5}
          panning={{
            disabled: isDrag,
            activationKeys: [],
            excluded: [],
            wheelPanning: true,
          }}
          wheel={{
            step: 0.04,
            smoothStep: 0.001,
            activationKeys: [],
            excluded: [],
            disabled: false,
          }}
          pinch={{
            step: 5,
            excluded: [],
          }}
          doubleClick={{
            disabled: true,
            excluded: [],
            step: 0.7,
          }}
          onZoom={(e) => {
            setScale(e.state.scale);
          }}
        >
          <TransformComponent>
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={() => (setIndexClick(null), setIsResize(true))}
            >
              <img
                src={showImg}
                className=" object-cover border-2 border-black"
              />
              {rectangles.map((rect) => (
                <div
                  key={rect.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isDrag) {
                      setIndexClick({ id: rect.id }), setIsResize(true);
                    }
                  }}
                  className={`absolute border-4 border-dashed ${rect.type === "crop" ? "z-0" : "z-50"} ${selectedType == null && isDrag && "hover:bg-white/35"} ${
                    indexClick?.id === rect.id
                      ? "border-black border-dashed z-50"
                      : rect.type === "crop"
                        ? "border-red-500 hover:border-red-700"
                        : rect.type === "quiz"
                          ? "border-blue-500 hover:border-blue-700"
                          : rect.type === "photo"
                            ? "border-green-500 hover:border-green-700"
                            : "border-yellow-500 hover:border-yellow-600"
                  }`}
                  style={{
                    left: rect.x,
                    top: rect.y,
                    width: rect.width,
                    height: rect.height,
                  }}
                >
                  {indexClick?.id === rect.id &&
                    isResize &&
                    [
                      "top-left",
                      "top-right",
                      "bottom-left",
                      "bottom-right",
                    ].map((handle) => (
                      <div
                        key={handle}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={() => {
                          handleResizeStart(
                            handle as
                              | "top-left"
                              | "top-right"
                              | "bottom-left"
                              | "bottom-right"
                          );
                        }}
                        className="absolute w-3 h-3 bg-white border border-black cursor-nwse-resize z-50"
                        style={{
                          left: handle.includes("left") ? -10 : rect.width - 8,
                          top: handle.includes("top") ? -10 : rect.height - 8,
                        }}
                      />
                    ))}

                </div>
              ))}

              {currentRect && (
                <div
                  className={`absolute border-4 ${
                    currentRect.type === "crop"
                      ? "border-red-500"
                      : currentRect.type === "quiz"
                        ? "border-blue-500"
                        : currentRect.type === "photo"
                          ? "border-green-500"
                          : "border-yellow-500"
                  }`}
                  style={{
                    left:
                      currentRect.width < 0
                        ? currentRect.x + currentRect.width
                        : currentRect.x,
                    top:
                      currentRect.height < 0
                        ? currentRect.y + currentRect.height
                        : currentRect.y,
                    width: Math.abs(currentRect.width),
                    height: Math.abs(currentRect.height),
                  }}
                ></div>
              )}
            </div>
          </TransformComponent>
        </TransformWrapper>
        {rectangles.length > 0 && (
          <div className="absolute bottom-1 left-1">
            <Button variant="contained">ثبت</Button>
          </div>
        )}
        <div
          className={`absolute flex items-center justify-center bottom-1 right-1 ${
            theme.palette.mode === "dark" ? "bg-slate-500" : "bg-slate-200"
          } px-3 py-1 gap-3 rounded-lg shadow-lg cursor-pointer`}
        >
          <Tooltip title="اضافه کردن سوال" placement="top">
            <QuizIcon
              className={`cursor-pointer ${
                selectedType === "quiz" ? "text-blue-500" : ""
              }`}
              onClick={(e) => AddQuizRectangle()}
            />
          </Tooltip>
          <Tooltip title="اضافه کردن جواب" placement="top">
            <QuestionAnswerIcon
              className={`cursor-pointer ${
                selectedType === "response" ? "text-yellow-500" : ""
              }`}
              onClick={(e) => AddResponseRectangle()}
            />
          </Tooltip>
          <Tooltip title="اضافه کردن عکس" placement="top">
            <AddAPhotoIcon
              className={`cursor-pointer ${
                selectedType === "photo" ? "text-green-500" : ""
              }`}
              onClick={(e) => AddPhotoRectangle()}
            />
          </Tooltip>
          <Tooltip title="اضافه کردن حاشیه" placement="top">
            <Crop54Icon
              className={`cursor-pointer ${
                selectedType === "crop" ? "text-red-500" : ""
              }`}
              onClick={(e) => AddCropRectangle()}
            />
          </Tooltip>
          <Tooltip title="حذف تمام اشکال" placement="top">
            <DeleteIcon
              className={`cursor-pointer hover:text-red-500`}
              onClick={(e) => DeleteRectangles()}
            />
          </Tooltip>
          <Tooltip title="حالت ماوس" placement="top">
            <MouseIcon
              className={`cursor-pointer ${selectedType === null && isDrag && "text-green-500"}`}
              onClick={(e) => MuoseRectangle()}
            />
          </Tooltip>
          <Tooltip title="حالت زوم" placement="top">
            <OpenWithIcon
              className={`cursor-pointer ${!isDrag && "text-yellow-500"}`}
              onClick={(e) => MoveImage()}
            />
          </Tooltip>
          {indexClick && (
            <Tooltip title="اضافه کردن توضیحات" placement="top">
              <div className="transition-all">
                <TextFieldsIcon
                  className={`cursor-pointer ${!isDrag && "text-yellow-500"}`}
                  onClick={(e) => setOpen(!open)}
                />
                <DialogAddText open={open} setOpen={setOpen} />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}
