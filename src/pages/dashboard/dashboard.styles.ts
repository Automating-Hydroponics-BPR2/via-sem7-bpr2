import { Grid } from '@mui/material';
import styled from 'styled-components';

export const StyledDashboardGridWrapper = styled(Grid)`
  position: relative;
  width: 100%;
  align-items: center;
  padding: 0 0 58px 24px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;
