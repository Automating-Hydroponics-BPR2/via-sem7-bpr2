import { AuthenticatedUser, DialogProps, User } from '../../../shared';

export interface IEditUserDialogProps extends DialogProps {
  user?: AuthenticatedUser;
  onUserEdit?: (user: User) => void;
}
