import { AuthenticatedUser } from '../../../shared';

export interface IEditUserDialogProps {
  open: boolean;
  onClose: () => void;
  user?: AuthenticatedUser;
  onUserEdit?: (user: AuthenticatedUser) => void;
}
