export interface IChartProps {
  data: any;
  width: number;
  height: number;
  threshold: number;

  deviceIds?: string[];
  selectedDeviceId?: string;

  setSelectedDeviceId: (deviceId: string) => void;
  setThreshold: (threshold: number) => void;
}
