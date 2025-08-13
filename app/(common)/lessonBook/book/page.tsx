'use client';
import { Search, SearchIconWrapper, StyledInputBase } from '@/components/Dashboard/component/Search/Search';
import DataTableBookLesson from '@/components/Dashboard/table/lessonBook/book/TableRowBooksLesson';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

export default function Page() {
  const [isshow, setIsShow] = useState(false)
  const [valueSearch, setValueSearch] = useState('')
  const theme = useTheme();

  return (
    <div className='w-full'>
      <div className='flex justify-between flex-col mr-0  '>
        <div className=' flex justify-between flex-col mb-26 '>
          <div className=' flex justify-between mb-2 '>
            <h2 className='text-2xl  font-bold'>لیست کتاب ها </h2>
            <span className='flex justify-between items-center'>
              <Search style={{ backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#e2e8f0', color: theme.palette.mode === 'dark' ? '#fff' : '#000' }} className='flex justify-between '>
                <SearchIconWrapper className=' absolute left-0'>
                  <SearchIcon  style={{ fill: theme.palette.mode === 'dark' ? '#fff' : '#000' }} />
                </SearchIconWrapper>
                <StyledInputBase
                  style={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }}
                  placeholder="جستجو…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={valueSearch}
                  onChange={(e) => setValueSearch(e.target.value)}
                />
              </Search>
              <Button onClick={() => setIsShow(!isshow)}  >{isshow ? <FilterAltIcon style={{ fill: theme.palette.mode === 'dark' ? '#fff' : '#000' }}/> : <FilterAltOutlinedIcon style={{ fill: theme.palette.mode === 'dark' ? '#fff' : '#000' }} />}</Button>
            </span>
          </div>
          {isshow && <div>در حال ساخت</div>}
        </div>
        <div>
          <DataTableBookLesson />
        </div>
      </div>
    </div>
  )
}
