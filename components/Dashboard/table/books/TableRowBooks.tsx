"use client";


import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { faIR } from "@mui/x-data-grid/locales";
import ShowDate from "../../component/Showdate/Showdate";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import ImgModal from "../../component/imageModal/ImgModal";
import MenuItemForm from "../../component/MenuItem/MenuItemForm";
import DialogBookEdit from "./DialogEditBooks";
import useSWR from "swr";
import { fetcherIndex } from "@/lib/query/fetcherAll";
import useBookStore from "@/store/BookStore";

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
              src={`${params.row.cover.small ? (process.env.NEXT_PUBLIC_IMAGE_URL + params.row.cover.small) : "d"}`}
              className="w-1/2 h-full object-cover"
              alt="not a picture"
            ></img>
          </div>
          <ImgModal
            title="نمایش جلد کتاب "
            value={process.env.NEXT_PUBLIC_IMAGE_URL + params.row.cover.medium}
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
    field: "title",
    headerName: "عنوان",
    width: 130,
    align: "right",
    flex: 1,
    minWidth: 80,
  },
  { field: "author", headerName: "نویسنده", width: 130, align: "right" },
  {
    field: "publishDate",
    headerName: "تاریخ چاپ",
    width: 130,
    align: "right",
    type: "date",
    valueGetter: (params:any) => {
      const dateValue = params.row?.publishDate;
      return dateValue ? new Date(dateValue) : null;  
    },
    renderCell: (params) => {
      const dateValue = params.row?.publishDate;
      return <ShowDate date={dateValue} />;
    },
  },
  { field: "publisher", headerName: "ناشر", width: 130, align: "right" },
  { field: "isbn", headerName: "isbn", width: 130, align: "right" },
  { field: "price", headerName: "قیمت", width: 80, align: "right" },
  { field: "time", headerName: "زمان", width: 110, align: "right" },
  { field: "category", headerName: "دسته", width: 130, align: "right" },
  { field: "tags", headerName: "تگ ها  ", width: 110, align: "right" },
  {
    field: "isEnabled",
    headerName: "وضعیت",
    width: 100,
    align: "right",
    renderCell(params) {
      return (
        <div className="flex justify-center items-center">
          <span>
            {params.row.isEnabled == true ? (
              <CheckCircleOutlineIcon className="text-green-600" />
            ) : (
              <DoNotDisturbIcon className="text-red-600" />
            )}
          </span>
        </div>
      );
    },
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
      const { setBook } = useBookStore();
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
          setBook({
            title: selectedRow?.title || "",
            author: selectedRow?.author || "",
            publishDate: selectedRow.publishDate || "",
            publisher: selectedRow.publisher || "",
            time: selectedRow.time || "",
            price: selectedRow.price || "",
            isbn: selectedRow.isbn || "",
            tags: selectedRow.tags || "",
            cover: selectedRow.cover || "",
            isEnabled: selectedRow.isEnabled || true,
            description: selectedRow.description || "",
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
            <MenuItem className="text-center">
              <Link href={`/trees/${params.row._id}`}>ویرایش فهرست</Link>
            </MenuItem>
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

export default function DataTableBooks() {
  const { data, error } = useSWR<any>(
    () => `/book`, // اینجا پارامترهای مورد نظر را به URL اضافه می‌کنید
    fetcherIndex,
    {
      revalidateOnFocus: true,
    }
  );
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
            rows={data?.docs}
            getRowId={(row) => row._id}
            // rows={BooksRow}
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
