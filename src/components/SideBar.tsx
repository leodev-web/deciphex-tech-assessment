import React from 'react';
import {
  CssBaseline,
  AppBar,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { StyledLink, StyledLinkButton } from '../styles/styles';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

const drawerArray = [
  {
    label: 'All cases',
    icon: <WorkOutlineOutlinedIcon />,
    path: '/',
  },
  {
    label: 'Pending cases',
    icon: <PendingOutlinedIcon />,
    path: '/pending',
  },
  {
    label: 'Accepted cases',
    icon: <CheckCircleOutlineOutlinedIcon />,
    path: '/accepted',
  },
  {
    label: 'Rejected cases',
    icon: <CancelOutlinedIcon />,
    path: '/rejected',
  },
];

const DrawerItem = ({ item }: { item: typeof drawerArray[0] }) => {
  const location = useLocation();
  const isSelected = location.pathname === item.path;

  return (
    <ListItem key={item.label} disablePadding>
    <StyledLink to={item.path}>
    <StyledLinkButton isSelected={isSelected}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} />
      </StyledLinkButton>
    </StyledLink>   
</ListItem>
  );
};

const SideBar = () => {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#F4F7FC',
            color: '#2E3B52',
          },
          backgroundColor: 'red',
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {drawerArray.map((item) => (
            <DrawerItem key={item.label} item={item} />
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
