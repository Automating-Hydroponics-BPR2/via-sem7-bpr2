import { useEffect } from 'react';
import { DashboardProps } from './dashboard.props';
import { Card, DeviceReading } from '../../shared';
import { Grid, Skeleton } from '@mui/material';
import { StyledDashboardGridWrapper } from './dashboard.styles';
import { Chart } from '../../shared/components/chart';
import { DataTable } from '../../shared/components/dataTable';
import { SectionHeader } from '../../shared/components/sectionHeader';

export const Dashboard = (props: DashboardProps) => {
  const {
    user,
    type,
    reset,
    device,
    deviceIds,
    threshold,
    isLoading,
    selectedDeviceIdChart,
    selectedDeviceIdDataTable,
    selectedDeviceIdInformaton,
    historicalReadings,
    currentReading,
    setType,
    setThreshold,
    setSelectedDeviceIdChart,
    setSelectedDeviceIdDataTable,
    setSelectedDeviceIdInformaton,
    // deleteDeviceWithId,
    // createDevice,
    // deleteUserWithId,
    // updateDeviceWithId,
    // updateUserWithId
  } = props;

  const convertToChartData = (data: DeviceReading) => {
    return [
      {
        name: 'ph',
        value: data.ph,
      },
      {
        name: 'light',
        value: data.light,
      },
      {
        name: 'temp',
        value: data.temp,
      },
      {
        name: 'waterTemp',
        value: data.waterTemp,
      },
      {
        name: 'humidity',
        value: data.humidity,
      },
    ];
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <StyledDashboardGridWrapper container columnSpacing={3}>
      {isLoading ? (
        <>
          <Grid item xs={12} lg={4}>
            <Skeleton variant="rectangular" width={'100%'} height={350} animation={'wave'} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Skeleton variant="rectangular" width={'100%'} height={350} animation={'wave'} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Skeleton variant="rectangular" width={'100%'} height={350} animation={'wave'} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Skeleton variant="rectangular" width={'100%'} height={350} animation={'wave'} />
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
              onDeviceAddClick={() => {
                console.log('Add clicked');
              }}
              onDeviceEditClick={() => {
                console.log('Edit clicked');
              }}
              onDeleteClick={() => {
                console.log('Delete clicked');
              }}
              height="200px"
              width="100%"
              title={selectedDeviceIdInformaton ?? 'No device selected'}
              description={`Here you can see information about the device, such as id ${
                selectedDeviceIdInformaton ?? ''
              } and/or name ${device?.name ?? ''}. You can edit or add a device here, as well as, delete a device.`}
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
            <Chart
              data={convertToChartData(
                currentReading ?? {
                  id: '1',
                  deviceId: '2',
                  name: 'Device 2',
                  light: '1',
                  ph: '2',
                  temp: '3',
                  waterTemp: '4',
                  humidity: '5',
                  timestamp: '2021-10-10T00:00:00.000Z',
                },
              )}
              width={100}
              height={200}
              threshold={threshold}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <SectionHeader
              type={type}
              setSelectedDeviceId={setSelectedDeviceIdDataTable}
              selectedDeviceId={selectedDeviceIdDataTable}
              setType={setType}
              deviceIds={deviceIds}
              title={'Historical Readings'}
            />
            <DataTable
              data={
                historicalReadings ?? [
                  {
                    id: '1',
                    deviceId: '2',
                    name: 'Device 2',
                    light: '1',
                    ph: '2',
                    temp: '3',
                    waterTemp: '4',
                    humidity: '5',
                    timestamp: '2021-10-10T00:00:00.000Z',
                  },
                  {
                    id: '2',
                    deviceId: '2',
                    name: 'Device 2',
                    light: '1',
                    ph: '2',
                    temp: '3',
                    waterTemp: '4',
                    humidity: '5',
                    timestamp: '2021-10-10T00:00:00.000Z',
                  },
                  {
                    id: '3',
                    deviceId: '2',
                    name: 'Device 2',
                    light: '1',
                    ph: '2',
                    temp: '3',
                    waterTemp: '4',
                    humidity: '5',
                    timestamp: '2021-10-10T00:00:00.000Z',
                  },
                  {
                    id: '4',
                    deviceId: '2',
                    name: 'Device 2',
                    light: '1',
                    ph: '2',
                    temp: '3',
                    waterTemp: '4',
                    humidity: '5',
                    timestamp: '2021-10-10T00:00:00.000Z',
                  },
                  {
                    id: '5',
                    deviceId: '2',
                    name: 'Device 2',
                    light: '1',
                    ph: '2',
                    temp: '3',
                    waterTemp: '4',
                    humidity: '5',
                    timestamp: '2021-10-10T00:00:00.000Z',
                  },
                  {
                    id: '6',
                    deviceId: '2',
                    name: 'Device 2',
                    light: '1',
                    ph: '2',
                    temp: '3',
                    waterTemp: '4',
                    humidity: '5',
                    timestamp: '2021-10-10T00:00:00.000Z',
                  },
                ]
              }
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
              onUserEditClick={() => {
                console.log('Edit clicked');
              }}
              onDeleteClick={() => {
                console.log('Delete clicked');
              }}
              height="200px"
              width="100%"
              title={user?.username ?? 'No user authenticated'}
              description="You can edit your information here, as well as delete your current account."
              id={user?.id ?? 'No user authenticated'}
              padding={'0'}
            />
          </Grid>
        </>
      )}
    </StyledDashboardGridWrapper>
  );
};
