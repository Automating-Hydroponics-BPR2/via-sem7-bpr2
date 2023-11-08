// dataTable.styles.ts
import { TableContainer, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableWrapper = styled('div')<{ height: string; width: string }>`
  max-height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-color: ${({ theme }) => theme.palette.background.default};
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const StyledTableContainer = styled(TableContainer)<{ height: string; width: string }>`
  && {
    max-height: ${({ height }) => height};
    width: ${({ width }) => width};
    overflow-y: auto;
    background-color: ${({ theme }) => theme.palette.background.default};
    border: 1px solid ${({ theme }) => theme.palette.text.primary};
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
  font-size: 12px;
  color: ${({ theme }) => theme.palette.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.palette.text.primary};
`;
