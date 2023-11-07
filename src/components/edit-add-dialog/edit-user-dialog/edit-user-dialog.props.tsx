import { AuthenticatedUser, User } from '../../../shared';

export interface IEditUserDialogProps {
  open: boolean;
  onClose: () => void;
  user?: AuthenticatedUser;
  onUserEdit?: (user: User) => void;
}
