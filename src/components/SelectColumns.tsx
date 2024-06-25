/**
 * @description SelectColumns component
 */
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import { useCaseStore } from '../utils/store';
import { displayName } from '../types/constants';

export default function SelectColumns() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { columnVisibilityModal, setcolumnVisibilityModal } = useCaseStore(
    (state) => state,
  );

  useEffect(() => {
    localStorage.setItem(
      'columnVisibilityModal',
      JSON.stringify(columnVisibilityModal),
    );
  }, [columnVisibilityModal]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectChange = (option: string) => {
    setcolumnVisibilityModal({
      ...columnVisibilityModal,
      [option]: !columnVisibilityModal[option],
    });
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClick} variant="contained">
        Columns
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {Object.keys(columnVisibilityModal).map((option: string) => (
          <MenuItem
            key={option}
            onClick={() => handleSelectChange(option)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '180px',
            }}
          >
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <Checkbox
                  checked={columnVisibilityModal[option]}
                  onChange={() => handleSelectChange(option)}
                />
              </IconButton>
            </ListItemSecondaryAction>
            <ListItemText primary={displayName[option]} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
