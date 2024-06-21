import React from 'react';
import SideBar from './SideBar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </Box>
    </Box>
  );
};
