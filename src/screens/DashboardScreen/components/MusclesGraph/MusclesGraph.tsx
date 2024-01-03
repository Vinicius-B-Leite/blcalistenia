import {useAppTheme} from '@/hooks';
import {hexToRgb} from '@/utils/hexToRgb';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {useMuscles} from './useMuscles';
import {Box, Text} from '@/components';

// import { Container } from './styles';

const MusclesGraph: React.FC = () => {
  const theme = useAppTheme();
  const {muslces} = useMuscles();

  if (!muslces) return <></>;
  return (
    <Box>
      <Text preset="secondaryTitle" mt={34} mb={24}>
        Músculos mais treinados
      </Text>
      <LineChart
        data={muslces}
        width={Dimensions.get('window').width - theme.spacing[24] * 2}
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
        withVerticalLines={false}
        withHorizontalLines={false}
      />
    </Box>
  );
};

export default MusclesGraph;
