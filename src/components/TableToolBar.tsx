/**
 * @description TableToolBar component
 * This component renders the toolbar for the table which includes search, batch update and select columns
 */
import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {
  StyledSearchButton,
  StyledSearchContainer,
  StyledTextField,
} from '../styles/styles';
import { useCaseStore } from '../utils/store';
import BatchUpdateComponent from './BatchUpdateComponent';
import SelectColumns from './SelectColumns';
import {
  StyledTableActionContainer,
  StyledTableToolbarContainer,
} from '../styles/styles';

const TableToolBar = ({ fetchCasesData }: { fetchCasesData: () => void }) => {
  const [val, setVal] = useState<string>('');
  const { setSearchTerm } = useCaseStore((state) => state);
  const { setPaginationModal } = useCaseStore((state) => state);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
  };

  const clearSearch = () => {
    setVal('');
    setPaginationModal({ page: 0, pageSize: 10 });
    setSearchTerm('');
  };

  const onClick = () => {
    setPaginationModal({ page: 0, pageSize: 10 });
    setSearchTerm(val);
  };

  return (
    <StyledTableToolbarContainer>
      <StyledSearchContainer>
        <StyledTextField
          // label="Search"
          variant="outlined"
          placeholder="search"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={clearSearch}
                  style={{ visibility: val ? 'visible' : 'hidden' }}
                >
                  <CloseIcon />
                </IconButton>
                <StyledSearchButton
                  variant="contained"
                  onClick={onClick}
                  size="medium"
                  color="primary"
                >
                  Search
                </StyledSearchButton>
              </InputAdornment>
            ),
          }}
          value={val}
          onChange={handleChange}
        />
      </StyledSearchContainer>
      <StyledTableActionContainer>
        <BatchUpdateComponent fetchCasesData={fetchCasesData} />
        <SelectColumns />
      </StyledTableActionContainer>
    </StyledTableToolbarContainer>
  );
};

export default TableToolBar;
