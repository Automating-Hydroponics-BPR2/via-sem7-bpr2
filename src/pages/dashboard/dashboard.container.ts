import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { type ApplicationState, type AppDispatch } from '../../shared';
import { Dashboard } from './dashboard';

const mapStateToProps = (state: ApplicationState) => ({
  title: 'Dashboard',
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators({}, dispatch);
};

export const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
