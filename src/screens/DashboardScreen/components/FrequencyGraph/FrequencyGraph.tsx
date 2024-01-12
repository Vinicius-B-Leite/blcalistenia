import {Box, BoxPressable, Spiner, Text} from '@/components';
import {useAppTheme} from '@/hooks';
import {hexToRgb} from '@/utils/hexToRgb';
import React from 'react';
import {Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

import {useFrequency} from './useFrequency';
import Loading from '../Loading/Loading';

const FrequencyGraph: React.FC = () => {
  const theme = useAppTheme();
  const {historicFiltered, refresh, isLoading} = useFrequency();

  const width = Dimensions.get('window').width - theme.spacing[24] * 2.5;
  const height = 220;
  if (!historicFiltered) {
    return <></>;
  }

  return (
    <BoxPressable onPress={refresh}>
      <Text preset="secondaryTitle" mb={24}>
        Frequência de treino
      </Text>
      {isLoading ? (
        <Loading width={width} height={height} size={'large'} />
      ) : (
        <BarChart
          yAxisSuffix=""
          yAxisLabel=""
          data={historicFiltered}
          width={width}
          height={height}
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
      )}
    </BoxPressable>
  );
};

export default FrequencyGraph;
