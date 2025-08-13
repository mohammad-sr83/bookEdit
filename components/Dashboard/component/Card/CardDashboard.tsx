import { Card, CardContent, Typography } from '@mui/material';
import React from 'react'
import { useTheme } from '@mui/material/styles';
interface CardProps {
    bg: string;
    title: string;
    title1:string;
    item1:string;
    title2:string;
    item2:string;
    title3:string;
    item3:string;
    bgdark:string
}

const CardDashboard: React.FC<CardProps> = ({ bg, title, title1, item1, title2, item2, title3, item3,bgdark }) => {
    
    const theme = useTheme();

    return (
        <Card style={{ backgroundColor: theme.palette.mode === 'dark' ? `#${bgdark}`:  `#${bg}`}} className='shadow-lg rounded-lg'>
            <CardContent className='grid gap-2'>
                <Typography variant="h6">
                    {title}
                </Typography>
                <div className='grid gap-2'>
                    <span className='grid grid-cols-2 items-center'>
                        <div className="text-sm justify-self-start">{title1}</div>
                        <div className="text-base justify-self-end">{item1}</div>
                    </span>
                    <span className='grid grid-cols-2'>
                        <div className="text-sm justify-self-start">{title2}</div>
                        <div className="text-base justify-self-end">{item2}</div>
                    </span>
                    <span className='grid grid-cols-2'>
                        <div className="text-sm justify-self-start">{title3}</div>
                        <div className="text-base justify-self-end">{item3}</div>
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
export default CardDashboard
