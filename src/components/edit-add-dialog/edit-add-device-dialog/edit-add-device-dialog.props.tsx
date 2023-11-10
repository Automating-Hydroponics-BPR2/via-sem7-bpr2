import { CreatedDeviceModel, DeviceModel } from '../../../shared';

export interface IEditAddDialogDeviceProps {
  open: boolean;
  onClose: () => void;
  device?: CreatedDeviceModel;
  isAddDevice?: boolean;

  onDeviceEdit?: (id: string, device: DeviceModel) => void;
  onDeviceAdd?: (device: DeviceModel) => void;
}
