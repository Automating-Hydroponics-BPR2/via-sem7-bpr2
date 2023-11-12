import { useEffect, useState } from 'react';
import { DashboardProps } from './dashboard.props';
import { Backdrop, Card, Chart, DataTable, FilterType, SectionHeader, Snackbar } from '../../shared';
import { Grid, Skeleton } from '@mui/material';
import { StyledDashboardGridWrapper } from './dashboard.styles';
import { convertToChartData, convertTimestampToDate, filterDataTableDataForType } from './dashboard.utils';

export const Dashboard = (props: DashboardProps) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [hasAlertAlreadyBeenShown, setHasAlertAlreadyBeenShown] = useState(false);

  const handleCloseAlert = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const hardCodedDataTableData = [
    {
      id: '1',
      deviceId: '2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: 1697637285,
    },
    {
      id: '2',
      deviceId: '2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: 1697637285,
    },
    {
      id: '3',
      deviceId: '2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: 1697637285,
    },
    {
      id: '4',
      deviceId: '2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: 1697637285,
    },
    {
      id: '5',
      deviceId: '2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: 1697637285,
    },
    {
      id: '6',
      deviceId: '2',
      light: '1',
      ph: '2',
      temp: '3',
      waterTemp: '4',
      humidity: '5',
      timestamp: 1697637285,
    },
  ];
  const {
    user,
    type,
    device,
    deviceIds,
    threshold,
    isLoading,
    dateFilter,
    dateFilterLabel,
    selectedDeviceIdChart,
    selectedDeviceIdDataTable,
    selectedDeviceIdInformaton,
    historicalReadings,
    currentReading,

    setType,
    setThreshold,
    setDateFilter,
    setDateFilterLabel,
    setSelectedDeviceIdChart,
    setSelectedDeviceIdDataTable,
    setSelectedDeviceIdInformaton,

    getDeviceIds,
    createDevice,
    updateUserWithId,
    deleteUserWithId,
    deleteDeviceWithId,
    updateDeviceWithId,
    getHistoricalReadings,
  } = props;

  const handleChartData = convertToChartData(
    currentReading ?? {
      id: '6',
      deviceId: '2',
      light: '15',
      ph: '25',
      temp: '33',
      waterTemp: '24',
      humidity: '52',
      timestamp: 1697637285,
    },
  );

  const isThresholdExceeded = () => {
    const { light, ph, temp, waterTemp, humidity } = currentReading ?? {
      id: '6',
      deviceId: '2',
      light: '15',
      ph: '25',
      temp: '33',
      waterTemp: '24',
      humidity: '52',
      timestamp: 1697637285,
    };

    const isThresholdExceeded =
      parseInt(light) >= threshold ||
      parseInt(ph) >= threshold ||
      parseInt(temp) >= threshold ||
      parseInt(waterTemp) >= threshold ||
      parseInt(humidity) >= threshold;

    if (isThresholdExceeded && !hasAlertAlreadyBeenShown) {
      setAlertOpen(true);
      setHasAlertAlreadyBeenShown(true);
    }
  };

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      getDeviceIds();
      setInitialized(true);
    }

    if (selectedDeviceIdDataTable && dateFilter) {
      getHistoricalReadings(selectedDeviceIdDataTable, dateFilter.start, dateFilter.end);
    }
  }, [initialized, selectedDeviceIdDataTable, dateFilter]);

  useEffect(() => {
    isThresholdExceeded();
    setHasAlertAlreadyBeenShown(false);
  }, [currentReading, threshold]);

  return (
    <StyledDashboardGridWrapper container columnSpacing={3}>
      {isLoading ? (
        <>
          {<Backdrop />}
          <Grid item xs={12} lg={4}>
            <Skeleton variant="rectangular" width={'100%'} height={350} animation={'wave'} sx={{ m: 1 }} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Skeleton variant="rectangular" width={'100%'} height={350} animation={'wave'} sx={{ m: 1 }} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Skeleton variant="rectangular" width={'100%'} height={350} animation={'wave'} sx={{ m: 1 }} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Skeleton variant="rectangular" width={'100%'} height={350} animation={'wave'} sx={{ m: 1 }} />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} md={6} lg={4}>
            <SectionHeader
              selectedDeviceId={selectedDeviceIdInformaton}
              deviceIds={deviceIds}
              title="Device information"
              setSelectedDeviceId={setSelectedDeviceIdInformaton}
            />
            <Card
              device={device}
              showAdd
              showEdit={!!device}
              showDelete={!!device}
              onDeviceAddClick={createDevice}
              onDeviceEditClick={updateDeviceWithId}
              onDeviceDeleteClick={deleteDeviceWithId}
              height="200px"
              width="100%"
              title={selectedDeviceIdInformaton ?? 'No device selected'}
              description={`Here you can see information about the device, such as ${
                selectedDeviceIdInformaton ?? ''
              } {id} ${device?.name ? `and ${device.name} {name}` : ''}. You can edit, add or delete a device.`}
              id={selectedDeviceIdInformaton ?? 'No device selected'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <SectionHeader
              threshold={threshold}
              setSelectedDeviceId={setSelectedDeviceIdChart}
              selectedDeviceId={selectedDeviceIdChart}
              setThreshold={setThreshold}
              deviceIds={deviceIds}
              title={'Current Readings'}
            />
            <Chart data={handleChartData} width={100} height={200} threshold={threshold} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <SectionHeader
              type={type}
              setType={setType}
              deviceIds={deviceIds}
              setDateFilter={setDateFilter}
              dateFilterLabel={dateFilterLabel}
              setDateFilterLabel={setDateFilterLabel}
              selectedDeviceId={selectedDeviceIdDataTable}
              setSelectedDeviceId={setSelectedDeviceIdDataTable}
              title={'Historical Readings'}
            />
            <DataTable
              data={
                historicalReadings
                  ? type === 'Choose a type'
                    ? historicalReadings.map((reading) => {
                        return {
                          ...reading,
                          timestamp: convertTimestampToDate(reading.timestamp as number),
                        };
                      })
                    : filterDataTableDataForType(type as FilterType, historicalReadings).map((reading) => {
                        return {
                          ...reading,
                          timestamp: convertTimestampToDate(reading.timestamp as number),
                        };
                      })
                  : type === 'Choose a type'
                  ? hardCodedDataTableData.map((reading) => {
                      return {
                        ...reading,
                        timestamp: convertTimestampToDate(reading.timestamp as number),
                      };
                    })
                  : filterDataTableDataForType(type as FilterType, hardCodedDataTableData)
              }
              filterType={type !== 'Choose a type' ? (type as FilterType) : undefined}
              width={'100%'}
              height={'200px'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SectionHeader title="User information" />
            <Card
              user={user}
              showEdit={!!user}
              showDelete={!!user}
              onUserEditClick={updateUserWithId}
              onUserDeleteClick={deleteUserWithId}
              height="200px"
              width="100%"
              title={user?.username ?? 'No user authenticated'}
              description="You can edit your information here, as well as delete your current account."
              id={user?.id ?? 'No user authenticated'}
              padding={'0'}
            />
          </Grid>
          <Snackbar
            open={alertOpen}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
            type="warning"
            message="Threshold exceeded!"
          />
        </>
      )}
    </StyledDashboardGridWrapper>
  );
};
