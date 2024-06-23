import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { StyledTextField } from '../styles/styles';
import { Button } from '@mui/material';
import { useCaseStore } from '../utils/store';
import BatchUpdateComponent from './BatchUpdateComponent';
import SelectColumns from './SelectColumns';

const TableToolBar = ({ fetchCasesData }: { fetchCasesData: () => void }) => {
  const [val, setVal] = useState<string>('');
  const { setSearchTerm } = useCaseStore((state) => state);
  const { setPaginationModal } = useCaseStore((state) => state);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
  };

  const onClick = () => {
    setPaginationModal({ page: 0, pageSize: 10 });
    setSearchTerm(val);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
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
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  style={{ height: '38px' }}
                  onClick={onClick}
                  size="medium"
                  color="primary"
                >
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
          value={val}
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <BatchUpdateComponent fetchCasesData={fetchCasesData} />
        <SelectColumns />
      </div>
    </div>
  );
};

export default TableToolBar;
