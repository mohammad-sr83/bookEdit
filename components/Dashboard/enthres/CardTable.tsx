import { useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from "react";

export default function CardTable({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const theme = useTheme();
const [isShow,setIsShow]=useState(false)
  return (
    <div className="pt-2">
        {/* <MenuIcon className="flex xl:hidden" onClick={()=>{}} /> */}
    <div
      className={`h-full min-w-[15rem] absolut -left-[15rem] xl:left-0 rounded-xl shadow-xl ${theme.palette.mode === "dark" ? "bg-[#262932]" : "bg-white"}`}
      >
      <div
        className={`w-full h-[2rem] p-6 flex justify-center items-center rounded-t-xl shadow-xl ${theme.palette.mode === "dark" ? "bg-black" : "bg-[#2a3592]"}`}
        >
        <h2 className="text-white">نوار پیماییش</h2>
      </div>
      <div className=" flex justify-center items-center flex-col p-4">
        {children}
      </div>
    </div>
            </div>
  );
}
