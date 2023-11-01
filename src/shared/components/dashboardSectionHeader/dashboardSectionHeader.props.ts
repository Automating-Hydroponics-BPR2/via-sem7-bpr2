export interface IDashboardSectionHeaderProps {
  title: string;
  threshold?: number;
  type?: string;

  deviceIds?: string[];
  selectedDeviceId?: string;

  setSelectedDeviceId?: (deviceId: string) => void;
  setThreshold?: (threshold: number) => void;
  setType?: (type: string) => void;
}
