import { DeviceModel, AuthenticatedUser, User } from '../../models';

export interface CardProps {
  id: string;
  title: string;
  width: string;
  height: string;

  device?: DeviceModel;
  user?: AuthenticatedUser;
  imgSource?: string;
  description: string;
  date?: string;
  padding?: string;
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;

  onDeviceAddClick?: (device: DeviceModel) => void;
  onDeviceEditClick?: (id: string, device: DeviceModel) => void;
  onDeviceDeleteClick?: (id: string) => void;
  onUserEditClick?: (user: User) => void;
  onUserDeleteClick?: () => void;
}
