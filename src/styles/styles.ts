import { ListItemButton } from '@mui/material';
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
  isSelected: boolean
}
export const StyledLinkButton = styled(ListItemButton)<CustomProps>`
  background-color: ${props => props.isSelected ? '#0A65FF !important' : 'inherit'};
  color: ${props => props.isSelected ? '#fff !important' : 'inherit'};
  border-radius: 0px 8px 8px 0px!important;
  svg {
    color: ${props => props.isSelected ? '#fff !important' : 'inherit'};
  }
 
`