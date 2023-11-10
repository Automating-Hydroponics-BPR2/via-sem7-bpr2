import React, { useState } from 'react';
import { ISectionHeaderProps } from './sectionHeader.props';
import { SelectChangeEvent } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  StyledHeaderWrapper,
  StyledTitle,
  StyledHeaderCategoryWrapper,
  StyledHeaderCategory,
  StyledHeaderLabel,
  StyledHeaderSelect,
  StyledMenuItem,
  StyledIcon,
} from './sectionHeader.styles';
import { DateFilter } from '../../models';

export const SectionHeader = (props: ISectionHeaderProps) => {
  const [localDateFilter, setLocalDateFilter] = useState<DateFilter>();
  const [localType, setLocalType] = useState<string>();
  const {
    threshold,
    setSelectedDeviceId,
    selectedDeviceId,
    setThreshold,
    title,
    deviceIds,
    type,
    setType,
    setDateFilter,
    dateFilterLabel,
    setDateFilterLabel,
  } = props;

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
    setLocalType?.(newType);
  };

  const handleDateFilterChange = (e: SelectChangeEvent<unknown>) => {
    const newDateFilter = e.target.value as string;
    const start = new Date().getTime();
    let end = 0;
    switch (newDateFilter) {
      case 'Today':
        end = new Date().setHours(0, 0, 0, 0);
        break;
      case 'Last 3 days':
        end = new Date().setHours(0, 0, 0, 0) - 259200000;
        break;
      case 'Last 7 days':
        end = new Date().setHours(0, 0, 0, 0) - 604800000;
        break;
      default:
        end = new Date().setHours(0, 0, 0, 0) - 604800000;
        break;
    }
    setDateFilterLabel?.(newDateFilter);
    setLocalDateFilter?.({ start, end });
  };

  const handleFilterClick = () => {
    if (localDateFilter && localType) {
      setDateFilter?.(localDateFilter);
      setType?.(localType);
    }
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

        {dateFilterLabel && (
          <StyledHeaderCategory>
            <StyledHeaderLabel>Date:</StyledHeaderLabel>
            <StyledHeaderSelect width="8rem" value={dateFilterLabel} onChange={handleDateFilterChange}>
              <StyledMenuItem key={'Choose a date'} value={dateFilterLabel} disabled>
                Choose a date
              </StyledMenuItem>
              <StyledMenuItem key={'Today'} value={'Today'}>
                Today
              </StyledMenuItem>
              <StyledMenuItem key={'Last 3 days'} value={'Last 3 days'}>
                Last 3 days
              </StyledMenuItem>
              <StyledMenuItem key={'Last 7 days'} value={'Last 7 days'}>
                Last 7 days
              </StyledMenuItem>
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

        {dateFilterLabel && type && (
          <StyledIcon
            size="large"
            aria-label="theming button"
            edge="end"
            onClick={handleFilterClick}
            color={'inherit'}
            sx={{ display: { xs: 'none', lg: 'block' } }}>
            <FilterAltIcon />
          </StyledIcon>
        )}
      </StyledHeaderCategoryWrapper>
    </StyledHeaderWrapper>
  );
};
