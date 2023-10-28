import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { type ApplicationState, type AppDispatch, setDevice, DeviceModel, setReadingsList } from '../../shared';
import { Dashboard } from './dashboard';
import { DeviceReading } from '../../shared/models/device';

const mapStateToProps = (state: ApplicationState) => ({
  device: state.device.device,
  readingsList: state.device.readingsList,
  user: state.user.user,
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      setDevice: (device: DeviceModel) => {
        dispatch(setDevice(device));
      },
      setReadingsList: (readingsList: DeviceReading[]) => {
        dispatch(setReadingsList(readingsList));
      },
    },
    dispatch,
  );
};

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
