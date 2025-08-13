"use client";

import ImgModal from "@/components/Dashboard/component/imageModal/ImgModal";
import MenuItemForm from "@/components/Dashboard/component/MenuItem/MenuItemForm";
import LessonBookRow from "@/components/Dashboard/data/lessonBook";
import useLessonBookStore from "@/store/LessonBookStore";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { faIR } from "@mui/x-data-grid/locales";
import * as React from "react";
import { useEffect, useState } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import DialogBookEdit from "./DialogEditBookLesson";

const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin],
});

const columns: GridColDef[] = [
  {
    field: "cover",
    headerName: "تصویر جلد",
    width: 130,
    align: "right",
    renderCell(params) {
      const [showModal, setShowModal] = useState(false);
      return (
        <>
          <div
            className="h-full w-full flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              onClick={() => setShowModal(true)}
              src={`${params.row.cover ? params.row.cover : "d"}`}
              className="w-1/2 h-full object-cover"
              alt="not a picture"
            ></img>
          </div>
          <ImgModal
            title="نمایش جلد کتاب "
            value={params.row.cover}
            setShow={setShowModal}
            showModal={showModal}
            width="400px"
            height="400px"
            rounded={false}
          />
        </>
      );
    },
  },
  {
    field: "name",
    headerName: "اسم کتاب",
    width: 130,
    align: "right",
    flex: 1,
    minWidth: 80,
  },
   {
    field: "code",
    headerName: "کد کتاب",
    width: 150,
    align: "right",
  },
  {
    field: "level",
    headerName: "سطح (پایه به عدد)",
    width: 150,
    align: "right",
  },
  {
    field: "عملیات",
    minWidth: 70,
    align: "right",
    renderCell: (params) => {
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const [openDialog, setOpenDialog] = useState(false);
      const [dialogType, setDialogType] = useState<
        "edit" | "delete" | "create" | null
      >(null);
      const [selectedRow, setSelectedRow] = useState<any>(null);
      const { setLessonBook } = useLessonBookStore();
      const [useid, setuseid] = useState<number>(0);
      const open = Boolean(anchorEl);

      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const handleMenuItemClick = (action: "edit" | "delete" | "create") => {
        setSelectedRow(params.row);
        setDialogType(action);
        setOpenDialog(true);
        setAnchorEl(null);
      };

      const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedRow(null);
      };

      useEffect(() => {
        if (selectedRow) {
          setuseid(selectedRow.id);
          setLessonBook({
            id: selectedRow.id || "",
            name: selectedRow.name || "",
            level: selectedRow.level || "1",
            code: selectedRow.code || "",
            cover: selectedRow.cover || "",
          });
        }
      }, [selectedRow]);

      return (
        <div onClick={(e) => e.stopPropagation()}>
          <MenuItemForm
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            handleMenuItemClick={handleMenuItemClick}
            handleClick={handleClick}
          >
            {undefined}
            {/* <MenuItem className="text-center">
              <Link href={`/trees/${params.row._id}`}>ویرایش فهرست</Link>
            </MenuItem> */}
          </MenuItemForm>
          <DialogBookEdit
            label="ویرایش اطلاعات"
            button="ذخیره تغییرات"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            dialogType={dialogType}
            id={params.row._id}
          />
        </div>
      );
    },
  },
];

const paginationModel = { page: 0, pageSize: 8 };

export default function DataTableBookLesson() {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const existingTheme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<
    "edit" | "delete" | "create" | null
  >(null);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectionChange = (newSelection: any) => {
    setSelectedRows(newSelection);
  };
  // دکمه حذف
  const handleDelete = () => {
    const selectedIds = selectedRows.map((row: any) => row.id);
    console.log("Deleting rows with IDs:", selectedIds);
  };

  const theme = React.useMemo(
    () =>
      createTheme({}, faIR, existingTheme, {
        direction: "rtl",
      }),
    [existingTheme]
  );
  const handlePaginationChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    console.log(`?limit=${model.pageSize}&page=${model.page}`); // تنظیم کوئری برای درخواست API
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Stack
          direction="row"
          spacing={4}
          alignItems="center"
          p={2}
          className="flex justify-between gap-3"
        >
          <div>تعداد انتخاب‌ها: {selectedRows.length}</div>
          <div className="flex justify-between gap-2">
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={selectedRows.length === 0}
            >
              <DeleteIcon />
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => (setDialogType("create"), setOpenDialog(true))}
            >
              <AddCircleIcon />
            </Button>
            <DialogBookEdit
              label="ایجاد کتاب"
              button="ایجاد"
              openDialog={openDialog}
              handleCloseDialog={handleCloseDialog}
              dialogType={dialogType}
              id={2}
            />
          </div>
        </Stack>
        <div dir="rtl">
          <DataGrid
            className="rounded-xl shadow-xl"
            style={{
              backgroundColor:
                existingTheme.palette.mode === "dark" ? "#262932" : "#fff",
            }}
            rows={LessonBookRow}
            columns={columns}
            pageSizeOptions={[5, 10, 20, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationChange}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) =>
              handleSelectionChange(newSelection)
            }
            sx={{
              "& .MuiDataGrid-cell": {
                textAlign: "left", // جهت‌گیری متن در سلول‌ها به راست
                direction: "ltr", // اطمینان از اینکه متن داخل سلول‌ها از راست به چپ نمایش داده شود
              },
              "& .MuiDataGrid-columnHeader": {
                textAlign: "left", // جهت‌گیری متن عنوان ستون‌ها به راست
                direction: "ltr", // اطمینان از اینکه عنوان ستون‌ها هم از راست به چپ خوانده شود
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                textAlign: "right", // جهت‌گیری عنوان ستون‌ها
              },
              "@media (max-width: 600px)": {
                width: "100%",
                fontSize: "0.8rem",
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontSize: "0.8rem",
                },
                "& .MuiDataGrid-cell": {
                  fontSize: "0.8rem",
                },
              },
            }}
          />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
