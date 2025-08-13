'use client'
import CardDashboard from '@/components/Dashboard/component/Card/CardDashboard';

export default function Page() {
  const arr = [
    {
      title: 'تعداد بازدید',
      title1: 'امروز',
      items1: '2023',
      title2: 'این ماه',
      items2: '2324',
      title3: 'کل بازدید',
      items3: '28937',
      bg: 'fb7185',
      bgdark: 'b53c4e'
    }, {
      title: 'محصولات ',
      title1: 'تعداد',
      items1: '2023',
      title2: 'فروش امروز',
      items2: '2324',
      title3: 'فروش کل',
      items3: '28937',
      bg: '818cf8',
      bgdark: '3f468d'
    }, {
      title: 'محتوا',
      title1: 'موسیقی',
      items1: '2323 عدد',
      title2: 'کتاب',
      items2: '2323 عدد',
      title3: 'داستان',
      items3: '20390 عدد',
      bg: '4ede80',
      bgdark: '3b6d4c'
    },
    {
      title: 'کاربران',
      title1: 'ثبت نام امروز',
      items1: '2023',
      title2: 'ثبت نام این ماه',
      items2: '2324',
      title3: 'کل کاربران',
      items3: '28937',
      bg: '67c2ff',
      bgdark: '3c5c71'
    }]
    
  return (
    <div className='flex  items-center flex-col gap-5 p-2 text-center w-full md:w-full'>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
        {arr.map((item) => (
          <CardDashboard
            key={item.bg}
            bg={item.bg}
            bgdark={item.bgdark}
            title={item.title}
            title1={item.title1}
            item1={item.items1}
            title2={item.title2}
            item2={item.items2}
            title3={item.title3}
            item3={item.items3}
          />
        ))}
      </div>
      <div className=' grid w-full '>
        <div className=' w-full grid  grid-cols-1 lg:grid-cols-2 gap-5'>
          <div className='  items-center'>
          </div>
          <div className=' items-center'>
          </div>
        </div>
      </div>
    </div>
  )
}
