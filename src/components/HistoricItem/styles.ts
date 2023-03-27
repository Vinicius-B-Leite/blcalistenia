import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    padding: 5%;
    margin: 5% 0%;
    background-color: ${({theme}) => theme.colors.darkBackground};
    border-radius: ${({theme}) => theme.sizes.borderRadius.sm}px;
`
export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`
export const Title = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.sizes.fontSize.md}px;
    font-weight: 700;
`
export const Date = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
`
export const Time = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.sizes.fontSize.vsm}px;
`
export const FirstExercise = styled.Text`
    margin-top: 5%;
    color: ${({theme}) => theme.colors.text};
    font-size: ${({theme}) => theme.sizes.fontSize.sm}px;
`