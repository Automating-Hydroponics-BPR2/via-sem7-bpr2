import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { IChartProps } from './chart.props';
import { StyledChartWrapper } from './chart.styles';
import { useTheme } from '@mui/material/styles';

export const Chart = (props: IChartProps) => {
  const theme = useTheme();
  const { width, height, data, threshold } = props;

  const axisLabelStyle = {
    fill: theme.palette.text.primary,
  };

  return (
    <StyledChartWrapper height={height} width={width}>
      <ResponsiveContainer width={'100%'} height={200}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          style={{
            cursor: 'pointer',
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={axisLabelStyle} />
          <YAxis tick={axisLabelStyle} />
          <Tooltip />
          {threshold && (
            <ReferenceLine
              y={Number(threshold)}
              stroke={theme.palette.text.primary}
              label={{ value: 'Max', position: 'insideTop', fill: theme.palette.text.primary }}
            />
          )}
          <Bar dataKey="value" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartWrapper>
  );
};
