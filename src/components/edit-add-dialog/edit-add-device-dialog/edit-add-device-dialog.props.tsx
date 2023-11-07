import { DeviceModel } from '../../../shared';

export interface IEditAddDialogDeviceProps {
  open: boolean;
  onClose: () => void;
  device?: DeviceModel;
  onDeviceEdit?: (device: DeviceModel) => void;
  onDeviceAdd?: (device: DeviceModel) => void;
}
