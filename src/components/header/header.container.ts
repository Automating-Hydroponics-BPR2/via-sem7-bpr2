import { connect } from 'react-redux';

import {
  type ApplicationState,
  type AppDispatch,
  reset,
  markANotificationAsRead,
  removeANotification,
} from '../../shared';
import { Header } from './header';

const mapStateToProps = (state: ApplicationState) => ({
  notifications: state.notifications.notifications,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onLogout: () => dispatch(reset()),
    onMarkANotificationAsRead: (id: string) => {
      dispatch(markANotificationAsRead(id));
    },
    onRemoveANotification: (id: string) => {
      dispatch(removeANotification(id));
    },
  };
};

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
