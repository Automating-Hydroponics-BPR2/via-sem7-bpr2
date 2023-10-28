// dataTable.styles.ts
import { TableContainer, TableCell, TableRow } from '@mui/material';
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
    max-height: 250px;
    overflow-y: auto;
  }
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
  color: ${({ theme }) => theme.palette.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.palette.text.primary};
`;
