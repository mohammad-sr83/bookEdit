'use client'
import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

interface ImageFormProps {
    value: string
    title: string
    rounded:boolean
    showModal: boolean
    width?:string
    height?:string
    style?:string
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ImgModal: React.FC<ImageFormProps> = ({ value, title, showModal, setShow,width,height,rounded ,style}) => {

    const handleCloseDialog = () => {
        setShow(false)
    }

    return (
        <Dialog open={showModal} onClose={handleCloseDialog} >
            <DialogTitle className=''>{title}</DialogTitle>
            <DialogContent >
                <img style={{width:`${width}`,height:`${height}`}} src={`${value ? value : 'd'}`} className={`${rounded ?'rounded-full':'' } aspect-square  object-contain bg-cover' alt='not a picture`}></img>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} className="text-center">بستن</Button>
            </DialogActions>
        </Dialog>
    )
    
}


export default ImgModal