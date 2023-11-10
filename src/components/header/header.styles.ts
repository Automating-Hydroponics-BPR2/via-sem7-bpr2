import { IconButton, Typography, Button } from '@mui/material';
import styled from 'styled-components';

export const Logo = styled.img`
  display: block;
  width: 9rem;
  height: 2rem;
  margin-right: 1rem;
`;

export const StyledLinkText = styled(Typography)<{ isInverted?: boolean }>`
  opacity: 1;
  font-size: 1rem;
  color: ${({ theme, isInverted }) =>
    isInverted ? theme.palette.primary.contrastText : theme.palette.text.primary}; };
`;

export const StyledLinkButton = styled(Button)`
  text-transform: uppercase;
  transition: opacity 0.3s;

  &:hover {
    ${StyledLinkText} {
      opacity: 0;
    }
  }
`;

export const StyledLinkButtonIcon = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 50%;
  color: ${({ theme }) => theme.palette.text.primary};
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;

  ${StyledLinkButton}:hover & {
    opacity: 1;
  }
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
