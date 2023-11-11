import { DeviceModel, DialogProps } from '../../../shared';

export interface IAddDeviceDialogProps extends DialogProps {
  onDeviceAdd?: (device: DeviceModel) => void;
}
