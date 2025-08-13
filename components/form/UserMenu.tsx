import DarkModeIcon from "@mui/icons-material/DarkMode";
import EditIcon from "@mui/icons-material/Edit";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  useColorScheme,
  useTheme
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserMenuAvatar() {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme()
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className=" fixed left-5 flex justify-between items-center flex-row gap-4">
      <div>
        {mode == "light" ? (
          <Tooltip title="darkmode" enterDelay={1000}>
            <span onClick={() => setMode("dark")} className="cursor-pointer">
              <DarkModeIcon className="text-white" />
            </span>
          </Tooltip>
        ):(
          <Tooltip title="lightmode" enterDelay={1000}>
            <span onClick={() => setMode("light")} className=" cursor-pointer">
              <LightModeIcon className="text-yellow-500" />
            </span>
          </Tooltip>
        )}
      </div>
      <div>
        <Tooltip title="profile" enterDelay={1000}>
          <span onClick={handleClick} className=" cursor-pointer">
            <Avatar src="https://avatars.githubusercontent.com/u/19550456" />
          </span>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          className="text-black"
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 60,
                  height: 60,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  left: 10,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        >
          <MenuItem
            className="flex justify-around items-center "
            onClick={handleClose}
          >
            <div className="flex items-center bg-cover">
              <Avatar src="https://avatars.githubusercontent.com/u/19550456" />
            </div>
            <div className="flex justify-between items-end gap-1 mr-10 flex-col">
              <h2>ali</h2>
              <p className={`text-sm ${theme.palette.mode =='dark' ? 'text-slate-200 ' :'text-slate-600 '}`}>093390430349</p>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem
            className="flex justify-start items-center"
            onClick={handleClose}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            ویرایش حساب
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link
              href="/Settings"
              className="w-full flex justify-start items-center"
            >
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              تنظیمات
            </Link>
          </MenuItem>
          <MenuItem
            className="flex justify-start items-center"
            onClick={() => router.push("login")}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small"  />
            </ListItemIcon>
            خروج
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
