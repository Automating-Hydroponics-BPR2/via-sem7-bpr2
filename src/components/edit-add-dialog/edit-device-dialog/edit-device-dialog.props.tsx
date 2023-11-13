import { NavigateFunction } from 'react-router-dom';
import { CreatedDeviceModel, DeviceModel } from '../../../shared';
import { IEditAddDialogProps } from '../edit-add-dialog.props';

export interface IEditDeviceDialogProps extends IEditAddDialogProps {
  device?: CreatedDeviceModel;

  onDeviceEdit?: (navigate: NavigateFunction, id: string, device: DeviceModel) => void;
}
