import { Grid } from '@mui/material';
import styled from 'styled-components';

export const StyledDashboardGridWrapper = styled(Grid)`
  align-items: center;
  width: calc(100vw - 5%);
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.background.default};
`;
