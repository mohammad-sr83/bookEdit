import React from 'react';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(jalaliday);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

interface AudioProps {
  date?: string | Date;
}

const ShowDate: React.FC<AudioProps> = ({ date }) => {
  if (!date) return <div>تاریخ وارد نشده است</div>;

  const inputDate = dayjs(date instanceof Date ? date.toISOString() : date); // تبدیل Date به ISO string
  const currentDate = dayjs();
  const isLessThanWeek = currentDate.diff(inputDate, 'day') < 7;

  return (
    <div>
      {isLessThanWeek
        ? inputDate.locale('fa').calendar('jalali').fromNow()
        : inputDate.locale('fa').calendar('jalali').format('DD MMMM YYYY')}
    </div>
  );
};

export default ShowDate