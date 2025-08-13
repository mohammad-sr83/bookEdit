import React from 'react'
import Drawer from '@mui/material/Drawer';
import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

interface TagFormProps {
    opendrawer:boolean
    setvalue: React.Dispatch<React.SetStateAction<boolean>>
}

const TagFormDrawer: React.FC<TagFormProps> = ({ setvalue,opendrawer }) => {

    const [NewTag, setNewTag] = React.useState("");
    const handlerNewTag = () => {};

  return (
    <Drawer
    anchor='bottom'
    open={opendrawer}
    onClose={()=>setvalue(!opendrawer)} 
    PaperProps={{
      style: {
        zIndex: 1301,
        width: '30%',  
        height: '22%',  
        padding: '10px',
        position: 'fixed',  
        bottom: '0',  
        right: '35%', 
        left:'50%',
        borderRadius: '10px 10px 0 0', 
      },
    }} 
    className='flex justify-between flex-col   p-7'
    sx={{
        zIndex: 1500,  
        '& .MuiDrawer-paper': {
          zIndex: 1500, 
        },
      }}
  >
    <Typography variant="h6" style={{ marginBottom:'20px',marginTop:'18px' }} >
      اضافه کردن تگ جدید
    </Typography>
    <TextField
    className=' mb-9 '
        label="تگ جدید رو وارد کنید "
        value={NewTag}
        onChange={(e)=>{setNewTag(e.target.value)}}
        />
    <Button onClick={handlerNewTag} type='button' style={{width:'10%',marginTop:'20px'}} className=' absolute  self-end mb-2' variant='contained'>ذخیره</Button>          
  </Drawer>
  )
}

export default TagFormDrawer