import { IDashboardSectionHeaderProps } from './dashboardSectionHeader.props';
import { SelectChangeEvent } from '@mui/material';
import {
  StyledHeaderWrapper,
  StyledTitle,
  StyledHeaderCategoryWrapper,
  StyledHeaderCategory,
  StyledHeaderLabel,
  StyledHeaderSelect,
  StyledMenuItem,
} from './dashboardSectionHeader.styles';

export const DashboardSectionHeader = (props: IDashboardSectionHeaderProps) => {
  const { threshold, setSelectedDeviceId, selectedDeviceId, setThreshold, title, deviceIds, type, setType } = props;

  const handleDeviceChange = (e: SelectChangeEvent<unknown>) => {
    const newDeviceId = e.target.value as string;
    setSelectedDeviceId?.(newDeviceId);
  };

  const handleThresholdChange = (e: SelectChangeEvent<unknown>) => {
    const newThreshold = e.target.value as number;
    setThreshold?.(newThreshold);
  };

  const handleTypeChange = (e: SelectChangeEvent<unknown>) => {
    const newType = e.target.value as string;
    setType?.(newType);
  };

  // this cannot go more than 80 and less than 10 and each option is 10 apart
  const thresholdOptions = Array.from(Array(8).keys()).map((i) => i * 10 + 10);
  const typeOptions = ['light', 'ph', 'temp', 'waterTemp', 'humidity'];

  return (
    <StyledHeaderWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledHeaderCategoryWrapper>
        {deviceIds && deviceIds.length > 1 && (
          <StyledHeaderCategory>
            <StyledHeaderLabel>Device:</StyledHeaderLabel>
            <StyledHeaderSelect
              width="10rem"
              value={selectedDeviceId ?? 'Choose a device'}
              onChange={handleDeviceChange}
              label={'Device Id'}>
              <StyledMenuItem key={'Choose a device'} value={'Choose a device'} disabled>
                Choose a device
              </StyledMenuItem>
              {deviceIds.map((deviceId) => (
                <StyledMenuItem key={deviceId} value={deviceId}>
                  {deviceId}
                </StyledMenuItem>
              ))}
            </StyledHeaderSelect>
          </StyledHeaderCategory>
        )}

        {!(!type && !threshold) ? (
          <StyledHeaderCategory>
            <StyledHeaderLabel>{threshold ? 'Threshold:' : 'Type:'}</StyledHeaderLabel>
            <StyledHeaderSelect
              width="8rem"
              value={threshold ?? type}
              onChange={threshold ? handleThresholdChange : handleTypeChange}>
              {type && (
                <StyledMenuItem key={'Choose a type'} value={'Choose a type'} disabled>
                  {'Choose a type'}
                </StyledMenuItem>
              )}
              {threshold
                ? thresholdOptions.map((option) => (
                    <StyledMenuItem key={option} value={option}>
                      {option}
                    </StyledMenuItem>
                  ))
                : typeOptions.map((option) => (
                    <StyledMenuItem key={option} value={option}>
                      {option}
                    </StyledMenuItem>
                  ))}
            </StyledHeaderSelect>
          </StyledHeaderCategory>
        ) : null}
      </StyledHeaderCategoryWrapper>
    </StyledHeaderWrapper>
  );
};
