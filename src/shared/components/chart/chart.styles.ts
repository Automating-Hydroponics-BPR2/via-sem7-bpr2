import styled from 'styled-components';

export const StyledChartWrapper = styled('div')<{ height: number; width: number }>`
  width: ${({ width }) => width}%;
  max-height: ${({ height }) => height}px;
  background-color: ${({ theme }) => theme.palette.background.default};
  margin-bottom: 1rem;
  cursor: pointer;
`;
