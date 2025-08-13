import { useButton } from "@/lib/hook/ButtonTextTeacher";
import useResizeStore from "@/store/resaize/ResizeStore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export default function DialogShowImage({open,setOpenImg,list}:{open:boolean,setOpenImg: React.Dispatch<React.SetStateAction<boolean>>,list:Array<string>}) {
      const {
        DeleteRectangles,
      } = useButton();
      
  const {
    setShowImg,
  } = useResizeStore();
  
  const handleClose = () => {
    setOpenImg(false);
  };

  return (
      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogTitle>نمایش تمام عکس ها</DialogTitle>
        <DialogContent className="w-full h-full p-2 grid grid-cols-3 lg:grid-cols-5 overflow-auto gap-4">
        {list.map((items) => (
            <img
              key={items}
              src="https://softketab.com/wp-content/uploads/2022/01/math11-session4-1.png"
              alt={`${items}`}
              onClick={(e) => (
                setShowImg(
                  "https://softketab.com/wp-content/uploads/2022/01/math11-session4-1.png"
                ),
                setOpenImg(false),
                e.stopPropagation(),
                DeleteRectangles()
              )}
              className="cursor-pointer rounded-lg border-2 border-black object-contain"
            />
          ))}
        </DialogContent>
        <DialogActions className="flex justify-between items-center gap-4">
          <Button  variant='contained' onClick={(e)=>(e.stopPropagation(),setOpenImg(false))}>بستن</Button>
        </DialogActions>
      </Dialog>
  );
}
