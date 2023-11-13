import { NavigateFunction } from 'react-router-dom';
import { DeviceModel, AuthenticatedUser, User, CreatedDeviceModel } from '../../models';

export interface CardProps {
  id: string;
  title: string;
  width: string;
  height: string;
  navigate: NavigateFunction;

  device?: CreatedDeviceModel;
  user?: AuthenticatedUser;
  imgSource?: string;
  description: string;
  date?: string;
  padding?: string;
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;

  onDeviceAddClick?: (navigate: NavigateFunction, device: DeviceModel) => void;
  onDeviceEditClick?: (navigate: NavigateFunction, id: string, device: DeviceModel) => void;
  onDeviceDeleteClick?: (navigate: NavigateFunction, id: string) => void;
  onUserEditClick?: (navigate: NavigateFunction, user: Partial<User>) => void;
  onUserDeleteClick?: (navigate: NavigateFunction) => void;
}
