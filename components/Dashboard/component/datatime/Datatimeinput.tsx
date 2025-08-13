import * as React from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalaliV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const cacheRtl = createCache({
  key: 'adapter-date-fns-jalali-demo',
  stylisPlugins: [prefixer, rtlPlugin],
});

interface CalenderFormProps {
  label: string;
  value: string | undefined;
  fild: string;
  setvalue: (date: Partial<any>) => void;
}

const CalenderFs: React.FC<CalenderFormProps> = ({ setvalue, value, label, fild }) => {

  // بررسی اعتبار تاریخ
  const validDate = value && !isNaN(new Date(value).getTime()) ? new Date(value) : null;

  const handleDateChange = (newValue: Date | null) => {
    if (newValue) {
      const formattedDate = newValue.toLocaleDateString('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      setvalue({ [fild]: formattedDate });
    }
  };
  
  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl">
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <DatePicker
            label={label}
            className="w-full"
            value={validDate}
            onChange={handleDateChange}
            slotProps={{
              desktopPaper: {
                dir: 'rtl',
              },
              mobilePaper: {
                dir: 'rtl',
              },
            }}
          />
        </LocalizationProvider>
      </div>
    </CacheProvider>
  );
};

export default CalenderFs;
