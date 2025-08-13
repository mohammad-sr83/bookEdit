"use client";

import DashboardLayoutBasic from "@/components/form/DashboardDemo";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme({
    direction:"rtl",
    colorSchemes: { light: true, dark: true },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#ffffff",
          },
          h6: {
            color: "#ffffff",
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
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <ThemeProvider theme={theme} >
      <DashboardLayoutBasic>{children}</DashboardLayoutBasic>
    </ThemeProvider>
  );
}
