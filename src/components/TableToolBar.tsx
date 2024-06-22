import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { StyledTextField } from '../styles/styles';
import { Button } from '@mui/material';

const TableToolBar = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '85%',
        alignItems: 'center',
      }}
    >
      <div className="searchContainer" style={{ marginBottom: '10px' }}>
        <StyledTextField
          // label="Search"
          variant="outlined"
          placeholder="search"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" style={{ height: '38px' }}>
          Search
        </Button>
      </div>
      <div style={{ marginBottom: '10px' }}></div>
    </div>
  );
};

export default TableToolBar;
