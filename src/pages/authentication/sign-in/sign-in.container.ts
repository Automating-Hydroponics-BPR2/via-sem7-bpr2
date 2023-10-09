import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { SignIn } from './sign-in';
import { userService } from '../../../services';
import { type AppDispatch, type ApplicationState } from '../../../shared';

const mapStateToProps = (state: ApplicationState) => ({
  isLoggedIn: state.user.isLoggedIn,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      signIn: userService.signIn,
    },
    dispatch,
  );
};

export const SignInContainer = connect(mapStateToProps, mapDispatchToProps)(SignIn);
