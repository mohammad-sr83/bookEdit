import useLessonBookStore from "@/store/LessonBookStore";
import { IDialogProps } from "@/type/Type";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import UploadFile from "../../../component/File/UploadFile";
import convertToFormData from "../../../component/FormData/Canverformdata";

const DialogBookEdit: React.FC<IDialogProps> = ({
  openDialog,
  handleCloseDialog,
  dialogType,
  id,
  label,
  button,
}) => {
  const { setLessonBook, lesbook } = useLessonBookStore();
  const [isloading, setIsloading] = useState(false);
  const arrayLevel = [
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
    "11",
    "12",
  ];
  const handleSaveChanges = () => {
    const formState = convertToFormData(lesbook);
  };

  const handleDelete = async () => {};

  useEffect(() => {
    if (dialogType == "create") {
      setLessonBook({
        id: "",
        name: "",
        level: "1",
        cover: "",
      });
    }
  }, [openDialog]);

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>
        {dialogType === "edit"
          ? label
          : dialogType === "create"
            ? label
            : "حذف اطلاعات"}
      </DialogTitle>
      <DialogContent>
        {dialogType === "edit" || dialogType === "create" ? (
          <Stack spacing={4} className="pt-4 ">
            <TextField
              className="mt-3 w-[20rem]"
              label="اسم کتاب"
              value={lesbook.name}
              onChange={(e) => setLessonBook({ name: e.target.value })}
            />
             <TextField
              className="mt-3 w-[20rem]"
              label="کد کتاب"
              value={lesbook.code}
              onChange={(e) => setLessonBook({code: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                پایه به عدد
              </InputLabel>
              <Select
                value={lesbook.level ?? ""}
                onChange={(e) =>
                  setLessonBook({
                    level: e.target.value as
                      | "1"
                      | "2"
                      | "3"
                      | "4"
                      | "5"
                      | "6"
                      | "7"
                      | "8"
                      | "9"
                      | "10"
                      | "11"
                      | "12",
                  })
                }
              >
                {arrayLevel.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <UploadFile
              value={"اپلود عکس کتاب"}
              setvalue={setLessonBook}
              fild="cover"
              isPhoto={true}
            />
          </Stack>
        ) : (
          <div className="text-center">آیا از حذف این کتاب اطمینان دارید؟</div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} className="text-center">
          بستن
        </Button>
        {dialogType === "edit" || dialogType === "create" ? (
          <>
            <LoadingButton
              size="small"
              onClick={handleSaveChanges}
              loading={isloading}
              loadingPosition="center"
              variant="contained"
            >
              {button}
            </LoadingButton>
          </>
        ) : (
          <Button onClick={handleDelete} className="text-center" color="error">
            حذف
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogBookEdit;
