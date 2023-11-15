import { NavigateFunction } from 'react-router-dom';
import { DateFilter } from '../../models';

export interface ISectionHeaderProps {
  title: string;

  type?: string;
  threshold?: number;
  deviceIds?: string[];
  dateFilterLabel?: string;
  selectedDeviceId?: string;
  navigate?: NavigateFunction;

  setSelectedDeviceId?: (navigate: NavigateFunction, deviceId: string, dateFilter?: DateFilter) => void;
  setDateFilterLabel?: (dateFilter: string) => void;
  setDateFilter?: (dateFilter: DateFilter) => void;
  setThreshold?: (threshold: number) => void;
  setType?: (type: string) => void;
}
