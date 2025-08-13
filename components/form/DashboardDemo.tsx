import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import NAVIGATION from "../Dashboard/enthres/Menubar";
import UserMenuAvatar from "./UserMenu";
import Logo from "../icons/Logo";

function useNextRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navigate = (path: string | URL) => {
    router.push(String(path));
  };

  return { pathname, searchParams, navigate };
}

export default function DashboardLayoutBasic({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const thememode = useTheme();
  const { pathname, searchParams, navigate } = useNextRouter();

  const demoTheme = createTheme({
    palette: {
      mode: thememode.palette.mode,
      ...(thememode.palette.mode === "dark"
        ? {
            background: {
              default: "#1d1e26",
              paper: "#262932",
            },
          }
        : {
            background: {
              default: "#f2f3f6",
              paper: "#fff",
            },
          }),
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              thememode.palette.mode === "dark" ? "#262932" : "#2a3592",
            color: "#ffffff",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor:
              thememode.palette.mode === "dark" ? "#262932" : "#2a3592",
            color: "#ffffff",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            color: thememode.palette.mode === "dark" ? "#ffffff" : "#fff",
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            fill: "#fff",
            "& svg": {
              fill: thememode.palette.mode === "dark" ? "#ffffff" : "#ffffff",
            },
            "&.Mui-selected": {
              backgroundColor:
                thememode.palette.mode === "dark" ? "#383838" : "#91d5ff",
            },
            "&:hover": {
              backgroundColor:
                thememode.palette.mode === "dark" ? "#44475a" : "#3a4cb8",
            },
            "&.Mui-selected:hover": {
              backgroundColor:
                thememode.palette.mode === "dark" ? "#505050" : "#72c5ff",
            },
          },
        },
      },
    },
    typography: {
      fontFamily: [
        "iranyekan",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
    direction: "rtl",
  });

  return (
    <ThemeProvider theme={demoTheme}>
      <AppProvider
        router={{ pathname, searchParams, navigate }}
        navigation={NAVIGATION}
        branding={{
          logo: <Logo className="size-10" colors="white" />,
          title: "مدیریت کتاب ها",
        }}
        theme={demoTheme}
      >
        <DashboardLayout
          slots={{
            toolbarActions: UserMenuAvatar,
          }}
        >
          <div
            className={`flex justify-center p-4 xl:p-10 h-[100vh] ${thememode.palette.mode == "dark" && "darkmode"}`}
          >
            {children}
          </div>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}
