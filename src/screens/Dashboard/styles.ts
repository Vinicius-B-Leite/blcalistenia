import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
    padding: 5% ;
`
export const Title = styled.Text`
    color: ${({theme}) => theme.colors.contrast};
    font-size: ${({theme}) => theme.sizes.fontSize.lg}px;
    font-weight: 700;
`
export const TitleOfCharts = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
    font-weight: 600;
    margin-top: 10%;
    margin-bottom: 5%;
`