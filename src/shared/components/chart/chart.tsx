import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { IChartProps } from './chart.props';
import { StyledChartTitle } from './chart.styles';
import { useTheme } from '@mui/material/styles';

export const BarChartWithReferenceLine = (props: IChartProps) => {
  const theme = useTheme();
  const { width, height, data, threshold } = props;

  const axisLabelStyle = {
    fill: theme.palette.text.primary, // Set the desired text color
  };

  return (
    <>
      <StyledChartTitle>Current Readings</StyledChartTitle>
      <ResponsiveContainer width={width} height={height}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={axisLabelStyle} />
          <YAxis tick={axisLabelStyle} />
          <Tooltip />
          {threshold && (
            <ReferenceLine
              y={threshold}
              stroke={theme.palette.text.primary}
              label={{ value: 'Max', position: 'insideTop', fill: theme.palette.text.primary }}
            />
          )}
          <Bar dataKey="value" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
