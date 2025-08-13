import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface StatusFormProps {
  value: boolean | undefined;
  label?:string
  size: "small" | "medium";
  setvalue: (data: any) => void;
  isDisabled?: boolean;  
  field?:string
}

const StatusForm: React.FC<StatusFormProps> = ({ setvalue, value, size, isDisabled,label,field }) => {
  const handleChange = (event: SelectChangeEvent) => {
    if (field) {
      setvalue({ [field]: event.target.value === 'true' ? true : false });
    }else{
      setvalue({ isEnabled: event.target.value === 'true' ? true : false });
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 180 }} size={size} disabled={isDisabled}>
      <InputLabel id="status-label">{label ? label :'وضعیت'}</InputLabel>
      <Select
        labelId="status-label"
        id="status-select"
        value={value === undefined ? "" : String(value)}
        label="وضعیت"
        onChange={handleChange}
        disabled={isDisabled}  
      >
        <MenuItem value="true">فعال</MenuItem>
        <MenuItem value="false">غیر فعال</MenuItem>
      </Select>
    </FormControl>
  );
};

export default StatusForm;
