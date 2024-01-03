import {Box, Text} from '@/components';
import {useAppTheme} from '@/hooks';
import {hexToRgb} from '@/utils/hexToRgb';
import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import Circle from './components/Circle';
import {useRepsRange} from './useRepsRange';

// import { Container } from './styles';

const RepsRange: React.FC = () => {
  const theme = useAppTheme();
  const {repsRange, range} = useRepsRange();

  if (!repsRange) return <></>;

  return (
    <Box marginVertical={34}>
      <Text preset="secondaryTitle" mb={24}>
        Range de repetições
      </Text>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center">
        <PieChart
          paddingLeft="0"
          data={repsRange}
          width={Dimensions.get('window').width / 2}
          height={220}
          chartConfig={{
            backgroundGradientFrom: theme.colors.thirdBg,
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: theme.colors.thirdBg,
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => hexToRgb(theme.colors.contrast, 0),
          }}
          hasLegend={false}
          accessor={'porcentage'}
          backgroundColor={'transparent'}
          center={[50, 0]}></PieChart>
        <Box>
          {range.map(item => (
            <Box
              flexDirection="row"
              gap={8}
              alignItems="center"
              key={item.color}>
              <Circle size={15} color={item.color} />
              <Text preset="pLarge">{item.name}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RepsRange;
