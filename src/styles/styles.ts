import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
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
