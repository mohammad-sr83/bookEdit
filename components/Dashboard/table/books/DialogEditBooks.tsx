
import { IDialogProps } from "@/type/Type";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import UploadFile from "../../component/File/UploadFile";
import CalenderFs from "../../component/datatime/Datatimeinput";
import StatusForm from "../../component/status/StatusForm";
import TagForm from "../../component/tags/Tagsform";
import useSWRMutation from "swr/mutation";
import convertToFormData from "../../component/FormData/Canverformdata";
import useBookStore from "@/store/BookStore";

const DialogBookEdit: React.FC<IDialogProps> = ({
  openDialog,
  handleCloseDialog,
  dialogType,
  id,
  label,
  button,
}) => {
  const { setBook: SetBook, book } = useBookStore();
  const [isloading, setIsloading] = useState(false);
  const names = ["کتاب", "مهندس", "جنایی", "داستانی", "مهندسی", "متفرقه"];

  const handleSaveChanges = () => {
    const formState = convertToFormData(book);

  };

  const handleDelete =async  () => {

  };

  useEffect(() => {
    if (dialogType == "create") {
      SetBook({
        title: "",
        author: "",
        price:0,
        publishDate: "",
        publisher: "",
        description: "",
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
              className="mt-3 "
              label="عنوان"
              value={book.title}
              onChange={(e) => SetBook({ title: e.target.value })}
              fullWidth
            />
            <TextField
              label="نویسنده"
              value={book.author}
              onChange={(e) => SetBook({ author: e.target.value })}
              fullWidth
            />
            <CalenderFs
              label="تاریخ چاپ"
              value={book.publishDate}
              setvalue={SetBook}
              fild="publishDate"
            />
            <TextField
              label="ناشر"
              value={book.publisher}
              onChange={(e) => {
                SetBook({ publisher: e.target.value });
              }}
              fullWidth
            />
            <StatusForm
              value={book.isEnabled}
              setvalue={SetBook}
              size="medium"
            />
            <TagForm
              setvalue={SetBook}
              fild="tags"
              def={book.tags}
              names={names}
              label="تگ ها"
              isShow={true}
              ismuliti={true}
              size="medium"
            />
            <TextField
              dir="ltr"
              label="قیمت"
              value={book.price}
              type="number"
              multiline
              onChange={(e) => {
                SetBook({ price: Number(e.target.value) });
              }}
              fullWidth
            />
            <TextField
              dir="ltr"
              label="isbin"
              value={book.isbn}
              onChange={(e) => {
                SetBook({ isbn: e.target.value });
              }}
              fullWidth
            />
            <TextField
              label="توضیحات"
              value={book.description}
              onChange={(e) => {
                SetBook({ description: e.target.value });
              }}
              fullWidth
            />
            <UploadFile
              value={book.pic}
              setvalue={SetBook}
              fild="cover"
              isPhoto={true}
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

export default DialogBookEdit;
