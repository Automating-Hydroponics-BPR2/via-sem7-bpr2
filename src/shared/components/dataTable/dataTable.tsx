// dataTable.tsx
import { Table, TableBody, TableHead, TableRow, Paper } from '@mui/material';
import { IDataTableProps } from './dataTable.props';
import {
  StyledTableWrapper,
  StyledTableHeaderCell,
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
  StyledDataTableTitle,
} from './dataTable.styles';

export const DataTable = (props: IDataTableProps) => {
  const { data, deviceName, deviceId, height } = props;

  return (
    <StyledTableWrapper height={height}>
      <StyledDataTableTitle>
        Device: {deviceName} ({deviceId})
      </StyledDataTableTitle>
      <StyledTableContainer as={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>Light</StyledTableHeaderCell>
              <StyledTableHeaderCell>pH</StyledTableHeaderCell>
              <StyledTableHeaderCell>Temperature</StyledTableHeaderCell>
              <StyledTableHeaderCell>Water Temperature</StyledTableHeaderCell>
              <StyledTableHeaderCell>Humidity</StyledTableHeaderCell>
              <StyledTableHeaderCell>Timestamp</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((reading) => (
              <StyledTableRow key={reading.id}>
                <StyledTableCell>{reading.light}</StyledTableCell>
                <StyledTableCell>{reading.ph}</StyledTableCell>
                <StyledTableCell>{reading.temp}</StyledTableCell>
                <StyledTableCell>{reading.waterTemp}</StyledTableCell>
                <StyledTableCell>{reading.humidity}</StyledTableCell>
                <StyledTableCell>{reading.timestamp}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledTableWrapper>
  );
};
