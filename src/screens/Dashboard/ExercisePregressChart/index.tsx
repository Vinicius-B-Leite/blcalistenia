import React from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {useTheme} from 'styled-components/native';
import {TitleOfCharts} from '../styles';

type Props = {
  data: LineChartData;
};
const {height: HEIGHT, width: WIDTH} = Dimensions.get('screen');

const ExercisePregressChart: React.FC<Props> = ({data}) => {
  const theme = useTheme();
  return (
    <>
      <TitleOfCharts>Handstand push ups Reps</TitleOfCharts>
      <LineChart
        data={data}
        width={WIDTH}
        height={HEIGHT * 0.3}
        chartConfig={{
          backgroundGradientFrom: theme.colors.background,
          backgroundGradientTo: theme.colors.background,
          color: () => theme.colors.text,
          fillShadowGradientTo: theme.colors.contrast,
          fillShadowGradientToOpacity: 1,
        }}
        withInnerLines={false}
        withOuterLines={false}
        fromZero={true}
      />
    </>
  );
};

export default ExercisePregressChart;
