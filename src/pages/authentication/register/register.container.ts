import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { type AppDispatch, type ApplicationState } from '../../../shared';
import { Register } from './register';
import { userService } from '../../../services';

const mapStateToProps = (state: ApplicationState) => ({
  user: state.user.user,
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      register: userService.register,
    },
    dispatch,
  );
};

export const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);
