import { CreatedDeviceModel, DeviceModel, DialogProps } from '../../../shared';

export interface IEditDeviceDialogProps extends DialogProps {
  device?: CreatedDeviceModel;

  onDeviceEdit?: (id: string, device: DeviceModel) => void;
}
