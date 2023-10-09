import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { type AppDispatch, type ApplicationState } from '../../../shared';
import { SignUp } from './sign-up';
import { userService } from '../../../services';

const mapStateToProps = (state: ApplicationState) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      signUp: userService.signUp,
    },
    dispatch,
  );
};

export const SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUp);
