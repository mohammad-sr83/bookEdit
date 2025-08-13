import useResizeStore from "@/store/resaize/ResizeStore";
import { useRef } from "react";

export const useResize = () => {
  const { rectangles, scale, setRectangles, indexClick } = useResizeStore();
  const resizeHandleRef = useRef<"top-left" | "top-right" | "bottom-left" | "bottom-right" | null>(null);

  const handleResizeStart = (handle: "top-left" | "top-right" | "bottom-left" | "bottom-right") => {
    resizeHandleRef.current = handle;
    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    const ResizeOption =rectangles.filter((item) => item.id == indexClick?.id);
    const newRange = rectangles.filter((item) => item.id != indexClick?.id); 
   
    const deltaX = e.movementX / scale;
    const deltaY = e.movementY / scale;
    switch (resizeHandleRef.current) {
      case "top-left":
        ResizeOption[0].x += deltaX;
        ResizeOption[0].y += deltaY;
        ResizeOption[0].width -= deltaX;
        ResizeOption[0].height -= deltaY;
        break;
      case "top-right":
        ResizeOption[0].y += deltaY;
        ResizeOption[0].width += deltaX;
        ResizeOption[0].height -= deltaY;
        break;
      case "bottom-left":
        ResizeOption[0].x += deltaX;
        ResizeOption[0].width -= deltaX;
        ResizeOption[0].height += deltaY;
        break;
      case "bottom-right":
        ResizeOption[0].width += deltaX;
        ResizeOption[0].height += deltaY;
        break;
    }
    newRange.push(ResizeOption[0])
    setRectangles(newRange)
  };

  const handleResizeEnd = () => {
    setRectangles(
      rectangles.map((rect) => ({
        ...rect,
        isResizing: false,
        resizeHandle: undefined,
      }))
    );
    document.removeEventListener("mousemove", handleResizeMove);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  return {
    handleResizeStart,
  };
};
