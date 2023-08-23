import React from 'react';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import CurrencyCell from './CurrencyCell';
import {CoinList2Type} from "@crema/models/dashboards/Crypto";
import {SelectChangeEvent} from "@mui/material";


type Props={
  handleCoinChange:(event: SelectChangeEvent<number>)=>void; coinList: CoinList2Type[]; selectedCoinId: number
}
const CoinDropdown = ({handleCoinChange, coinList, selectedCoinId}: Props) => {
  return (
    <FormControl
      variant='outlined'
      sx={{
        minWidth: 100,
        width: '100%',
      }}
    >
      <Select
        labelId='selected-coin-select-outlined-label'
        sx={{
          cursor: 'pointer',
          '& .MuiSelect-select': {
            py: 1.25,
            pl: 2,
          },
          '&.MuiInputBase-root': {
            backgroundColor: (theme) => theme.palette.background.default,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: '0 none',
          },
        }}
        value={selectedCoinId}
        onChange={handleCoinChange}
      >
        {coinList.map((coin) => {
          return CurrencyCell(coin);
        })}
      </Select>
    </FormControl>
  );
};

export default CoinDropdown;
