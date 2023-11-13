import { NavigateFunction } from 'react-router-dom';
import { AuthenticatedUser, User } from '../../../shared';
import { IEditAddDialogProps } from '../edit-add-dialog.props';

export interface IEditUserDialogProps extends IEditAddDialogProps {
  user?: AuthenticatedUser;
  onUserEdit?: (navigate: NavigateFunction, user: Partial<User>) => void;
}
