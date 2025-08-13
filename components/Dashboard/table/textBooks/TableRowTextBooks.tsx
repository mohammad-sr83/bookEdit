"use client";

import { fetcherIndex } from "@/lib/query/fetcherAll";
import useTextBookStore from "@/store/TextBookStore";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { faIR } from "@mui/x-data-grid/locales";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import useSWR from "swr";
import MenuItemForm from "../../component/MenuItem/MenuItemForm";
import TextBookRow from "../../data/textBook";
import DialogTextBookEdit from "./DialogEditTextBooks";

const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin],
});

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "نام کتاب کمک درسی",
    align: "right",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "educationalBase",
    headerName: "پایه تحصیلی",
    width: 130,
    align: "right",
  },
  { field: "book", headerName: "کتاب ها", width: 130, align: "right" },
  { field: "description", headerName: "توضیحات", width: 130, align: "right" },
  {
    field: "yearOfPublication",
    headerName: "سال نشر",
    width: 80,
    align: "right",
    renderCell: (params) => {
      return (
        <div>
          {params.row.yearOfPublication ? params.row.yearOfPublication : "1404"}
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
      const { setTextBook } = useTextBookStore();
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
          setTextBook({
            name: selectedRow?.title ||"",
            educationalBase: selectedRow?.title ||[""],
            book: selectedRow?.title ||[""],
            description: selectedRow?.title ||"",
            yearOfPublication: selectedRow?.title ||"1404",
            fileBook: selectedRow?.title ||"",
            fileAnswerSheet: selectedRow?.title ||"",
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
              <Link href={`/textbook/${params.row.id}`}>نمایش تصویر</Link>
            </MenuItem>
          </MenuItemForm>
          <DialogTextBookEdit
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

export default function DataTableTextBooks() {
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
            <DialogTextBookEdit
              label="ایجاد کتاب کمک درسی"
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
            // rows={data?.docs}
            // getRowId={(row) => row._id}
            rows={TextBookRow}
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
