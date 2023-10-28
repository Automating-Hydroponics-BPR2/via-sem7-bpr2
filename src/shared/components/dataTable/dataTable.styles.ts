// dataTable.styles.ts
import { TableContainer, TableCell, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableWrapper = styled('div')<{ height: number }>`
  height: ${({ height }) => height}px;
  max-height: 250px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const StyledTableContainer = styled(TableContainer)`
  && {
    background-color: ${({ theme }) => theme.palette.background.default};
    border: 1px solid ${({ theme }) => theme.palette.text.primary};
    max-height: calc(100% - 1rem - 30px - 2px);
    overflow-y: auto;
  }
`;

export const StyledDataTableTitle = styled(Typography)`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 1rem;
`;

export const StyledTableRow = styled(TableRow)`
  && {
    border-bottom: 1px solid ${({ theme }) => theme.palette.text.primary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const StyledTableHeaderCell = styled(TableCell)`
  color: ${({ theme }) => theme.palette.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.palette.text.primary};
`;

export const StyledTableCell = styled(TableCell)`
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.palette.text.primary};
`;
