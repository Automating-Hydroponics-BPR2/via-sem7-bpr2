import { NavigateFunction } from 'react-router-dom';
import { DialogProps } from '../../shared';

export interface IEditAddDialogProps extends DialogProps {
  navigate: NavigateFunction;
}
