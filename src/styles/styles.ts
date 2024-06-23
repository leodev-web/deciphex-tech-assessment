import {
  ListItemButton,
  TextField,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 95%;
  .MuiListItemIcon-root {
    min-width: 40px;
  }
  color: inherit; // Change the color as needed
  &:hover,
  &:focus,
  &:visited,
  &:active {
    text-decoration: none;
  }
`;

interface CustomProps {
  isSelected: boolean;
}
export const StyledLinkButton = styled(ListItemButton)<CustomProps>`
  background-color: ${(props) =>
    props.isSelected ? '#0A65FF !important' : 'inherit'};
  color: ${(props) => (props.isSelected ? '#fff !important' : 'inherit')};
  border-radius: 0px 8px 8px 0px !important;
  svg {
    color: ${(props) => (props.isSelected ? '#fff !important' : 'inherit')};
  }
`;

export const StyledTextField = styled(TextField)`
  & .MuiInputBase-root {
    height: 40px; // Set your desired height here
  }
`;

export const StyledTypography = styled(Typography)`
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  color: #2e3b52;
  margin-bottom: 20px !important;
  margin-top: 20px !important;
`;

export const StyledActionColumn = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTableToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTableActionContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledSearchContainer = styled.div`
  margin-bottom: 10px;
`;

export const StyledSearchButton = styled(Button)`
  height: 38px;
`;

export const StyledActionIconButton = styled(IconButton)`
  margin-left: 8px;
`;
