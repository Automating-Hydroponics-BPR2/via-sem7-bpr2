import { DeviceModel } from '../../../shared';

export interface IEditAddDialogDeviceProps {
  open: boolean;
  onClose: () => void;
  device?: DeviceModel;
  onDeviceEdit?: (id: string, device: DeviceModel) => void;
  onDeviceAdd?: (device: DeviceModel) => void;
}
