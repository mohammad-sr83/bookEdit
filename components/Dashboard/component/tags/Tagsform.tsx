'use client'

import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme } from '@mui/material/styles';
import * as React from 'react';
import TagFormDrawer from './TagsformDrawer';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface TagFormProps {
  label: string
  def: string[]|undefined
  names: string[]
  isShow: boolean
  fild:string
  ismuliti:boolean
  size:'small'|'medium'
  setvalue: (date: Partial<any>) => void 

}

const TagForm: React.FC<TagFormProps> = ({ setvalue, def, names, label, isShow ,fild ,ismuliti,size}) => {

  const [personName, setPersonName] = React.useState<string[]|undefined>(def);
  const [opendrawer, setOpenDrawer] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setvalue({[fild]: typeof value === 'string' ? value.split(',') : value},)
  };

  return (
    <div className='flex justify-between items-center gap-1'>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label" className=''>{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={personName}
          onChange={handleChange}
          multiple={ismuliti?true:false}  
          size={size}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, personName, theme)}
              className=''
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isShow && <> <Button onClick={() => setOpenDrawer(true)} className='h-[65px] text-3xl'><AddIcon /></Button>
        <TagFormDrawer opendrawer={opendrawer} setvalue={setOpenDrawer} /></>}
    </div>
  );
}

export default TagForm