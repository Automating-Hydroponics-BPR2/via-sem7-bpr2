import React from 'react';
import { DashboardProps } from './dashboard.props';
import { Card } from '../../shared';
import { Grid, Skeleton } from '@mui/material';
import { StyledDashboardGridWrapper } from './dashboard.styles';
import { BarChartWithReferenceLine } from '../../shared/components/chart/chart';
import { DataTable } from '../../shared/components/dataTable';

export const Dashboard = (props: DashboardProps) => {
  const { device } = props;
  return (
    <StyledDashboardGridWrapper container spacing={3}>
      {props.isLoading ? (
        <>
          <Grid item xs={12} lg={4}>
            <Skeleton variant="rectangular" width={'100%'} height={200} animation={'wave'} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Skeleton variant="rectangular" width={'100%'} height={200} animation={'wave'} />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Skeleton variant="rectangular" width={'100%'} height={200} animation={'wave'} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Skeleton variant="rectangular" width={'100%'} height={200} animation={'wave'} />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} md={6} lg={4}>
            <Card title="Device 1" description="This is the current reading from the device" id={'123'} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <BarChartWithReferenceLine
              data={[
                { name: 'ph', value: '20' },
                { name: 'light', value: '30' },
                { name: 'temp', value: '10' },
                { name: 'waterTemp', value: '40' },
                { name: 'humidity', value: '55' },
              ]}
              width={'100%'}
              height={250}
              threshold={60}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <DataTable
              data={[
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
              ]}
              deviceName={'Device 1'}
              deviceId={'123'}
              height={250}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card title="Device 2" description="This is the current reading from the device" id={'123'} />
          </Grid>
        </>
      )}
    </StyledDashboardGridWrapper>
  );
};
