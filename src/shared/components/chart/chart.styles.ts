import { MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styled from 'styled-components';

export const StyledChartWrapper = styled('div')<{ height: number; width: number }>`
  width: ${({ width }) => width}%;
  max-height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const StyledChartHeaderWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const StyledChartTitle = styled(Typography)`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 20px;
`;

export const StyledChartHeaderCategoryWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

export const StyledChartHeaderCategory = styled(Box)`
  display: flex;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

export const StyledChartHeaderLabel = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const StyledChartHeaderSelect = styled(Select)`
  && {
    font-size: 14px;
    font-weight: 500;

    .MuiSelect-select {
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  color: ${({ theme }) => theme.palette.text.primary};
  && {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
