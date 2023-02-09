import React, { useContext, useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import * as S from './styles'
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { useTheme } from 'styled-components/native';

const {height: HEIGHT, width: WIDTH} = Dimensions.get('screen')

const Dashboard: React.FC = () => {
    const theme = useTheme()
    const data = {
        labels: ["Jan", "Fe", "Mar", "Abril", "Mai", "Jun"],
        datasets: [
            {
                data: [1, 2, 3, 4, 5, 6]
            }
        ]
    };

    const data2 = [
        {
            name: "Inicante",
            population: 60,
            color: theme.colors.exrtemeDarkContrast,
            legendFontColor: theme.colors.text,
            legendFontSize: 15
        },
        {
            name: "Média",
            population: 30,
            color: theme.colors.darkContrast,
            legendFontColor: theme.colors.text,
            legendFontSize: 15
        },
        {
            name: "Difícil",
            population: 10,
            color: theme.colors.contrast,
            legendFontColor: theme.colors.text,
            legendFontSize: 15
        },
    ]
    return (
        <S.Container showsVerticalScrollIndicator={false}>
            <S.Title>Desempenho</S.Title>

            <S.TitleOfCharts>Frequência</S.TitleOfCharts>
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

            <S.TitleOfCharts>Handstand push ups Reps</S.TitleOfCharts>
            <LineChart
                data={data}
                width={WIDTH}
                height={HEIGHT * 0.30}
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

            <S.TitleOfCharts>Dificuldade de movimentos</S.TitleOfCharts>
            <PieChart
                data={data2}
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
        </S.Container>
    )
}

export default Dashboard;