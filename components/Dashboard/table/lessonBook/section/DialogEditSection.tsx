
import Editor from "@/components/Dashboard/component/EditorText/editor";
import useSectionStore from "@/store/SectionStore";
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
import convertToFormData from "../../../component/FormData/Canverformdata";


const DialogBookEdit: React.FC<IDialogProps> = ({
  openDialog,
  handleCloseDialog,
  dialogType,
  id,
  label,
  button,
}) => {
  const { section,setSection } = useSectionStore();
  const [isloading, setIsloading] = useState(false);

  const handleSaveChanges = () => {
    const formState = convertToFormData(section);

  };

  const handleDelete =async  () => {

  };

  useEffect(() => {
    if (dialogType == "create") {
      setSection({
    id:"",
    text: "",
    keyWords: ['']
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
          <Stack spacing={4} className="pt-4">
            <Editor 
            setvalue={setSection}
            value={section.text}
            fild="text"
            />
            <TextField
              label="کلمات کلیدی"
              rows={3}
              multiline
              // className="w-[40rem]"
              value={section.keyWords}
              onChange={(e) => setSection({ keyWords: [e.target.value] })}

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
