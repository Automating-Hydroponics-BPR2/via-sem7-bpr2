import { DeviceModel, AuthenticatedUser } from '../../models';

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

  onDeviceAddClick?: (device?: DeviceModel) => void;
  onDeviceEditClick?: (device: DeviceModel) => void;
  onUserEditClick?: (user: AuthenticatedUser) => void;
  onDeleteClick?: (id: string) => void;
}
