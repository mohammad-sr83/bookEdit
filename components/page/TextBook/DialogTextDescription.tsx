import useResizeStore from "@/store/resaize/ResizeStore";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useEffect, useState } from "react";


export default function DialogAddText({open,setOpen}:{open:boolean,setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [value,setValue]=useState('')
  const {
    setRectangles,
    rectangles,
    indexClick,
  } = useResizeStore();

  useEffect(()=>{
    const SubmitDesc =rectangles.filter((item) => item.id == indexClick?.id); 
    SubmitDesc.map((item)=>{
      if (item.description) {
        setValue(item.description)
      }else{
        setValue('')
      }
    })
  },[indexClick,open])
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const SubmitDesc =rectangles.filter((item) => item.id == indexClick?.id); 
    const newRange = rectangles.filter((item) => item.id != indexClick?.id);
    SubmitDesc.map((item)=>{item.description = value})
    newRange.push(SubmitDesc[0])
    setRectangles(newRange);
    setOpen(false);
  };

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>توضیحات خود را برای این قسمت استفاده کنید </DialogTitle>
        <DialogContent>
          <TextField value={value} onChange={(e)=>setValue(e.target.value)} rows={3} multiline fullWidth />
        </DialogContent>
        <DialogActions className="flex justify-between items-center gap-4">
          <Button  variant='contained' onClick={handleClose}>بستن</Button>
          <Button variant='contained' onClick={handleSubmit}>ثبت</Button>
        </DialogActions>
      </Dialog>
  );
}
