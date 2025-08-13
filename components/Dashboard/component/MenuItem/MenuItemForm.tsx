import { Button, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import { useTheme } from '@mui/material/styles';
interface MenuItemFormProps {
    anchorEl: HTMLElement | null
    open: boolean;
    handleClose: () => void
    handleMenuItemClick: (action: "edit" | "delete") => void
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    children:React.ReactNode|undefined
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({ anchorEl, open, handleClose, handleMenuItemClick,children,handleClick}) => {

    const theme = useTheme();

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined} 
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon style={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className=''
            >
                <MenuItem  onClick={() => handleMenuItemClick('delete')} className="text-center">
                    حذف
                </MenuItem>
                <MenuItem  onClick={() => handleMenuItemClick('edit')} className="text-center ">
                    ویرایش
                </MenuItem>
                {children}
            </Menu></>
    )
    
}
export default MenuItemForm