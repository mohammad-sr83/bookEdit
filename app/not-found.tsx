import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Page() {

  return (
    <div className='flex flex-col justify-center min-h-screen w-full items-center gap-3 bg-[#f6f6f6] '>
      <div className='flex justify-center items-center'>
        <img src='/image/erreur-404.jpg' className='w-1/2'></img>
      </div>
      <div className='flex justify-center items-center'>
        <h2>این صفحه داخل داشبورد وجود ندارد</h2>
      </div>
      <Link href='/' className='flex justify-center items-center'>
        <Button variant='contained' className='flex justify-between items-center gap-3 bg-black'>
          <DashboardIcon />
          <span className=' font-medium'>داشبورد</span>
        </Button>
      </Link>
    </div>
  )
}
