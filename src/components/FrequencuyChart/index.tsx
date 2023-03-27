import React from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { useTheme } from 'styled-components/native';
import { TitleOfCharts } from '../../screens/Dashboard/styles';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('screen')


type Props = {
    data: ChartData
}
const FrequencuyChart: React.FC<Props> = ({ data }) => {
    const theme = useTheme()
    return (
        <>
            <TitleOfCharts>Frequência</TitleOfCharts>
            <BarChart
                data={data}
                width={WIDTH - HEIGHT * 0.05}

                height={HEIGHT * 0.30}
                yAxisLabel=""
                yAxisSuffix=""
                withInnerLines={false}
                fromZero={true}
                chartConfig={{
                    backgroundGradientFrom: theme.colors.background,
                    backgroundGradientTo: theme.colors.background,
                    color: () => theme.colors.text,
                    fillShadowGradientFrom: theme.colors.contrast,
                    fillShadowGradientTo: theme.colors.contrast,
                    fillShadowGradientToOpacity: 1,
                    fillShadowGradientToOffset: 4,
                    formatTopBarValue: (t) => t.toString().toUpperCase(),
                    labelColor: () => theme.colors.text,
                    barPercentage: 0.7,
                    propsForLabels: {
                        fontSize: theme.sizes.fontSize.vsm
                    },
                    formatYLabel: (l) => Number(l).toFixed(0),
                }}
                verticalLabelRotation={0}
                showValuesOnTopOfBars={true}
            />
        </>
    )
}

export default FrequencuyChart;