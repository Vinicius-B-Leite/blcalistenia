import {Box, Text} from '@/components';
import {useAppTheme} from '@/hooks';
import {hexToRgb} from '@/utils/hexToRgb';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes';
import {useFrequency} from './useFrequency';

const FrequencyGraph: React.FC = () => {
  const theme = useAppTheme();
  const {historicFiltered} = useFrequency();

  if (!historicFiltered) {
    return <></>;
  }

  return (
    <Box>
      <Text preset="secondaryTitle" mb={24}>
        Frequência de treino
      </Text>
      <BarChart
        yAxisSuffix=""
        yAxisLabel=""
        data={historicFiltered}
        width={Dimensions.get('window').width - theme.spacing[24] * 2.5}
        height={220}
        chartConfig={{
          backgroundGradientFrom: theme.colors.thirdBg,
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: theme.colors.thirdBg,
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => hexToRgb(theme.colors.contrast, opacity),
          barPercentage: 0.4,
          labelColor: () => theme.colors.text,
          propsForBackgroundLines: {
            opacity: 0.8,
          },
        }}
      />
    </Box>
  );
};

export default FrequencyGraph;
