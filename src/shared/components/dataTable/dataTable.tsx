// dataTable.tsx
import { Table, TableBody, TableHead, Paper } from '@mui/material';
import { IDataTableProps } from './dataTable.props';
import {
  StyledTableWrapper,
  StyledTableHeaderCell,
  StyledTableCell,
  StyledTableContainer,
  StyledTableRow,
} from './dataTable.styles';

export const DataTable = (props: IDataTableProps) => {
  const { data, height, width, filterType } = props;

  return (
    <StyledTableWrapper height={height} width={width}>
      <StyledTableContainer as={Paper} height={height} width={width}>
        <Table sx={{ width, height }}>
          <TableHead>
            <StyledTableRow sx={{ textAlign: 'center', pointerEvents: 'none' }}>
              {filterType ? (
                <StyledTableHeaderCell colSpan={6} style={{ width: '75%' }}>
                  {filterType === 'light'
                    ? 'Light'
                    : filterType === 'ph'
                    ? 'pH'
                    : filterType === 'temp'
                    ? 'Temperature'
                    : filterType === 'waterTemp'
                    ? 'Water Temperature'
                    : filterType === 'humidity'
                    ? 'Humidity'
                    : 'Date'}
                </StyledTableHeaderCell>
              ) : (
                <>
                  <StyledTableHeaderCell>Light</StyledTableHeaderCell>
                  <StyledTableHeaderCell>pH</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Temperature</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Water Temperature</StyledTableHeaderCell>
                  <StyledTableHeaderCell>Humidity</StyledTableHeaderCell>
                </>
              )}
              <StyledTableHeaderCell colSpan={1} style={{ width: '25%' }}>
                Date
              </StyledTableHeaderCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((reading, index) => (
                <StyledTableRow key={index}>
                  {filterType ? (
                    <StyledTableCell colSpan={6} style={{ width: '75%' }}>
                      {filterType === 'light'
                        ? reading.light
                        : filterType === 'ph'
                        ? reading.ph
                        : filterType === 'temp'
                        ? reading.temp
                        : filterType === 'waterTemp'
                        ? reading.waterTemp
                        : reading.humidity}
                    </StyledTableCell>
                  ) : (
                    <>
                      <StyledTableCell>{reading.light}</StyledTableCell>
                      <StyledTableCell>{reading.ph}</StyledTableCell>
                      <StyledTableCell>{reading.temp}</StyledTableCell>
                      <StyledTableCell>{reading.waterTemp}</StyledTableCell>
                      <StyledTableCell>{reading.humidity}</StyledTableCell>
                    </>
                  )}
                  <StyledTableCell colSpan={1} style={{ width: '25%' }}>
                    {reading.timestamp}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={filterType ? 6 : 7} style={{ textAlign: 'center', pointerEvents: 'none' }}>
                  No data available
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </StyledTableWrapper>
  );
};
