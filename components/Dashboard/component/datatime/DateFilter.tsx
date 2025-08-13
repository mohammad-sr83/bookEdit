import * as React from 'react';
import CalenderFs from './Datatimeinput';


interface DateFilterFormProps {
    valueS: string | undefined;
    valueE: string | undefined;
    fildS: string
    fildE: string
    setvalueS: (date: Partial<any>) => void;
    setvalueE: (date: Partial<any>) => void;
}

const DateFilter: React.FC<DateFilterFormProps> = ({ valueS,valueE,fildS,fildE,setvalueS,setvalueE }) => {
    
    return (
        <>
            <CalenderFs
                label='تاریخ شروع'
                value={valueS}
                setvalue={setvalueS}
                fild={fildS}
            />
            <CalenderFs
                label='تاریخ پایان'
                value={valueE}
                setvalue={setvalueE}
                fild={fildE}
            />
        </>
    );
};

export default DateFilter;
