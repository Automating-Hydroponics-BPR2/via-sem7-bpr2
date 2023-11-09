import { DateFilter } from '../../models';

export interface ISectionHeaderProps {
  title: string;
  threshold?: number;
  dateFilterLabel?: string;
  type?: string;

  deviceIds?: string[];
  selectedDeviceId?: string;

  setSelectedDeviceId?: (deviceId: string) => void;
  setDateFilterLabel?: (dateFilter: string) => void;
  setDateFilter?: (dateFilter: DateFilter) => void;
  setThreshold?: (threshold: number) => void;
  setType?: (type: string) => void;
}
