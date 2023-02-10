import React from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from 'styled-components/native';
import { TitleOfCharts } from '../../screens/Dashboard/styles';

const {height: HEIGHT, width: WIDTH} = Dimensions.get('screen')



type Props = {
    data: any
}
const ExercisesLevelChart: React.FC<Props> = ({data}) => {
    const theme = useTheme()
    return (
        <>
            <TitleOfCharts>Dificuldade de movimentos</TitleOfCharts>
            <PieChart
                data={data}
                width={WIDTH - HEIGHT * 0.05}
                height={HEIGHT * 0.30}
                chartConfig={{
                    backgroundGradientFrom: theme.colors.background,
                    backgroundGradientTo: theme.colors.background,
                    color: () => theme.colors.text,
                    fillShadowGradientTo: theme.colors.contrast,
                    fillShadowGradientToOpacity: 1,

                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}

            />
        </>
    )
}

export default ExercisesLevelChart;