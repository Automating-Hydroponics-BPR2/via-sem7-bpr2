import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { type ApplicationState, type AppDispatch } from '../../shared';
import { Home } from './home';

const mapStateToProps = (state: ApplicationState) => ({
  title: 'Welcome to your customized hydroponics dashboard!',
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators({}, dispatch);
};

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
