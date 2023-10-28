// dataTable.tsx
import { Table, TableBody, TableHead, TableRow, Paper } from '@mui/material';
import { IDataTableProps } from './dataTable.props';
import {
  StyledTableWrapper,
  StyledTableHeaderCell,
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
} from './dataTable.styles';

export const DataTable = (props: IDataTableProps) => {
  const { data, deviceName, deviceId, height } = props;

  return (
    <StyledTableWrapper height={height}>
      <StyledTableContainer as={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell>Device ID</StyledTableHeaderCell>
              <StyledTableHeaderCell>Device Name</StyledTableHeaderCell>
              <StyledTableHeaderCell>Light</StyledTableHeaderCell>
              <StyledTableHeaderCell>pH</StyledTableHeaderCell>
              <StyledTableHeaderCell>Temperature</StyledTableHeaderCell>
              <StyledTableHeaderCell>Water Temperature</StyledTableHeaderCell>
              <StyledTableHeaderCell>Humidity</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((reading) => (
              <StyledTableRow key={reading.id}>
                <StyledTableCell>{deviceId}</StyledTableCell>
                <StyledTableCell>{deviceName}</StyledTableCell>
                <StyledTableCell>{reading.light}</StyledTableCell>
                <StyledTableCell>{reading.ph}</StyledTableCell>
                <StyledTableCell>{reading.temp}</StyledTableCell>
                <StyledTableCell>{reading.waterTemp}</StyledTableCell>
                <StyledTableCell>{reading.humidity}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledTableWrapper>
  );
};
