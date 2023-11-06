import { useEffect, useState } from 'react';
import { DashboardProps } from './dashboard.props';
import { Card, Dialog, DialogProps } from '../../shared';
import { Grid, Skeleton } from '@mui/material';
import { StyledDashboardGridWrapper } from './dashboard.styles';
import { Chart } from '../../shared/components/chart/chart';
import { DataTable } from '../../shared/components/dataTable';
import { SectionHeader } from '../../shared/components/sectionHeader';

export const Dashboard = (props: DashboardProps) => {
  const {
    type,
    reset,
    threshold,
    isLoading,
    selectedDeviceIdChart,
    selectedDeviceIdDataTable,
    selectedDeviceIdInformaton,
    setType,
    setThreshold,
    setSelectedDeviceIdChart,
    setSelectedDeviceIdDataTable,
    setSelectedDeviceIdInformaton,
  } = props;
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const dialogProps: DialogProps = {
    open: isConfirmationDialogOpen,
    onClose: () => {
      setIsConfirmationDialogOpen(false);
    },
    title: 'Are you sure you want to delete this device?',
    children: [
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </p>
      </div>,
    ],
    options: ['Confirm', 'Cancel'],
    onOptionClick: (option: string) => {
      handleOptionClick(option);
    },
    width: '500px',
    height: '200px',
  };
  const handleOptionClick = (option: string) => {
    switch (option) {
      case 'Confirm':
        console.log('Confirm clicked');
        setIsConfirmationDialogOpen(false);
        break;
      case 'Cancel':
        console.log('Cancel clicked');
        setIsConfirmationDialogOpen(false);
        break;
    }
  };

  return (
    <StyledDashboardGridWrapper container columnSpacing={3}>
      {isLoading ? (
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
            <SectionHeader
              selectedDeviceId={selectedDeviceIdInformaton}
              deviceIds={[
                'a0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
                'b0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
                'c0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
                'd0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
              ]}
              title="Device information"
              setSelectedDeviceId={setSelectedDeviceIdInformaton}
            />
            <Card
              showAdd
              showEdit
              showDelete
              onAddClick={() => {
                console.log('Add clicked');
              }}
              onEditClick={() => {
                console.log('Edit clicked');
              }}
              onDeleteClick={() => {
                console.log('Delete clicked');
                setIsConfirmationDialogOpen(true);
              }}
              height="200px"
              width="100%"
              title="Device 1"
              description="This is the current reading from the device"
              id={'123'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <SectionHeader
              threshold={threshold}
              setSelectedDeviceId={setSelectedDeviceIdChart}
              selectedDeviceId={selectedDeviceIdChart}
              setThreshold={setThreshold}
              deviceIds={[
                'a0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
                'b0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
                'c0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
                'd0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
              ]}
              title={'Current Readings'}
            />
            <Chart
              data={[
                { name: 'ph', value: '20' },
                { name: 'light', value: '30' },
                { name: 'temp', value: '10' },
                { name: 'waterTemp', value: '40' },
                { name: 'humidity', value: '55' },
              ]}
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
              deviceIds={[
                'a0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
                'b0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
                'c0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
                'd0d3b0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a',
              ]}
              title={'Current Readings'}
            />
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
              width={'100%'}
              height={'200px'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SectionHeader title="User information" />
            <Card
              showEdit
              showDelete
              onEditClick={() => {
                console.log('Edit clicked');
              }}
              onDeleteClick={() => {
                console.log('Delete clicked');
                setIsConfirmationDialogOpen(true);
              }}
              height="200px"
              width="100%"
              title="username"
              description="This is information for the current user"
              id={'123'}
              padding={'0'}
            />
          </Grid>
          <Dialog {...dialogProps} />
        </>
      )}
    </StyledDashboardGridWrapper>
  );
};
