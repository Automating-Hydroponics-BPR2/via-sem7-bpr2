import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Logo = styled.img`
  display: block;
  width: 10rem;
  height: 3rem;
  margin-right: 1rem;
`;

export const StyledLink = styled(Link)<{ isInverted?: boolean }>`
  list-style: none;
  text-decoration: none;
  color: ${({ theme, isInverted }) =>
    isInverted ? theme.palette.primary.contrastText : theme.palette.text.primary}; };
`;

export const StyledIcon = styled(IconButton)`
  margin-left: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

export const StyledNumberOfNotifications = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.main};
`;
