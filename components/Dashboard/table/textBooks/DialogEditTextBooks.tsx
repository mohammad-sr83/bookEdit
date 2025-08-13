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
import UploadFile from "../../component/File/UploadFile";
import useSWRMutation from "swr/mutation";
import convertToFormData from "../../component/FormData/Canverformdata";
import useTextBookStore from "@/store/TextBookStore";
import TagForm from "../../component/tags/Tagsform";

const DialogTextBookEdit: React.FC<IDialogProps> = ({
  openDialog,
  handleCloseDialog,
  dialogType,
  id,
  label,
  button,
}) => {
  const { textbook, setTextBook } = useTextBookStore();
  const [isloading, setIsloading] = useState(false);
  const names = ["کتاب", "مهندس", "جنایی", "داستانی", "مهندسی", "متفرقه"];

  const handleSaveChanges = () => {
    const formState = convertToFormData(textbook);
  };

  const handleDelete = async () => {};

  useEffect(() => {
    if (dialogType == "create") {
      setTextBook({
        name: "",
        educationalBase: [""],
        book: [""],
        description: "",
        yearOfPublication: "1404",
        fileBook: "",
        fileAnswerSheet: "",
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
              className="w-[20rem]"
              label="نام کتاب کمک درسی"
              value={textbook.name}
              onChange={(e) => setTextBook({ name: e.target.value })}

            />
            <TagForm
              setvalue={setTextBook}
              fild="educationalBase"
              def={textbook.educationalBase}
              names={names}
              label="پایه"
              isShow={false}
              ismuliti={true}
              size="medium"
            />
            <TagForm
              setvalue={setTextBook}
              fild="book"
              def={textbook.book}
              names={names}
              label="کتاب ها"
              isShow={false}
              ismuliti={true}
              size="medium"
            />
            <TextField
              label="توضیحات"
              rows={3}
              multiline
              value={textbook.description}
              onChange={(e) => {
                setTextBook({ description: e.target.value });
              }}
              fullWidth
            />
            <TextField
              label="سال نشر"
              value={textbook.yearOfPublication}
              onChange={(e) => {
                setTextBook({ yearOfPublication: e.target.value });
              }}
              fullWidth
            />
            <UploadFile
              value={textbook.fileBook}
              setvalue={setTextBook}
              fild="fileBook"
              fill="آپلود کتاب"
              isPhoto={false}
            />
            <UploadFile
              value={textbook.fileBook}
              setvalue={setTextBook}
              fill="آپلود پاسخ نامه"
              fild="fileAnswerSheet"
              isPhoto={false}
            />
            {/* Add more fields as needed */}
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

export default DialogTextBookEdit;
