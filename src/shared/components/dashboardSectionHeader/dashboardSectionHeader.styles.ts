import styled from "styled-components";
import { Box, Typography, Select, MenuItem } from "@mui/material";

export const StyledHeaderWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const StyledTitle = styled(Typography)`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
  margin-bottom: 20px;
`;

export const StyledHeaderCategoryWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

export const StyledHeaderCategory = styled(Box)`
  display: flex;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

export const StyledHeaderLabel = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const StyledHeaderSelect = styled(Select)`
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
