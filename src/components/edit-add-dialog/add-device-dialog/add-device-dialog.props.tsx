import { NavigateFunction } from 'react-router-dom';
import { DeviceModel } from '../../../shared';
import { IEditAddDialogProps } from '../edit-add-dialog.props';

export interface IAddDeviceDialogProps extends IEditAddDialogProps {
  onDeviceAdd?: (navigate: NavigateFunction, device: DeviceModel) => void;
}
