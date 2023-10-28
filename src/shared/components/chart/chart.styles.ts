import { Typography } from '@mui/material';
import styled from 'styled-components';

export const StyledChartTitle = styled(Typography)`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 20px;
`;
